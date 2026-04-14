# CLAUDE.md — AI Show rebuild-next
Practical project reference for Claude sessions. Documents current implementation only.

---

## 1. Project Purpose

AI Show is an Arabic-first, mobile-first fan platform for an anime content crew.
It surfaces worlds (anime franchises), crew members, fan questions, and interactive challenges.

**Architecture rule:** Worlds = anime catalog (One Piece, Naruto, etc.).
Channel formats (Veto, Weekly, Dewaniya) are NOT worlds — they may appear on Home only.
The rebuild-next folder is a clean rewrite: no framework, no build tools, no backend.

---

## 2. Current Scope (Step 3 complete)

| Surface        | Status     | Notes                                  |
|----------------|------------|----------------------------------------|
| Home           | ✅ Step 2   | Decision screen, challenge-first       |
| Worlds         | ✅ Step 3   | Anime universe catalog                 |
| World Detail   | ✅ Step 3   | Anime-specific challenge entry         |
| Crew           | ✅ Step 0   | Founder + member list                  |
| Member Detail  | ✅ Step 0   | Bio, worlds, questions                 |
| Fan Questions  | ✅ Step 0   | Read-only list, no submission yet      |
| Challenge      | ✅ Step 0   | Detail view + play flow + result       |
| Play / Result  | ✅ Step 0   | Static questions, session state only   |
| Profile        | ❌ Not built | Avatar wired to /crew as placeholder   |
| Search         | ❌ Not built |                                        |
| Notifications  | ❌ Not built |                                        |

---

## 3. Working Path

```
/home/ubuntu/ai-show-platform/rebuild-next/
```

Run locally:
```bash
cd /home/ubuntu/ai-show-platform/rebuild-next
python3 -m http.server 8080
# http://localhost:8080
```

This is a git worktree of the AI-guru11/AI-Show repo on branch `rebuild/step0-foundation`.
The legacy project root (`/home/ubuntu/ai-show-platform/` minus `rebuild-next/`) is read-only reference.

---

## 4. Folder Structure

```
rebuild-next/
├── index.html              Shell HTML only — mounts #app, loads CSS, boots JS
├── CLAUDE.md               This file
├── FOUNDATION.md           Architecture + run instructions
├── FILE_MAP.md             Every file and its role
├── css/
│   ├── tokens.css          All design tokens (colors, spacing, type, motion)
│   ├── base.css            Resets, body, scrollbars
│   ├── layout.css          Shell grid, page container, section helpers
│   ├── components.css      All component CSS (cards, nav, hero, home-*)
│   └── utilities.css       Single-purpose helper classes
├── js/
│   ├── app/
│   │   ├── bootstrap.js    Entry point — mounts shell, starts router
│   │   └── router.js       Hash router — dynamic imports screens
│   ├── core/
│   │   ├── routes.js       Route table, NAV_TABS, matchRoute()
│   │   ├── state.js        App-level reactive state, playSession
│   │   ├── dom.js          $, $$, el, setHTML, navigate, delegate
│   │   └── storage.js      localStorage wrapper
│   └── shared/
│       ├── header.js       Header markup + setBackButton() + avatar button
│       ├── bottom-nav.js   4-tab nav markup, updateNav(), mountBottomNav()
│       └── page-shell.js   wrapPage(), subHeader(), skeletonBlock()
├── data/
│   ├── worlds.js           6 anime universe objects + getWorld(id) — fields: id,title,titleEn,emoji,status,statusLabel,description,relatedMembers
│   ├── challenges.js       8 challenges + getChallenge(id) + getChallengesByWorld() — one per world minimum
│   ├── members.js          4 members + getMember(id)
│   └── questions.js        5 questions + getOpenQuestions() + getQuestionsForMember()
└── screens/
    ├── home.js             الرئيسية — Step 2 rebuild
    ├── worlds.js           العوالم — browse list
    ├── world-detail.js     Single world + its challenges + members
    ├── crew.js             Crew list (founders + others)
    ├── member.js           Single member detail
    ├── fan-questions.js    Fan questions read list
    ├── challenge-detail.js Challenge preview + start CTA
    ├── play.js             Interactive quiz session
    └── result.js           Quiz result + answer review
```

---

## 5. File Ownership Map

