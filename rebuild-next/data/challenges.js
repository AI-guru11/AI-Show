/**
 * data/challenges.js — interactive challenges (play flow entry points)
 * Each challenge belongs to one anime world via worldId.
 * Step 3.1: added one challenge per remaining world so no world lands empty.
 */

export const challenges = [

  // ── One Piece ────────────────────────────────────────────

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
        text: 'ما هو اسم الكنز الذي يبحث عنه قراصنة قبعة القش؟',
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

  // ── Naruto ───────────────────────────────────────────────

  {
    id: 'naruto-lore-001',
    title: 'تحدي لور ناروتو',
    description: 'أسئلة تمهيدية حول شخصيات وأحداث عالم ناروتو.',
    formatType: 'multiple-choice',
    formatTypeLabel: 'Quiz',
    difficulty: 'easy',
    difficultyLabel: 'سهل',
    estimatedDuration: 4,
    worldId: 'naruto',
    relatedMember: 'mohammed-alnami',
    questions: [
      {
        id: 'q1',
        text: 'ما هو المنصب الذي يحلم ناروتو بالوصول إليه؟',
        options: [
          { id: 'a', text: 'ميزوكاجي' },
          { id: 'b', text: 'هوكاجي' },
          { id: 'c', text: 'راكاجي' },
          { id: 'd', text: 'تسوتشيكاجي' },
        ],
        correctId: 'b',
      },
      {
        id: 'q2',
        text: 'كم عدد ذيول الوحش المحبوس في جسد ناروتو؟',
        options: [
          { id: 'a', text: '7' },
          { id: 'b', text: '8' },
          { id: 'c', text: '9' },
          { id: 'd', text: '10' },
        ],
        correctId: 'c',
      },
    ],
  },

  // ── Attack on Titan ──────────────────────────────────────

  {
    id: 'aot-lore-001',
    title: 'تحدي لور هجوم العمالقة',
    description: 'أسئلة تمهيدية حول الشخصيات والجدران وعالم هجوم العمالقة.',
    formatType: 'multiple-choice',
    formatTypeLabel: 'Quiz',
    difficulty: 'easy',
    difficultyLabel: 'سهل',
    estimatedDuration: 4,
    worldId: 'attack-on-titan',
    relatedMember: 'mohammed-alnami',
    questions: [
      {
        id: 'q1',
        text: 'ما هو اسم الجدار الخارجي الذي يخترقه العمالقة في بداية القصة؟',
        options: [
          { id: 'a', text: 'جدار شينا' },
          { id: 'b', text: 'جدار روز' },
          { id: 'c', text: 'جدار ماريا' },
          { id: 'd', text: 'جدار إيرين' },
        ],
        correctId: 'c',
      },
      {
        id: 'q2',
        text: 'إلى أي فيلق ينضم إيرين ياغر بعد تخرجه؟',
        options: [
          { id: 'a', text: 'الحرس الملكي' },
          { id: 'b', text: 'فيلق الشرطة' },
          { id: 'c', text: 'فيلق المسح' },
          { id: 'd', text: 'فيلق المشاة' },
        ],
        correctId: 'c',
      },
    ],
  },

  // ── Jujutsu Kaisen ───────────────────────────────────────

  {
    id: 'jjk-lore-001',
    title: 'تحدي لور جوجوتسو كايزن',
    description: 'أسئلة تمهيدية حول عالم الساحرين والملاعين في جوجوتسو كايزن.',
    formatType: 'multiple-choice',
    formatTypeLabel: 'Quiz',
    difficulty: 'easy',
    difficultyLabel: 'سهل',
    estimatedDuration: 4,
    worldId: 'jujutsu-kaisen',
    relatedMember: 'majed-alamer',
    questions: [
      {
        id: 'q1',
        text: 'من هو الساحر الأقوى في عالم جوجوتسو كايزن؟',
        options: [
          { id: 'a', text: 'يوجي إيتادوري' },
          { id: 'b', text: 'ميغومي فوشيغورو' },
          { id: 'c', text: 'ساتورو غوجو' },
          { id: 'd', text: 'يوتا أوككوتسو' },
        ],
        correctId: 'c',
      },
      {
        id: 'q2',
        text: 'ما هو اسم الملعون الأسطوري الذي يبتلعه يوجي في بداية القصة؟',
        options: [
          { id: 'a', text: 'ماهورا' },
          { id: 'b', text: 'سوكونا' },
          { id: 'c', text: 'حانامي' },
          { id: 'd', text: 'جوغو' },
        ],
        correctId: 'b',
      },
    ],
  },

  // ── Demon Slayer ─────────────────────────────────────────

  {
    id: 'ds-lore-001',
    title: 'تحدي لور قاتل الشياطين',
    description: 'أسئلة تمهيدية حول عالم صائدي الشياطين وشخصياته.',
    formatType: 'multiple-choice',
    formatTypeLabel: 'Quiz',
    difficulty: 'easy',
    difficultyLabel: 'سهل',
    estimatedDuration: 4,
    worldId: 'demon-slayer',
    relatedMember: 'ibrahim-alamer',
    questions: [
      {
        id: 'q1',
        text: 'ما هو أسلوب التنفس الذي يتقنه تانجيرو في بداية رحلته؟',
        options: [
          { id: 'a', text: 'نفس النار' },
          { id: 'b', text: 'نفس الحجر' },
          { id: 'c', text: 'نفس الماء' },
          { id: 'd', text: 'نفس الريح' },
        ],
        correctId: 'c',
      },
      {
        id: 'q2',
        text: 'من هو الشيطان المسؤول عن تحويل عائلة كاميادو؟',
        options: [
          { id: 'a', text: 'أكازا' },
          { id: 'b', text: 'دوما' },
          { id: 'c', text: 'موزان كيبوتسوجي' },
          { id: 'd', text: 'ناكيم' },
        ],
        correctId: 'c',
      },
    ],
  },

  // ── Dragon Ball ──────────────────────────────────────────

  {
    id: 'db-lore-001',
    title: 'تحدي لور دراغون بول',
    description: 'أسئلة تمهيدية حول شخصيات وأحداث عالم دراغون بول.',
    formatType: 'multiple-choice',
    formatTypeLabel: 'Quiz',
    difficulty: 'easy',
    difficultyLabel: 'سهل',
    estimatedDuration: 4,
    worldId: 'dragon-ball',
    relatedMember: 'mohammed-alnami',
    questions: [
      {
        id: 'q1',
        text: 'كم عدد كرات التنين اللازمة لاستدعاء التنين وتحقيق الأمنية؟',
        options: [
          { id: 'a', text: '5' },
          { id: 'b', text: '6' },
          { id: 'c', text: '7' },
          { id: 'd', text: '9' },
        ],
        correctId: 'c',
      },
      {
        id: 'q2',
        text: 'ما هو الاسم السايان الحقيقي لغوكو؟',
        options: [
          { id: 'a', text: 'راديتز' },
          { id: 'b', text: 'فيغيتا' },
          { id: 'c', text: 'كاكاروت' },
          { id: 'd', text: 'نابا' },
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
