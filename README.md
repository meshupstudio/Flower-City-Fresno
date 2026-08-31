# Flower City Fresno — Website

A static, no-build website for Flower City Fresno (local florist), ready to
deploy on Netlify.

## Status

This is a **fresh rebuild**, not a byte-for-byte copy of the live
flowercityfresno.com site — this environment's network policy blocks direct
access to that domain, so it couldn't be scraped/cloned automatically. The
layout, copy, colors, and images below are placeholders in the same spirit
(local florist, warm/floral branding) so the structure is ready to receive
the real content.

**To finish the migration**, export the real assets from the live site and
drop them in as described below.

## Project structure

```
index.html          Home page (all sections: hero, about, services, gallery, testimonials, contact)
404.html             Custom not-found page
css/styles.css        All styling (CSS variables at the top control the color palette/fonts)
js/main.js            Mobile nav, scroll animations, contact form status
images/                Logo, favicon, and placeholder illustrations
netlify.toml           Netlify build & header config
```

No build step is required — it's plain HTML/CSS/JS, so Netlify can deploy it
as-is (`publish = "."`, empty build command, already set in `netlify.toml`).

## Swapping in the real content

1. **Logo** — replace `images/logo.svg` with the real logo. If it's a
   raster file (PNG/JPG), save it as e.g. `images/logo.png` and update the
   two `<img src="images/logo.svg">` references in `index.html` and the one
   in `404.html`.
2. **Photos / gallery** — replace `images/gallery-1.svg` … `gallery-6.svg`
   with real photos. Easiest: save your photos with the same names but the
   real extension (e.g. `gallery-1.jpg`) and update the `src` attributes in
   the `#gallery` section and hero/about sections of `index.html`.
3. **Background / hero image** — the hero currently uses a CSS gradient
   plus `images/hero-pattern.svg`. To use a real photo background, add it
   to `images/` and set it as a `background-image` on `.hero` in
   `css/styles.css`.
4. **Text content** — all copy (about text, services, testimonials, hours,
   address, phone, email) is in `index.html` and clearly readable; update
   it directly. Placeholder contact info (`(559) 000-0000`,
   `123 Blossom Ave`, `hello@flowercityfresno.com`) should be replaced with
   the real details.
5. **Colors/fonts** — edit the CSS custom properties at the top of
   `css/styles.css` (`:root { --rose: ...; --deep-green: ...; }` etc.) to
   match the real brand palette once you have it (e.g. sampled from the
   real logo).

## Local preview

No build tools needed. Any static file server works, for example:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open the printed URL in your browser.

## Deploying to Netlify

**Option A — Connect the Git repo (recommended, auto-deploys on push):**

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In Netlify: **Add new site → Import an existing project** → pick this repo.
3. Build settings: leave **Build command** empty and set **Publish directory**
   to `.` (both are already configured via `netlify.toml`, so Netlify should
   auto-detect them).
4. Deploy. Netlify will redeploy automatically on every push to the
   connected branch.

**Option B — Drag and drop (quick one-off deploy):**

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole project folder onto the page.
3. Netlify gives you a live URL immediately.

### Custom domain

Once deployed, add `flowercityfresno.com` under **Site settings → Domain
management → Add a domain**, then update the domain's DNS (at your
registrar) to point to Netlify per the instructions Netlify shows you.

### Contact form

The contact form in `index.html` uses
[Netlify Forms](https://docs.netlify.com/forms/setup/) (`data-netlify="true"`).
Once deployed on Netlify, submissions will appear automatically under
**Site → Forms** in the Netlify dashboard — no extra backend needed. It
won't work in local preview (Netlify Forms only activates on a Netlify
deploy); `js/main.js` shows a friendly message instead of a broken
submission when previewed locally.
