# ब्लॉग सिस्टम (GitHub + /admin CMS) — Setup

यह add-on आपकी मौजूदा Astro site (GitHub → Cloudflare Pages) में blog जोड़ता है।
हर पोस्ट एक Markdown file के रूप में **GitHub repo में ही** रहती है। `/admin` पर लिखें → GitHub पर commit → Cloudflare auto-rebuild → live।

---

## 1) फ़ाइलें repo में डालें

इस zip की फ़ाइलें अपने repo में ठीक इन्हीं paths पर रखें (पुरानी `src/pages/blog.astro` को replace कर दें):

```
src/content/blog/2026-07-08-welcome.md   (demo post)
src/pages/blog.astro                     (blog list — REPLACE existing)
src/pages/blog/[slug].astro              (single post page — NEW)
public/admin/index.html                  (Decap CMS)
public/admin/config.yml                  (CMS config)
functions/auth.js                        (GitHub OAuth start)
functions/callback.js                    (GitHub OAuth callback)
```

> ब्लॉग की images के लिए repo में `public/img/blog/` फ़ोल्डर बना लें (Decap खुद भी बना लेगा)।

## 2) `config.yml` में 3 चीज़ें बदलें

`public/admin/config.yml` खोलकर:
- `repo:` → आपका `owner/repo` (जैसे `atulpal/daily-posterhub`)
- `branch:` → आपकी main branch (आमतौर पर `main`)
- `base_url:` → आपका live domain (जैसे `https://posterhub.pages.dev`)

## 3) GitHub OAuth App बनाएं (एक बार)

GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
- **Application name:** Daily PosterHub CMS
- **Homepage URL:** `https://posterhub.pages.dev`
- **Authorization callback URL:** `https://posterhub.pages.dev/callback`
- बनाने के बाद **Client ID** लें और **Generate a new client secret** से secret लें।

## 4) Cloudflare में 2 secrets जोड़ें

Cloudflare → आपका Pages project → **Settings → Environment variables** → Production:
- `GITHUB_OAUTH_ID` = ऊपर वाला Client ID
- `GITHUB_OAUTH_SECRET` = ऊपर वाला Client secret

(इन्हें बदलने के बाद एक बार re-deploy ज़रूरी है।)

## 5) commit + push

सब push करें। Cloudflare अपने-आप build करके live कर देगा।

## 6) पोस्ट लिखें

- `https://posterhub.pages.dev/admin` खोलें → **Login with GitHub**
- **New ब्लॉग पोस्ट** → शीर्षक, तारीख़, श्रेणी, कवर, विवरण, कंटेंट भरें
- **Publish** → यह `src/content/blog/` में एक `.md` file के रूप में GitHub पर commit होगा → Cloudflare rebuild → पोस्ट live।

### बिना CMS के भी (optional)
GitHub पर `src/content/blog/` में नई `.md` file बनाएं, ऊपर frontmatter + नीचे content — commit करते ही पोस्ट आ जाएगी।

```md
---
title: "मेरी पोस्ट"
date: 2026-07-10
tag: "टिप्स"
excerpt: "छोटा विवरण"
cover: "/img/blog/meri-photo.webp"
draft: false
---

## हेडिंग
यहाँ आपका कंटेंट...
```

---

## यह कैसे काम करता है
- **Posts** = `src/content/blog/*.md` (GitHub repo में) — `import.meta.glob` से site build में आते हैं।
- **`/blog`** → सभी पोस्ट (draft छोड़कर), नई सबसे ऊपर।
- **`/blog/<slug>`** → सिंगल पोस्ट।
- **`/admin`** → Decap CMS, GitHub OAuth से login, सीधे repo में commit।
- **`draft: true`** रखें तो पोस्ट live नहीं होगी।

> नोट: पोस्टर upload (R2 admin panel) अलग सिस्टम है — वह जैसा है वैसा चलता रहेगा। यह sirf blog के लिए है।
