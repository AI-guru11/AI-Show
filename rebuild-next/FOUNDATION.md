# AI Show — rebuild-next Foundation (Step 0)

## What this is

A clean, dependency-free HTML+CSS+Vanilla JS foundation for the AI Show platform.
No build tools. No framework. Runs with `python3 -m http.server` from the `rebuild-next/` folder.

## How to run

```bash
cd /path/to/rebuild-next
python3 -m http.server 8080
# Open http://localhost:8080
```

## Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Markup    | HTML5, RTL/Arabic-first       |
| Styles    | CSS custom properties (tokens)|
| Logic     | Vanilla ES Modules            |
| Routing   | Hash-based (`#/path`)         |
| Data      | Static `.js` export files     |
| State     | Minimal pub/sub (state.js)    |

## Architecture

```
index.html              Shell only — mounts header, nav, page-container
js/app/bootstrap.js     Entry — mounts shared shell, starts router
js/app/router.js        Hash router — dynamic import per screen
js/core/routes.js       Route table + matchRoute()
js/core/state.js        App state (currentRoute, playSession)
js/core/dom.js          DOM helpers — $, $$, el, navigate, delegate
js/core/storage.js      localStorage wrapper
js/shared/header.js     Header component (rendered once)
js/shared/bottom-nav.js Bottom nav (4 tabs, active state)
js/shared/page-shell.js wrapPage(), subHeader(), skeletonBlock()
data/*.js               Pure data — no rendering logic
screens/*.js            export render(params) → HTML string
                        export mount(params)  → wires events
```

## Routing

All routes are hash-based:

| Hash              | Screen               |
|-------------------|----------------------|
| `#/`              | home.js              |
| `#/worlds`        | worlds.js            |
| `#/worlds/:id`    | world-detail.js      |
| `#/crew`          | crew.js              |
| `#/crew/:id`      | member.js            |
| `#/questions`     | fan-questions.js     |
| `#/challenges/:id`| challenge-detail.js  |
| `#/play/:id`      | play.js              |
| `#/result/:id`    | result.js            |

## Product surfaces

Derived from legacy reference (read-only):

- **Home** — hero + featured worlds + featured challenges
- **Worlds** — browse surface for content series
- **Crew** — founders + members list → detail
- **Fan Questions** — community Q&A surface
- **Challenge → Play → Result** — connected quiz flow

## Bottom Nav (4 tabs)

| Tab          | Route      |
|--------------|------------|
| الرئيسية     | `#/`       |
| العوالم      | `#/worlds` |
| الطاقم       | `#/crew`   |
| الأسئلة      | `#/questions` |

## Step 0 Constraints

- No backend, API, auth, or analytics
- No React, Vite, npm, or package.json
- No build tools of any kind
- Placeholder data only (seeded from legacy)
- Challenge flow works end-to-end with static questions
- Home, Worlds, Crew, Fan Questions all functional with static data

## Next Steps (Step 2+)

- Home hero rebuild (dynamic content, featured member)
- Real data integration
- Search surface
- Notification system
- Member challenge tracking
