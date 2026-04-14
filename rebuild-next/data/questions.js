/**
 * data/questions.js — Fan Questions surface (أسئلة الجمهور)
 * Placeholder questions submitted by fans.
 */

export const questions = [
  {
    id: 'fq-001',
    text: 'متى تتوقعون انتهاء ون بيس؟',
    askedBy: 'مشترك익명',
    targetMember: 'majed-alamer',
    worldId: 'veto-one-piece',
    status: 'open',
    tags: ['ون بيس', 'نهاية'],
  },
  {
    id: 'fq-002',
    text: 'ما هو أفضل أنمي شاهدتموه هذا الموسم؟',
    askedBy: 'anonymous',
    targetMember: null,
    worldId: 'anime-dewaniya',
    status: 'open',
    tags: ['أنمي', 'موسمي'],
  },
  {
    id: 'fq-003',
    text: 'هل تعتقدون أن بوني هي ابنة كوما؟',
    askedBy: 'نظري익명',
    targetMember: 'majed-alamer',
    worldId: 'theory-one-piece',
    status: 'open',
    tags: ['نظريات', 'بوني', 'ون بيس'],
  },
  {
    id: 'fq-004',
    text: 'أي شخصية من ون بيس تشبه كل عضو في الطاقم؟',
    askedBy: 'anonymous',
    targetMember: null,
    worldId: 'veto-mixed',
    status: 'open',
    tags: ['ون بيس', 'طاقم', 'مقارنة'],
  },
  {
    id: 'fq-005',
    text: 'ما هي أكثر مانجا تتابعونها حالياً؟',
    askedBy: 'anonymous',
    targetMember: 'ibrahim-alamer',
    worldId: 'manga-dewaniya',
    status: 'open',
    tags: ['مانجا', 'متابعة'],
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
