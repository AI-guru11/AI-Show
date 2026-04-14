/**
 * screens/challenge-detail.js — challenge preview before play
 */

import { getChallenge }        from '../data/challenges.js';
import { getMember }           from '../data/members.js';
import { getWorld }            from '../data/worlds.js';
import { wrapPage, subHeader } from '../js/shared/page-shell.js';
import { navigate }            from '../js/core/dom.js';

export function render({ challengeId } = {}) {
  const c = getChallenge(challengeId);

  if (!c) {
    return wrapPage(`
      <div class="empty-state">
        <div class="empty-state-icon">🎯</div>
        <p class="fw-semi">التحدي غير موجود</p>
      </div>`);
  }

  const member = c.relatedMember ? getMember(c.relatedMember) : null;
  const world  = c.worldId       ? getWorld(c.worldId)        : null;

  const backPath = world ? `/worlds/${world.id}` : '/';

  const html = `
    ${subHeader('التحدي', backPath)}

    <div class="hero-strip">
      <p class="hero-eyebrow">${c.formatTypeLabel}</p>
      <h1 class="hero-title">${c.title}</h1>
      <p class="hero-subtitle">${c.description}</p>
    </div>

    <div class="stack mb-6">
      <div class="flex justify-between items-center p-4 bg-2 rounded-lg">
        <span class="text-sm text-muted">الصعوبة</span>
        <span class="badge badge-accent">${c.difficultyLabel}</span>
      </div>
      <div class="flex justify-between items-center p-4 bg-2 rounded-lg">
        <span class="text-sm text-muted">الوقت المتوقع</span>
        <span class="text-sm fw-semi">${c.estimatedDuration} دقائق</span>
      </div>
      <div class="flex justify-between items-center p-4 bg-2 rounded-lg">
        <span class="text-sm text-muted">عدد الأسئلة</span>
        <span class="text-sm fw-semi">${c.questions.length} أسئلة</span>
      </div>
      ${member ? `
      <div class="flex justify-between items-center p-4 bg-2 rounded-lg">
        <span class="text-sm text-muted">العضو المرتبط</span>
        <button class="text-sm fw-semi text-accent pointer" data-nav="/crew/${member.id}">
          ${member.name}
        </button>
      </div>` : ''}
      ${world ? `
      <div class="flex justify-between items-center p-4 bg-2 rounded-lg">
        <span class="text-sm text-muted">العالم</span>
        <button class="text-sm fw-semi pointer" data-nav="/worlds/${world.id}">
          ${world.emoji} ${world.title}
        </button>
      </div>` : ''}
    </div>

    <button class="btn btn-primary btn-full" id="start-challenge">
      ابدأ التحدي
    </button>`;

  return wrapPage(html);
}

export function mount({ challengeId } = {}) {
  document.getElementById('start-challenge')?.addEventListener('click', () => {
    navigate(`/play/${challengeId}`);
  });

  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
