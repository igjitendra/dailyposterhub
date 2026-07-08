// Central content/config for Daily PosterHub.
// Icon values are NAMES from src/components/Icon.astro (no emoji anywhere).

export const site = {
  name: 'Daily PosterHub',
  tagline: 'हर दिन नया पोस्टर, आपके अपने अंदाज़ में',
  domain: 'posterhub.pages.dev',
  url: 'https://posterhub.pages.dev',
  watermark: '@jitendrauno',
  brandingStrip: 'Download by posterhub.pages.dev — Free Poster Downloader Platform',
};

// Contact info
export const contact = {
  phone: '+91 6387617678',
  phoneRaw: '916387617678',
  email: 'support@posterhub.pages.dev',
  location: 'भारत',
  hours: 'सुबह 9:00 बजे – रात 9:00 बजे (सोम – रवि)',
};

// UPI / payment
export const payment = {
  upiId: 'canvapro@upi',
  upiNumber: '6387617678',
  payeeName: 'Daily PosterHub',
};

// Pricing (final decided values)
export const pricing = {
  monthly: 21,
  yearly: 99,
  currency: '₹',
  startsAt: 'मात्र ₹21/माह से शुरू',
};

// Header navigation
export const nav = [
  { label: 'होम', href: '/' },
  { label: 'सभी पोस्टर', href: '/posters' },
  { label: 'श्रेणियां', href: '/categories', hasDropdown: true },
  { label: 'टूल्स', href: '/tools' },
  { label: 'ब्लॉग', href: '/blog' },
  { label: 'संपर्क करें', href: '/contact' },
];

// Hero trust chips
export const trustChips = [
  { icon: 'check-circle', text: 'आसान और तेज़' },
  { icon: 'download', text: 'एक क्लिक में डाउनलोड' },
  { icon: 'smartphone', text: 'मोबाइल के लिए' },
  { icon: 'globe', text: '100% फ्री' },
];

// Popular categories (9 items) — icon name + tint colors
export const categories = [
  { icon: 'sun', name: 'गुड मॉर्निंग', slug: 'good-morning', color: '#F59E0B', bg: '#FEF3C7' },
  { icon: 'moon', name: 'गुड नाइट', slug: 'good-night', color: '#7C3AED', bg: '#EDE9FE' },
  { icon: 'cake', name: 'जन्मदिन', slug: 'birthday', color: '#EC4899', bg: '#FCE7F3' },
  { icon: 'gift', name: 'शुभकामनाएं', slug: 'wishes', color: '#EF4444', bg: '#FEE2E2' },
  { icon: 'temple', name: 'धार्मिक', slug: 'religious', color: '#EA580C', bg: '#FFEDD5' },
  { icon: 'flame', name: 'त्योहार', slug: 'festival', color: '#F97316', bg: '#FFEDD5' },
  { icon: 'briefcase', name: 'बिज़नेस', slug: 'business', color: '#92400E', bg: '#F1E9DF' },
  { icon: 'instagram', name: 'सोशल मीडिया', slug: 'social-media', color: '#DB2777', bg: '#FCE7F3' },
  { icon: 'grid', name: 'और देखें', slug: 'all', color: '#7C3AED', bg: '#EDE9FE' },
];

// Hero preview cards
export const heroPreviews = [
  { img: '/img/preview-morning.webp', title: 'सुप्रभात', badge: 'HD' },
  { img: '/img/preview-birthday.webp', title: 'जन्मदिन', badge: 'HD' },
  { img: '/img/preview-god.webp', title: 'जय श्री राम', badge: 'HD' },
];

// Pro benefits strip
export const proPerks = [
  { icon: 'ban', text: 'बिना वॉटरमार्क' },
  { icon: 'monitor', text: 'HD क्वालिटी' },
  { icon: 'sparkles', text: 'प्रीमियम टेम्पलेट्स' },
  { icon: 'infinity', text: 'अनलिमिटेड डाउनलोड' },
  { icon: 'image', text: 'अपना लोगो जोड़ें' },
];

