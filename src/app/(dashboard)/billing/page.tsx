"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Pro",
    price: "19€",
    period: "/mois",
    features: [
      "Jusqu'à 10 utilisateurs",
      "API illimitée",
      "Support prioritaire",
      "Analytics avancés",
      "Export des données",
      "Intégrations webhooks",
    ],
    current: true,
    cta: "Gérer l'abonnement",
  },
  {
    name: "Enterprise",
    price: "99€",
    period: "/mois",
    features: [
      "Utilisateurs illimités",
      "API illimitée",
      "Support dédié 24/7",
      "SLA garanti",
      "SSO / SAML",
      "Déploiement on-premise",
      "Formation équipe",
    ],
    current: false,
    cta: "Contacter les ventes",
    highlight: true,
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Facturation</h1>
        <p className="text-muted-foreground mt-1">Gérez votre abonnement et vos moyens de paiement.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.highlight ? "border-primary ring-1 ring-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                {plan.current && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Actuel
                  </span>
                )}
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historique des paiements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "8 juil. 2026", amount: "19,00 €", status: "Payé" },
              { date: "8 juin 2026", amount: "19,00 €", status: "Payé" },
              { date: "8 mai 2026", amount: "19,00 €", status: "Payé" },
            ].map((inv) => (
              <div key={inv.date} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{inv.date}</p>
                  <p className="text-xs text-muted-foreground">Abonnement Pro</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{inv.amount}</p>
                  <p className="text-xs text-green-600">{inv.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
