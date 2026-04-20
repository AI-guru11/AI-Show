/**
 * screens/fan-questions.js — أسئلة الجمهور
 * Step 5: real content surface — question text is primary visual focus.
 *
 * Card anatomy (top → bottom):
 *   .fq-world  — world tag (tappable → /worlds/:id), skipped if null
 *   .fq-text   — question text (primary, large)
 *   .fq-footer — member attribution (tappable → /crew/:id) + topic tags
 */

import { getOpenQuestions }  from '../data/questions.js';
import { getWorld }          from '../data/worlds.js';
import { getMember }         from '../data/members.js';
import { wrapPage }          from '../js/shared/page-shell.js';
import { navigate }          from '../js/core/dom.js';

// ── Card renderer ─────────────────────────────────────────────────────────────

function questionCard(q) {
  const world  = q.worldId ? getWorld(q.worldId) : null;
  const member = q.targetMember ? getMember(q.targetMember) : null;

  const worldTag = world
    ? `<button class="fq-world" data-nav="/worlds/${world.id}"
               aria-label="عالم: ${world.title}">
         <span aria-hidden="true">${world.emoji}</span>
         <span>${world.title}</span>
       </button>`
    : '';

  const memberBtn = member
    ? `<button class="fq-member" data-nav="/crew/${member.id}"
               aria-label="موجه إلى: ${member.name}">
         <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true" style="opacity:.6">
           <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
           <circle cx="12" cy="7" r="4"/>
         </svg>
         ${member.name}
       </button>`
    : '';

  const tags = q.tags.length
    ? `<div class="flex gap-1 flex-wrap">
         ${q.tags.map(t => `<span class="badge fq-tag">${t}</span>`).join('')}
       </div>`
    : '';

  const footer = (memberBtn || tags)
    ? `<div class="fq-footer">${memberBtn}${tags}</div>`
    : '';

  return `
    <div class="fq-card" role="article">
      ${worldTag}
      <p class="fq-text">${q.text}</p>
      ${footer}
    </div>`;
}

// ── Main render ───────────────────────────────────────────────────────────────

export function render() {
  const open = getOpenQuestions();

  const cards = open.map(questionCard).join('');

  const html = `
    <div class="section-header mb-2">
      <h1 class="section-title">أسئلة الجمهور</h1>
      <span class="badge badge-accent">${open.length}</span>
    </div>
    <p class="text-sm text-muted mb-6">
      أسئلة يطرحها الجمهور على الطاقم.
    </p>

    <div class="stack">${cards}</div>

    <p class="text-xs text-dim" style="text-align:center;padding:var(--sp-8) var(--sp-4)">
      إرسال الأسئلة — قريباً
    </p>`;

  return wrapPage(html);
}

// ── Event wiring ──────────────────────────────────────────────────────────────

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
