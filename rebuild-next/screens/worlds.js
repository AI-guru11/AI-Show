/**
 * screens/worlds.js — العوالم browse surface
 */

import { worlds }   from '../data/worlds.js';
import { wrapPage } from '../js/shared/page-shell.js';
import { navigate } from '../js/core/dom.js';

export function render() {
  const items = worlds.map(w => `
    <button class="card pointer" data-nav="/worlds/${w.id}" style="display:flex;align-items:center;gap:var(--sp-4);padding:var(--sp-4)">
      <div style="width:52px;height:52px;border-radius:var(--r-lg);background:var(--clr-bg-3);
                  display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0">
        ${w.emoji}
      </div>
      <div style="flex:1;min-width:0;text-align:right">
        <p class="fw-semi text-sm truncate">${w.title}</p>
        <p class="text-xs text-dim mt-1">${w.typeLabel} · ${w.frequency}</p>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--clr-text-2)"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           style="flex-shrink:0;transform:scaleX(-1)">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>`).join('');

  const html = `
    <div class="section-header">
      <h1 class="section-title">العوالم</h1>
    </div>
    <p class="text-sm text-muted mb-6">تصفح سلاسل AI Show حسب العالم.</p>
    <div class="stack">${items}</div>`;

  return wrapPage(html);
}

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
