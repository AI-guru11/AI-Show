/**
 * header.js — site header rendered once into #shell-header.
 * Logo + optional back button (for sub-pages, wired by router).
 */

export function renderHeader() {
  return `
    <header class="site-header">
      <div class="row gap-2">
        <button id="header-back" class="header-action hidden" aria-label="رجوع">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <a href="#/" class="site-logo no-select">
          AI <span>Show</span>
        </a>
      </div>
      <div class="row gap-1">
        <!-- Step 2+: search, notifications -->
      </div>
    </header>`;
}

/** Show / hide back button and set its destination */
export function setBackButton(show, targetHash = '#/') {
  const btn = document.getElementById('header-back');
  if (!btn) return;
  if (show) {
    btn.classList.remove('hidden');
    btn.onclick = () => { window.location.hash = targetHash; };
  } else {
    btn.classList.add('hidden');
    btn.onclick = null;
  }
}
