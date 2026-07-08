# 🚀 SaaSKit

**Production-ready SaaS starter kit.** Next.js 14, TypeScript, Prisma, NextAuth, Stripe, Tailwind. Tout ce dont vous avez besoin pour lancer votre SaaS et vendre votre premier abonnement.

---

## ✨ Fonctionnalités

- 🔐 **Authentification complète** — NextAuth v4, credentials (email/password), Google OAuth, sessions JWT
- 💳 **Paiements Stripe** — Checkout, Customer Portal, webhooks, gestion des abonnements
- 📊 **Dashboard** — Vue d'ensemble, analytics (Recharts), gestion d'équipe, clés API
- 👥 **Équipes** — Multi-tenant, rôles (owner/admin/member), invitations
- 🔑 **Clés API** — Génération, révocation, rate limiting
- 🎨 **UI moderne** — Tailwind CSS, shadcn/ui, dark mode, responsive
- 🐳 **Docker** — Docker Compose avec PostgreSQL 16, prêt pour la production
- 📝 **TypeScript** — Typage strict partout

---

## 🏗️ Stack technique

| Catégorie | Technologie |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Base de données | PostgreSQL 16 |
| ORM | Prisma |
| Authentification | NextAuth v4 |
| Paiements | Stripe |
| UI | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Validation | Zod |
| Déploiement | Docker |

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20+
- PostgreSQL 16 (ou Docker)
- Compte Stripe (pour les paiements)
- Compte Google Cloud (pour OAuth)

### 1. Cloner le projet

```bash
git clone https://github.com/titouwajd/saaskit.git
cd saaskit
npm install
```

### 2. Configurer l'environnement

```bash
cp .env.example .env
```

Remplissez les variables dans `.env` :

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/saaskit"
NEXTAUTH_SECRET="votre-secret-dau-moins-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="votre-google-client-id"
GOOGLE_CLIENT_SECRET="votre-google-client-secret"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
```

### 3. Lancer la base de données

```bash
docker compose up -d postgres
```

### 4. Initialiser la base de données

```bash
npx prisma db push
npx prisma generate
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

---

## 🐳 Déploiement avec Docker

```bash
docker compose up -d
```

Tout est inclus : PostgreSQL + Next.js, prêts en une commande.

---

## 📁 Structure du projet

```
saaskit/
├── prisma/
│   └── schema.prisma          # Modèles DB (User, Team, Subscription, ApiKey)
├── src/
│   ├── app/
│   │   ├── (marketing)/       # Landing page, pricing
│   │   ├── (dashboard)/       # Dashboard (protégé par auth)
│   │   ├── api/               # API routes (auth, billing, webhooks)
│   │   ├── auth/              # Pages de connexion / inscription
│   │   └── layout.tsx         # Layout racine
│   ├── components/
│   │   ├── ui/                # Composants shadcn/ui
│   │   ├── landing/           # Sections landing page
│   │   └── dashboard/         # Layout dashboard
│   ├── lib/                   # Utilitaires (prisma, stripe, utils)
│   └── middleware.ts          # Protection des routes dashboard + API
├── docker-compose.yml         # Stack Docker
├── Dockerfile                 # Build production
└── .env.example               # Variables d'environnement
```

---

## 💰 Modèle économique

Ce boilerplate est conçu pour être **vendu** ou utilisé comme base pour vos propres SaaS. Quelques idées :

- **Vendre le boilerplate** sur Gumroad, Product Hunt, ou votre propre site (149€ - 299€)
- **Créer un SaaS vertical** en modifiant les pages dashboard
- **Proposer une formation** "Lancer un SaaS en 48h" basée sur ce kit
- **Freemium + abonnements** : le billing Stripe est déjà intégré

---

## 📄 Licence

MIT — vous pouvez utiliser ce code pour vos projets personnels ou commerciaux.
