export function renderMobileNav(navigationItems, currentPage) {
  const mobileItems = navigationItems.slice(0, 5);
  return `
    <div class="mobile-nav" aria-label="التنقل السفلي">
      <div class="mobile-nav__inner container">
        ${mobileItems
          .map(
            (item) => `
              <a href="${item.href}" class="mobile-nav__link ${item.key === currentPage ? "is-active" : ""}">
                <span>${item.label}</span>
              </a>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}
