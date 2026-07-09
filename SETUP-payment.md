# पेमेंट सिस्टम (UPI + QR + WhatsApp) — Setup

ये files अपने repo `igjitendra/dailyposterhub` में इन्हीं paths पर डालें:

```
src/pages/payment.astro          → /payment page (UPI id, QR, screenshot, WhatsApp)
functions/api/pay-proof.js       → screenshot upload (R2 par store)
```

## जो मान इस्तेमाल होते हैं (src/data/site.js से)
- UPI ID: `payment.upiId`  → abhi `canvapro@upi`
- नाम: `payment.payeeName` → `Daily PosterHub`
- WhatsApp: `contact.phoneRaw` → `916387617678`
- दाम: `pricing.monthly` (21), `pricing.yearly` (99)

> ये बदलने हों तो सिर्फ़ `src/data/site.js` में बदलें — page खुद उठा लेगा।

## ज़रूरी — pricing page से link जोड़ें
`src/pages/pricing.astro` में "Pro लें / Upgrade" बटन को `/payment` पर भेजें:
```astro
<a href="/payment" class="btn btn-primary btn-lg">Pro लें</a>
```
(चाहें तो `/payment?plan=yearly` भी चलता है — default वार्षिक चुना रहता है।)

## फ्लो
1. यूज़र `/payment` खोलता है → प्लान चुनता है
2. QR स्कैन / UPI ऐप में खोलें → भुगतान करता है
3. नाम + अकाउंट + (optional Txn ID) + स्क्रीनशॉट भरता है
4. "रिक्वेस्ट भेजें" → आपके WhatsApp `916387617678` पर पूरी detail के साथ message खुलता है
5. आप मैन्युअल verify करके 2 घंटे में Pro active कर दें

## स्क्रीनशॉट कैसे मिलता है
- **अगर R2 (POSTERS bucket) चालू है:** screenshot upload होकर एक link बनता है, जो WhatsApp message में अपने-आप आ जाता है — आप link खोलकर देख लें।
- **अगर R2 नहीं है:** कोई दिक्कत नहीं — message में लिखा आएगा कि यूज़र WhatsApp पर screenshot attach करे, और page भी यही याद दिलाता है।

> नोट: WhatsApp click-to-chat सिर्फ़ text prefill कर सकता है, image auto-attach नहीं। इसलिए screenshot या तो R2 link से आता है, या यूज़र खुद attach करता है।
