/**
 * data/members.js — Crew / طاقم
 * Derived from legacy data/members.json.
 */

export const members = [
  {
    id: 'mohammed-alnami',
    name: 'محمد النعامي',
    role: 'مؤسس ومقدم',
    isFounder: true,
    initials: 'م ن',
    bioShort: 'واجهة قيادية وحضور أساسي في هوية AI Show.',
    vibeTags: ['قيادي', 'مؤسس', 'واجهة'],
    featuredWorlds: ['veto-one-piece', 'anime-dewaniya'],
    socialLinks: { all: 'https://instabio.cc/4112412SVgKDk' },
  },
  {
    id: 'majed-alamer',
    name: 'ماجد العامر',
    role: 'مؤسس ومقدم',
    isFounder: true,
    initials: 'م ع',
    bioShort: 'حاضر بقوة في التحليل، النظريات، وسلسلة فيتو.',
    vibeTags: ['نظريات', 'فيتو', 'مانجا'],
    featuredWorlds: ['veto-one-piece', 'one-piece-impression', 'theory-one-piece'],
    socialLinks: { all: 'https://linkfly.to/40208fnHvGN' },
  },
  {
    id: 'ibrahim-alamer',
    name: 'ابراهيم العامر',
    role: 'مؤسس ومقدم',
    isFounder: true,
    initials: 'إ ع',
    bioShort: 'جزء محوري من الطاقم المؤسس والمحتوى المستمر.',
    vibeTags: ['مؤسس', 'فريق', 'استمرارية'],
    featuredWorlds: ['veto-one-piece', 'anime-dewaniya'],
    socialLinks: { all: 'https://linkfly.to/40314eKJ1O6' },
  },
  {
    id: 'saud-alomar',
    name: 'سعود العمر',
    role: 'مقدم',
    isFounder: false,
    initials: 'س ع',
    bioShort: 'وجه بارز في التغطية الفورية وأسئلة الجمهور.',
    vibeTags: ['تغطية', 'جمهور', 'تفاعل'],
    featuredWorlds: ['veto-mixed'],
    socialLinks: {},
  },
];

/** Get member by id */
export function getMember(id) {
  return members.find(m => m.id === id) ?? null;
}
