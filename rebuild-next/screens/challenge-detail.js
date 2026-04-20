/**
 * screens/challenge-detail.js — challenge preview before play
 * Step 6: challenge identity dominates; meta as compact pills; clear CTA.
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
        <button class="btn btn-ghost mt-4"
                onclick="window.location.hash='/'">العودة للرئيسية</button>
      </div>`);
  }

  const member   = c.relatedMember ? getMember(c.relatedMember) : null;
  const world    = c.worldId       ? getWorld(c.worldId)        : null;
  const backPath = world ? `/worlds/${world.id}` : '/';
  const backLabel = world ? world.title : 'التحديات';

  // ── Context pills (world / member) ───────────────────────
  const contextItems = [
    world && `
      <button class="cd-context-btn" data-nav="/worlds/${world.id}"
              aria-label="عالم: ${world.title}">
        <span aria-hidden="true">${world.emoji}</span>
        <span>${world.title}</span>
      </button>`,
    member && `
      <button class="cd-context-btn" data-nav="/crew/${member.id}"
              aria-label="العضو: ${member.name}">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>${member.name}</span>
      </button>`,
  ].filter(Boolean).join('');

  const html = `
    ${subHeader(backLabel, backPath)}

    <div class="cd-hero">
      <span class="badge badge-accent">${c.formatTypeLabel}</span>
      <h1 class="cd-title">${c.title}</h1>
      <p class="cd-desc">${c.description}</p>
    </div>

    <div class="cd-meta">
      <div class="cd-meta-pill">
        <span class="cd-meta-val">${c.questions.length}</span>
        <span class="cd-meta-label">أسئلة</span>
      </div>
      <div class="cd-meta-pill">
        <span class="cd-meta-val">${c.estimatedDuration}</span>
        <span class="cd-meta-label">دقائق</span>
      </div>
      <div class="cd-meta-pill">
        <span class="cd-meta-val">${c.difficultyLabel}</span>
        <span class="cd-meta-label">الصعوبة</span>
      </div>
    </div>

    ${contextItems ? `<div class="cd-context">${contextItems}</div>` : ''}

    <button class="btn btn-primary btn-full" id="start-challenge"
            style="margin-block-start:var(--sp-2)">
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
