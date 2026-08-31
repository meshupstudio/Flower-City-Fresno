# Flower City Chinese Restaurant — Website

A static, no-build website for **Flower City Chinese Restaurant** (Fresno, CA),
rebuilt from the previous site export and ready to deploy on Netlify.

## Status

This is a rebuild sourced from a real export of the live site (previously
hosted on Duda, whose platform-specific build can't run outside its own
infrastructure). Branding, colors, fonts, real photos/video, the full menu,
hours, address, and contact links were pulled from that export and rebuilt
as plain HTML/CSS/JS.

- **Logo, hero video/photo, Yelp badge, full menu PDF** — the real files
  from the export.
- **Colors** — the site's actual brand palette: red `#DC043C`, green
  `#18825A`, cream/gold/pink backgrounds.
- **Fonts** — Oswald (headings), Poppins (body), Playball (script accents),
  matching the font stack used by the original site, loaded from Google
  Fonts.
- **Copy, menu items/prices, hours, address, phone, social links** — carried
  over as-is from the export.

## Project structure

```
index.html            One-page site: hero, menu, party tray, about, contact, hours/map
404.html                Custom not-found page
css/styles.css           All styling (CSS variables at the top hold the brand palette/fonts)
js/main.js               Mobile nav, scroll animations, contact form status
images/                   logo.png, hero-poster.jpg (video fallback), yelp-badge.png, favicon.svg
video/hero.mp4            Hero background video (wok-cooking clip from the original site)
files/flower-city-menu-2025.pdf   Full downloadable menu PDF
netlify.toml              Netlify build & header config
```

No build step is required — Netlify deploys it as-is (`publish = "."`,
empty build command, already set in `netlify.toml`).

## Keeping content up to date

- **Menu prices/items** — edit the `<ul class="menu-list">` /
  `menu-list-detailed` blocks in the `#menu` section of `index.html`, and
  replace `files/flower-city-menu-2025.pdf` when a new PDF menu is issued
  (keep the filename or update the link in the "Menu" section accordingly).
- **Hours** — `.hours-list` in the `#find-us` section.
- **Address/phone** — appears in the header, contact section, and find-us
  section; also update the Google Maps embed `src` and the "Get Directions"
  link if the address ever changes.
- **Online ordering link** — currently points to
  `https://www.flowercityfresno.net/dz3ryxih/flower-city-fresno-93704/order-online`
  (the restaurant's existing third-party ordering system). Update every
  `Order Now` / `Order Online` link in `index.html` if that changes.
- **Photos** — only the hero wok video/photo and Yelp badge were included
  as real assets (the export's `images/` folder mostly contained unrelated
  stock/template assets bundled by the site builder, not real photos of
  this restaurant). Add more real food/interior photos to `images/` and
  reference them in the About or Gallery areas as they become available.

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
Once deployed on Netlify, submissions appear automatically under
**Site → Forms** in the Netlify dashboard — no extra backend needed. It
won't submit in local preview (Netlify Forms only activates on a Netlify
deploy); `js/main.js` shows a friendly message instead of a broken
submission when previewed locally.

### A note on file size

`files/flower-city-menu-2025.pdf` is ~17MB (the original PDF as provided).
Netlify has no problem hosting it, but if load time for that link matters,
consider re-exporting/compressing the PDF before your next update.
