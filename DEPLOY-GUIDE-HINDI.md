# 🚀 Daily PosterHub — डिप्लॉय गाइड (हिंदी)

यह गाइड बताती है कि इस ZIP को GitHub पर कैसे डालें और Cloudflare Pages पर लाइव कैसे करें। एक बार सेटअप के बाद, हर बार सिर्फ़ नया ZIP replace करके commit करना होगा।

---

## चरण 1: GitHub पर कोड डालें

1. ZIP को अपने कंप्यूटर पर **Extract** करें।
2. GitHub repo खोलें: `github.com/igjitendra/dailyposterhub`
3. पुरानी फ़ाइलें हटाकर, extract किए हुए सभी फ़ोल्डर/फ़ाइलें upload करें (drag & drop)।
   - मोबाइल से: **GitHub app** या ब्राउज़र में `Add file → Upload files`।
4. नीचे **Commit changes** दबाएँ।

> हर बार मैं नया ZIP दूँ, तो सिर्फ़ यही चरण दोहराएँ — बाकी सेटअप एक ही बार करना है।

---

## चरण 2: Cloudflare Pages से जोड़ें (सिर्फ़ पहली बार)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git**।
2. अपना GitHub अकाउंट connect करके `dailyposterhub` repo चुनें।
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. **Save and Deploy** दबाएँ। कुछ मिनट में साइट लाइव हो जाएगी → `posterhub.pages.dev`

---

## चरण 3: लॉगिन + पोस्टर स्टोरेज (KV, R2, env)

साइट के लॉगिन, यूज़र प्लान और पोस्टर अपलोड चलाने के लिए ये ज़रूरी हैं। Cloudflare डैशबोर्ड में:

### (क) KV — यूज़र डेटा
1. **Workers & Pages → KV → Create namespace**, नाम: `USERS`।
2. Pages प्रोजेक्ट → **Settings → Functions → KV namespace bindings → Add**:
   - Variable name: `USERS`
   - चुनें: वही namespace जो अभी बनाया।

### (ख) R2 — पोस्टर/फ़ोटो स्टोरेज
1. **R2 → Create bucket**, कोई नाम (जैसे `posters`)।
2. Pages प्रोजेक्ट → **Settings → Functions → R2 bucket bindings → Add**:
   - Variable name: `POSTERS`
   - चुनें: वही bucket।

### (ग) Environment Variables
Pages प्रोजेक्ट → **Settings → Environment variables → Add** (Production):

| Name | Value |
|---|---|
| `SESSION_SECRET` | कोई भी लंबा रैंडम शब्द (जैसे 30+ अक्षर) |
| `ADMIN_KEY` | आपकी गुप्त एडमिन चाबी (पैनल खोलने के लिए) |
| `GITHUB_OAUTH_ID` | ब्लॉग CMS के लिए (चरण 4) |
| `GITHUB_OAUTH_SECRET` | ब्लॉग CMS के लिए (चरण 4) |

सेव करके **Re-deploy** करें।

---

## चरण 4: ब्लॉग एडमिन (`/admin`) — सिर्फ़ पहली बार

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**:
   - Homepage URL: `https://posterhub.pages.dev`
   - Callback URL: `https://posterhub.pages.dev/callback`
2. मिली **Client ID** → `GITHUB_OAUTH_ID`, **Client Secret** → `GITHUB_OAUTH_SECRET` (चरण 3ग में डालें)।
3. फिर `posterhub.pages.dev/admin` खोलकर GitHub से लॉगिन → ब्लॉग लिखना शुरू।

---

## चरण 5: चेक करें ✅

- `posterhub.pages.dev` → होमपेज खुलता है
- `/login` → साइन-अप/लॉगिन काम करता है
- लॉगिन के बाद `/posters` → पोस्टर दिखते हैं → **एडिट करें** → ब्रांड किट/डाउनलोड/शेयर
- `/admin-users` → (एडमिन चाबी से) यूज़र प्लान बदलना
- `/admin` → ब्लॉग लिखना

---

## अपडेट कैसे करें (हर बार)

1. मुझसे नया ZIP लें।
2. **चरण 1** दोहराएँ (GitHub पर फ़ाइलें replace + commit)।
3. Cloudflare अपने आप नया build बनाकर लाइव कर देगा — बाकी कुछ नहीं करना।

---

### पैसे/पेमेंट
- UPI ID: `canvapro@upi` · नंबर: `6387617678`
- Pro प्लान: ₹21/महीना, ₹99/साल
- यूज़र पेमेंट करने के बाद, आप `/admin-users` से उसका प्लान **Pro** कर देंगे।

कोई भी चरण अटके तो स्क्रीनशॉट भेजिए — तुरंत हल करा दूँगा। 🙏
