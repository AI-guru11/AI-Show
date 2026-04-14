/**
 * screens/fan-questions.js — أسئلة الجمهور
 */

import { questions, getOpenQuestions } from '../data/questions.js';
import { getMember }                   from '../data/members.js';
import { wrapPage }                    from '../js/shared/page-shell.js';

export function render() {
  const open = getOpenQuestions();

  const items = open.map(q => {
    const target = q.targetMember ? getMember(q.targetMember) : null;
    return `
      <div class="question-card">
        <p class="question-text">${q.text}</p>
        <div class="flex justify-between items-center mt-3">
          <div class="flex gap-1 flex-wrap">
            ${q.tags.map(t => `<span class="badge badge-default">${t}</span>`).join('')}
          </div>
          ${target
            ? `<span class="text-xs text-accent fw-medium">→ ${target.name}</span>`
            : ''}
        </div>
      </div>`;
  }).join('');

  const html = `
    <div class="section-header mb-2">
      <h1 class="section-title">أسئلة الجمهور</h1>
    </div>
    <p class="text-sm text-muted mb-6">
      أسئلة يطرحها الجمهور على الطاقم —
      <span class="text-accent">${open.length} سؤال مفتوح</span>
    </p>

    <div class="page-section">
      <div class="stack">${items}</div>
    </div>

    <div style="padding:var(--sp-6);text-align:center">
      <p class="text-xs text-dim">إرسال الأسئلة — قريباً</p>
    </div>`;

  return wrapPage(html);
}
