/**
 * data/worlds.js — "العوالم" (content series / browse surface)
 * Derived from legacy data/series.json.
 * Each world is a browseable content series.
 */

export const worlds = [
  {
    id: 'veto-one-piece',
    title: 'فيتو مانجا ون بيس',
    typeLabel: 'Veto',
    frequency: 'شبه أسبوعي',
    franchise: 'ون بيس',
    emoji: '⚔️',
    description: 'سلسلة مبنية على أسئلة الجمهور والنظريات والاعتراضات بين أعضاء الطاقم.',
    relatedMembers: ['majed-alamer', 'mohammed-alnami'],
  },
  {
    id: 'one-piece-impression',
    title: 'انطباع مانجا ون بيس',
    typeLabel: 'Weekly',
    frequency: 'أسبوعي',
    franchise: 'ون بيس',
    emoji: '📖',
    description: 'مراجعة مستمرة لفصول المانجا وتحليل أحداثها وتوقع ما بعدها.',
    relatedMembers: ['majed-alamer', 'ibrahim-alamer'],
  },
  {
    id: 'anime-dewaniya',
    title: 'ديوانية الأنمي',
    typeLabel: 'Discussion',
    frequency: 'مستمر',
    franchise: 'أنمي عام',
    emoji: '🎌',
    description: 'جلسات نقاشية حول الأعمال الأسبوعية والاتجاهات والآراء الجماعية.',
    relatedMembers: ['mohammed-alnami', 'ibrahim-alamer'],
  },
  {
    id: 'manga-dewaniya',
    title: 'ديوانية المانجا',
    typeLabel: 'Discussion',
    frequency: 'مستمر',
    franchise: 'مانجا عامة',
    emoji: '📚',
    description: 'جلسات تركز على المانجا، الفصول، والتحليل العميق للأعمال المقروءة.',
    relatedMembers: ['majed-alamer'],
  },
  {
    id: 'veto-mixed',
    title: 'فيتو منوع',
    typeLabel: 'Veto',
    frequency: 'مستمر',
    franchise: 'أنمي عام',
    emoji: '🔥',
    description: 'نسخة موسّعة من فيتو تشمل عناوين متنوعة خارج نطاق ون بيس.',
    relatedMembers: ['mohammed-alnami', 'saud-alomar'],
  },
  {
    id: 'theory-one-piece',
    title: 'نظريات ون بيس',
    typeLabel: 'Theory',
    frequency: 'غير منتظم',
    franchise: 'ون بيس',
    emoji: '🔮',
    description: 'حلقات متخصصة في استعراض وتحليل النظريات الكبرى في عالم ون بيس.',
    relatedMembers: ['majed-alamer', 'ibrahim-alamer'],
  },
];

/** Get world by id */
export function getWorld(id) {
  return worlds.find(w => w.id === id) ?? null;
}
