/**
 * page-shell.js — helpers for consistent page wrappers.
 * Screens call wrapPage() to get a uniform outer container.
 */

/**
 * Wrap screen content in a standard page div.
 * @param {string} html - inner HTML
 * @param {string} [extraClass] - additional CSS classes
 */
export function wrapPage(html, extraClass = '') {
  return `<div class="page ${extraClass}">${html}</div>`;
}

/**
 * Build a back-nav sub-header inside a page.
 * @param {string} label - display text
 * @param {string} backHash - hash to navigate back to
 */
export function subHeader(label, backHash) {
  return `
    <div class="row gap-2 mb-4" style="border-bottom:1px solid var(--clr-border);padding-bottom:var(--sp-4)">
      <button class="header-action" onclick="window.location.hash='${backHash}'" aria-label="رجوع">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h1 class="text-md fw-semi">${label}</h1>
    </div>`;
}

/**
 * Build a simple loading skeleton block.
 */
export function skeletonBlock(lines = 3) {
  const bars = Array.from({ length: lines }, (_, i) => `
    <div style="height:14px;background:var(--clr-bg-3);border-radius:var(--r-sm);
                width:${i === lines - 1 ? '60%' : '100%'};margin-bottom:var(--sp-2);">
    </div>`).join('');
  return `<div style="padding:var(--sp-4)">${bars}</div>`;
}
