# AndRho

AndRho is a business data unification and analytics product designed to help teams understand performance and make better operational decisions—without needing to build and maintain a large internal data department.

## The Problem

Many companies end up using multiple disconnected tools (e.g., ERP/CRM, marketing platforms, analytics, communication tools). This creates several recurring issues:

- **Fragmented data:** Key information lives in separate systems, making it hard to get a single, reliable view of what’s happening.
- **High software overhead:** Organizations often pay for many overlapping services just to cover core needs.
- **Costly complexity:** Integrations, configuration, and ongoing maintenance typically require specialized roles (data engineering/analytics), which can be out of reach for smaller teams.
- **Slow decision-making:** When reporting isn’t unified and trustworthy, teams spend more time reconciling numbers than acting on insights.

## Product Overview

AndRho acts as a **connector + analysis layer** across the tools a business already uses. It focuses on turning operational data into clear insights that administrative users can actually use.

## Key Product Features

### 1) Data connection & unification
- Connects to existing business systems (such as ERP/CRM, marketing tools, and analytics sources).
- Standardizes and consolidates data so teams can analyze performance across functions (operations, marketing, and analytics) from one place.

### 2) Cross-source insights (not just dashboards)
- Produces actionable insights by analyzing unified data instead of showing isolated metrics from individual tools.
- Helps correlate activity across areas (e.g., acquisition behavior → operational outcomes → business performance).

### 3) Decision support for administrative teams
- Designed for administrative stakeholders who need clarity and guidance, not raw datasets.
- Translates analytical outputs into understandable explanations to reduce dependency on specialist interpretation.

### 4) Operational visibility & performance tracking
- Provides a clearer view of business performance across key areas.
- Supports identifying bottlenecks, opportunities, and factors influencing outcomes.

## What AndRho Is Not

- **Not an ERP or CRM replacement.**  
  AndRho complements existing systems by connecting to them and extracting value from their data.

## Development

### Mini-game color-scheme experiment

The asteroid mini-game (`src/components/ui/AsteroidGame.jsx`, shown in the
"Ayúdanos a elegir los colores" section) reports its data as custom events
through the AndRho web-tracker's existing pipeline — there's no separate
database for it. Every play session, per-theme performance segment, and
discount registration is sent via `window.atrk()` (exposed globally by the
`tracker.js` script already loaded in `index.html`) and lands as a row in
the tracker's `events` table, scoped to `site_id = 'andrho'`:

| `events.type`         | One row per...                          |
| ---------------------- | ---------------------------------------- |
| `game_session`         | play session (destroyed/missed totals)   |
| `game_theme_segment`   | (session × theme) rotation slice         |
| `game_registration`    | discount claim (email, commerce type/size) |

See `src/lib/gameStorage.js` for exactly what's sent, and `analysis/anova.py`
for the ANOVA that reads it back (destroy-rate ~ theme, and destroy-rate ~
theme × commerce_type).

#### Conectar la base de datos desde Railway

The tracker (`WebTracker`) and its dashboard (`andrho-tracker-dashboard`)
both run as separate services in the same Railway project, sharing one
Postgres plugin. To read the game data yourself (e.g. to run
`analysis/anova.py`, or just poke around with `psql`):

1. Open the Railway project both `WebTracker` and `andrho-tracker-dashboard`
   are deployed in.
2. Click the **Postgres** plugin/service.
3. Go to its **Connect** tab and copy the **`DATABASE_URL`** connection
   string (or `DATABASE_PUBLIC_URL` if you're connecting from outside
   Railway's private network, e.g. from your laptop).
4. Use it wherever a Postgres connection string is expected:
   - `analysis/anova.py`: `export DATABASE_URL=<the string>` (see
     `analysis/.env.example`), then `python analysis/anova.py`.
   - A GUI client (TablePlus, pgAdmin, etc.) or `psql "<the string>"` — the
     relevant tables are `events` (all custom events, including the game's)
     and `sites` (`id = 'andrho'`).

You don't need this just to *see* the results day-to-day — the
`andrho-tracker-dashboard` app has a "Minijuego" tab that reads the same
`events` rows and renders them without needing a direct DB connection.

## Status

This project is actively being developed.

## License

GNU AGPLv3.. All rights reserved.
