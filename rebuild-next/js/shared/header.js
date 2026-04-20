/**
 * header.js — site header rendered once into #shell-header.
 * Logo + back button (sub-pages) + avatar button (all pages).
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
        <!-- Step 2: avatar wired to /crew as placeholder. Step 3+: profile surface -->
        <button class="header-avatar" id="header-avatar"
                aria-label="الطاقم"
                onclick="window.location.hash='/crew'">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
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
