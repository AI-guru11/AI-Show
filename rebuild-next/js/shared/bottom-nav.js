/**
 * bottom-nav.js — 4-tab bottom navigation.
 * Rendered once; active state updated on each route change.
 */

import { NAV_TABS } from '../core/routes.js';
import { navigate } from '../core/dom.js';

const ICONS = {
  home: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
  users: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  message: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
};

export function renderBottomNav() {
  const items = NAV_TABS.map(tab => `
    <button
      class="nav-item"
      data-nav-key="${tab.key}"
      data-path="${tab.path}"
      aria-label="${tab.label}"
    >
      ${ICONS[tab.icon] || ''}
      <span>${tab.label}</span>
    </button>
  `).join('');

  return `<nav class="bottom-nav" role="navigation" aria-label="التنقل الرئيسي">${items}</nav>`;
}

/** Called by router after each navigation — highlights active tab */
export function updateNav(activeKey) {
  document.querySelectorAll('.nav-item').forEach(btn => {
    const isActive = btn.dataset.navKey === activeKey;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

/** Wire click handlers — called after renderBottomNav is in DOM */
export function mountBottomNav() {
  document.getElementById('shell-nav')?.addEventListener('click', e => {
    const btn = e.target.closest('.nav-item');
    if (!btn) return;
    navigate(btn.dataset.path);
  });
}
