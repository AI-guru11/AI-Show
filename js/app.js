import { qs } from "./utils/dom.js";
import { renderHeader } from "./components/header.js";
import { renderMobileNav } from "./components/mobile-nav.js";

async function loadJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load: ${path}`);
  }

  return response.json();
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

async function boot() {
  const body = document.body;
  const currentPage = body.dataset.page || "home";

  const [site, navigation, members, categories, series, challenges] = await Promise.all([
    loadJson("./data/site.json"),
    loadJson("./data/navigation.json"),
    loadJson("./data/members.json"),
    loadJson("./data/categories.json"),
    loadJson("./data/series.json").catch(() => ({ items: [] })),
    loadJson("./data/challenges.json").catch(() => ({ items: [] }))
  ]);

  const headerTarget = qs("#site-header");
  const mobileNavTarget = qs("#mobile-nav");

  if (headerTarget) {
    headerTarget.innerHTML = renderHeader(navigation.items, currentPage, site);
  }

  if (mobileNavTarget) {
    mobileNavTarget.innerHTML = renderMobileNav(navigation.items, currentPage);
  }

  if (currentPage === "home") {
    renderHomepage({ members: members.items, categories: categories.items, series: series.items, challenges: challenges.items });
  }

  if (currentPage === "challenges") {
    renderChallengesHub({ categories: categories.items, challenges: challenges.items });
  }

  if (currentPage === "category") {
    renderCategoryPage({ categoryId: getQueryParam("id"), categories: categories.items, challenges: challenges.items });
  }

  if (currentPage === "cast") {
    renderMembersPreview(members.items);
  }

  registerServiceWorker();
}

function renderHomepage({ members, categories, series, challenges }) {
  renderQuickPaths(categories);
  renderWeeklySeries(series);
  renderFeaturedMembers(members);
  renderTrendingChallenges(challenges, "#trending-challenges-grid");
}

function renderChallengesHub({ categories, challenges }) {
  renderCategoryFilterChips(categories);
  renderCategoryCards(categories);
  renderTrendingChallenges(challenges, "#hub-challenges-grid");
}

function renderCategoryPage({ categoryId, categories, challenges }) {
  const category = categories.find((item) => item.id === categoryId) || categories[0];
  const heroTarget = qs("#category-hero");
  const gridTarget = qs("#category-challenges-grid");

  if (heroTarget && category) {
    heroTarget.innerHTML = `
      <span class="eyebrow">${category.typeLabel || category.type}</span>
      <h1 class="section-title">${category.title}</h1>
      <p class="section-text">${category.description || "تصنيف داخل منصة AI Show."}</p>
    `;
  }

  if (!gridTarget) return;

  const categoryChallenges = challenges.filter((item) => item.categoryId === category.id);
  const fallback = challenges.slice(0, 3);
  const renderItems = categoryChallenges.length ? categoryChallenges : fallback;

  gridTarget.innerHTML = renderItems.map((item) => challengeCardTemplate(item)).join("");
}

function renderQuickPaths(items) {
  const target = qs("#quick-paths-grid");
  if (!target) return;

  target.innerHTML = items.slice(0, 4).map((item) => `
    <article class="quick-card card-surface">
      <span class="quick-card__label">${item.typeLabel || item.type}</span>
      <strong class="quick-card__title">${item.title}</strong>
      <p class="quick-card__text">${item.description || "مسار سريع للبدء داخل المنصة."}</p>
      <div class="challenge-card__actions">
        <a class="btn btn-secondary" href="./category.html?id=${item.id}">ادخل التصنيف</a>
      </div>
    </article>
  `).join("");
}

function renderWeeklySeries(items) {
  const target = qs("#weekly-series-grid");
  if (!target) return;

  target.innerHTML = items.slice(0, 3).map((item) => `
    <article class="series-card card-surface">
      <span class="eyebrow">${item.typeLabel}</span>
      <h3 class="series-card__title">${item.title}</h3>
      <p class="series-card__text">${item.description}</p>
      <div class="series-card__meta">
        <span class="meta-pill">${item.frequency}</span>
        <span class="meta-pill">${item.franchise}</span>
      </div>
      <div class="series-card__actions">
        <a class="btn btn-secondary" href="./about.html">استكشف السلسلة</a>
      </div>
    </article>
  `).join("");
}

function renderFeaturedMembers(items) {
  const target = qs("#featured-members-grid");
  if (!target) return;

  target.innerHTML = items.slice(0, 6).map((member) => `
    <article class="member-card card-surface">
      <span class="eyebrow">${member.role}</span>
      <h3 class="member-card__title">${member.name}</h3>
      <p class="member-card__text">${member.bioShort}</p>
      <div class="member-card__meta">
        ${(member.vibeTags || []).slice(0, 3).map((tag) => `<span class="meta-pill">${tag}</span>`).join("")}
      </div>
      <div class="member-card__actions">
        <a class="btn btn-secondary" href="./cast.html">صفحة العضو</a>
      </div>
    </article>
  `).join("");
}

function renderTrendingChallenges(items, selector) {
  const target = qs(selector);
  if (!target) return;

  target.innerHTML = items.slice(0, 6).map((item) => challengeCardTemplate(item)).join("");
}

function renderCategoryFilterChips(items) {
  const target = qs("#category-filter-chips");
  if (!target) return;

  target.innerHTML = items.map((item, index) => `
    <a href="./category.html?id=${item.id}" class="filter-chip ${index === 0 ? "is-active" : ""}">
      ${item.title}
    </a>
  `).join("");
}

function renderCategoryCards(items) {
  const target = qs("#categories-grid");
  if (!target) return;

  target.innerHTML = items.map((item) => `
    <article class="category-card card-surface">
      <span class="eyebrow">${item.typeLabel || item.type}</span>
      <h3 class="category-card__title">${item.title}</h3>
      <p class="category-card__text">${item.description || "تصنيف داخل المنصة."}</p>
      <div class="category-card__meta">
        <span class="meta-pill">مسار جاهز</span>
      </div>
      <div class="category-card__actions">
        <a class="btn btn-primary" href="./category.html?id=${item.id}">ادخل</a>
      </div>
    </article>
  `).join("");
}

function challengeCardTemplate(item) {
  return `
    <article class="challenge-card card-surface">
      <span class="eyebrow">${item.formatTypeLabel}</span>
      <h3 class="challenge-card__title">${item.title}</h3>
      <p class="challenge-card__text">${item.description}</p>
      <div class="challenge-card__meta">
        <span class="meta-pill">${item.difficultyLabel}</span>
        <span class="meta-pill">${item.estimatedDuration} دقائق</span>
      </div>
      <div class="challenge-card__actions">
        <a class="btn btn-primary" href="./challenges.html">ابدأ</a>
      </div>
    </article>
  `;
}

function renderMembersPreview(items) {
  const target = qs("#members-preview");
  if (!target) return;

  target.innerHTML = items.slice(0, 6).map((member) => `
    <article class="member-preview-card card-surface">
      <span class="eyebrow">${member.role}</span>
      <h2 class="member-preview-card__name">${member.name}</h2>
      <p class="text-soft">${member.bioShort}</p>
    </article>
  `).join("");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./js/pwa/sw.js");
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}

boot().catch((error) => {
  console.error("App boot failed:", error);
});
