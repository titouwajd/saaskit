"use client";

import Link from "next/link";
import { ArrowRight, Play, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "150+", label: "développeurs" },
  { icon: Star, value: "4.9/5", label: "note" },
  { icon: TrendingUp, value: "10K+", label: "MRR généré" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/60 to-white pt-24 pb-16 lg:pt-40 lg:pb-24">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-32 right-10 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-primary/6 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Nouveau : Version 2.0 disponible
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in">
            Lancez votre SaaS en{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              48h
            </span>
            , pas en 6 mois
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl animate-fade-in">
            Boilerplate Next.js complet — auth, paiements, dashboard, API. Tout
            ce dont vous avez besoin pour vendre votre premier abonnement.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center animate-fade-in">
            <Button size="xl" asChild className="w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
              <Link href="/auth/register">
                Démarrer gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/demo">
                <Play className="mr-2 h-4 w-4" />
                Voir la démo
              </Link>
            </Button>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 animate-fade-in">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 rounded-xl border border-border bg-white px-4 py-4 shadow-md"
              >
                <s.icon className="h-5 w-5 text-primary/70" />
                <span className="text-2xl font-bold text-foreground sm:text-3xl">
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
