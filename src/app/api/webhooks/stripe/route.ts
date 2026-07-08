import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Read the raw body from the request as a string.
 * Next.js App Router: must read body as text before the JSON parser consumes it.
 */
async function readRawBody(req: NextRequest): Promise<string> {
  const reader = req.body?.getReader();
  if (!reader) return "";

  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) {
      chunks.push(value);
    }
    done = readerDone;
  }

  const decoder = new TextDecoder();
  return decoder.decode(
    chunks.reduce(
      (acc, chunk) => {
        const combined = new Uint8Array(acc.length + chunk.length);
        combined.set(acc, 0);
        combined.set(chunk, acc.length);
        return combined;
      },
      new Uint8Array()
    )
  );
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const subscriptionId = session.subscription as string;

  if (!userId || !subscriptionId) {
    console.error("[WEBHOOK] Missing userId or subscriptionId in session metadata");
    return;
  }

  // Fetch the subscription from Stripe for full details
  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);

  const priceId = stripeSubscription.items.data[0]?.price.id;
  const currentPeriodEnd = new Date(stripeSubscription.current_period_end * 1000);
  const cancelAtPeriodEnd = stripeSubscription.cancel_at_period_end;

  // Determine tier from price
  let tier: "PRO" | "ENTERPRISE" = "PRO";
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) {
    tier = "ENTERPRISE";
  }

  await prisma.$transaction([
    prisma.subscription.upsert({
      where: { stripeSubscriptionId: subscriptionId },
      create: {
        userId,
        stripeSubscriptionId: subscriptionId,
        stripePriceId: priceId ?? "",
        status: "ACTIVE",
        tier,
        currentPeriodEnd,
        cancelAtPeriodEnd,
      },
      update: {
        stripePriceId: priceId ?? "",
        status: "ACTIVE",
        tier,
        currentPeriodEnd,
        cancelAtPeriodEnd,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { tier },
    }),
  ]);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const stripeSubscriptionId = subscription.id;
  const priceId = subscription.items.data[0]?.price.id;
  const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
  const cancelAtPeriodEnd = subscription.cancel_at_period_end;

  let status: "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING" = "ACTIVE";
  if (subscription.status === "canceled" || (subscription.status === "active" && cancelAtPeriodEnd)) {
    status = "CANCELED";
  } else if (subscription.status === "past_due") {
    status = "PAST_DUE";
  } else if (subscription.status === "trialing") {
    status = "TRIALING";
  }

  let tier: "FREE" | "PRO" | "ENTERPRISE" = "PRO";
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) {
    tier = "ENTERPRISE";
  }

  // Find the subscription to get the userId
  const existingSub = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId },
  });

  if (!existingSub) {
    console.error("[WEBHOOK] Subscription not found:", stripeSubscriptionId);
    return;
  }

  await prisma.$transaction([
    prisma.subscription.update({
      where: { stripeSubscriptionId },
      data: {
        stripePriceId: priceId ?? "",
        status,
        tier,
        currentPeriodEnd,
        cancelAtPeriodEnd,
      },
    }),
    prisma.user.update({
      where: { id: existingSub.userId },
      data: {
        tier: status === "CANCELED" || status === "PAST_DUE" ? "FREE" : tier,
      },
    }),
  ]);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const stripeSubscriptionId = subscription.id;

  const existingSub = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId },
  });

  if (!existingSub) {
    console.error("[WEBHOOK] Subscription not found:", stripeSubscriptionId);
    return;
  }

  await prisma.$transaction([
    prisma.subscription.update({
      where: { stripeSubscriptionId },
      data: { status: "CANCELED", cancelAtPeriodEnd: false },
    }),
    prisma.user.update({
      where: { id: existingSub.userId },
      data: { tier: "FREE" },
    }),
  ]);
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await readRawBody(req);
    const signature = req.headers.get("stripe-signature") ?? "";

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      console.error("[WEBHOOK] Signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log(`[WEBHOOK] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[WEBHOOK]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
