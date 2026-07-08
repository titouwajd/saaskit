import {
  Shield,
  CreditCard,
  BarChart3,
  Users,
  Key,
  Palette,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Authentification",
    description: "NextAuth, Google, email/password. Inscription et connexion sécurisées en quelques lignes.",
  },
  {
    icon: CreditCard,
    title: "Paiements",
    description: "Stripe checkout, webhooks et portail client. Gérez abonnements et factures sans effort.",
  },
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "Graphiques, analytics et KPIs en temps réel. Un dashboard prêt à l'emploi pour vos utilisateurs.",
  },
  {
    icon: Users,
    title: "Équipes",
    description: "Multi-tenant, rôles et invitations. Vos clients peuvent collaborer en toute sécurité.",
  },
  {
    icon: Key,
    title: "Clés API",
    description: "Génération, révocation et rate limiting. Une infrastructure API robuste pour vos clients.",
  },
  {
    icon: Palette,
    title: "UI moderne",
    description: "Tailwind, shadcn/ui, dark mode. Des composants élégants et accessibles.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce qu&apos;il vous faut pour{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              démarrer
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un boilerplate complet qui couvre tous les aspects essentiels d&apos;un SaaS moderne.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
