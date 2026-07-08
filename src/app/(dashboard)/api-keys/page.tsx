"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Copy, Trash2, Plus } from "lucide-react";

const apiKeys = [
  { name: "Production", key: "sak_prod_...a1b2", lastUsed: "Il y a 2 heures" },
  { name: "Développement", key: "sak_dev_...c3d4", lastUsed: "Il y a 3 jours" },
];

export default function ApiKeysPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clés API</h1>
          <p className="text-muted-foreground mt-1">Gérez vos clés d'API pour les intégrations.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nouvelle clé
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vos clés</CardTitle>
          <CardDescription>Gardez vos clés secrètes. Ne les partagez jamais.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiKeys.map((k) => (
              <div key={k.name} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{k.name}</p>
                  <code className="text-xs text-muted-foreground font-mono">{k.key}</code>
                  <p className="text-xs text-muted-foreground mt-1">Dernière utilisation : {k.lastUsed}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentation API</CardTitle>
          <CardDescription>Apprenez à utiliser nos APIs avec vos clés.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg bg-muted p-4 font-mono text-sm">
            <p className="text-muted-foreground"># Exemple d'appel API</p>
            <p>curl -H "Authorization: Bearer sak_prod_..." \</p>
            <p>  https://api.saaskit.com/v1/users</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
