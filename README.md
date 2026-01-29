# 👻 GHOST ID

**First-Party Visitor Identification & Web Analytics Platform**

[![License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](https://github.com/ghostid-ai/ghost-id/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/yourdiscord)](https://discord.gg/ghostid)

GHOST ID is an open-source, privacy-first web analytics and visitor identification platform. Unlike traditional analytics that treat visitors as anonymous sessions, GHOST ID creates persistent visitor profiles that follow users across visits, devices, and time—all while remaining cookieless and GDPR-compliant.

**[Website](https://ghostid.ai)** • **[Demo](https://demo.ghostid.ai)** • **[Documentation](https://docs.ghostid.ai)** • **[Discord](https://discord.gg/ghostid)**

---

## 🎯 What Makes GHOST ID Different

### Persistent Visitor Identity
Every visitor gets a unique **GHOST Visitor ID** that persists across:
- Multiple sessions
- Browser restarts  
- Different pages on your site
- Form submissions and conversions

### Built for Revenue Attribution
GHOST ID is designed for B2B teams who need to:
- Identify which visitors convert
- Track the full buyer journey
- Attribute revenue to specific marketing channels
- See exactly who's on your site right now

### Open Source & Self-Hosted
- **Full data ownership** - all data stays on your infrastructure
- **No vendor lock-in** - fork it, modify it, own it forever
- **ClickHouse-powered** - fast queries on billions of events
- **Modern stack** - Next.js frontend, Fastify backend

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
git clone https://github.com/ghostid-ai/ghost-id.git
cd ghost-id
./setup.sh
```

The setup script will:
1. Generate secure credentials
2. Start ClickHouse, PostgreSQL, and Redis
3. Launch the GHOST ID application
4. Display your login credentials

Access at: `http://localhost:3000`

### Option 2: Manual Installation

See our [self-hosting guide](https://docs.ghostid.ai/self-hosting) for detailed instructions.

---

## ✨ Core Features

### Analytics & Tracking
- **Real-time dashboard** - see who's on your site right now
- **Session replays** - watch visitor recordings
- **Custom events** - track any action with JSON properties
- **Goals & funnels** - measure conversion flows
- **Retention analysis** - cohort-based visitor retention

### Visitor Intelligence
- **Persistent Visitor IDs** - 4-layer identification system (user ID → localStorage → cookie → generated)
- **Visitor profiles** - complete history of every visitor
- **Device fingerprinting** - track across sessions
- **Location tracking** - country, region, city with map visualizations
- **UTM parameter tracking** - full attribution

### Privacy & Compliance
- **Cookieless tracking** - no third-party cookies
- **GDPR compliant** - respects Do Not Track
- **First-party data only** - no data leaves your infrastructure
- **Open source** - audit the code yourself

### Technical Features
- **ClickHouse backend** - handles billions of events
- **PostgreSQL** - user/project metadata
- **Redis caching** - fast dashboard loading
- **REST API** - integrate with your tools
- **Webhook support** - real-time event streaming

---

## 📊 How It Works

### 1. Install the Tracking Script

Add to your website's `<head>`:

```html
<script defer src="https://analytics.ghostid.ai/script.js" data-site-id="YOUR_SITE_ID"></script>
```

### 2. Visitor ID Assignment

GHOST ID uses a 4-layer system to identify visitors:

```
Layer 1: User identified (form fill, login) → use provided user_id
Layer 2: Check localStorage for ghost_vid → persistent across tabs
Layer 3: Check first-party cookie → survives browser restart (400 days)
Layer 4: Generate new UUID v4 → store in both localStorage + cookie
```

### 3. Event Collection

Every pageview, click, and custom event includes:
- `visitor_id` - persistent GHOST Visitor ID
- `user_id` - identified user (if provided)
- `session_id` - current session
- Full device, location, and UTM data

### 4. Real-Time Dashboards

Query billions of events instantly with ClickHouse:
- Who's online right now
- Top pages and referrers
- Conversion funnels
- Visitor profiles and journeys

---

## 🏗️ Architecture

```
┌─────────────────┐
│  Next.js Client │  (Port 3000)
│  Dashboard UI   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Fastify Server  │  (Port 8000)
│  API + Events   │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌─────────┐ ┌──────────┐
│ ClickHouse│ │PostgreSQL│
│  Events   │ │Metadata  │
└───────────┘ └──────────┘
```

**Tech Stack:**
- **Frontend:** Next.js 14, React, TailwindCSS, shadcn/ui
- **Backend:** Fastify, TypeScript
- **Database:** ClickHouse (events), PostgreSQL (users), Redis (cache)
- **Deployment:** Docker Compose, Caddy (reverse proxy)

---

## 📖 Documentation

- **[Installation Guide](https://docs.ghostid.ai/installation)** - get up and running
- **[Tracking API](https://docs.ghostid.ai/tracking)** - custom events and properties
- **[Visitor ID System](https://docs.ghostid.ai/visitor-id)** - how persistent IDs work
- **[Self-Hosting](https://docs.ghostid.ai/self-hosting)** - deploy on your own VPS
- **[API Reference](https://docs.ghostid.ai/api)** - REST API endpoints

---

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- pnpm (recommended) or npm

### Local Development

```bash
# Clone the repo
git clone https://github.com/ghostid-ai/ghost-id.git
cd ghost-id

# Start infrastructure (ClickHouse, PostgreSQL, Redis)
docker-compose up -d clickhouse postgres redis

# Install dependencies
cd client && pnpm install
cd ../server && pnpm install

# Run migrations
cd server && pnpm migrate

# Start dev servers
cd client && pnpm dev  # Port 3000
cd server && pnpm dev  # Port 8000
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTE.md](./CONTRIBUTE.md) for guidelines.

**Areas we'd love help with:**
- New integrations (Google Tag Manager, Segment, etc.)
- Dashboard improvements and new visualizations
- Performance optimizations
- Documentation and tutorials
- Bug reports and testing

---

## 📜 License

GHOST ID is licensed under [AGPL-3.0](./LICENSE).

**What this means:**
- ✅ Free to use for personal and commercial projects
- ✅ Free to self-host and modify
- ⚠️ If you distribute modified versions, you must share your changes (open source)
- ⚠️ If you offer GHOST ID as a hosted service, you must open source your modifications

For a commercial license (closed-source SaaS), contact us at hello@ghostid.ai.

---

## 🌟 Support the Project

- ⭐ **Star this repo** on GitHub
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/ghostid-ai/ghost-id/issues)
- 💬 **Join our Discord** for support and discussion
- 🐦 **Follow us** on [Twitter/X](https://x.com/ghostid_ai)

---

## 🔗 Links

- **Website:** https://ghostid.ai
- **Demo:** https://demo.ghostid.ai
- **Documentation:** https://docs.ghostid.ai
- **Discord:** https://discord.gg/ghostid
- **GitHub:** https://github.com/ghostid-ai/ghost-id

---

**Built with 👻 by the GHOST team**
