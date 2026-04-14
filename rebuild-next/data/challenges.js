/**
 * data/challenges.js — interactive challenges (play flow entry points)
 * Derived from legacy data/challenges.json.
 */

export const challenges = [
  {
    id: 'op-lore-001',
    title: 'تحدي لور ون بيس',
    description: 'أسئلة أولية حول الشخصيات، الأحداث، والربط بين النظريات.',
    formatType: 'multiple-choice',
    formatTypeLabel: 'Quiz',
    difficulty: 'medium',
    difficultyLabel: 'متوسط',
    estimatedDuration: 6,
    worldId: 'one-piece',
    relatedMember: 'majed-alamer',
    questions: [
      {
        id: 'q1',
        text: 'من هو قبطان قراصنة قبعة القش؟',
        options: [
          { id: 'a', text: 'زورو' },
          { id: 'b', text: 'لوفي' },
          { id: 'c', text: 'نامي' },
          { id: 'd', text: 'سانجي' },
        ],
        correctId: 'b',
      },
      {
        id: 'q2',
        text: 'ما هو اسم الجزيرة التي يبحث عنها قراصنة قبعة القش؟',
        options: [
          { id: 'a', text: 'ألاباستا' },
          { id: 'b', text: 'واتر سفن' },
          { id: 'c', text: 'One Piece' },
          { id: 'd', text: 'فيشمان آيلاند' },
        ],
        correctId: 'c',
      },
      {
        id: 'q3',
        text: 'كم عدد أفراد طاقم قبعة القش الرئيسيين؟',
        options: [
          { id: 'a', text: '7' },
          { id: 'b', text: '9' },
          { id: 'c', text: '10' },
          { id: 'd', text: '11' },
        ],
        correctId: 'c',
      },
    ],
  },
  {
    id: 'veto-round-001',
    title: 'جولة فيتو تمهيدية',
    description: 'تجربة أولية مستوحاة من فيتو: سؤال، اعتراض، وتحدي رأي.',
    formatType: 'cast-driven',
    formatTypeLabel: 'Veto',
    difficulty: 'medium',
    difficultyLabel: 'متوسط',
    estimatedDuration: 5,
    worldId: 'one-piece',
    relatedMember: 'mohammed-alnami',
    questions: [
      {
        id: 'q1',
        text: 'أي شخصية تعتبر الأقوى في ون بيس حتى الآن؟',
        options: [
          { id: 'a', text: 'إيم' },
          { id: 'b', text: 'روجر' },
          { id: 'c', text: 'وايتبيرد' },
          { id: 'd', text: 'كاييدو' },
        ],
        correctId: 'a',
      },
      {
        id: 'q2',
        text: 'ما هو أقوى تحالف في تاريخ ون بيس؟',
        options: [
          { id: 'a', text: 'تحالف الشانكس' },
          { id: 'b', text: 'تحالف وايتبيرد' },
          { id: 'c', text: 'تحالف لوفي-لو' },
          { id: 'd', text: 'تحالف إيم' },
        ],
        correctId: 'b',
      },
    ],
  },
  {
    id: 'guess-character-001',
    title: 'اعرف الشخصية',
    description: 'تحدٍ بصري مبدئي للتعرف على الشخصيات من الوصف.',
    formatType: 'guess-character',
    formatTypeLabel: 'Character',
    difficulty: 'easy',
    difficultyLabel: 'سهل',
    estimatedDuration: 4,
    worldId: 'one-piece',
    relatedMember: 'saud-alomar',
    questions: [
      {
        id: 'q1',
        text: 'شخصية تمتلك قوة المطاط وتحلم بأن تصبح ملك القراصنة؟',
        options: [
          { id: 'a', text: 'ناروتو' },
          { id: 'b', text: 'غوكو' },
          { id: 'c', text: 'لوفي' },
          { id: 'd', text: 'إيتشي' },
        ],
        correctId: 'c',
      },
    ],
  },
];

/** Get challenge by id */
export function getChallenge(id) {
  return challenges.find(c => c.id === id) ?? null;
}

/** Get challenges for a world */
export function getChallengesByWorld(worldId) {
  return challenges.filter(c => c.worldId === worldId);
}
