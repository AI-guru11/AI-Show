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

function getInitials(name) {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part.charAt(0)).join(" ") || "AI";
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
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
    renderCastDirectory(members.items);
  }

  if (currentPage === "member") {
    renderMemberPage({
      memberId: getQueryParam("id"),
      members: members.items,
      challenges: challenges.items,
      series: series.items
    });
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

function renderCastDirectory(items) {
  const foundersTarget = qs("#founders-grid");
  const directoryTarget = qs("#members-directory-grid");
  const chipsTarget = qs("#member-role-chips");

  const founders = items.filter((item) => item.isFounder);
  const presenters = items.filter((item) => !item.isFounder);

  if (foundersTarget) {
    foundersTarget.innerHTML = founders.map((member) => memberCardTemplate(member, true)).join("");
  }

  if (directoryTarget) {
    directoryTarget.innerHTML = [...founders, ...presenters].map((member) => memberCardTemplate(member, false)).join("");
  }

  if (chipsTarget) {
    const allCount = items.length;
    chipsTarget.innerHTML = `
      <span class="filter-chip is-active">الكل (${allCount})</span>
      <span class="filter-chip">المؤسسون (${founders.length})</span>
      <span class="filter-chip">المقدمون (${presenters.length})</span>
    `;
  }
}

function renderMemberPage({ memberId, members, challenges, series }) {
  const member = members.find((item) => item.id === memberId) || members[0];
  const heroTarget = qs("#member-hero");
  const challengesTarget = qs("#member-challenges-grid");
  const seriesTarget = qs("#member-series-grid");
  const moreMembersTarget = qs("#more-members-grid");

  if (heroTarget && member) {
    heroTarget.innerHTML = `
      <div class="member-hero__avatar">${getInitials(member.name)}</div>
      <div class="member-hero__content">
        <span class="eyebrow">${member.role}</span>
        <h1 class="section-title member-hero__title">${member.name}</h1>
        <p class="section-text member-hero__text">${member.bioLong || member.bioShort}</p>
        <div class="member-hero__tags">
          ${(member.vibeTags || []).map((tag) => `<span class="meta-pill">${tag}</span>`).join("")}
        </div>
        <div class="member-hero__actions">
          <a class="btn btn-primary" href="${member.socialLinks?.all || './cast.html'}" target="_blank" rel="noopener noreferrer">حسابات العضو</a>
          <a class="btn btn-secondary" href="./fan-questions.html">أرسل سؤالاً له</a>
        </div>
      </div>
    `;
  }

  if (challengesTarget) {
    const memberChallenges = challenges.filter((item) => item.relatedMember === member.id);
    const fallback = challenges.slice(0, 3);
    const renderItems = memberChallenges.length ? memberChallenges : fallback;
    challengesTarget.innerHTML = renderItems.map((item) => challengeCardTemplate(item)).join("");
  }

  if (seriesTarget) {
    const seriesItems = uniqueById(
      (member.featuredSeries || []).map((seriesId) => series.find((entry) => entry.id === seriesId)).filter(Boolean)
    );
    const renderItems = seriesItems.length ? seriesItems : series.slice(0, 3);
    seriesTarget.innerHTML = renderItems.map((item) => seriesCardTemplate(item)).join("");
  }

  if (moreMembersTarget) {
    const renderItems = members.filter((item) => item.id !== member.id).slice(0, 6);
    moreMembersTarget.innerHTML = renderItems.map((item) => memberCardTemplate(item, false)).join("");
  }

  document.title = `${member.name} — AI Show`;
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

  target.innerHTML = items.slice(0, 3).map((item) => seriesCardTemplate(item)).join("");
}

function renderFeaturedMembers(items) {
  const target = qs("#featured-members-grid");
  if (!target) return;

  target.innerHTML = items.slice(0, 6).map((member) => memberCardTemplate(member, false)).join("");
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
        <a class="btn btn-primary" href="./category.html?id=${item.categoryId}">استكشف</a>
      </div>
    </article>
  `;
}

function memberCardTemplate(member, compact = false) {
  return `
    <article class="member-card card-surface ${compact ? 'member-card--compact' : ''}">
      <div class="member-card__avatar">${getInitials(member.name)}</div>
      <span class="eyebrow">${member.role}</span>
      <h3 class="member-card__title">${member.name}</h3>
      <p class="member-card__text">${member.bioShort}</p>
      <div class="member-card__meta">
        ${(member.vibeTags || []).slice(0, 3).map((tag) => `<span class="meta-pill">${tag}</span>`).join("")}
      </div>
      <div class="member-card__actions">
        <a class="btn btn-secondary" href="./member.html?id=${member.id}">صفحة العضو</a>
      </div>
    </article>
  `;
}

function seriesCardTemplate(item) {
  return `
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
  `;
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
