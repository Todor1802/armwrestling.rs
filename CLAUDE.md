# CLAUDE.md — armwrestling.rs
# Project Spec · MVP Phase 1
# ─────────────────────────────────────────────────────────────

## Project Overview

**armwrestling.rs** — a discovery platform for arm wrestling in Serbia. The primary goal is to be the "front door" for newcomers: find a club, see upcoming events, learn the basics.

- **Target user**: Newcomers curious about arm wrestling in Serbia
- **Language**: Serbian primary, English structural stubs for future i18n
- **Design direction**: Modern sports platform — clean, professional, bright. Think Hyrox or CrossFit affiliate finder aesthetic. NOT gritty/underground.
- **Domain**: armwrestling.rs (Serbian TLD, dual international reading)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Data layer**: Static JSON files + MDX (no database in Phase 1)
- **Hosting**: Vercel
- **Migration path**: JSON → Supabase tables in Phase 2. Pages stay the same, only data-fetching layer swaps.

## Code Conventions

| Context             | Convention                                      |
|---------------------|-------------------------------------------------|
| TypeScript          | camelCase variables, PascalCase components/types |
| File naming         | kebab-case for routes/files, PascalCase for components |
| Comments            | English only. Only when logic is non-obvious.    |
| CSS                 | Tailwind utility classes. No custom CSS unless unavoidable. |

## Project Structure

```
arm-wrestling/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page — hero + CTAs
│   │   ├── layout.tsx                  # Root layout — nav, footer, metadata
│   │   ├── clubs/
│   │   │   ├── page.tsx                # Club directory — list + city filter
│   │   │   └── [slug]/page.tsx         # Individual club detail page
│   │   ├── events/
│   │   │   ├── page.tsx                # Event calendar — upcoming list
│   │   │   └── [slug]/page.tsx         # Individual event detail page
│   │   └── guides/
│   │       ├── page.tsx                # Guide index
│   │       └── [slug]/page.tsx         # Individual guide (rendered MDX)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ClubCard.tsx
│   │   ├── EventCard.tsx
│   │   ├── CityFilter.tsx
│   │   └── GuideCard.tsx
│   ├── lib/
│   │   ├── clubs.ts                    # Reads + parses clubs.json
│   │   ├── events.ts                   # Reads + parses events.json
│   │   └── guides.ts                   # Reads + parses MDX frontmatter
│   └── types/
│       └── index.ts                    # Club, ArmEvent, Guide types
├── content/
│   ├── clubs.json                      # All club data
│   ├── events.json                     # All event data
│   └── guides/                         # MDX content files
│       ├── sta-ocekivati-na-prvom-treningu.mdx
│       ├── prevencija-povreda.mdx
│       └── osnovne-tehnike.mdx
├── public/
│   └── images/                         # Club logos, event posters, OG images
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Data Models

```typescript
// src/types/index.ts

export type Club = {
  slug: string;
  name: string;
  city: string;
  region: string;               // e.g. "Vojvodina", "Beograd", "Šumadija"
  address: string;
  lat: number;
  lng: number;
  contact: {
    phone?: string;
    instagram?: string;
    facebook?: string;
    email?: string;
  };
  trainingSchedule: string;     // Free text: "Pon/Sre/Pet 18:00–20:00"
  description: string;          // Serbian. 2–3 sentences.
  imageUrl?: string;            // Relative path in /public/images/
};

