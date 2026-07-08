// Central content/config for Daily PosterHub.
// Sabhi text ek jagah rakha hai taaki editing aasaan ho.

export const site = {
  name: 'Daily PosterHub',
  tagline: 'हिंदी पोस्टर बनाने का सबसे आसान तरीका',
  domain: 'posterhub.pages.dev',
  url: 'https://posterhub.pages.dev',
  supportEmail: 'support@posterhub.pages.dev',
  watermark: '@jitendrauno',
  brandingStrip: 'Download by posterhub.pages.dev — Free Poster Downloader Platform',
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
  { label: 'श्रेणियां', href: '/categories' },
  { label: 'टूल्स', href: '/tools' },
  { label: 'ब्लॉग', href: '/blog' },
  { label: 'संपर्क करें', href: '/contact' },
];

// Hero trust chips
export const trustChips = [
  { icon: '✅', text: '100% फ्री पोस्टर' },
  { icon: '🎨', text: 'आसान एडिटर' },
  { icon: '📱', text: 'मोबाइल फ्रेंडली' },
  { icon: '⚡', text: 'तुरंत डाउनलोड' },
];

// Popular categories (9 items)
export const categories = [
  { icon: '🌅', name: 'गुड मॉर्निंग', slug: 'good-morning', count: 120 },
  { icon: '🌙', name: 'गुड नाइट', slug: 'good-night', count: 80 },
  { icon: '🎂', name: 'जन्मदिन', slug: 'birthday', count: 95 },
  { icon: '🪔', name: 'त्योहार', slug: 'festival', count: 150 },
  { icon: '🙏', name: 'भगवान', slug: 'god', count: 110 },
  { icon: '💐', name: 'शुभकामनाएं', slug: 'wishes', count: 70 },
  { icon: '🏢', name: 'बिज़नेस', slug: 'business', count: 60 },
  { icon: '❤️', name: 'लव / शायरी', slug: 'love', count: 85 },
  { icon: '🇮🇳', name: 'राष्ट्रीय दिवस', slug: 'national', count: 40 },
];

// Hero preview cards
export const heroPreviews = [
  { img: '/img/preview-morning.webp', title: 'सुप्रभात', badge: 'HD' },
  { img: '/img/preview-birthday.webp', title: 'जन्मदिन', badge: 'HD' },
  { img: '/img/preview-god.webp', title: 'जय श्री राम', badge: 'HD' },
];

// Pro benefits strip
export const proPerks = [
  { icon: '🚫', text: 'कोई वॉटरमार्क नहीं' },
  { icon: '☁️', text: 'क्लाउड लॉगिन + सेव' },
  { icon: '🖼️', text: 'HD क्वालिटी डाउनलोड' },
  { icon: '⭐', text: 'प्रीमियम टेम्पलेट्स' },
];

// How it works (4 steps)
export const steps = [
  { no: '1', icon: '🖼️', title: 'पोस्टर चुनें', desc: 'अपनी पसंद का टेम्पलेट चुनें।' },
  { no: '2', icon: '✍️', title: 'नाम व फोटो जोड़ें', desc: 'अपना नाम, फोटो और मैसेज डालें।' },
  { no: '3', icon: '🎨', title: 'एडजस्ट करें', desc: 'फोटो को स्लाइड व रिसाइज़ करें।' },
  { no: '4', icon: '⬇️', title: 'डाउनलोड करें', desc: 'HD पोस्टर तुरंत डाउनलोड करें।' },
];

// Popular templates (6 items)
export const templates = [
  { img: '/img/t-morning-1.webp', title: 'सुप्रभात पुष्प', category: 'गुड मॉर्निंग', type: 'free' },
  { img: '/img/t-birthday-1.webp', title: 'हैप्पी बर्थडे गोल्ड', category: 'जन्मदिन', type: 'pro' },
  { img: '/img/t-god-1.webp', title: 'जय श्री राम', category: 'भगवान', type: 'free' },
  { img: '/img/t-festival-1.webp', title: 'शुभ दीपावली', category: 'त्योहार', type: 'pro' },
  { img: '/img/t-morning-2.webp', title: 'गुड मॉर्निंग नेचर', category: 'गुड मॉर्निंग', type: 'free' },
  { img: '/img/t-business-1.webp', title: 'बिज़नेस प्रमोशन', category: 'बिज़नेस', type: 'pro' },
];

// Stats bar (5 items)
export const stats = [
  { value: '50,000+', label: 'खुश यूज़र्स' },
  { value: '1,200+', label: 'पोस्टर टेम्पलेट्स' },
  { value: '25+', label: 'श्रेणियां' },
  { value: '2 लाख+', label: 'डाउनलोड' },
  { value: '4.8★', label: 'यूज़र रेटिंग' },
];

// Footer link columns
export const footerLinks = [
  {
    title: 'ज़रूरी लिंक',
    links: [
      { label: 'होम', href: '/' },
      { label: 'सभी पोस्टर', href: '/posters' },
      { label: 'प्राइसिंग', href: '/pricing' },
      { label: 'ब्लॉग', href: '/blog' },
    ],
  },
  {
    title: 'लोकप्रिय श्रेणियां',
    links: [
      { label: 'गुड मॉर्निंग', href: '/categories/good-morning' },
      { label: 'जन्मदिन', href: '/categories/birthday' },
      { label: 'त्योहार', href: '/categories/festival' },
      { label: 'भगवान', href: '/categories/god' },
    ],
  },
  {
    title: 'सहायता',
    links: [
      { label: 'कैसे बनाएं', href: '/tools' },
      { label: 'FAQ', href: '/faq' },
      { label: 'प्राइवेसी पॉलिसी', href: '/privacy' },
      { label: 'नियम व शर्तें', href: '/terms' },
    ],
  },
  {
    title: 'संपर्क करें',
    links: [
      { label: 'ईमेल सपोर्ट', href: 'mailto:support@posterhub.pages.dev' },
      { label: 'WhatsApp', href: '#' },
      { label: 'इंस्टाग्राम', href: '#' },
      { label: 'यूट्यूब', href: '#' },
    ],
  },
];
