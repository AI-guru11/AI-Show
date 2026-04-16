/**
 * screens/member.js — single crew member profile
 *
 * Sections (rendered only when content exists):
 *   Profile hero — identity, specialties, social link
 *   Linked worlds — anime universes this member covers
 *   Linked challenges — challenges associated with this member
 *   Fan questions — questions addressed to this member
 */

import { getMember }              from '../data/members.js';
import { getWorld }               from '../data/worlds.js';
import { challenges }             from '../data/challenges.js';
import { getQuestionsForMember }  from '../data/questions.js';
import { wrapPage, subHeader }    from '../js/shared/page-shell.js';
import { navigate }               from '../js/core/dom.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

const EXTERNAL_ICON = `
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>`;

const CHEVRON = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true" style="flex-shrink:0;transform:scaleX(-1)">
    <path d="M9 18l6-6-6-6"/>
  </svg>`;

// ── Section renderers ─────────────────────────────────────────────────────────

function worldsSection(worldIds) {
  if (!worldIds.length) return '';
  const pills = worldIds.map(wid => {
    const w = getWorld(wid);
    if (!w) return '';
    return `
      <button class="home-world-pill" data-nav="/worlds/${w.id}" aria-label="${w.title}">
        <span class="home-world-pill-emoji" aria-hidden="true">${w.emoji}</span>
        <span class="home-world-pill-label">${w.title}</span>
      </button>`;
  }).filter(Boolean).join('');
  if (!pills) return '';
  return `
    <div class="page-section">
      <div class="section-header mb-3">
        <h2 class="section-title">عوالم مرتبطة</h2>
      </div>
      <div class="h-scroll">${pills}</div>
    </div>`;
}

function challengesSection(memberChallenges) {
  if (!memberChallenges.length) return '';
  const cards = memberChallenges.map(c => `
    <button class="member-challenge-row" data-nav="/challenges/${c.id}">
      <div style="flex:1;min-width:0;text-align:right">
        <div class="flex gap-2 items-center mb-1">
          <span class="badge badge-accent">${c.formatTypeLabel}</span>
          <span class="text-xs text-dim">${c.difficultyLabel} · ${c.estimatedDuration} دقائق</span>
        </div>
        <p class="text-sm fw-semi truncate">${c.title}</p>
      </div>
      ${CHEVRON}
    </button>`).join('');
  return `
    <div class="page-section">
      <div class="section-header mb-3">
        <h2 class="section-title">تحديات مرتبطة</h2>
      </div>
      <div class="stack">${cards}</div>
    </div>`;
}

function questionsSection(memberQuestions) {
  if (!memberQuestions.length) return '';
  const cards = memberQuestions.map(q => `
    <div class="question-card">
      <p class="question-text">${q.text}</p>
      <div class="flex gap-2 flex-wrap">
        ${q.tags.map(t => `<span class="badge badge-default">${t}</span>`).join('')}
      </div>
    </div>`).join('');
  return `
    <div class="page-section">
      <div class="section-header mb-3">
        <h2 class="section-title">أسئلة الجمهور</h2>
        <button class="section-link" data-nav="/questions">عرض الكل</button>
      </div>
      <div class="stack">${cards}</div>
    </div>`;
}

// ── Main render ───────────────────────────────────────────────────────────────

export function render({ memberId } = {}) {
  const member = getMember(memberId);

  if (!member) {
    return wrapPage(`
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <p class="fw-semi">العضو غير موجود</p>
        <button class="btn btn-ghost mt-4"
                onclick="window.location.hash='/crew'">العودة للطاقم</button>
      </div>`);
  }

  const memberChallenges = challenges.filter(c => c.relatedMember === memberId);
  const memberQuestions  = getQuestionsForMember(memberId);

  const founderBadge = member.isFounder
    ? `<span class="badge badge-accent" style="margin-block-end:var(--sp-1)">مؤسس</span>`
    : '';

  const specialties = member.vibeTags.map(t =>
    `<span class="badge badge-default">${t}</span>`).join('');

  const socialBtn = member.socialLinks?.all
    ? `<a href="${member.socialLinks.all}" class="member-social-btn"
          target="_blank" rel="noopener noreferrer">
         روابط التواصل ${EXTERNAL_ICON}
       </a>`
    : '';

  const html = `
    ${subHeader(member.name, '/crew')}

    <div class="member-profile-hero">
      <div class="member-avatar" style="width:80px;height:80px;font-size:1.4rem">
        ${member.initials}
      </div>
      <div>
        ${founderBadge}
        <h1 class="text-xl fw-bold">${member.name}</h1>
        <p class="text-sm text-dim mt-1">${member.role}</p>
      </div>
      <p class="text-sm text-muted" style="max-width:300px">${member.bioShort}</p>
      <div class="flex gap-2 flex-wrap justify-center">${specialties}</div>
      ${socialBtn}
    </div>

    ${worldsSection(member.featuredWorlds)}
    ${challengesSection(memberChallenges)}
    ${questionsSection(memberQuestions)}`;

  return wrapPage(html);
}

// ── Event wiring ──────────────────────────────────────────────────────────────

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
