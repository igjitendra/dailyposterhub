# 🎨 Daily PosterHub

हिंदी पोस्टर टेम्पलेट्स + एडिटेबल पोस्टर जनरेटर। यूज़र अपना नाम, फोटो, logo, mobile और संदेश जोड़कर पोस्टर डाउनलोड कर सकते हैं।

Built with **Astro** + deploy on **Cloudflare Pages** (templates → R2).

---

## 🚀 Setup

```bash
# 1. dependencies install karein
npm install

# 2. dev server chalayein
npm run dev
# http://localhost:4321

# 3. production build
npm run build

# 4. build ko locally preview karein
npm run preview
```

> Node 18+ chahiye.

---

## 📁 Folder structure

```
daily-posterhub/
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ img/            ← yahan apni images daalein (neeche list dekhein)
└─ src/
   ├─ data/
   │  └─ site.js       ← saara text/config (nav, categories, pricing...)
   ├─ styles/
   │  └─ global.css    ← theme, buttons, cards
   ├─ layouts/
   │  └─ Layout.astro  ← <head>, SEO, fonts, Header+Footer
   ├─ components/
   │  ├─ Header.astro  ← promo banner + nav + mobile menu
   │  └─ Footer.astro  ← 4-column footer
   └─ pages/
      ├─ index.astro        ← HOMEPAGE (demo design)
      ├─ posters/index.astro ← sabhi poster listing
      ├─ pricing.astro       ← Free vs Pro
      ├─ login.astro         ← login / signup
      └─ 404.astro
```

---

## 🖼️ Images (public/img/ me daalein — WebP recommended)

Homepage in images ko dhoondta hai. Same naam se `public/img/` me daal dein:

**Hero preview cards**
- `preview-morning.webp`, `preview-birthday.webp`, `preview-god.webp`

**Avatars (social proof)**
- `avatar-1.webp`, `avatar-2.webp`, `avatar-3.webp`

**Templates (6)**
- `t-morning-1.webp`, `t-birthday-1.webp`, `t-hanuman-1.webp`
- `t-wedding-1.webp`, `t-shiv-1.webp`, `t-offer-1.webp`

**SEO / share**
- `og-image.webp` (1200x630)

> Naye poster add karne ke liye `src/data/site.js` me `templates` / `categories` array edit karein.

---

## 🎨 Theme

| Token | Value |
|-------|-------|
| Purple | `#7C3AED` |
| Blue | `#4F46E5` |
| Gradient | `135deg, #7C3AED → #4F46E5` |
| Gold (Pro) | `#F5B301` |
| BG | `#F6F5FB` |
| Font | Noto Sans Devanagari + Poppins |

---

## 💰 Pricing

- **Free** — ₹0 (watermark + branding strip, local save)
- **Pro** — ₹21/month ya ₹99/year (no watermark, cloud login + sync, HD)

---

## 💳 UPI Payment

Pricing page par UPI box hai:
- **UPI ID:** canvapro@upi
- **UPI Number:** 6387617678

(edit karne ke liye `src/data/site.js` ka `payment` object)

---

## 🎨 Icons

Koi emoji use nahi hua — sabhi icons `src/components/Icon.astro` me inline SVG hain.
Use karne ka tareeka: `<Icon name='crown' size={20} />`

---

## ✅ Next steps (abhi tak sirf UI hai)

- [ ] `/editor/[slug]` — canvas editor (photo slide + resize, name/mobile auto-fill)
- [ ] `/admin-upload` — admin poster upload panel (auto WebP convert)
- [ ] Cloudflare R2 se templates load
- [ ] Cloudflare Functions — auth + cloud save (Pro)
- [ ] Free tier watermark + branding strip (canvas overlay)
