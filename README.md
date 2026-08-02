# PetFood — website source

A ready-to-deploy pet food store. Static site, no backend, no build step —
edit one file to change prices/stock, push to GitHub, done.

## 1. Put this on GitHub (one-time setup)

1. Go to github.com → **New repository** → name it (e.g. `pawpantry-website`) → **Public** → Create.
2. Open the repo → **Add file → Upload files** (or **Create new file** to paste content one by one).
3. Recreate this exact folder structure and paste each file's content in:

```
(repo root)
├── index.html
├── shop.html
├── product.html
├── about.html
├── contact.html
├── reviews.html
├── faq.html
├── README.md
├── data/
│   ├── products.json
│   └── reviews.json
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── products.js
│   │   └── reviews.js
│   └── images/
│       ├── branding/   ← put your logo, hero.jpg, about.jpg here
│       └── products/   ← put p001.jpg, p002.jpg etc. here (must match data/products.json)
└── .github/
    └── workflows/
        └── deploy.yml
```

   **Tip:** on GitHub's "Create new file" screen, typing `data/products.json` as the filename
   automatically creates the `data` folder for you — you don't need a separate "create folder" step.

4. Commit each file (the green "Commit changes" button).
5. Go to repo **Settings → Pages** → under "Build and deployment", set **Source: GitHub Actions**.
6. Push/commit anything (or just wait ~1 minute after your last commit) — the workflow in
   `.github/workflows/deploy.yml` builds and publishes automatically.
7. Your live link will appear at the top of **Settings → Pages**, and also under the repo's
   **Actions** tab once the deploy run finishes. It will look like:
   `https://yourusername.github.io/pawpantry-website/`

That link is what you share with customers.

## 2. Day-to-day changes (this is 90% of what you'll ever do)

**Change a price, add a discount, or mark something out of stock:**
Open `data/products.json` on GitHub (click the file → pencil/edit icon), change the
relevant field, commit. Site updates automatically within ~1 minute.

```json
"price": 1600,            // what the customer pays
"originalPrice": 2000,    // the crossed-out price — set 20%+ higher to auto-show a discount stamp
"availability": "in_stock"  // change to "out_of_stock" to hide the buy button and show a red pill
```

**Add a brand-new product:**
Copy one whole `{ ... }` block in `products.json`, paste it as a new item, give it a
unique `"id"` (e.g. `p007`), change the details, and add a matching photo to
`assets/images/products/`.

**Add a real customer photo/review:**
Open `data/reviews.json`, copy the example block, replace the placeholder text with
the real review, and remove `"isPlaceholder": true`. Do this only with reviews you've
actually received — never invent them; it's illegal in most places and it's the
fastest way to lose customer trust.

**Change your WhatsApp number:**
Open `assets/js/main.js`, edit the `WHATSAPP_NUMBER` value at the top (one line). This one
change updates every WhatsApp link on the whole site automatically — product "Order" buttons,
the footer "WhatsApp us" links on every page, the Contact page number, and the "leave a
review" link.

## 3. Previewing changes before you push (optional but recommended)

Because the site loads `products.json` via `fetch()`, double-clicking `index.html`
on your computer won't show products (browsers block that for security). To preview locally:

- **Easiest:** install the free "Live Server" extension in VS Code, right-click `index.html` → "Open with Live Server."
- **Or:** open a terminal in the folder and run `python3 -m http.server`, then visit `http://localhost:8000`.

Once it's on GitHub Pages, this isn't an issue — it always works normally for visitors.

## 4. What to personalize before going live

- [ ] Replace the WhatsApp number in `assets/js/main.js`
- [ ] Replace phone/email/address on `contact.html` and in every page footer
- [ ] Replace placeholder photos in `assets/images/` with your real product photos
- [ ] Replace the placeholder paragraph in `about.html` with your real story
- [ ] Fill in real answers on `faq.html` (delivery time, payment methods, returns)
- [ ] Delete the placeholder entry in `data/reviews.json` once you have real reviews
- [ ] Update `<title>` and `<meta name="description">` tags if you rename the store

## 5. Roadmap for later (not needed to launch)

- Real cart + payment gateway (currently orders go through WhatsApp — fine for launch)
- A simple no-code editor for `products.json` (e.g. Decap CMS) so you don't touch JSON by hand
- Analytics (Plausible or Google Analytics)
- Blog/SEO content

See the full multi-agent AI system design and phased roadmap in the plan document shared earlier in this conversation.