export type ArmEvent = {
  slug: string;
  name: string;
  date: string;                 // ISO 8601 date string
  city: string;
  venue: string;
  organizer: string;
  categories: string[];         // e.g. ["Amateri", "U23", "Open"]
  registrationUrl?: string;     // External link if exists
  description: string;
  imageUrl?: string;
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;          // ISO 8601 date
  tags: string[];               // e.g. ["početnici", "tehnika", "prevencija"]
};
```

## Seed Data

Create realistic seed data for development. Use real Serbian cities and plausible club names.

### clubs.json — seed with 5–6 clubs

Example entry:
```json
{
  "slug": "arm-klub-beograd",
  "name": "Arm Klub Beograd",
  "city": "Beograd",
  "region": "Beograd",
  "address": "Bulevar kralja Aleksandra 123",
  "lat": 44.8176,
  "lng": 20.4633,
  "contact": {
    "instagram": "@armklubbgd",
    "phone": "+381 64 123 4567"
  },
  "trainingSchedule": "Pon/Sre/Pet 18:00–20:00",
  "description": "Najstariji klub za obaranje ruku u Beogradu. Treninzi za početnike i takmičare.",
  "imageUrl": "/images/clubs/arm-klub-beograd.jpg"
}
```

Include clubs in: Beograd, Novi Sad, Niš, Kragujevac, Pančevo, Subotica.

### events.json — seed with 3–4 events

Use future dates relative to current date. Mix tournament types (open, amateur, U23).

### Guides — 3 MDX files with frontmatter

Frontmatter format:
```yaml
---
title: "Šta očekivati na prvom treningu"
summary: "Vodič za početnike — šta poneti, kako se pripremiti, i šta ćete raditi na prvom treningu obaranja ruku."
publishedAt: "2026-03-01"
tags: ["početnici", "trening"]
---
```

Body content: Write 300–500 words in Serbian. Practical, direct, encouraging tone. No fluff.

**Guide topics (in build order):**
1. `sta-ocekivati-na-prvom-treningu.mdx` — What to expect at your first training
2. `prevencija-povreda.mdx` — Injury prevention (the #1 concern newcomers have)
3. `osnovne-tehnike.mdx` — Basic techniques: hook, toproll, press

## Page Specifications

### Landing Page (`/`)

**Purpose**: Route newcomers to the right next step in under 5 seconds.

Layout:
- Hero section: Bold headline in Serbian. Subtext: one sentence explaining the platform. Two CTA buttons: "Pronađi klub" → /clubs, "Predstojeći turniri" → /events.
- Quick stats section (optional): Number of clubs, cities covered, upcoming events. Only if it looks credible (don't show "2 clubs").
- Featured clubs section: 3 club cards, horizontal scroll or grid.
- Latest guides section: 3 guide cards.
- Footer: Basic links, social, copyright.

**Design notes**: Clean white/light gray background. Accent color: pick a strong, sporty color (deep blue, red, or orange — decide and stay consistent). Large typography for headers. No stock photos — use solid color blocks or subtle geometric patterns until real photos are available.

### Clubs Directory (`/clubs`)

- City filter dropdown at top (populated from club data)
- Club cards in a responsive grid
- Each card: club name, city, training schedule, short description snippet
- Card links to `/clubs/[slug]`

### Club Detail (`/clubs/[slug]`)

- Full club info: name, city, address, training schedule, description
- Contact section: phone, social links (icons)
- Static map embed showing club location (use a simple Google Maps or OpenStreetMap iframe with lat/lng — NOT an interactive JS map library)
- Back link to /clubs

### Events (`/events`)

- Chronological list, upcoming events first
- Past events shown in a collapsed/faded section (or hidden)
- Each card: event name, date, city, categories
- Card links to `/events/[slug]`

### Event Detail (`/events/[slug]`)

- Full event info: name, date, venue, city, organizer, categories, description
- Registration link (external) if available
- Back link to /events

### Guides Index (`/guides`)

- Grid of guide cards
- Each card: title, summary, tags, published date
- Links to `/guides/[slug]`

### Guide Detail (`/guides/[slug]`)

- Rendered MDX content
- Sidebar or top section: published date, tags
- Back link to /guides

## SEO Requirements

Every page must have:
- Unique `<title>` tag (Serbian, descriptive)
- `<meta name="description">` (Serbian, 150–160 chars)
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`
- Use Next.js `generateMetadata` for dynamic pages
- All club and event pages use `generateStaticParams` for static generation

Example title patterns:
- Club: `"Arm Klub Beograd — Obaranje ruku u Beogradu | armwrestling.rs"`
- Event: `"Otvoreno prvenstvo Srbije 2026 | armwrestling.rs"`
- Guide: `"Šta očekivati na prvom treningu | armwrestling.rs"`

## i18n Structure (prepare, don't build)

Do NOT implement i18n routing yet. But:
- All user-facing strings should be in Serbian directly in components (not in a translation file)
- Structure the app so adding `/en/` prefix routes later is straightforward (Next.js middleware approach)
- English stubs: Create an `en/` folder inside `content/guides/` with placeholder files (title + "Coming soon" body)

## Architecture Rules

- All pages statically generated at build time (`generateStaticParams`)
- No client-side data fetching in Phase 1 — everything is static
- No database, no API routes, no auth in Phase 1
- Lib functions (`clubs.ts`, `events.ts`, `guides.ts`) read from JSON/MDX at build time using `fs` + `path`
- Keep components small and composable
- No external dependencies beyond: next, react, tailwindcss, @next/mdx (or next-mdx-remote), and their peer deps
- Do not add any UI component library (no shadcn, no MUI, no Chakra) — build with Tailwind utility classes

## Build Order (task sequence)

Follow this order. Each step should result in a working, viewable state.

1. **Project scaffold**: `npx create-next-app@latest` with App Router, TypeScript, Tailwind. Set up folder structure per spec.
2. **Types + seed data**: Create `types/index.ts`, `clubs.json`, `events.json`, 3 MDX guide stubs with frontmatter.
3. **Lib functions**: `clubs.ts`, `events.ts`, `guides.ts` — read/parse/sort data.
4. **Root layout + Navbar + Footer**: Responsive nav with links to /clubs, /events, /guides. Clean footer.
5. **Landing page**: Hero section + CTAs + featured clubs + latest guides.
6. **Clubs directory + detail pages**: CityFilter component, ClubCard, club grid, individual club pages with static map embed.
7. **Events list + detail pages**: EventCard, chronological list, individual event pages.
8. **Guides index + detail pages**: MDX rendering setup, GuideCard, guide list, rendered guide pages.
9. **SEO**: `generateMetadata` on all dynamic pages, OG tags, proper title patterns.
10. **Polish**: Responsive checks, consistent spacing, hover states, empty states.

## What NOT to Build in Phase 1

- User accounts / auth
- Admin panel / CMS
- Event registration / payment
- Rankings or athlete profiles
- Interactive map with JS library (use simple iframe embed)
- Newsletter signup
- Comments or social features
- Analytics dashboard (just add Vercel Analytics script)
- i18n routing
- Search functionality

## Design Tokens (Tailwind config)

Establish a consistent palette in `tailwind.config.ts`:

```typescript
// Suggested — adjust as needed
colors: {
  brand: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',   // Primary accent
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a5f',   // Dark backgrounds
  },
  surface: {
    DEFAULT: '#ffffff',
    muted: '#f8fafc',
    border: '#e2e8f0',
  }
}
```

Font: Use system font stack (`font-sans` default in Tailwind). No custom web fonts in Phase 1.

---

## Workflow Note

This project will be built using **Claude Code** inside **Cursor IDE**. Follow the build order above sequentially. After each step, verify the dev server runs without errors before proceeding to the next step.