# Reusable prompt: Duda → static site → Netlify

A copy-paste prompt for kicking off future Duda-to-Netlify migrations with
Claude. Fill in the bracketed fields, attach the Duda export zip(s), and
send it at the start of a fresh session/repo.

This is based on the process used for the flowercityfresno.com migration in
this repo: a Duda-exported site (Chinese restaurant, not the florist it was
first assumed to be) rebuilt as a plain static HTML/CSS/JS site with the
real logo, hero video, brand colors, menu, hours, and contact links pulled
straight out of the export, then wired up for Netlify.

---

```
I'm migrating a website from Duda to a static site hosted on Netlify. This is
[BUSINESS NAME], a [BUSINESS TYPE] in [CITY, STATE]. The current site is at
[URL]. I'm attaching a Duda site export as zip files (typically: Pages.zip,
Style.zip, Scripts.zip, files.zip, images.zip — pass along whatever you have).

Do NOT try to run or adapt Duda's exported JS/CSS directly — it's built for
Duda's own proprietary runtime (webpack chunks like runtime-flex-*, dm-*
assets, jQuery-migrate shims) and won't work standalone. Instead:

1. EXTRACT & AUDIT the zips. Read the exported HTML (Pages/*/desktop/home/
   index.html is usually richest) to pull out the REAL content:
   - Business name, tagline, meta title/description
   - Every text block: hero copy, about copy, service/menu items and
     prices, hours, address, phone, email
   - Real hrefs: online ordering links, social links (Facebook/Yelp/etc.),
     any third-party booking/ordering platform URLs
   - The actual logo file and any real business photos (note: Duda's
     images/ export folder is usually 80%+ unrelated stock/template assets
     bundled by the platform — cross-check against what's actually
     referenced in the HTML/CSS before assuming an image is real)
   - Brand colors: grep the page-specific style.css for `--color_N` CSS
     custom properties (rgba values) rather than the huge shared
     Style/desktop.css, which is platform-wide, not site-specific
   - Fonts actually used (check @font-face / font-family declarations in
     the page CSS, cross-referenced against Google Fonts)
   - Any downloadable assets (PDF menus, etc.) and video backgrounds

2. FLAG ANYTHING SURPRISING before proceeding — e.g. if the site turns out
   to be a different type of business than assumed, or if key info (phone,
   address, hours) can't be found in the export, stop and ask rather than
   guessing or inventing placeholder content.

3. REBUILD as a plain static site: semantic HTML5, one CSS file (custom
   properties for the real brand palette/fonts, Flexbox/Grid, no
   framework), one small vanilla-JS file (mobile nav, scroll reveal, form
   status) — no build step, no npm dependencies. Use the real logo/photos/
   video pulled from the export; don't fabricate content, testimonials, or
   stock imagery to fill gaps — leave a clear TODO/placeholder instead and
   tell me what's missing.
   - Wire the contact form to Netlify Forms (`data-netlify="true"`)
   - Embed a Google Maps iframe for the real address (no API key needed)
   - Add a `netlify.toml` (`publish = "."`, empty build command, basic
     cache headers)
   - Write a README covering: project structure, how to update
     menu/hours/content, local preview, and both Netlify deploy paths
     (Git-connected vs drag-and-drop)

4. TEST locally before committing: serve with `python3 -m http.server`,
   curl every asset for 200s, validate any SVGs, and use Playwright to
   screenshot desktop (1400px) and mobile (390px) viewports to sanity-check
   layout, nav, and readability.

5. GIT: work on [BRANCH NAME], commit with a clear message, push. If a PR
   is wanted, check whether the repo already has a base branch (`main`)
   with history before assuming one exists — an empty repo needs one
   created first.

6. DEPLOYMENT: you likely won't have Netlify API access or credentials in
   this environment — don't try to work around that. Just tell me the
   exact steps to deploy myself (Netlify dashboard: import the repo, or
   drag-and-drop), and what to double check once it's live (contact form
   submissions, map embed, any third-party ordering links).

Repo: [GITHUB REPO]
Branch: [BRANCH NAME]
```

---

## Why it's shaped this way

- **"Don't run Duda's JS" upfront** saves a wasted attempt — the export's
  scripts/CSS are generated for Duda's own hosting and can't run
  standalone.
- **The image-audit step matters a lot.** Most of Duda's `images/` export
  turned out to be unrelated stock/seasonal-banner assets bundled by the
  platform, not real photos of the business — easy to miss if you assume
  the whole folder is site-specific.
- **"Flag anything surprising" exists** because in this migration the site
  turned out to be a Chinese restaurant, not the florist its name and repo
  suggested. Worth catching early instead of after a full build.
- **The deployment note sets expectations correctly from the start** —
  sandboxed Claude sessions typically can't reach `api.netlify.com` or hold
  Netlify credentials, so the deploy step needs to happen from the Netlify
  dashboard, not from Claude directly.