| File | Owns | Do not use for |
|------|------|----------------|
| `css/tokens.css` | All raw values | Hard-coding values in other files |
| `css/components.css` | All component classes | Layout structure (use layout.css) |
| `css/layout.css` | Shell, page grid, section rhythm | Component-level styling |
| `js/core/dom.js` | All DOM access helpers | Direct document.querySelector in screens |
| `js/core/state.js` | App-level state only | Screen-local state |
| `data/*.js` | Raw data + query helpers | Rendering logic |
| `screens/*.js` | render() → HTML string, mount() → events | Shared shell concerns |
| `js/shared/*.js` | Persistent shell pieces | Screen-specific content |

---

## 6. Routing Map

All routing is hash-based (`window.location.hash`). Works with `python3 -m http.server`.

| Hash                  | Screen file              | Nav active |
|-----------------------|--------------------------|------------|
| `#/`                  | screens/home.js          | home       |
| `#/worlds`            | screens/worlds.js        | worlds     |
| `#/worlds/:id`        | screens/world-detail.js  | worlds     |
| `#/crew`              | screens/crew.js          | crew       |
| `#/crew/:id`          | screens/member.js        | crew       |
| `#/questions`         | screens/fan-questions.js | questions  |
| `#/challenges/:id`    | screens/challenge-detail.js | —       |
| `#/play/:id`          | screens/play.js          | —          |
| `#/result/:id`        | screens/result.js        | —          |

Bottom nav tabs: الرئيسية / العوالم / الطاقم / الأسئلة

---

## 7. How Home Is Composed (Step 2)

`screens/home.js` exports `render()` and `mount()`.

**Section order and data source:**

| # | Section | Class | Data | Destination |
|---|---------|-------|------|-------------|
| 1 | Hero challenge | `.home-hero` | `getChallenge('op-lore-001')` | `/challenges/:id` |
| 2 | Worlds strip | `.home-world-pill` × 5 | `worlds.slice(0, 5)` | `/worlds/:id` |
| 3 | Featured challenge | `.home-live-block` | `getChallenge('veto-round-001')` | `/challenges/:id` |
| 4 | Questions entry | `.home-questions-entry` | `getOpenQuestions().length` | `/questions` |
| 5 | Crew teaser | `.home-crew-strip` | `members.filter(isFounder).slice(0,3)` | `/crew` |

**Selection logic** uses ID-anchored helpers with fallbacks — does not depend on array order:
```js
const hero     = getChallenge('op-lore-001') ?? challenges[0];
const featured = getChallenge('veto-round-001') ?? challenges.find(c => c.id !== hero.id);
const crew     = members.filter(m => m.isFounder).slice(0, 3);
```

**Event wiring:** single delegated click handler on `#page-container` via `[data-nav]` attributes.

---

## 8. How Shell / Header / Nav Relate to Screens

```
index.html
└── #app
    ├── #shell-header   ← renderHeader() — mounted once in bootstrap.js, never re-rendered
    ├── #page-container ← setHTML() on every route change — screen content goes here
    └── #shell-nav      ← renderBottomNav() — mounted once, updateNav() called per route
```

- `bootstrap.js` mounts header + nav once, then calls `initRouter()`
- `router.js` matches hash → dynamic imports screen module → calls `render()` then `mount()`
- `updateNav(navKey)` is called by router after each render to sync active tab
- `setBackButton(show, hash)` in `header.js` can be called from any screen's `mount()` (Step 3+)
- Header avatar: 32px circle, always visible, navigates to `#/crew` (Step 2 placeholder)

---

## 9. How Data Files Map to Screens

| data file | Used by screens |
|-----------|-----------------|
| `worlds.js` | home (strip), worlds, world-detail, member |
| `challenges.js` | home (hero + featured), world-detail, challenge-detail, play, result |
| `members.js` | home (teaser), crew, member, world-detail |
| `questions.js` | home (count), fan-questions, member |

Data files export plain JS objects and query helpers. No fetch, no async, no external dependencies.

---

## 10. What Is Frozen / Out of Scope

**Never add to rebuild-next:**
- React, Vue, Svelte, or any framework
- npm / package.json / node_modules
- Vite, webpack, esbuild, or any build tool
- Backend, API calls, authentication, analytics
- Rankings, Arena, multiplayer
- Manga tabs, fan-art tabs, long about sections
- Giant UI kit behavior or heavy component libraries

**Frozen files (do not modify without explicit Step N instruction):**
- `index.html`
- `css/tokens.css`, `css/base.css`, `css/layout.css`, `css/utilities.css`
- `js/app/bootstrap.js`, `js/app/router.js`
- `js/core/dom.js`, `js/core/storage.js`, `js/core/state.js`, `js/core/routes.js`
- `js/shared/bottom-nav.js`, `js/shared/page-shell.js`
- All `screens/` except `home.js` (unless a step explicitly targets them)
- All `data/` files (extend only, never restructure)

