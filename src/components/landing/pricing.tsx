import Link from "next/link";
import { Check, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Pro",
    price: "19€",
    period: "/mois",
    description: "Pour les indépendants et les petits projets SaaS.",
    features: [
      "Toutes les fonctionnalités du boilerplate",
      "Jusqu'à 1 000 utilisateurs",
      "Dashboard analytics",
      "Authentification multi-provider",
      "Paiements Stripe",
      "Support par email",
    ],
    cta: "Commencer",
    href: "/auth/register",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "99€",
    period: "/mois",
    description: "Pour les équipes et les projets à fort volume.",
    features: [
      "Tout ce qui est dans Pro",
      "Utilisateurs illimités",
      "Multi-tenant & équipes",
      "Clés API & rate limiting",
      "Webhooks personnalisés",
      "Support prioritaire",
      "SLA 99.9%",
    ],
    cta: "Contactez-nous",
    href: "/contact",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Une tarification{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              simple
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choisissez le plan qui correspond à votre projet. Pas de frais cachés.
          </p>
        </div>

        {/* Free tier mention */}
        <div className="mx-auto mt-8 flex max-w-fit items-center gap-2 rounded-full border border-border/60 bg-white px-5 py-2 text-sm font-medium text-muted-foreground shadow-sm">
          <Zap className="h-4 w-4 text-amber-500" />
          <span>
            <strong className="text-foreground">Gratuit pour toujours</strong>{" "}
            — idéal pour tester et prototyper
          </span>
        </div>

        {/* Plans */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md",
                plan.featured
                  ? "border-primary/40 ring-2 ring-primary/20 shadow-lg"
                  : "border-border/60"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                  Le plus populaire
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6">
                <span className="text-4xl font-extrabold text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? "default" : "outline"}
                size="lg"
                asChild
                className="mt-8 w-full"
              >
                <Link href={plan.href}>
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
