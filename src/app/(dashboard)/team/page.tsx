"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus, Crown, Shield } from "lucide-react";

const members = [
  { name: "Jean Dupont", email: "jean@example.com", role: "owner" },
  { name: "Marie Martin", email: "marie@example.com", role: "admin" },
  { name: "Paul Durand", email: "paul@example.com", role: "member" },
];

function RoleBadge({ role }: { role: string }) {
  const icons: Record<string, any> = { owner: Crown, admin: Shield };
  const labels: Record<string, string> = { owner: "Propriétaire", admin: "Admin", member: "Membre" };
  const Icon = icons[role];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
      {Icon && <Icon className="h-3 w-3" />}
      {labels[role] || role}
    </span>
  );
}

export default function TeamPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Équipe</h1>
          <p className="text-muted-foreground mt-1">Gérez les membres de votre organisation.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Inviter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Membres</CardTitle>
          <CardDescription>{members.length} membres dans votre équipe.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.email} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{m.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <RoleBadge role={m.role} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inviter un membre</CardTitle>
          <CardDescription>Envoyez une invitation par email.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex gap-3">
            <Input placeholder="email@exemple.fr" type="email" className="max-w-sm" />
            <Button>Envoyer</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
