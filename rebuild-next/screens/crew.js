/**
 * screens/crew.js — الطاقم
 * Two-tier hierarchy:
 *   - Founders (3): full card with specialties — prominent
 *   - Presenters (N): compact list row — readable, scalable
 */

import { members }  from '../data/members.js';
import { wrapPage } from '../js/shared/page-shell.js';
import { navigate } from '../js/core/dom.js';

const CHEVRON = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true" style="flex-shrink:0;transform:scaleX(-1)">
    <path d="M9 18l6-6-6-6"/>
  </svg>`;

function founderCard(m) {
  const tags = m.vibeTags.map(t =>
    `<span class="badge badge-default">${t}</span>`).join('');
  return `
    <button class="member-card" data-nav="/crew/${m.id}">
      <div class="member-avatar">${m.initials}</div>
      <div class="member-info">
        <p class="member-name">${m.name}</p>
        <p class="member-role">${m.role}</p>
        <div class="flex gap-1 flex-wrap mt-2">${tags}</div>
      </div>
      ${CHEVRON}
    </button>`;
}

function presenterRow(m) {
  return `
    <button class="crew-list-item" data-nav="/crew/${m.id}">
      <div class="member-avatar crew-list-avatar">${m.initials}</div>
      <div class="member-info">
        <p class="member-name">${m.name}</p>
        <p class="member-role">${m.role}</p>
      </div>
      ${CHEVRON}
    </button>`;
}

export function render() {
  const founders   = members.filter(m => m.isFounder);
  const presenters = members.filter(m => !m.isFounder);

  const html = `
    <div class="section-header mb-2">
      <h1 class="section-title">الطاقم</h1>
    </div>
    <p class="text-sm text-muted mb-6">
      ${members.length} عضو — تعرّف على طاقم AI Show.
    </p>

    <div class="page-section">
      <div class="section-header mb-4">
        <h2 class="text-xs fw-semi" style="color:var(--clr-accent);letter-spacing:0.05em;text-transform:uppercase">
          المؤسسون
        </h2>
      </div>
      <div class="stack">${founders.map(founderCard).join('')}</div>
    </div>

    <div class="page-section">
      <div class="section-header mb-4">
        <h2 class="text-xs fw-semi" style="color:var(--clr-text-2);letter-spacing:0.05em;text-transform:uppercase">
          المقدمون · ${presenters.length}
        </h2>
      </div>
      <div class="stack">${presenters.map(presenterRow).join('')}</div>
    </div>`;

  return wrapPage(html);
}

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
