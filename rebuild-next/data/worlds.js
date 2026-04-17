/**
 * data/worlds.js — العوالم (anime universes)
 *
 * Architecture rule: each world = one anime franchise.
 * Channel formats (Veto, Weekly, Dewaniya) are NOT worlds.
 * Channel formats may appear on Home but never in this catalog.
 *
 * Fields:
 *   id             — kebab-case franchise slug
 *   title          — Arabic franchise name
 *   titleEn        — English franchise name (for recognition)
 *   emoji          — representative icon
 *   status         — 'ongoing' | 'completed'
 *   statusLabel    — Arabic status label
 *   description    — short Arabic description of the universe
 *   relatedMembers — crew member IDs who cover this anime
 *   imageThumb     — local image path for Home worlds strip
 */

export const worlds = [
  {
    id: 'one-piece',
    title: 'ون بيس',
    titleEn: 'One Piece',
    emoji: '🏴‍☠️',
    status: 'ongoing',
    statusLabel: 'مستمر',
    description: 'ملحمة القراصنة الكبرى — مغامرات لوفي وطاقم قبعة القش في رحلتهم نحو كنز الملك روجر.',
    relatedMembers: ['majed-alamer', 'mohammed-alnami', 'ibrahim-alamer'],
    imageThumb: 'assets/worlds/OP-thumb.webp',
  },
  {
    id: 'naruto',
    title: 'ناروتو',
    titleEn: 'Naruto',
    emoji: '🍥',
    status: 'completed',
    statusLabel: 'مكتمل',
    description: 'رحلة ناروتو أوزوماكي من صبي منبوذ إلى أعظم هوكاجي في تاريخ قرية الورقة المخفية.',
    relatedMembers: ['mohammed-alnami', 'ibrahim-alamer'],
    imageThumb: 'assets/worlds/Naruto-thumb.webp',
  },
  {
    id: 'attack-on-titan',
    title: 'هجوم العمالقة',
    titleEn: 'Attack on Titan',
    emoji: '⚔️',
    status: 'completed',
    statusLabel: 'مكتمل',
    description: 'في عالم تحيط به جدران عملاقة، تناضل البشرية بحثاً عن الحرية والحقيقة خلف الأسوار.',
    relatedMembers: ['mohammed-alnami', 'saud-alomar'],
    imageThumb: 'assets/worlds/AOT-thumb.webp',
  },
  {
    id: 'jujutsu-kaisen',
    title: 'جوجوتسو كايزن',
    titleEn: 'Jujutsu Kaisen',
    emoji: '🩸',
    status: 'ongoing',
    statusLabel: 'مستمر',
    description: 'يوجي إيتادوري يدخل عالم الساحرين والملاعين بعد أن يبتلع إصبع الملعون ريو سوكونا.',
    relatedMembers: ['majed-alamer', 'saud-alomar'],
    imageThumb: 'assets/worlds/JJK-thumb.webp',
  },
  {
    id: 'demon-slayer',
    title: 'قاتل الشياطين',
    titleEn: 'Demon Slayer',
    emoji: '🔥',
    status: 'completed',
    statusLabel: 'مكتمل',
    description: 'تانجيرو كاميادو يسلك طريق صائدي الشياطين بعد أن تحولت أخته نيزوكو إلى شيطان.',
    relatedMembers: ['ibrahim-alamer', 'saud-alomar'],
    imageThumb: 'assets/worlds/DS-thumb.webp',
  },
  {
    id: 'dragon-ball',
    title: 'دراغون بول',
    titleEn: 'Dragon Ball',
    emoji: '⚡',
    status: 'ongoing',
    statusLabel: 'مستمر',
    description: 'ملحمة غوكو الخالدة — من مغامرات الطفل إلى أقوى المقاتلين في الأكوان السبعة.',
    relatedMembers: ['mohammed-alnami', 'majed-alamer'],
    imageThumb: 'assets/worlds/DB-thumb.webp',
  },
];

/** Get world by id */
export function getWorld(id) {
  return worlds.find(w => w.id === id) ?? null;
}