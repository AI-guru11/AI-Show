/**
 * data/members.js — Crew / طاقم
 * Source of truth: member manifest (data/members.json in legacy root).
 * 15 members: 3 founders + 12 presenters.
 *
 * Fields:
 *   id            — stable kebab-case slug (never change)
 *   name          — Arabic display name (from manifest)
 *   role          — Arabic role label (from manifest)
 *   isFounder     — boolean
 *   initials      — 1-2 Arabic chars for avatar circle
 *   bioShort      — short Arabic bio (user-facing; minimal safe copy where manifest bio is internal)
 *   vibeTags      — light editorial specialty labels (not invented, not lore)
 *   featuredWorlds — anime world IDs this member is associated with (empty = graceful skip)
 *   socialLinks   — { all: primaryHubURL } — one link only per member
 */

export const members = [

  // ── Founders ──────────────────────────────────────────────

  {
    id: 'mohammed-alnami',
    name: 'محمد النعامي',
    role: 'مؤسس ومقدم',
    isFounder: true,
    initials: 'م ن',
    bioShort: 'واجهة قيادية وحضور أساسي في هوية AI Show.',
    vibeTags: ['قيادة', 'تقديم', 'هوية'],
    featuredWorlds: ['one-piece', 'naruto'],
    socialLinks: { all: 'https://instabio.cc/4112412SVgKDk' },
  },
  {
    id: 'majed-alamer',
    name: 'ماجد العامر',
    role: 'مؤسس ومقدم',
    isFounder: true,
    initials: 'م ع',
    bioShort: 'حاضر بقوة في التحليل، النظريات، وسلسلة فيتو.',
    vibeTags: ['نظريات', 'تحليل', 'مانجا'],
    featuredWorlds: ['one-piece', 'dragon-ball'],
    socialLinks: { all: 'https://linkfly.to/40208fnHvGN' },
  },
  {
    id: 'ibrahim-alamer',
    name: 'ابراهيم العامر',
    role: 'مؤسس ومقدم',
    isFounder: true,
    initials: 'إ ع',
    bioShort: 'جزء محوري من الطاقم المؤسس والمحتوى المستمر.',
    vibeTags: ['فريق', 'محتوى', 'استمرارية'],
    featuredWorlds: ['one-piece', 'attack-on-titan'],
    socialLinks: { all: 'https://linkfly.to/40314eKJ1O6' },
  },

  // ── Presenters / Core Crew ─────────────────────────────────

  {
    id: 'saud-alomar',
    name: 'سعود العمر',
    role: 'مقدم',
    isFounder: false,
    initials: 'س ع',
    bioShort: 'حضور واضح في النقاشات وتفاعل الطاقم.',
    vibeTags: ['نقاش', 'تفاعل', 'حلقات'],
    featuredWorlds: ['jujutsu-kaisen', 'demon-slayer'],
    socialLinks: { all: 'https://linktr.ee/S3ddey' },
  },
  {
    id: 'rashed-aldosari',
    name: 'راشد الدوسري',
    role: 'مقدم',
    isFounder: false,
    initials: 'ر د',
    bioShort: 'من الوجوه الأساسية في حلقات الطاقم وسلاسل النقاش.',
    vibeTags: ['حضور', 'فريق', 'سلاسل'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linkfly.to/rsh4485' },
  },
  {
    id: 'abdulbari-alsalem',
    name: 'عبدالباري السالم',
    role: 'مقدم',
    isFounder: false,
    initials: 'ع س',
    bioShort: 'مشارك مستمر ضمن دائرة التفاعل والمحتوى.',
    vibeTags: ['محتوى', 'طاقم', 'تفاعل'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linkfly.to/40314kYeqkb' },
  },
  {
    id: 'turki-herodevil',
    name: 'تركي',
    role: 'مقدم',
    isFounder: false,
    initials: 'تر',
    bioShort: 'من أعضاء طاقم AI Show.',
    vibeTags: ['تقديم', 'طاقم'],
    featuredWorlds: [],
    socialLinks: { all: 'https://instabio.cc/Herodevil777' },
  },
  {
    id: 'abdulrahman-alrizan',
    name: 'عبدالرحمن الريزان',
    role: 'مقدم',
    isFounder: false,
    initials: 'ع ر',
    bioShort: 'مقدم في طاقم AI Show.',
    vibeTags: ['تقديم', 'طاقم'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linkfly.to/D7mmey' },
  },
  {
    id: 'mohammed-alsalem',
    name: 'محمد السالم',
    role: 'مقدم',
    isFounder: false,
    initials: 'م س',
    bioShort: 'مقدم في طاقم AI Show.',
    vibeTags: ['فريق', 'تقديم'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linkfly.to/403147IOYQP' },
  },
  {
    id: 'ahmed-alyamani',
    name: 'احمد اليماني',
    role: 'مقدم',
    isFounder: false,
    initials: 'أ ي',
    bioShort: 'مقدم في طاقم AI Show.',
    vibeTags: ['تفاعل', 'تقديم'],
    featuredWorlds: [],
    socialLinks: { all: 'https://heylink.me/E7_1/' },
  },
  {
    id: 'wejdan-chan',
    name: 'وجدان تشان',
    role: 'مقدم',
    isFounder: false,
    initials: 'و ت',
    bioShort: 'مقدمة في طاقم AI Show.',
    vibeTags: ['طاقم', 'هوية'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linkfly.to/41124PKacqC' },
  },
  {
    id: 'abu-amer',
    name: 'ابو عامر',
    role: 'مقدم',
    isFounder: false,
    initials: 'أ ع',
    bioShort: 'عضو في طاقم AI Show.',
    vibeTags: ['فريق', 'مجتمع'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linkbio.co/8031102jqs52u' },
  },
  {
    id: 'ziyad-pu',
    name: 'زياد PU',
    role: 'مقدم',
    isFounder: false,
    initials: 'ز',
    bioShort: 'مقدم في طاقم AI Show.',
    vibeTags: ['تقديم', 'مجتمع'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linktr.ee/PLSULL' },
  },
  {
    id: 'alwajeeh',
    name: 'الوجيه',
    role: 'مقدم',
    isFounder: false,
    initials: 'وج',
    bioShort: 'من الوجوه المعروفة في طاقم AI Show.',
    vibeTags: ['حضور', 'جمهور'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linktr.ee/wajeeho2' },
  },
  {
    id: 'yasser-albarrak',
    name: 'ياسر البراك',
    role: 'مقدم',
    isFounder: false,
    initials: 'ي ب',
    bioShort: 'مقدم في طاقم AI Show.',
    vibeTags: ['فريق', 'تقديم'],
    featuredWorlds: [],
    socialLinks: { all: 'https://linktr.ee/Yasiralbarrak' },
  },
];

/** Get member by id */
export function getMember(id) {
  return members.find(m => m.id === id) ?? null;
}
