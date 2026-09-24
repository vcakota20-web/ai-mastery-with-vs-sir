# Practical Guide to AI for Educators — Sales Website

A standalone, static sales website for the book, built to sit inside your existing
`ai-mastery-with-vs-sir` GitHub Pages repo **without touching your existing pages**
(Automation Mastery, Electrostatics, your homepage — none of that is modified).

## 1. Before you deploy — fill in 3 things in `config.js`

Open `config.js` and edit these three values (everything else is optional):

| Value | What to do |
|---|---|
| `BOOK_PAYMENT_URL` | Go to Razorpay Dashboard → Payment Links → **Create a new link for this book** (do not reuse your Automation Mastery link). Paste the URL in. |
| `WHATSAPP_NUMBER` | Your prompt said `919602405311`, but your live site currently shows `919602404311`. Confirm the correct number and fix if needed. |
| `PRICE_INR` / `PRICE_USD` | Currently set to ₹349 / $7.99 (launch price) and ₹599 / $12.99 (was-price, shown struck through). Change if you want different numbers. |

Every price and every "Buy Now" / WhatsApp button on every page reads from this one file —
edit it once, the whole site updates.

## 2. In your Razorpay Payment Link settings

Set the **Redirect / Success URL** to:
```
https://vcakota20-web.github.io/ai-mastery-with-vs-sir/ai-educators-book/success.html
```
(adjust the path if you upload this folder somewhere other than `ai-educators-book/`).

## 3. Deploy to your existing GitHub repo

You already have `vcakota20-web/ai-mastery-with-vs-sir` live on GitHub Pages. To add this
book as a new, independent page:

**Option A — GitHub web UI (no git needed):**
1. Go to your repo on github.com → **Add file → Upload files**.
2. Create/drag this entire `ai-educators-book` folder in (GitHub preserves the folder
   structure when you drag a folder in via the browser).
3. Commit directly to `main`.
4. Your book site goes live within ~1 minute at:
   `https://vcakota20-web.github.io/ai-mastery-with-vs-sir/ai-educators-book/`

**Option B — git command line:**
```bash
cd ai-mastery-with-vs-sir          # your existing repo, cloned locally
cp -r /path/to/ai-educators-book .  # copy this whole folder in
git add ai-educators-book
git commit -m "Add Practical Guide to AI for Educators sales page"
git push
```

## 4. Link it from your homepage (optional, recommended)

Your homepage currently features "Automation Mastery" as its featured product. Add a
second product card pointing here, e.g.:
```html
<a href="ai-educators-book/">Practical Guide to AI for Educators →</a>
```

## 5. Connecting your custom domain (vcakota.com) later

If/when `vcakota.com` is connected to this GitHub Pages repo (via a `CNAME` file and your
domain's DNS settings), this book's page will automatically be reachable at
`https://vcakota.com/ai-educators-book/` — no changes needed in these files. Just update
`SITE_URL` / `HOME_SITE_URL` in `config.js` and the canonical/OG URLs in each page's
`<head>` (search-and-replace the github.io URL) once the domain is confirmed live.

## 6. About digital delivery (please read)

This is a **static site with no backend**, exactly as your existing site is. That means:
- `success.html` links directly to the PDF in `/assets/`. Anyone with that direct link
  could technically download it without paying — this is a real limitation of static
  hosting, not a bug. For a ₹349 / $7.99 price point this is a common, acceptable
  trade-off used by many small creators.
- If you later want real access-gated delivery (e.g., unique download links, or email
  delivery only after verified payment), that requires a backend — either a Razorpay
  webhook + serverless function (e.g., a free Cloudflare Worker), or moving checkout to a
  platform like Gumroad/Payhip that handles secure delivery natively. Happy to build
  either path if you want to go that route later.
- The `success.html` page also tells buyers "we'll email/WhatsApp your copy within a few
  hours" as an honest manual fallback — actually do this for each sale until/unless you
  add automated delivery.

## File structure

```
ai-educators-book/
├── index.html          Main sales page (all sections)
├── success.html         Post-payment thank-you + download
├── privacy.html          Privacy Policy
├── terms.html            Terms & Conditions
├── refund.html           Refund Policy
├── disclaimer.html       Digital Product Disclaimer
├── config.js             ⭐ Edit price/payment link/contact here
├── style.css             Shared styles
└── assets/
    ├── Practical-Guide-to-AI-for-Educators.pdf   (the actual book)
    ├── cover.jpg, cover-mockup.png, author.png
    ├── og-image.jpg                               (social share preview)
    └── page-preview-1/2/3.jpg                     ("Look Inside" gallery)
```
