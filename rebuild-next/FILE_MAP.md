# FILE MAP — rebuild-next

Every file, its role, and what it owns.

## Entry

| File                   | Role                                                  |
|------------------------|-------------------------------------------------------|
| `index.html`           | Shell HTML — loads CSS, mounts `#app`, boots JS       |

## CSS

| File                   | Role                                                  |
|------------------------|-------------------------------------------------------|
| `css/tokens.css`       | All design tokens (colors, spacing, type, motion)     |
| `css/base.css`         | Resets, root defaults, body, scrollbars               |
| `css/layout.css`       | Shell structure, page grid, section helpers           |
| `css/components.css`   | Header, nav, cards, buttons, badges, quiz states      |
| `css/utilities.css`    | Single-purpose helper classes                         |

## JS — App layer

| File                   | Role                                                  |
|------------------------|-------------------------------------------------------|
| `js/app/bootstrap.js`  | Entry point — mounts shell, starts router             |
| `js/app/router.js`     | Hash router — imports screens dynamically             |

## JS — Core layer

| File                   | Role                                                  |
|------------------------|-------------------------------------------------------|
| `js/core/routes.js`    | Route table, NAV_TABS, matchRoute()                   |
| `js/core/state.js`     | App-level reactive state, playSession helpers         |
| `js/core/dom.js`       | $, $$, el, setHTML, empty, navigate, delegate         |
| `js/core/storage.js`   | localStorage wrapper with JSON + prefix support       |

## JS — Shared layer

| File                   | Role                                                  |
|------------------------|-------------------------------------------------------|
| `js/shared/header.js`  | Site header markup + setBackButton()                  |
| `js/shared/bottom-nav.js` | Bottom nav markup, updateNav(), mountBottomNav()   |
| `js/shared/page-shell.js` | wrapPage(), subHeader(), skeletonBlock()            |

## Data

| File                   | Role                                                  |
|------------------------|-------------------------------------------------------|
| `data/worlds.js`       | Worlds array + getWorld(id)                           |
| `data/members.js`      | Members array + getMember(id)                         |
| `data/challenges.js`   | Challenges array + getChallenge(id) + getChallengesByWorld() |
| `data/questions.js`    | Fan questions + getOpenQuestions() + getQuestionsForMember() |

## Screens

| File                         | Route            | Nav Key    |
|------------------------------|------------------|------------|
| `screens/home.js`            | `#/`             | home       |
| `screens/worlds.js`          | `#/worlds`       | worlds     |
| `screens/world-detail.js`    | `#/worlds/:id`   | worlds     |
| `screens/crew.js`            | `#/crew`         | crew       |
| `screens/member.js`          | `#/crew/:id`     | crew       |
| `screens/fan-questions.js`   | `#/questions`    | questions  |
| `screens/challenge-detail.js`| `#/challenges/:id` | —        |
| `screens/play.js`            | `#/play/:id`     | —          |
| `screens/result.js`          | `#/result/:id`   | —          |

## Docs

| File              | Role                                            |
|-------------------|-------------------------------------------------|
| `FOUNDATION.md`   | Architecture, setup, constraints, next steps    |
| `FILE_MAP.md`     | This file — every file and its purpose          |
