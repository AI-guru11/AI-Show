/**
 * screens/home.js — الرئيسية
 * Step 8.1: upgrade worlds strip from emoji pills to wide image mini-cards.
 *
 * Section order:
 *   1. Hero challenge      — dominant, primary CTA
 *   2. Worlds strip        — secondary browse surface
 *   3. Featured block      — single challenge, distinct from worlds
 *   4. Fan questions entry — lightweight row entry
 *   5. Crew teaser         — minimal, does not compete
 */

import { challenges, getChallenge } from '../data/challenges.js';
import { worlds }                   from '../data/worlds.js';
import { members }                  from '../data/members.js';
import { getOpenQuestions }         from '../data/questions.js';
import { wrapPage }                 from '../js/shared/page-shell.js';
import { navigate }                 from '../js/core/dom.js';

// ── Intentional data selection (ID-anchored, order-independent) ──────────────

function selectHero() {
  return getChallenge('op-lore-001') ?? challenges[0];
}

function selectFeatured(heroId) {
  return (
    getChallenge('veto-round-001') ??
    challenges.find(c => c.id !== heroId) ??
    challenges[1]
  );
}

function selectCrewTeaser() {
  return members.filter(m => m.isFounder).slice(0, 3);
}

// ── SVG icon helpers ──────────────────────────────────────────────────────────

const CHEVRON_LEFT = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round"
       aria-hidden="true" style="flex-shrink:0;transform:scaleX(-1)">
    <path d="M9 18l6-6-6-6"/>
  </svg>`;

// ── Section renderers ─────────────────────────────────────────────────────────

function heroSection(c) {
  return `
    <section class="home-hero" data-nav="/challenges/${c.id}" role="region" aria-label="التحدي المميز">
      <div class="home-hero-ambient" aria-hidden="true"></div>
      <div class="home-hero-inner">
        <div class="home-hero-meta">
          <span class="badge badge-accent">${c.formatTypeLabel}</span>
          <span class="home-hero-kicker">${c.estimatedDuration} دقائق · ${c.difficultyLabel}</span>
        </div>
        <h2 class="home-hero-title">${c.title}</h2>
        <p class="home-hero-desc">${c.description}</p>
        <button class="home-hero-cta" data-nav="/challenges/${c.id}">
          ابدأ التحدي
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round"
               aria-hidden="true" style="transform:scaleX(-1)">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>`;
}

function worldCard(w) {
  const media = w.imageThumb
    ? `<img class="home-world-card-image" src="${w.imageThumb}" alt="" loading="lazy" decoding="async">`
    : `<span class="home-world-card-fallback" aria-hidden="true">${w.emoji}</span>`;

  return `
    <button class="home-world-card" data-nav="/worlds/${w.id}" aria-label="${w.title}">
      <span class="home-world-card-media">
        ${media}
      </span>
      <span class="home-world-card-label">${w.title}</span>
    </button>`;
}

function worldsSection() {
  const cards = worlds.slice(0, 5).map(worldCard).join('');

  return `
    <section class="page-section" role="region" aria-label="العوالم">
      <div class="section-header home-section-header">
        <h2 class="section-title">العوالم</h2>
        <button class="section-link" data-nav="/worlds">عرض الكل</button>
      </div>
      <div class="h-scroll home-worlds-rail">${cards}</div>
    </section>`;
}

function featuredSection(c) {
  return `
    <section class="page-section home-featured-section" role="region" aria-label="تحدي مميز">
      <button class="home-live-block" data-nav="/challenges/${c.id}">
        <div class="home-live-badge">
          <span class="badge badge-accent">مميز</span>
          <span class="text-xs text-dim">${c.formatTypeLabel}</span>
        </div>
        <p class="home-live-title">${c.title}</p>
        <p class="home-live-desc">${c.description}</p>
        <div class="home-live-footer">
          <span class="text-xs text-dim">${c.estimatedDuration} دقائق · ${c.difficultyLabel}</span>
          ${CHEVRON_LEFT}
        </div>
      </button>
    </section>`;
}

function questionsEntry(count) {
  return `
    <button class="home-questions-entry" data-nav="/questions" aria-label="أسئلة الجمهور">
      <div class="home-questions-copy">
        <p class="home-questions-title">أسئلة الجمهور</p>
        <p class="home-questions-meta">${count} سؤال مفتوح ينتظر إجابة</p>
      </div>
      ${CHEVRON_LEFT}
    </button>`;
}

function crewTeaser(crewMembers) {
  const avatars = crewMembers.map(m => `
    <div class="member-avatar home-crew-avatar" aria-hidden="true">
      ${m.initials}
    </div>`).join('');

  return `
    <section class="page-section home-crew-section" role="region" aria-label="الطاقم">
      <button class="home-crew-strip" data-nav="/crew">
        <div class="home-crew-avatars">${avatars}</div>
        <span class="home-crew-label">تعرّف على الطاقم</span>
        ${CHEVRON_LEFT}
      </button>
    </section>`;
}

// ── Main render ───────────────────────────────────────────────────────────────

export function render() {
  const hero     = selectHero();
  const featured = selectFeatured(hero.id);
  const crew     = selectCrewTeaser();
  const openQs   = getOpenQuestions();

  const html =
    heroSection(hero) +
    worldsSection() +
    featuredSection(featured) +
    questionsEntry(openQs.length) +
    crewTeaser(crew);

  return wrapPage(html, 'home-page');
}

// ── Event wiring ──────────────────────────────────────────────────────────────

export function mount() {
  document.getElementById('page-container')?.addEventListener('click', e => {
    const target = e.target.closest('[data-nav]');
    if (target) navigate(target.dataset.nav);
  });
}
