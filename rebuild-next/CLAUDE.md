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

## 2. Current Scope (Step 7 complete)

| Surface        | Status     | Notes                                        |
|----------------|------------|----------------------------------------------|
| Home           | ✅ Step 2   | Decision screen, challenge-first             |
| Worlds         | ✅ Step 3   | Anime universe catalog                       |
| World Detail   | ✅ Step 7   | Anime-specific challenge entry, polished meta |
| Crew           | ✅ Step 4   | Two-tier: founders + presenters              |
| Member Detail  | ✅ Step 4   | Profile, worlds, challenges, questions       |
| Fan Questions  | ✅ Step 5   | Readable surface with world/member context   |
| Challenge      | ✅ Step 7   | Polished entry surface, aligned CTA and meta  |
| Play / Result  | ✅ Step 7   | Consistent option layout, review, result copy |
| Profile        | ❌ Not built | Avatar wired to /crew as placeholder         |
| Search         | ❌ Not built |                                              |
| Notifications  | ❌ Not built |                                              |

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
│   ├── members.js          15 members (3 founders + 12 presenters) + getMember(id)
│   └── questions.js        10 questions + getOpenQuestions() + getQuestionsForMember()
└── screens/
    ├── home.js             الرئيسية — Step 2 rebuild
    ├── worlds.js           العوالم — browse list
    ├── world-detail.js     Single world + its challenges + members
    ├── crew.js             Crew list (founders + others)
    ├── member.js           Single member detail
    ├── fan-questions.js    أسئلة الجمهور — Step 5 surface, world/member context
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
- `data/*.js` — extend carefully; world IDs were corrected in Step 3 as architecture fix

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
| 5 | Fan questions are read-only, no submission | Submission requires backend | Deferred until backend/API step |
| 6 | No search surface | Not yet targeted | Planned for a later step |
| 7 | `play.js` inline re-render on question advance | Simple approach without extra abstraction | Refactor when play screen gets Step N attention |
| 8 | Each non-One Piece world has exactly 1 challenge (2 questions) | Minimum coverage pass — Step 3.1 | Expand per world in a dedicated data step |
| 9 | `worlds.js` has no poster images | Static build, no CDN/assets yet | Add `posterUrl` field when images are available |

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

## 15. Step 4 — Crew + Member Rebuild

**What changed:**

- `data/members.js` — expanded from 4 → 15 members (source: member manifest).
  Founders (3): Mohammed, Majed, Ibrahim.
  Presenters (12): Saud + 11 new members with real names, roles, social hub links.
  Bios cleaned: internal planning language replaced with minimal safe copy.
  `vibeTags` cleaned: no invented lore, no rank/power language.
  `featuredWorlds` kept for original 4 members; empty `[]` for new members (graceful skip).

- `screens/crew.js` — two-tier hierarchy:
  Founders → full `.member-card` with specialties (vibeTags).
  Presenters → compact `.crew-list-item` rows (36px avatar, name, role, chevron, no tags).
  Section labels: "المؤسسون" (accent) + "المقدمون · N" (dim with count).

- `screens/member.js` — editorial profile page:
  `.member-profile-hero`: 80px avatar, name, founder badge (if applicable), role, bio, specialties, quiet social link.
  Worlds strip: `.home-world-pill` horizontal scroll (skipped if empty).
  Challenges: `.member-challenge-row` compact rows filtered by `relatedMember` (skipped if empty).
  Questions: existing `.question-card` (skipped if empty).
  `challenges` array imported directly; no new helper added to challenges.js.

- `css/components.css` — appended:
  `.crew-list-item` + `.crew-list-avatar` (compact presenter row),
  `.member-profile-hero` (centered identity block),
  `.member-social-btn` (quiet external link),
  `.member-challenge-row` (compact challenge entry on member page).

**Screens NOT changed:** Home, Worlds, World Detail, Fan Questions, Play, Result.

## 16. Step 5 — Fan Questions Rebuild

**What changed:**

- `data/questions.js` — 5 → 10 questions. Fixed all `worldId` refs (old format IDs → valid anime IDs or null). Cleaned `askedBy` (removed mixed Korean characters). New questions cover Naruto, AoT, JJK, and general topics.

