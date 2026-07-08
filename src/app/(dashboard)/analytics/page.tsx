"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, MousePointer } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 1200 },
  { name: "Fév", value: 1900 },
  { name: "Mar", value: 2100 },
  { name: "Avr", value: 1800 },
  { name: "Mai", value: 2400 },
  { name: "Juin", value: 2800 },
  { name: "Juil", value: 3200 },
];

const metrics = [
  { label: "Pages vues", value: "45.2K", change: "+18%", icon: MousePointer },
  { label: "Visiteurs", value: "12.8K", change: "+12%", icon: Users },
  { label: "Taux de rebond", value: "32%", change: "-5%", icon: TrendingUp },
  { label: "Durée moyenne", value: "4m 12s", change: "+8%", icon: BarChart3 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Suivez vos performances en temps réel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{m.label}</CardTitle>
              <m.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
              <p className="text-xs text-green-600 mt-1">{m.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Revenus mensuels</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
