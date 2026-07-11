// India-wide festival calendar. Fixed-date festivals repeat annually; lunar festivals are curated for 2026.
export const festivals2026 = [
  { name:'मकर संक्रांति', date:'2026-01-14', type:'festival' }, { name:'वसंत पंचमी', date:'2026-01-23', type:'festival' },
  { name:'महाशिवरात्रि', date:'2026-02-15', type:'festival' }, { name:'होली', date:'2026-03-04', type:'festival' },
  { name:'राम नवमी', date:'2026-03-26', type:'festival' }, { name:'महावीर जयंती', date:'2026-03-31', type:'festival' },
  { name:'गुड फ्राइडे', date:'2026-04-03', type:'festival' }, { name:'बैसाखी', date:'2026-04-14', type:'festival' }, { name:'ईद-उल-फितर', date:'2026-03-20', type:'festival' },
  { name:'बुद्ध पूर्णिमा', date:'2026-05-01', type:'festival' }, { name:'रक्षाबंधन', date:'2026-08-28', type:'festival' },
  { name:'जन्माष्टमी', date:'2026-09-04', type:'festival' }, { name:'गणेश चतुर्थी', date:'2026-09-14', type:'festival' },
  { name:'ईद-ए-मिलाद', date:'2026-08-26', type:'festival' }, { name:'दशहरा', date:'2026-10-20', type:'festival' },
  { name:'करवा चौथ', date:'2026-10-29', type:'festival' }, { name:'धनतेरस', date:'2026-11-06', type:'festival' },
  { name:'दीपावली', date:'2026-11-08', type:'festival' }, { name:'गोवर्धन पूजा', date:'2026-11-09', type:'festival' }, { name:'भाई दूज', date:'2026-11-10', type:'festival' },
  { name:'गुरु नानक जयंती', date:'2026-11-24', type:'festival' }, { name:'क्रिसमस', date:'2026-12-25', type:'festival' }
];
export const annualFixedFestivals = [
  { name:'नया साल', md:'01-01' }, { name:'लोहड़ी', md:'01-13' }, { name:'गणतंत्र दिवस', md:'01-26' },
  { name:'स्वतंत्रता दिवस', md:'08-15' }, { name:'गांधी जयंती', md:'10-02' }, { name:'क्रिसमस', md:'12-25' }
];
export function festivalCalendar(year) {
  const curated = year === 2026 ? festivals2026 : [];
  const fixed = annualFixedFestivals.map((x) => ({ name:x.name, date:String(year)+'-'+x.md, type:'festival' }));
  return [...curated, ...fixed.filter((x) => !curated.some((y) => y.name === x.name))].sort((a,b)=>a.date.localeCompare(b.date));
}
