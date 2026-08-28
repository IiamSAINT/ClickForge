# ClickForge Website

Full-stack build: React frontend served by a small Express backend that handles
audit/contact requests and footer newsletter subscriptions.

## Run it locally

```bash
npm install
cp .env.example .env    # then edit ADMIN_KEY
npm start                # → http://localhost:3000
```

`npm run dev` restarts automatically on file changes (Node 18+).

## Backend flows

- `POST /api/audit-request` validates and stores an audit/contact request with
  a `new` status. It accepts the form fields `companyName`, `website`, `goal`,
  `name`, and `email`.
- `POST /api/newsletter` stores a normalized email address once. An existing
  opt-out is restored only when that person explicitly subscribes again.
- `POST /api/newsletter/unsubscribe` marks an address unsubscribed without
  revealing whether that address exists.
- All public form endpoints have a 20 KB body limit, 8 requests per 15 minutes
  per IP, validation, and honeypot handling.

This uses JSON files in `data/`, which is appropriate for a single low-volume
server. Deploying multiple instances or serverless functions requires a shared
database (Postgres/Supabase is a sensible next step).

## Managing requests

Set a long random `ADMIN_KEY` in `.env`. These internal routes require it in
the `x-admin-key` header:

```bash
# Read audit/contact requests and subscribers
curl -H "x-admin-key: YOUR_ADMIN_KEY" http://localhost:3000/api/leads
curl -H "x-admin-key: YOUR_ADMIN_KEY" http://localhost:3000/api/subscribers

# Move a lead through the workflow: new → contacted → qualified → won/lost
curl -X PATCH http://localhost:3000/api/leads/LEAD_ID \
  -H "x-admin-key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  --data '{"status":"contacted"}'
```

The permitted lead statuses are `new`, `contacted`, `qualified`, `won`,
`lost`, and `archived`. Keep these routes private at the host/network layer as
well; the API key is not a replacement for an admin application with user
accounts.

## Notifications

The request is always saved first. To get a team email for each new audit
request, set `RESEND_API_KEY`, `NOTIFICATION_FROM`, and `NOTIFICATION_TO` in
`.env` (see `.env.example`). This uses Resend's REST API directly, so no
additional package is needed. A notification failure is logged and never loses
the request.

## What's real vs. what's a placeholder

**Real and working:**
- Every layout, animation, and interaction on the page (scroll reveals, count-up
  stats, the multi-step audit form, click-spark on primary buttons, the process
  timeline draw-on).
- The logo — extracted and background-removed from your uploaded file, colors
  sampled directly from its pixels (`#1149DE` blue, `#081526` navy, `#FB6100`
  ember accent).
- The backend API: validation, rate limiting (8 requests / 15 min / IP),
  honeypot spam protection, and JSON-file storage for both forms.

**Placeholders you'll want to swap before launch:**
- The 8 logos in the social-proof marquee are stylized text, not real client
  logos — swap `.marquee__track span` content for actual logo images once you
  have client permission to display them.
- The stat figures (`+187%`, `3.2×`, `48HR`, `40+`) are illustrative — replace
  with your real numbers before this goes live; false performance claims are a
  legal and trust risk.
- The hero's animated dashboard is an abstract mockup (no real product footage
  exists yet) — swap for a screen recording or Lottie file when you have one.
- `hello@clickforge.agency` and the Privacy/Terms footer links are placeholders.

## Deploying

This is a standard Node/Express app — it deploys as-is to **Render**,
**Railway**, **Fly.io**, or any VPS: push the repo, set `ADMIN_KEY` in the
platform's environment variables, and run `npm start`.

**A note on Vercel/Netlify:** their serverless functions run on ephemeral
filesystems, so the JSON-file storage here won't persist between requests.
If you deploy there, swap the JSON repository functions in `server.js` for a real database
(Postgres via Neon/Supabase, or a hosted key-value store) — the validation
and rate-limiting logic around it doesn't need to change.

## Extending the frontend

Everything lives in one file (`public/index.html`) with CSS custom properties
at the top of the `<style>` block — colors, fonts, and radii are all defined
once in `:root` and referenced everywhere else, so a rebrand touches one
place. If the project grows past a single page, the natural next step is
splitting into `styles.css` / `script.js` and introducing a build step —
not necessary at this size.
