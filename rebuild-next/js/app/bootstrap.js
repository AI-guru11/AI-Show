/**
 * bootstrap.js — application entry point.
 * Mounts shared shell components, then starts the router.
 */

import { renderHeader }                    from '../shared/header.js';
import { renderBottomNav, mountBottomNav } from '../shared/bottom-nav.js';
import { initRouter }                      from './router.js';
import { $, setHTML }                      from '../core/dom.js';

function boot() {
  // Mount persistent shell pieces
  setHTML($('#shell-header'), renderHeader());
  setHTML($('#shell-nav'),    renderBottomNav());

  // Wire bottom nav click delegation (after it's in DOM)
  mountBottomNav();

  // Start router (renders first screen)
  initRouter();
}

// Wait for DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