---

## 11. Rules for Future Steps

1. **Each step targets one surface.** Do not expand scope mid-step.
2. **Read before writing.** Always read current file contents before editing.
3. **Append to components.css**, never reorder or remove existing rules.
4. **New tokens go in tokens.css only** — no hard-coded colors/sizes elsewhere.
5. **Data changes = extend only** — exception: world IDs were corrected in Step 3 (architecture fix). Future data changes should extend, not rename.
6. **Selection logic must be ID-anchored** — never rely on array index order alone.
7. **Each screen owns its events** — wire in `mount()`, not in `render()`.
8. **Shell changes must be minimal** — if a shared shell file needs changing, justify why.
9. **No profile surface yet** — header avatar routes to `/crew` until Step N targets profile.
10. **Verify with `python3 -m http.server`** before committing.

---

## 12. Known Compromises

| # | Compromise | Reason | Future fix |
|---|-----------|--------|------------|
| 1 | Worktree dependency on `/home/user/AI-Show` | Git signing is session-bound to registered repo | Resolve when repo is migrated to ubuntu home fully |
| 2 | `play.js` session state not persisted | localStorage integration deferred | Add in a dedicated state/persistence step |
| 3 | Member avatars are initials only | No images in static data | Add image URLs to data/members.js when available |
| 4 | Header avatar navigates to `/crew` | No profile surface exists yet | Replace with `/profile` route when built |
| 5 | Challenges data has only 3 items | Placeholder seed data | Expand data/challenges.js in a data step |
| 6 | Fan questions are read-only | Submission requires backend | Deferred until backend/API step |
| 7 | No search surface | Out of scope for Step 2 | Planned for a later step |
| 8 | `play.js` inline re-render on question advance | Simple approach without extra abstraction | Refactor when play screen gets Step N attention |
| 9 | Each non-One Piece world has exactly 1 challenge (2 questions) | Minimum coverage pass — Step 3.1 | Expand per world in a dedicated data step |
| 10 | `worlds.js` has no poster images | Static build, no CDN/assets yet | Add `posterUrl` field when images are available |

---

## 13. Step 3 — Worlds Architecture Correction

**What changed:**

- `data/worlds.js` — replaced 6 channel-format worlds with 6 anime universe worlds.
  Old schema: `typeLabel`, `frequency`, `franchise` (channel format fields, now removed).
  New schema: `titleEn`, `status`, `statusLabel` (anime universe fields).
- `data/challenges.js` — updated 3 `worldId` references from old format IDs to new anime IDs.
- `data/members.js` — updated all 4 `featuredWorlds` arrays to reference new anime IDs.
- `screens/worlds.js` — anime catalog layout: `.world-item` row cards with emoji icon, Arabic title, English subtitle, status badge.
- `screens/world-detail.js` — anime-aware hero block: emoji, status badge, English subtitle, description. "الطاقم المتخصص" + challenges sections unchanged in structure.
- `css/components.css` — appended `.world-item`, `.world-item-icon`, `.world-item-body`, `.world-item-title`, `.world-item-en`.

**New world IDs:**
`one-piece`, `naruto`, `attack-on-titan`, `jujutsu-kaisen`, `demon-slayer`, `dragon-ball`

**Screens NOT changed:** Crew, Member, Fan Questions, Play, Result, Home.

## 14. Step 3.1 — World Challenge Coverage Pass

**Problem fixed:** 5 anime worlds (`naruto`, `attack-on-titan`, `jujutsu-kaisen`, `demon-slayer`, `dragon-ball`) had no challenges, showing an empty state on World Detail.

**What changed:** `data/challenges.js` only. Added one challenge per previously empty world:

| New ID | World | Questions |
|--------|-------|-----------|
| `naruto-lore-001` | `naruto` | 2 |
| `aot-lore-001` | `attack-on-titan` | 2 |
| `jjk-lore-001` | `jujutsu-kaisen` | 2 |
| `ds-lore-001` | `demon-slayer` | 2 |
| `db-lore-001` | `dragon-ball` | 2 |

All new challenges: `formatType: 'multiple-choice'`, `difficulty: 'easy'`, `estimatedDuration: 4`. Reuse existing play/result flow unchanged. `world-detail.js` needed no changes — it already renders challenges dynamically via `getChallengesByWorld()`.
