/**
 * screens/home.js — الرئيسية
 * Hero + featured worlds strip + featured challenges.
 * Step 0: placeholder layout, real data, no hero image.
 */

import { worlds }     from '../data/worlds.js';
import { challenges } from '../data/challenges.js';
import { members }    from '../data/members.js';
import { wrapPage }   from '../js/shared/page-shell.js';
import { navigate }   from '../js/core/dom.js';

export function render() {
  const featuredWorlds    = worlds.slice(0, 4);
  const featuredChallenges = challenges.slice(0, 3);

  const worldsHTML = featuredWorlds.map(w => `
    <button class="card world-card pointer" data-nav="/worlds/${w.id}">
      <div class="card-img-placeholder">${w.emoji}</div>
      <div class="card-body">
        <p class="card-title truncate">${w.title}</p>
        <p class="card-meta">${w.typeLabel} · ${w.frequency}</p>
      </div>
    </button>`).join('');

  const challengesHTML = featuredChallenges.map(c => `
    <button class="challenge-card pointer" data-nav="/challenges/${c.id}">
      <div class="flex justify-between items-center mb-2">
        <span class="badge badge-accent">${c.formatTypeLabel}</span>
        <span class="text-xs text-dim">${c.estimatedDuration} دقائق</span>
      </div>
      <p class="challenge-title">${c.title}</p>
      <p class="challenge-desc">${c.description}</p>
      <div class="challenge-meta">
        <span class="badge badge-default">${c.difficultyLabel}</span>
      </div>
    </button>`).join('');

  const html = `
    <div class="hero-strip">
      <p class="hero-eyebrow">مرحباً بك</p>
      <h1 class="hero-title">AI Show</h1>
      <p class="hero-subtitle">عالم الأنمي، النظريات، والتحديات — من الطاقم لك.</p>
    </div>

    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title">العوالم</h2>
        <button class="section-link pointer" data-nav="/worlds">عرض الكل</button>
      </div>
      <div class="h-scroll">${worldsHTML}</div>
    </div>

    <div class="page-section">
      <div class="section-header">
        <h2 class="section-title">تحديات مميزة</h2>
      </div>
      <div class="stack">${challengesHTML}</div>
    </div>`;

  return wrapPage(html);
}

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav]');
    if (btn) navigate(btn.dataset.nav);
  });
}
