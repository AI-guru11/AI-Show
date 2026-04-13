# CLAUDE.md — AI Show Platform

## Project Overview

**AI Show** (Anime Icons Show) is a mobile-first, Arabic-language (RTL) interactive platform for anime and manga challenges, cast profiles, fan questions, and group play. It is a **static web application** — no backend, no build step, no npm dependencies.

Current phase: **Phase 5 / Module 1 Scaffold** (app shell, navigation, theme tokens, PWA base established). Upcoming modules will build the homepage, challenges hub, cast pages, and challenge play flow.

---

## Running the Project

Any static HTTP server works. The app must be served over HTTP (not opened as `file://`) because ES6 modules and the Service Worker require it.

```bash
python3 -m http.server 8080
# Then open http://localhost:8080
```

There is **no build step, no package manager, no compilation**. Edit files and refresh.

---

## Repository Structure

```
/
├── index.html            # Homepage (data-page="home")
├── challenges.html       # Challenges hub (data-page="challenges")
├── cast.html             # Cast/members page (data-page="cast")
├── fan-questions.html    # Fan questions (data-page="fan-questions")
├── group-play.html       # Group play mode (data-page="group-play")
├── profile.html          # User profile (data-page="profile")
├── about.html            # About page (data-page="about")
├── manifest.webmanifest  # PWA manifest (Arabic, RTL, dark theme)
├── README.md             # Brief Arabic project notes
│
├── css/
│   ├── tokens.css        # Design tokens — CSS custom properties (EDIT FIRST)
│   ├── base.css          # Reset and foundational element styles
│   ├── layout.css        # App shell layout, containers, grids
│   ├── components.css    # Component styles (header, nav, cards, buttons)
│   ├── utilities.css     # Utility/helper classes
│   └── themes/
│       └── ai-show-dark.css  # Dark theme background gradients
│
├── js/
│   ├── app.js            # Bootstrap: loads JSON, renders header/nav, registers SW
│   ├── config.js         # APP_CONFIG: site name, storageKeys, lang/dir
│   ├── components/
│   │   ├── header.js     # renderHeader(navigationItems, currentPage) → HTML string
│   │   └── mobile-nav.js # renderMobileNav(navigationItems, currentPage) → HTML string
│   ├── utils/
│   │   ├── dom.js        # qs(), qsa(), createEl() helpers
│   │   └── storage.js    # readStorage(), writeStorage() localStorage wrappers
│   └── pwa/
│       ├── sw.js         # Service Worker: cache-first shell assets strategy
│       └── install.js    # PWA install prompt handling
│
└── data/
    ├── site.json         # Site metadata (name, tagline, lang, direction)
    ├── navigation.json   # Nav items array {key, label, href}
    ├── members.json      # Cast member data {name, role, bioShort, social}
    └── categories.json   # Challenge categories {One Piece, Veto, Anime, Manga, ...}
```

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5, semantic elements, ARIA attributes |
| Styling | Vanilla CSS3 — custom properties, Grid, Flexbox, `backdrop-filter` |
| Scripting | Vanilla JavaScript ES6+ — modules, async/await, Fetch API, template literals |
| Data | Local JSON files loaded via `fetch()` |
| PWA | Service Worker (cache-first), Web App Manifest |
| Storage | `localStorage` only (no cookies, no IndexedDB currently) |
| Dependencies | **None** — zero npm packages, zero external CDN links |
| Build | **None** — no Webpack, Vite, Babel, or preprocessors |

---

## HTML Page Conventions

Every page follows this structure:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <!-- meta, title, manifest link -->
  <!-- CSS in order: tokens → base → layout → components → utilities → theme -->
</head>
<body data-page="<page-key>">   <!-- page-key must match navigation.json key -->
  <div class="app-shell">
    <header id="site-header"></header>   <!-- Injected by app.js -->
    <main id="page-content" class="page-main">
      <!-- Page-specific content here -->
    </main>
    <nav id="mobile-nav"></nav>           <!-- Injected by app.js -->
  </div>
  <script type="module" src="./js/app.js"></script>
</body>
</html>
```

Key rules:
- `lang="ar" dir="rtl"` on every `<html>` tag — the entire UI is Arabic RTL
- `data-page` attribute on `<body>` drives active nav highlighting and page-specific logic in `app.js`
- CSS `<link>` tags must appear in the token→base→layout→components→utilities→theme order
- Always use `type="module"` on the script tag

---

## CSS Architecture

CSS is layered — **edit at the right layer**:

| File | What belongs here |
|------|------------------|
| `tokens.css` | CSS custom properties only — all design decisions live here |
| `base.css` | Element-level resets, body defaults, typography defaults |
| `layout.css` | App shell, `.container`, `.page-main`, `.section-gap-*`, grid layouts |
| `components.css` | Named components: `.site-header`, `.mobile-nav`, `.btn`, `.card-surface`, `.quick-card`, `.member-preview-card` |
| `utilities.css` | Single-purpose helpers: `.text-soft`, `.text-muted`, `.is-active`, visibility |
| `themes/ai-show-dark.css` | Background gradients and theme-specific overrides |

**Design tokens** (all in `tokens.css`):
- Colors: `--color-bg`, `--color-surface`, `--color-surface-2/3`, `--color-text`, `--color-text-soft`, `--color-text-muted`, `--color-brand` (`#f0b84b` — golden), `--color-brand-strong`, `--color-brand-soft`
- Spacing: `--space-1` (4px) through `--space-10` (64px)
- Radii: `--radius-sm/md/lg/xl/pill`
- Shadows: `--shadow-soft`, `--shadow-card`, `--glow-brand`
- Layout: `--container-max: 1200px`, `--header-height: 72px`, `--mobile-nav-height: 72px`
- Typography: `--font-base: "Tahoma", "Arial", sans-serif`
- Transitions: `--transition-fast: 160ms ease`, `--transition-base: 220ms ease`

