/**
 * screens/world-detail.js — single anime universe detail view
 *
 * Shows the anime franchise identity, crew who cover it,
 * and challenge entry points for this world.
 */

import { getWorld }              from '../data/worlds.js';
import { getChallengesByWorld }  from '../data/challenges.js';
import { getMember }             from '../data/members.js';
import { wrapPage, subHeader }   from '../js/shared/page-shell.js';
import { navigate }              from '../js/core/dom.js';

export function render({ worldId } = {}) {
  const world = getWorld(worldId);

  if (!world) {
    return wrapPage(`
      <div class="empty-state">
        <div class="empty-state-icon">🌍</div>
        <p class="fw-semi">العالم غير موجود</p>
        <button class="btn btn-ghost mt-4"
                onclick="window.location.hash='/worlds'">العودة للعوالم</button>
      </div>`);
  }

  const worldChallenges = getChallengesByWorld(worldId);

  const membersHTML = world.relatedMembers.map(mid => {
    const m = getMember(mid);
    if (!m) return '';
    return `
      <button class="member-card" data-nav="/crew/${m.id}">
        <div class="member-avatar">${m.initials}</div>
        <div class="member-info">
          <p class="member-name">${m.name}</p>
          <p class="member-role">${m.role}</p>
        </div>
      </button>`;
  }).join('');

  const challengesHTML = worldChallenges.length
    ? worldChallenges.map(c => `
        <button class="challenge-card pointer" data-nav="/challenges/${c.id}">
          <div class="flex justify-between items-center mb-2">
            <span class="badge badge-accent">${c.formatTypeLabel}</span>
            <span class="text-xs text-dim">${c.estimatedDuration} دقائق</span>
          </div>
          <p class="challenge-title">${c.title}</p>
          <p class="challenge-desc">${c.description}</p>
        </button>`).join('')
    : `<div class="empty-state">
        <p class="text-dim text-sm">لا توجد تحديات لهذا العالم بعد</p>
       </div>`;

  const html = `
    ${subHeader(world.title, '/worlds')}

    <div class="hero-strip" style="margin-block-end:var(--sp-6)">
      <div style="font-size:3rem;margin-block-end:var(--sp-3)"
           aria-hidden="true">${world.emoji}</div>
      <div style="display:flex;align-items:center;gap:var(--sp-2);margin-block-end:var(--sp-3)">
        <span class="badge ${world.status === 'ongoing' ? 'badge-accent' : 'badge-default'}">
          ${world.statusLabel}
        </span>
        <span class="text-xs text-dim">${world.titleEn}</span>
      </div>
      <h2 class="hero-title">${world.title}</h2>
      <p class="hero-subtitle">${world.description}</p>
    </div>

    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title">الطاقم المتخصص</h2>
      </div>
      <div class="stack">${membersHTML || '<p class="text-dim text-sm">—</p>'}</div>
    </div>

    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title">التحديات</h2>
      </div>
      <div class="stack">${challengesHTML}</div>
    </div>`;

  return wrapPage(html);
}

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
