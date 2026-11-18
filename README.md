# The Northern Escape — Chiang Mai & Chiang Rai

A mobile-first static travel companion for December 4–9, 2026.

## Run locally
Because the project uses classic JavaScript files, you can open `index.html` directly in a browser. For a more realistic local preview, use VS Code Live Server.

## Deploy to Cloudflare Pages
- Connect this GitHub repository.
- Production branch: `main`
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Root directory: `/`

Every push to `main` will trigger a deployment.

## Current build
- Landing cover
- Trip overview dialog
- Day 0 overnight journey
- Day 1 arrival and Chiang Mai city itinerary
- Day navigation scaffold for Days 2–5
- Expandable stop details
- Interactive, session-only checklists

## Notes
- Day 1 is intentionally untimed because arrival and bus delays are uncertain.
- Day 2–5 detailed pages will be added after reviewing this first implementation.
- Hero photography currently loads from Unsplash and Google Fonts load from Google Fonts; the website itself is static.
- No backend, database, authentication or persistent checklist storage.
