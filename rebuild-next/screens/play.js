/**
 * screens/play.js — interactive quiz play session
 * Step 0: minimal state, answer tracking, next/submit flow.
 */

import { getChallenge }        from '../data/challenges.js';
import { wrapPage, subHeader } from '../js/shared/page-shell.js';
import { navigate }            from '../js/core/dom.js';
import { startPlaySession, recordAnswer, getState } from '../js/core/state.js';

export function render({ challengeId } = {}) {
  const c = getChallenge(challengeId);

  if (!c) {
    return wrapPage(`
      <div class="empty-state">
        <div class="empty-state-icon">🎯</div>
        <p class="fw-semi">التحدي غير موجود</p>
      </div>`);
  }

  startPlaySession(challengeId);

  return wrapPage(renderQuestion(c, 0), 'play-screen');
}

function renderQuestion(challenge, index) {
  const q     = challenge.questions[index];
  const total = challenge.questions.length;

  return `
    <div data-challenge="${challenge.id}" data-q-index="${index}" data-q-total="${total}">
      ${subHeader(challenge.title, `/challenges/${challenge.id}`)}

      <div class="flex justify-between items-center mb-4">
        <span class="text-xs text-dim">سؤال ${index + 1} من ${total}</span>
        <span class="text-xs text-accent">${challenge.difficultyLabel}</span>
      </div>

      <div style="background:var(--clr-bg-3);border-radius:var(--r-sm);height:4px;margin-block-end:var(--sp-6)">
        <div style="height:100%;border-radius:var(--r-sm);background:var(--clr-accent);
                    width:${Math.round(((index) / total) * 100)}%;
                    transition:width var(--dur-normal) var(--ease-out)">
        </div>
      </div>

      <p class="fw-semi text-md mb-6" style="line-height:var(--lh-relaxed)">${q.text}</p>

      <div class="stack mb-8" id="options-list">
        ${q.options.map(opt => `
          <button class="quiz-option" data-opt-id="${opt.id}">
            ${opt.text}
          </button>`).join('')}
      </div>

      <button class="btn btn-primary btn-full hidden" id="next-btn">
        ${index + 1 < total ? 'السؤال التالي' : 'عرض النتيجة'}
      </button>
    </div>`;
}

export function mount({ challengeId } = {}) {
  const container = document.getElementById('page-container');
  if (!container) return;

  let selected = null;

  container.addEventListener('click', e => {
    const opt = e.target.closest('.quiz-option');
    if (opt) {
      // Deselect all, select clicked
      container.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
      opt.classList.add('selected');
      selected = opt.dataset.optId;
      document.getElementById('next-btn')?.classList.remove('hidden');
    }

    const nextBtn = e.target.closest('#next-btn');
    if (nextBtn && selected) {
      const wrapper = container.querySelector('[data-q-index]');
      if (!wrapper) return;

      const idx   = parseInt(wrapper.dataset.qIndex, 10);
      const total = parseInt(wrapper.dataset.qTotal, 10);
      recordAnswer(idx, selected);

      const c = getChallenge(challengeId);
      if (!c) return;

      const q = c.questions[idx];
      // Show correct/wrong briefly
      container.querySelectorAll('.quiz-option').forEach(btn => {
        if (btn.dataset.optId === q.correctId) btn.classList.add('correct');
        else if (btn.dataset.optId === selected) btn.classList.add('wrong');
        btn.disabled = true;
      });
      nextBtn.disabled = true;

      setTimeout(() => {
        selected = null;
        if (idx + 1 < total) {
          // Re-render inside the existing .page wrapper
          const page = container.querySelector('.page');
          if (page) page.innerHTML = renderQuestion(c, idx + 1);
          else container.innerHTML = wrapPage(renderQuestion(c, idx + 1), 'play-screen');
          mount({ challengeId });
        } else {
          navigate(`/result/${challengeId}`);
        }
      }, 900);
    }
  });
}
