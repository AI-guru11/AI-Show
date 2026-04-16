/**
 * screens/result.js — play session result summary
 */

import { getChallenge }        from '../data/challenges.js';
import { wrapPage, subHeader } from '../js/shared/page-shell.js';
import { navigate }            from '../js/core/dom.js';
import { getState }            from '../js/core/state.js';

export function render({ challengeId } = {}) {
  const c       = getChallenge(challengeId);
  const session = getState().playSession;

  if (!c) {
    return wrapPage(`
      <div class="empty-state">
        <div class="empty-state-icon">🎯</div>
        <p class="fw-semi">التحدي غير موجود</p>
      </div>`);
  }

  const answers = session?.answers || [];
  let correct   = 0;

  const reviewHTML = c.questions.map((q, i) => {
    const given  = answers[i];
    const isRight = given === q.correctId;
    if (isRight) correct++;
    const givenOpt   = q.options.find(o => o.id === given);
    const correctOpt = q.options.find(o => o.id === q.correctId);
    return `
      <div class="card card-body mb-3">
        <p class="text-sm fw-medium mb-3">${q.text}</p>
        <div class="stack gap-2">
          ${q.options.map(opt => {
            let cls = '';
            if (opt.id === q.correctId) cls = 'correct';
            else if (opt.id === given && !isRight) cls = 'wrong';
            return `<div class="quiz-option ${cls}" style="cursor:default">${opt.text}</div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');

  const pct   = Math.round((correct / c.questions.length) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪';

  const html = `
    ${subHeader(c.title, `/challenges/${challengeId}`)}

    <div class="result-score">
      <div style="font-size:3rem">${emoji}</div>
      <p class="score-number">${correct}/${c.questions.length}</p>
      <p class="score-label">إجاباتك الصحيحة</p>
      <div style="font-size:2rem;font-weight:700;color:var(--clr-accent)">${pct}%</div>
    </div>

    <div class="flex gap-3 mb-8">
      <button class="btn btn-primary flex-1" id="retry-btn">
        حاول مجدداً
      </button>
      <button class="btn btn-ghost flex-1" id="back-btn">
        التحدي
      </button>
    </div>

    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title">مراجعة الإجابات</h2>
      </div>
      ${reviewHTML}
    </div>`;

  return wrapPage(html);
}

export function mount({ challengeId } = {}) {
  document.getElementById('retry-btn')?.addEventListener('click', () => {
    navigate(`/play/${challengeId}`);
  });
  document.getElementById('back-btn')?.addEventListener('click', () => {
    navigate(`/challenges/${challengeId}`);
  });
}
