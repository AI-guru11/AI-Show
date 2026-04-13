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

  const [site, navigation, members] = await Promise.all([
    loadJson("./data/site.json"),
    loadJson("./data/navigation.json"),
    loadJson("./data/members.json")
  ]);

  const headerTarget = qs("#site-header");
  const mobileNavTarget = qs("#mobile-nav");

  if (headerTarget) {
    headerTarget.innerHTML = renderHeader(navigation.items, currentPage, site);
  }
  if (mobileNavTarget) {
    mobileNavTarget.innerHTML = renderMobileNav(navigation.items, currentPage);
  }

  if (currentPage === "cast") {
    renderMembersPreview(members.items);
  }

  registerServiceWorker();
}

function renderMembersPreview(items) {
  const target = qs("#members-preview");
  if (!target) return;
  target.innerHTML = items
    .slice(0, 6)
    .map(
      (member) => `
        <article class="member-preview-card card-surface">
          <span class="eyebrow">${member.role}</span>
          <h2 class="member-preview-card__name">${member.name}</h2>
          <p class="text-soft">${member.bioShort}</p>
        </article>
      `
    )
    .join("");
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