- `screens/fan-questions.js` — full rebuild. Card anatomy: `.fq-world` tag (tappable → `/worlds/:id`) → `.fq-text` (question as primary focus, `text-base fw-semi`) → `.fq-footer` (`.fq-member` tappable → `/crew/:id` + `.fq-tag` outline badges). Added `mount()` with delegated click handler. Removed equal-weight card stack; null worldId/member degrade gracefully (element simply absent).

- `css/components.css` — appended `.fq-card`, `.fq-world`, `.fq-text`, `.fq-footer`, `.fq-member`, `.fq-tag`.

- `CLAUDE.md` — cleaned up: frozen-files list updated to reflect actual state; compromise row 5 corrected (was "3 challenges", now accurate); Step 5 section added.

**Screens NOT changed:** Home, Worlds, World Detail, Crew, Member, Play, Result.

## 17. Step 6 — Challenge Detail + Play Polish

**What changed:**

- `screens/challenge-detail.js` — full rebuild. Challenge identity dominates: `.cd-hero` block (format badge + large `.cd-title` + clamped `.cd-desc`). Three horizontal `.cd-meta-pill` (questions count, duration, difficulty). `.cd-context` row: world + member as compact tappable `.cd-context-btn` pills; null associations omitted. Back label uses world title when available (breadcrumb feel). Full-width `btn btn-primary btn-full` CTA.

- `screens/play.js` — Polish pass. Arabic letter markers: `LETTERS = ['أ', 'ب', 'ج', 'د']` map to `.quiz-opt-letter` circles inside each option. Letter circle color updates on selected/correct/wrong states. Inline progress bar styles replaced with `.play-progress`, `.play-progress-bar`, `.play-progress-fill` CSS classes. Question text uses `.play-question` class (larger, bolder). Same state flow/900ms feedback delay preserved.

- `screens/result.js` — Minimal consistency fix. `subHeader` back label changed from `'النتيجة'` → `c.title`, back path from `'/'` → `/challenges/${challengeId}`. Result buttons now return to replay or challenge detail; final label refined further in Step 7.

- `css/components.css` — appended challenge-detail classes: `.cd-hero`, `.cd-title`, `.cd-desc`, `.cd-meta`, `.cd-meta-pill`, `.cd-meta-val`, `.cd-meta-label`, `.cd-context`, `.cd-context-btn`. Appended play classes: `.play-progress`, `.play-q-counter`, `.play-progress-bar`, `.play-progress-fill`, `.play-question`, `.quiz-opt-letter` (+ selected/correct/wrong state variants).

**Data files NOT changed.** Screens NOT changed: Home, Worlds, World Detail, Crew, Member, Fan Questions.


## 18. Step 7 — Cross-surface Polish + Consistency

**What changed:**

- `css/components.css` — consistency pass additions/fixes: `.challenge-card` now fills width and aligns text correctly; `.quiz-option` now uses flex layout with proper label/text alignment; result helpers `.result-emoji`, `.result-percent`; world-detail helpers `.wd-hero`, `.wd-hero-icon`, `.wd-hero-meta`, `.wd-challenge-top`; typo fixed from `--clr-error` → `--clr-danger`; review-only `.quiz-option-static` added.

- `screens/world-detail.js` — removed inline hero styles in favor of CSS classes; challenge cards now show duration + difficulty together for better consistency with Challenge/Play surfaces.

- `screens/fan-questions.js` — intro copy simplified to remove redundant instructional wording.

- `screens/result.js` — answer review now uses the same Arabic letter circles as play; inline score styles replaced with CSS classes; secondary button label clarified to `تفاصيل التحدي`.

**Screens intentionally not redesigned again:** Home, Worlds, Crew, Member, Play flow structure. Step 7 is polish/consistency only.



## 19. Authoritative Production Reference


## For production architecture, system boundaries, and migration direction, use:

`docs/production-decision-pack-v1.md`

## This document overrides informal planning notes and should be treated as the primary production decision source unless a newer version explicitly replaces it.


## For phased execution planning, use:

`docs/roadmap-v1.md`


## For schema planning and implementation boundaries, use:

`docs/schema-draft-v1.md`


## For backend setup sequencing and environment/bootstrap order, use:

`docs/backend-bootstrap-plan-v1.md`


## For Supabase environment setup order and bootstrap checklist, use:

`docs/supabase-setup-checklist-v1.md`