**CSS naming**: BEM-like kebab-case (`.site-header`, `.site-header__inner`, `.site-header__nav`). State modifiers use `.is-*` prefix (`.is-active`).

**Responsive breakpoints**: 680px, 960px, 1024px — mobile-first (`min-width` queries).

---

## JavaScript Conventions

### Module system
All JS uses native ES6 `import`/`export`. No bundler — the browser handles module resolution directly.

### Component pattern
Components are **pure functions** that return HTML strings:
```js
export function renderHeader(navigationItems, currentPage) {
  return `<div class="site-header">...</div>`;
}
```
- Components do not touch the DOM themselves — the caller sets `.innerHTML`
- Keep components side-effect free
- Use template literals for HTML generation

### Application bootstrap (`app.js`)
1. Reads `body.dataset.page` to determine current page
2. Loads `site.json`, `navigation.json`, `members.json` in parallel via `Promise.all`
3. Renders header and mobile nav into their respective `#site-header` / `#mobile-nav` containers
4. Runs page-specific rendering (currently only `cast` page has extra logic)
5. Registers the Service Worker

### Utility helpers
- DOM: `qs(selector, scope?)`, `qsa(selector, scope?)`, `createEl(tag, className?, content?)`
- Storage: `readStorage(key)`, `writeStorage(key, value)` — both wrap `localStorage` with try/catch

### Storage keys
Defined in `APP_CONFIG.storageKeys` (in `config.js`):
- `"ai-show-theme"` — theme preference
- `"ai-show-profile-lite"` — user profile data
- `"ai-show-recent-activity"` — recent activity log

### Code style
- Arrow functions preferred
- `async/await` over `.then()` chains
- camelCase for variables and functions
- No TypeScript, no JSDoc required
- No external linter config — keep code consistent with existing style

---

## Data Layer

JSON files in `/data/` are the sole data source. They are loaded via `fetch()` at runtime.

| File | Shape |
|------|-------|
| `site.json` | `{ siteName, fullName, tagline, description, language, direction }` |
| `navigation.json` | `{ items: [{ key, label, href }] }` |
| `members.json` | `{ items: [{ name, role, bioShort, social: { ... } }] }` |
| `categories.json` | Challenge category definitions |

When adding new pages, add a nav entry to `navigation.json` and use a matching `data-page` value.

---

## PWA / Service Worker

The Service Worker (`js/pwa/sw.js`) uses a **cache-first, app shell** strategy:
- Cache name: `"ai-show-shell-v1"` — **increment version string when updating cached assets**
- Precaches all shell assets on `install`
- Clears old caches on `activate`
- Falls back to network on cache miss

When adding new CSS/JS files to the shell, add them to `SHELL_ASSETS` in `sw.js` and bump `CACHE_NAME`.

---

## Adding a New Page

1. Create `<page-name>.html` following the HTML template above, setting `data-page="<page-key>"`
2. Add a nav entry to `data/navigation.json` with matching `key`, Arabic `label`, and `href`
3. If the page has unique rendering logic, add a branch in `app.js` keyed on `currentPage === "<page-key>"`
4. No changes needed to CSS files unless the page introduces new components

---

## Key Conventions for AI Assistants

- **No npm, no build step** — never suggest `npm install`, webpack config, or compiled output
- **RTL first** — all UI is Arabic right-to-left; don't add LTR-only CSS without RTL consideration
- **Tokens over magic numbers** — always use `--space-*`, `--color-*`, `--radius-*` tokens in CSS; never hardcode hex colors or pixel values that belong in `tokens.css`
- **Pure component functions** — components return HTML strings, never manipulate DOM directly
- **Page identity via `data-page`** — never use `window.location` to detect the current page; use `body.dataset.page`
- **No framework additions** — keep the stack vanilla; don't add React, Vue, Alpine, or any library without explicit direction
- **Service Worker versioning** — bump `CACHE_NAME` whenever shell assets change
- **Arabic content** — UI copy is in Arabic; preserve existing Arabic strings and don't translate them unless asked
- **Mobile-first** — add styles for small screens first, then use `min-width` media queries to enhance for larger screens
- **No test infrastructure** — there is no test runner; verify changes by running the dev server and checking in a browser
