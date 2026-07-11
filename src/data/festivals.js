// Major India-wide festival calendar. Lunar dates are curated per year.
// Add a new year's dates here before that year begins; fixed national dates repeat automatically.
export const festivals2026 = [
  { name:'नया साल', date:'2026-01-01' },
  { name:'लोहड़ी', date:'2026-01-13' },
  { name:'मकर संक्रांति / पोंगल', date:'2026-01-14' },
  { name:'वसंत पंचमी', date:'2026-01-23' },
  { name:'गणतंत्र दिवस', date:'2026-01-26' },
  { name:'महाशिवरात्रि', date:'2026-02-15' },
  { name:'होलिका दहन', date:'2026-03-03' },
  { name:'होली', date:'2026-03-04' },
  { name:'ईद-उल-फितर', date:'2026-03-20' },
  { name:'राम नवमी', date:'2026-03-26' },
  { name:'महावीर जयंती', date:'2026-03-31' },
  { name:'गुड फ्राइडे', date:'2026-04-03' },
  { name:'बैसाखी / अंबेडकर जयंती', date:'2026-04-14' },
  { name:'बुद्ध पूर्णिमा', date:'2026-05-01' },
  { name:'ईद-उल-अजहा (बकरीद)', date:'2026-05-27' },
  { name:'मुहर्रम', date:'2026-06-26' },
  { name:'गुरु पूर्णिमा', date:'2026-07-29' },
  { name:'स्वतंत्रता दिवस', date:'2026-08-15' },
  { name:'नाग पंचमी', date:'2026-08-17' },
  { name:'ओणम', date:'2026-08-26' },
  { name:'ईद-ए-मिलाद', date:'2026-08-26' },
  { name:'रक्षाबंधन', date:'2026-08-28' },
  { name:'जन्माष्टमी', date:'2026-09-04' },
  { name:'गणेश चतुर्थी', date:'2026-09-14' },
  { name:'गांधी जयंती', date:'2026-10-02' },
  { name:'शारदीय नवरात्रि प्रारंभ', date:'2026-10-11' },
  { name:'दुर्गा अष्टमी', date:'2026-10-18' },
  { name:'महानवमी', date:'2026-10-19' },
  { name:'दशहरा / विजयादशमी', date:'2026-10-20' },
  { name:'करवा चौथ', date:'2026-10-29' },
  { name:'धनतेरस', date:'2026-11-06' },
  { name:'छोटी दिवाली / नरक चतुर्दशी', date:'2026-11-07' },
  { name:'दीपावली', date:'2026-11-08' },
  { name:'गोवर्धन पूजा', date:'2026-11-09' },
  { name:'भाई दूज', date:'2026-11-10' },
  { name:'छठ पूजा', date:'2026-11-15' },
  { name:'गुरु नानक जयंती', date:'2026-11-24' },
  { name:'क्रिसमस', date:'2026-12-25' },
].map((item) => ({ ...item, type:'festival', id: festivalId(item.name, item.date) }));

export const annualFixedFestivals = [
  { name:'नया साल', md:'01-01' }, { name:'लोहड़ी', md:'01-13' },
  { name:'मकर संक्रांति', md:'01-14' }, { name:'गणतंत्र दिवस', md:'01-26' },
  { name:'अंबेडकर जयंती', md:'04-14' }, { name:'स्वतंत्रता दिवस', md:'08-15' },
  { name:'गांधी जयंती', md:'10-02' }, { name:'क्रिसमस', md:'12-25' }
];

export function festivalId(name, date) {
  return (String(date || '') + '-' + String(name || 'festival'))
    .toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/g, '-').replace(/^-|-$/g, '');
}

export function festivalCalendar(year) {
  const curated = year === 2026 ? festivals2026 : [];
  const fixed = annualFixedFestivals.map((x) => {
    const date = String(year) + '-' + x.md;
    return { name:x.name, date, type:'festival', id:festivalId(x.name, date) };
  });
  return [...curated, ...fixed.filter((x) => !curated.some((y) => y.name === x.name || y.date === x.date && y.name.includes(x.name)))]
    .sort((a,b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name, 'hi'));
}

export function upcomingFestivals(fromDate = new Date(), limit = 18) {
  const iso = new Date(fromDate.getTime() - fromDate.getTimezoneOffset() * 60000).toISOString().slice(0,10);
  const year = Number(iso.slice(0,4));
  return [...festivalCalendar(year), ...festivalCalendar(year + 1)]
    .filter((f) => f.date >= iso).slice(0, limit);
}
