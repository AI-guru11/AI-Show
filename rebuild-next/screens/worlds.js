/**
 * screens/worlds.js — العوالم — anime universe catalog
 *
 * Browses anime franchises, not channel formats.
 * Each item = one anime universe (One Piece, Naruto, etc.)
 */

import { worlds }   from '../data/worlds.js';
import { wrapPage } from '../js/shared/page-shell.js';
import { navigate } from '../js/core/dom.js';

const CHEVRON = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true" style="flex-shrink:0;transform:scaleX(-1)">
    <path d="M9 18l6-6-6-6"/>
  </svg>`;

export function render() {
  const items = worlds.map(w => `
    <button class="world-item" data-nav="/worlds/${w.id}" aria-label="${w.title}">
      <div class="world-item-icon" aria-hidden="true">${w.emoji}</div>
      <div class="world-item-body">
        <p class="world-item-title">${w.title}</p>
        <p class="world-item-en">${w.titleEn}</p>
      </div>
      <span class="badge ${w.status === 'ongoing' ? 'badge-accent' : 'badge-default'}">
        ${w.statusLabel}
      </span>
      ${CHEVRON}
    </button>`).join('');

  const html = `
    <div class="section-header">
      <h1 class="section-title">العوالم</h1>
    </div>
    <p class="text-sm text-muted mb-6">اختر عالماً أنمياً للاستكشاف</p>
    <div class="stack">${items}</div>`;

  return wrapPage(html);
}

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
