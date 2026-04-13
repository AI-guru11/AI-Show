export function renderHeader(navigationItems, currentPage) {
  const desktopItems = navigationItems.filter((item) => !item.mobileOnly);

  return `
    <div class="site-header">
      <div class="site-header__inner container">
        <a class="brand-mark" href="./index.html" aria-label="العودة إلى الصفحة الرئيسية">
          <span class="brand-mark__logo" aria-hidden="true"></span>
          <span>AI Show</span>
        </a>

        <nav class="site-header__nav" aria-label="التنقل الرئيسي">
          ${desktopItems
            .map(
              (item) => `
                <a href="${item.href}" class="${item.key === currentPage ? "is-active" : ""}">
                  ${item.label}
                </a>
              `
            )
            .join("")}
        </nav>
      </div>
    </div>
  `;
}
