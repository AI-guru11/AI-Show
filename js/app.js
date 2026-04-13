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

  if (currentPage === "cast") {
    renderMembersPreview(members.items);
  }

  registerServiceWorker();
}

function renderHomepage({ members, categories, series, challenges }) {
  renderQuickPaths(categories);
  renderWeeklySeries(series);
  renderFeaturedMembers(members);
  renderTrendingChallenges(challenges);
}

function renderQuickPaths(items) {
  const target = qs("#quick-paths-grid");
  if (!target) return;

  target.innerHTML = items.slice(0, 4).map((item) => `
    <article class="quick-card card-surface">
      <span class="quick-card