// How it works (4 steps)
export const steps = [
  { no: '1', icon: 'image', title: 'टेम्पलेट चुनें', desc: 'अपनी पसंद का पोस्टर टेम्पलेट चुनें।' },
  { no: '2', icon: 'edit', title: 'अपनी जानकारी भरें', desc: 'नाम, फोटो, मोबाइल नंबर और संदेश जोड़ें।' },
  { no: '3', icon: 'eye', title: 'प्रिव्यू देखें', desc: 'अपना पोस्टर प्रिव्यू में देखें और एडजस्ट करें।' },
  { no: '4', icon: 'download', title: 'डाउनलोड करें', desc: 'एक क्लिक में डाउनलोड करें और शेयर करें।' },
];

// Popular templates (6 items)
export const templates = [
  { img: '/img/t-morning-1.webp', title: 'सुप्रभात', category: 'गुड मॉर्निंग', type: 'free' },
  { img: '/img/t-birthday-1.webp', title: 'जन्मदिन शुभकामनाएं', category: 'जन्मदिन', type: 'pro' },
  { img: '/img/t-hanuman-1.webp', title: 'जय हनुमान', category: 'धार्मिक', type: 'free' },
  { img: '/img/t-wedding-1.webp', title: 'शुभ विवाह', category: 'शुभकामनाएं', type: 'pro' },
  { img: '/img/t-shiv-1.webp', title: 'ॐ नमः शिवाय', category: 'धार्मिक', type: 'free' },
  { img: '/img/t-offer-1.webp', title: 'स्पेशल ऑफर 50% OFF', category: 'बिज़नेस', type: 'pro' },
];

// Stats bar (5 items)
export const stats = [
  { icon: 'image', value: '10,000+', label: 'पोस्टर टेम्पलेट्स' },
  { icon: 'users', value: '50,000+', label: 'खुश उपयोगकर्ता' },
  { icon: 'cloud-download', value: '1 लाख+', label: 'डाउनलोड हर महीने' },
  { icon: 'shield-check', value: '100%', label: 'सुरक्षित और भरोसेमंद' },
  { icon: 'headphones', value: '24x7', label: 'हमेशा आपके साथ' },
];

// Pro upsell checklist (6 items)
export const proUpsell = [
  'बिना वॉटरमार्क डाउनलोड',
  'प्रीमियम टेम्पलेट एक्सेस',
  'अपना लोगो और ब्रांडिंग',
  'HD क्वालिटी पोस्टर',
  'अनलिमिटेड डाउनलोड',
  'फेस्टिवल स्पेशल पैक',
];

// Footer link columns
export const footerLinks = [
  {
    title: 'ज़रूरी लिंक',
    links: [
      { label: 'होम', href: '/' },
      { label: 'सभी पोस्टर', href: '/posters' },
      { label: 'सभी श्रेणियां', href: '/categories' },
      { label: 'प्रो प्लान', href: '/pricing' },
      { label: 'टूल्स', href: '/tools' },
      { label: 'ब्लॉग', href: '/blog' },
    ],
  },
  {
    title: 'लोकप्रिय श्रेणियां',
    links: [
      { label: 'गुड मॉर्निंग पोस्टर', href: '/categories/good-morning' },
      { label: 'जन्मदिन पोस्टर', href: '/categories/birthday' },
      { label: 'धार्मिक पोस्टर', href: '/categories/religious' },
      { label: 'बिज़नेस पोस्टर', href: '/categories/business' },
      { label: 'फेस्टिवल पोस्टर', href: '/categories/festival' },
      { label: 'सोशल मीडिया पोस्टर', href: '/categories/social-media' },
    ],
  },
  {
    title: 'सहायता',
    links: [
      { label: 'हेल्प सेंटर', href: '/help' },
      { label: 'डाउनलोड कैसे करें', href: '/tools' },
      { label: 'प्राइवेसी पॉलिसी', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Refund Policy', href: '/refund' },
      { label: 'DMCA', href: '/dmca' },
    ],
  },
];

// Social links (icon names)
export const socials = [
  { icon: 'facebook', href: '#', label: 'Facebook' },
  { icon: 'instagram', href: '#', label: 'Instagram' },
  { icon: 'youtube', href: '#', label: 'YouTube' },
  { icon: 'pinterest', href: '#', label: 'Pinterest' },
  { icon: 'telegram', href: '#', label: 'Telegram' },
];
