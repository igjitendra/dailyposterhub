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

---

## 🔐 Admin Panel — पोस्टर कैसे अपलोड करें

पोस्टर अपलोड करने के लिए एक admin panel है: **`/admin-upload`**
(यह public menu में नहीं है — सिर्फ़ आप URL से खोलें)

### एक बार का Setup (Cloudflare)

1. **R2 bucket बनाएं** — Cloudflare Dashboard → R2 → *Create bucket* → नाम: `posterhub-templates`
2. **Pages project में R2 binding जोड़ें** — आपका Pages project → *Settings → Functions → R2 bucket bindings* → Add:
   - Variable name: `POSTERS`
   - Bucket: `posterhub-templates`
3. **Admin key सेट करें** — *Settings → Environment variables* → Add (Production + Preview):
   - Name: `ADMIN_KEY`
   - Value: कोई मज़बूत password (यही admin panel में डालेंगे)
4. **Deploy करें** (git push या `npx wrangler pages deploy dist`)

### अपलोड कैसे करें

1. ब्राउज़र में खोलें: `https://posterhub.pages.dev/admin-upload`
2. अपना **ADMIN_KEY** डालकर लॉगिन करें
3. फ़ॉर्म भरें — शीर्षक, श्रेणी, फ्री/Pro, टैग, एडिटेबल फील्ड्स, फोटो स्लॉट, और पोस्टर इमेज (WebP सबसे अच्छा)
4. **अपलोड करें** → इमेज R2 में सेव होगी, नीचे list में तुरंत दिखेगी
5. हटाना हो तो list में **हटाएं** बटन

### यह कैसे काम करता है

- इमेज R2 bucket में `posters/{id}.webp` पर सेव होती है
- मेटाडेटा `data/templates.json` (उसी bucket में) में जुड़ता है
- इमेज serve होती है: `/cdn/posters/{id}.webp`
- पूरी list API: `GET /api/templates`

### Local testing (optional)

```bash
npm run build
cp .dev.vars.example .dev.vars   # phir ADMIN_KEY set karo
npx wrangler pages dev dist --r2 POSTERS=posterhub-templates
```

### Site पर दिखाना (अगला step)

अभी `/posters` page demo templates दिखाता है। इसे `GET /api/templates` से लोड कराया जा सकता है — बताएं तो जोड़ दूं।

### Backend files

- `functions/api/templates.js` — list (public)
- `functions/api/admin/upload.js` — upload (auth)
- `functions/api/admin/delete.js` — delete (auth)
- `functions/api/admin/ping.js` — key verify
- `functions/cdn/[[path]].js` — R2 images serve
- `functions/_lib.js` — shared helpers
- `wrangler.toml` — R2 binding config
