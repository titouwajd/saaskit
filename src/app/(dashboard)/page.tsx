"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  CreditCard,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  { label: "Revenu mensuel", value: "2 450€", change: "+12.5%", up: true, icon: CreditCard },
  { label: "Utilisateurs actifs", value: "847", change: "+8.2%", up: true, icon: Users },
  { label: "Taux de conversion", value: "3.2%", change: "-0.5%", up: false, icon: TrendingUp },
  { label: "Sessions", value: "12 423", change: "+22.1%", up: true, icon: Activity },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue sur votre dashboard SaaSKit.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 flex items-center gap-1 ${stat.up ? "text-green-600" : "text-red-600"}`}>
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button>Inviter un membre</Button>
          <Button variant="outline">Créer une clé API</Button>
          <Button variant="outline">Voir la facturation</Button>
          <Button variant="outline">Documentation</Button>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-primary">🚀 Premiers pas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Votre SaaS est presque prêt. Suivez ces étapes pour le lancer :
          </p>
          <div className="grid gap-2">
            {[
              "✅ Créer un compte — Fait",
              "✅ Configurer votre profil — Fait",
              "⬜ Configurer Stripe pour les paiements",
              "⬜ Ajouter votre premier membre d'équipe",
              "⬜ Créer une clé API pour vos intégrations",
              "⬜ Personnaliser votre landing page",
            ].map((step, i) => (
              <div key={i} className="text-sm flex items-center gap-2">
                {step}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
