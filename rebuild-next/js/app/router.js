/**
 * router.js — hash-based client-side router.
 * Listens to hashchange, matches routes, dynamically imports
 * the screen module, renders into #page-container.
 */

import { matchRoute } from '../core/routes.js';
import { setState }   from '../core/state.js';
import { $, setHTML } from '../core/dom.js';
import { updateNav }  from '../shared/bottom-nav.js';

const container = () => $('#page-container');

/** Extract path from current hash, normalise to leading slash */
function hashPath() {
  const h = window.location.hash;
  const raw = h.startsWith('#') ? h.slice(1) : h;
  return raw || '/';
}

/** Load and render the screen for the current hash */
async function render() {
  const path  = hashPath();
  const match = matchRoute(path);

  if (!match) {
    setHTML(container(), notFound());
    updateNav(null);
    return;
  }

  const { route, params } = match;

  setState({ currentRoute: path, currentParams: params });
  document.title = `${route.title} — AI Show`;
  updateNav(route.navKey);

  try {
    // Dynamic import — bundler-free, works with python3 http.server
    const mod = await import(`../../${route.screen}`);
    const html = await mod.render(params);
    setHTML(container(), html);
    // Call mount() if the screen exports one (for event wiring)
    if (typeof mod.mount === 'function') mod.mount(params);
  } catch (err) {
    console.error('[router] Failed to load screen:', route.screen, err);
    setHTML(container(), errorScreen(route.screen, err));
  }
}

function notFound() {
  return `
    <div class="page empty-state" style="min-height:60vh">
      <div class="empty-state-icon">404</div>
      <p class="fw-semi">الصفحة غير موجودة</p>
    </div>`;
}

function errorScreen(screen, err) {
  return `
    <div class="page empty-state" style="min-height:60vh">
      <div class="empty-state-icon">⚠</div>
      <p class="fw-semi">حدث خطأ في تحميل الصفحة</p>
      <p class="text-xs text-dim">${screen}</p>
    </div>`;
}

/** Initialise the router — call once on app start */
export function initRouter() {
  window.addEventListener('hashchange', render);
  // Set default hash if none present
  if (!window.location.hash || window.location.hash === '#') {
    window.location.hash = '/';
  } else {
    render();
  }
}
