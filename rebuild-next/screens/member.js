/**
 * screens/member.js — single crew member detail
 */

import { getMember }           from '../data/members.js';
import { getWorld }            from '../data/worlds.js';
import { getQuestionsForMember } from '../data/questions.js';
import { wrapPage, subHeader } from '../js/shared/page-shell.js';
import { navigate }            from '../js/core/dom.js';

export function render({ memberId } = {}) {
  const member = getMember(memberId);

  if (!member) {
    return wrapPage(`
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <p class="fw-semi">العضو غير موجود</p>
        <button class="btn btn-ghost mt-4" onclick="window.location.hash='/crew'">العودة للطاقم</button>
      </div>`);
  }

  const memberQuestions = getQuestionsForMember(memberId);

  const worldsHTML = member.featuredWorlds.map(wid => {
    const w = getWorld(wid);
    if (!w) return '';
    return `
      <button class="card pointer" data-nav="/worlds/${w.id}"
              style="display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3)">
        <span style="font-size:1.4rem">${w.emoji}</span>
        <span class="text-sm fw-medium truncate flex-1">${w.title}</span>
      </button>`;
  }).join('');

  const questionsHTML = memberQuestions.length
    ? memberQuestions.map(q => `
        <div class="question-card">
          <p class="question-text">${q.text}</p>
          <div class="flex gap-2 flex-wrap">
            ${q.tags.map(t => `<span class="badge badge-default">${t}</span>`).join('')}
          </div>
        </div>`).join('')
    : `<p class="text-sm text-dim">لا توجد أسئلة لهذا العضو بعد</p>`;

  const html = `
    ${subHeader(member.name, '/crew')}

    <div style="display:flex;flex-direction:column;align-items:center;gap:var(--sp-3);
                padding:var(--sp-6);text-align:center;margin-block-end:var(--sp-6)">
      <div class="member-avatar" style="width:72px;height:72px;font-size:1.5rem">
        ${member.initials}
      </div>
      <div>
        <h1 class="text-xl fw-bold">${member.name}</h1>
        <p class="text-sm text-muted mt-1">${member.role}</p>
      </div>
      <div class="flex gap-2 flex-wrap justify-center">
        ${member.vibeTags.map(t => `<span class="badge badge-accent">${t}</span>`).join('')}
      </div>
      <p class="text-sm text-muted" style="max-width:320px">${member.bioShort}</p>
    </div>

    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title">العوالم المرتبطة</h2>
      </div>
      <div class="stack">${worldsHTML || '<p class="text-sm text-dim">—</p>'}</div>
    </div>

    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title">أسئلة الجمهور</h2>
        <button class="section-link pointer" data-nav="/questions">عرض الكل</button>
      </div>
      <div class="stack">${questionsHTML}</div>
    </div>`;

  return wrapPage(html);
}

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
