/**
 * screens/crew.js — الطاقم list surface
 */

import { members }  from '../data/members.js';
import { wrapPage } from '../js/shared/page-shell.js';
import { navigate } from '../js/core/dom.js';

export function render() {
  const founders = members.filter(m => m.isFounder);
  const others   = members.filter(m => !m.isFounder);

  function memberItem(m) {
    return `
      <button class="member-card" data-nav="/crew/${m.id}">
        <div class="member-avatar">${m.initials}</div>
        <div class="member-info">
          <p class="member-name">${m.name}</p>
          <p class="member-role">${m.role}</p>
          <div class="flex gap-1 flex-wrap mt-2">
            ${m.vibeTags.map(t => `<span class="badge badge-default">${t}</span>`).join('')}
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="var(--clr-text-2)" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round"
             style="flex-shrink:0;transform:scaleX(-1)">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>`;
  }

  const html = `
    <div class="section-header mb-2">
      <h1 class="section-title">الطاقم</h1>
    </div>
    <p class="text-sm text-muted mb-6">تعرّف على أعضاء AI Show.</p>

    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title text-sm text-accent">المؤسسون</h2>
      </div>
      <div class="stack">${founders.map(memberItem).join('')}</div>
    </div>

    ${others.length ? `
    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title text-sm text-dim">بقية الطاقم</h2>
      </div>
      <div class="stack">${others.map(memberItem).join('')}</div>
    </div>` : ''}`;

  return wrapPage(html);
}

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
