/**
 * data/questions.js — Fan Questions surface (أسئلة الجمهور)
 * Step 5: fixed worldId references, cleaned askedBy, expanded to 10 questions.
 *
 * worldId must reference a valid anime world ID from worlds.js, or null.
 * Channel format IDs (veto-one-piece, anime-dewaniya, etc.) are not valid.
 */

export const questions = [
  {
    id: 'fq-001',
    text: 'متى تتوقعون انتهاء ون بيس؟',
    askedBy: 'مشترك',
    targetMember: 'majed-alamer',
    worldId: 'one-piece',
    status: 'open',
    tags: ['ون بيس', 'نهاية'],
  },
  {
    id: 'fq-002',
    text: 'ما هو أفضل أنمي شاهدتموه هذا الموسم؟',
    askedBy: 'مشترك',
    targetMember: null,
    worldId: null,
    status: 'open',
    tags: ['أنمي', 'موسمي'],
  },
  {
    id: 'fq-003',
    text: 'هل تعتقدون أن بوني هي ابنة كوما؟',
    askedBy: 'نظري',
    targetMember: 'majed-alamer',
    worldId: 'one-piece',
    status: 'open',
    tags: ['نظريات', 'بوني', 'ون بيس'],
  },
  {
    id: 'fq-004',
    text: 'أي شخصية من ون بيس تشبه كل عضو في الطاقم؟',
    askedBy: 'مشترك',
    targetMember: null,
    worldId: 'one-piece',
    status: 'open',
    tags: ['ون بيس', 'طاقم', 'مقارنة'],
  },
  {
    id: 'fq-005',
    text: 'ما هي أكثر مانجا تتابعونها حالياً؟',
    askedBy: 'مشترك',
    targetMember: 'ibrahim-alamer',
    worldId: null,
    status: 'open',
    tags: ['مانجا', 'متابعة'],
  },
  {
    id: 'fq-006',
    text: 'من هي الشخصية الأكثر تطوراً في سلسلة ناروتو برأيكم؟',
    askedBy: 'مشترك',
    targetMember: 'mohammed-alnami',
    worldId: 'naruto',
    status: 'open',
    tags: ['ناروتو', 'شخصيات', 'تطور'],
  },
  {
    id: 'fq-007',
    text: 'هل كانت نهاية هجوم العمالقة منطقية ومقنعة؟',
    askedBy: 'مشترك',
    targetMember: null,
    worldId: 'attack-on-titan',
    status: 'open',
    tags: ['هجوم العمالقة', 'نهاية', 'نقاش'],
  },
  {
    id: 'fq-008',
    text: 'من الأقوى في رأيكم: غوجو أم سوكونا؟',
    askedBy: 'مشترك',
    targetMember: 'majed-alamer',
    worldId: 'jujutsu-kaisen',
    status: 'open',
    tags: ['جوجوتسو كايزن', 'قوة', 'نقاش'],
  },
  {
    id: 'fq-009',
    text: 'ما أفضل موسم أنمي في السنة الماضية من وجهة نظركم؟',
    askedBy: 'مشترك',
    targetMember: null,
    worldId: null,
    status: 'open',
    tags: ['أنمي', 'موسمي', 'ترشيحات'],
  },
  {
    id: 'fq-010',
    text: 'ما التحدي القادم الذي تخططون له في AI Show؟',
    askedBy: 'مشترك',
    targetMember: 'mohammed-alnami',
    worldId: null,
    status: 'open',
    tags: ['طاقم', 'تحديات', 'خطط'],
  },
];

/** Get all open questions */
export function getOpenQuestions() {
  return questions.filter(q => q.status === 'open');
}

/** Get questions for a member */
export function getQuestionsForMember(memberId) {
  return questions.filter(q => q.targetMember === memberId);
}
