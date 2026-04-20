# AI Show — Roadmap v1

## Status
Execution roadmap aligned with `docs/production-decision-pack-v1.md`.

This roadmap translates the production decision pack into a practical build sequence.
It is the operational execution reference for AI Show v1.

---

## 1. Purpose

This roadmap defines the correct order for moving AI Show from the current `rebuild-next` prototype into a production-ready PWA-first platform.

It exists to prevent:
- premature backend work
- random feature expansion
- schema confusion
- auth before content readiness
- admin complexity before content structure is stable

---

## 2. Governing Rule

All phases in this roadmap must follow:

- `docs/production-decision-pack-v1.md`

If a future execution idea conflicts with the production decision pack, the decision pack wins unless a newer approved version explicitly replaces it.

---

## 3. Strategic Sequence

AI Show v1 will be built in this order:

1. Product reference stabilization
2. Data model hardening
3. Backend foundation
4. Admin/content operations
5. Production public app
6. Interaction persistence
7. PWA hardening
8. Store packaging readiness

This sequence is intentional.
Do not reorder it casually.

---

## 4. Phase 0 — Freeze Prototype Reference

### Goal
Freeze `rebuild-next` as the canonical product reference.

### Deliverables
- final accepted public prototype state
- finalized `CLAUDE.md`
- `production-decision-pack-v1.md`
- this roadmap
- stable slugs and naming conventions
- stable surface list

### Success criteria
- public prototype is coherent enough to reference
- no major IA ambiguity remains
- all future production work can point back to the prototype for UX intent

### Notes
This does **not** mean the prototype becomes the production app.
It means it becomes the reference baseline.

---

## 5. Phase 1 — Data Model Hardening

### Goal
Define the production content model clearly before implementation begins.

### Scope
- worlds
- members
- challenges
- question bank items
- question options
- fan questions
- users
- attempts
- media assets
- tags

### Deliverables
- `schema-draft-v1.md`
- canonical entity definitions
- essential fields per entity
- relationship map
- status/state model
- slug/id conventions
- media field rules
- challenge engine assumptions for v1

### Must decide in this phase
- separation of quiz questions vs fan questions
- separation of members vs users
- media attachment model
- challenge composition model
- publish-state model

### Explicitly not in scope
- SQL migrations
- API implementation
- UI redesign
- auth provider wiring
- admin setup

### Success criteria
- schema is precise enough to implement
- no core entity ambiguity remains
- no content-type confusion remains

---

## 6. Phase 2 — Backend Foundation

### Goal
Stand up the minimal production backend platform.

### Scope
- Supabase project setup
- PostgreSQL setup
- Auth baseline
- Storage baseline
- Edge Functions baseline
- environment model
- access rules / RLS baseline

### Deliverables
- production backend environments
- auth baseline
- storage buckets
- initial schema implementation
- role model for app vs content operations
- starter policies

### Must exist by the end
- working Postgres
- working Auth
- working Storage
- base tables created
- development/staging discipline established

### Explicitly not in scope
- full public app
- app-store packaging
- advanced search
- notifications
- multiplayer
- rankings

### Success criteria
- backend exists and is ready for content import
- content can be stored in structured form
- auth is available for internal testing

---

## 7. Phase 3 — Content Operations Foundation

### Goal
Create the editorial/content layer before building the final public app.

### Scope
- Directus setup
- content collections mapped to production schema
- editorial roles
- review/publish states
- media metadata workflow
- admin/content ownership boundaries

### Deliverables
- internal admin/content workspace
- editor workflow
- reviewer workflow
- publisher workflow
- content status transitions
- media upload rules
- audit expectations

### Required outputs
- worlds manageable from admin
- members manageable from admin
- question bank manageable from admin
- challenges manageable from admin
- publish workflow defined

### Explicitly not in scope
- public comments
- advanced moderation systems
- recommendation engine
- large analytics layer

### Success criteria
- content team could theoretically operate the platform without editing code
- publish states are real and testable
- question/media relationships are manageable

---

## 8. Phase 4 — Content Migration from Prototype

### Goal
Move current prototype content into the real production data model.

### Scope
- worlds migration
- members migration
- challenges migration
- question migration
- fan question migration where relevant
- asset path planning

### Deliverables
- imported worlds
- imported members
- imported challenge records
- imported question records
- media asset placeholders or real assets
- slug parity map
- migration notes

### Rules
- preserve accepted slugs where possible
- avoid destructive renaming
- normalize instead of copying bad structure
- split prototype data where needed to fit production schema

### Explicitly not in scope
- public launch
- final frontend
- rich user data

### Success criteria
- core prototype content exists in the database
- prototype no longer acts as the only source of truth
- content is queryable and manageable

---

## 9. Phase 5 — Production Public App Shell

### Goal
Build the new public production app in parallel with the prototype.

### Scope
- Next.js app shell
- route structure
- layout system
- public read-only screens
- design language parity with prototype
- PWA baseline

### Surfaces to build first
- Home
- Worlds
- World Detail
- Crew
- Member
- Fan Questions
- Challenge Detail

### Delayed in this phase
- full play persistence
- user profile depth
- advanced submission systems

### Deliverables
- production app repository or app workspace
- route skeletons
- data-driven public read surfaces
- content-backed rendering
- PWA manifest/service worker baseline

### Success criteria
- public app renders real data
- product language matches prototype direction
- prototype is no longer needed for normal public browsing

---

## 10. Phase 6 — Challenge Interaction Layer

### Goal
Make the challenge loop real and persistent.

### Scope
- challenge start
- answer submission
- scoring
- attempt persistence
- result retrieval
- basic history linkage

### Deliverables
- challenge attempt creation
- answer storage
- result calculation
- challenge completion flow
- result history model

### Rules
- use one scored challenge engine in v1
- do not introduce multiple gameplay engines early
- keep result model simple and auditable

### Explicitly not in scope
- leaderboard
- multiplayer
- streak gamification
- real-time competition

### Success criteria
- a signed-in user can complete a challenge and have the result saved
- attempt data is queryable and correct
- result rendering is stable and reproducible

---

## 11. Phase 7 — Fan Question Submission Layer

### Goal
Make fan questions operational without turning them into a social platform.

### Scope
- authenticated submission
- basic validation
- routing to editorial queue
- status progression
- user submission history baseline

### Deliverables
- fan question intake flow
- moderation/editorial triage status
- link to member/world when relevant
- simple user-facing submission state

### Explicitly not in scope
- likes/dislikes
- public commenting
- threaded discussion
- community feed mechanics

### Success criteria
- users can submit questions
- editors can process them
- platform preserves separation from quiz questions

---

## 12. Phase 8 — Profile and Account Baseline

### Goal
Add useful user identity without social overreach.

### Scope
- account creation / login
- display name
- avatar
- basic profile
- challenge history
- saved/favorite items if necessary

### Deliverables
- user profile baseline
- challenge history view
- account settings baseline
- identity hooks for fan question ownership

### Explicitly not in scope
- social graph
- followers/following
- messaging
- profile gamification overload

### Success criteria
- the platform has real user ownership and basic persistence
- profile exists as utility, not social distraction

---

## 13. Phase 9 — Media Expansion

### Goal
Support richer question/content media once the core loop is stable.

### Scope
- image-backed questions
- audio-backed questions
- video-backed questions only if launch value justifies them
- optimized asset handling

### Deliverables
- image question support
- audio question support
- optional video question support
- thumbnailing rules
- playback constraints
- moderation implications

### Rules
- do not treat video as mandatory from day one
- keep media ops controlled by staff/admin only

### Success criteria
- media adds value without destabilizing the core product
- asset handling is reliable and governed

---

## 14. Phase 10 — PWA Hardening

### Goal
Move from web app baseline to strong installable PWA behavior.

### Scope
- installability
- manifest quality
- icons/splash assets
- offline behavior policy
- caching policy
- update strategy
- safe session behavior on mobile

### Deliverables
- production-ready manifest
- install prompts strategy
- app-like launch behavior
- cache/update policy
- offline fallback decisions

### Explicitly not in scope
- full offline challenge engine unless specifically justified

### Success criteria
- AI Show behaves like a serious installable mobile-first web app
- caching and updates are predictable
- PWA quality is no longer an afterthought

---

## 15. Phase 11 — App Store Packaging Readiness

### Goal
Prepare the PWA-first product for native store distribution.

### Scope
- Capacitor evaluation and setup
- iOS wrapper readiness
- Android wrapper readiness
- native shell constraints
- store packaging implications

### Deliverables
- Capacitor-ready app structure
- package naming strategy
- native asset checklist
- app-store submission readiness checklist

### Notes
This phase exists because AI Show is:
- PWA-first
- but store-distribution-capable

### Explicitly not in scope
- full native rewrite
- platform-divergent feature sets
- maintaining separate app products

### Success criteria
- the web product can be wrapped and packaged cleanly
- distribution to App Store / Google Play becomes operationally feasible

---

## 16. Phase 12 — Search / Discovery / Scale Enhancements

### Goal
Add scale-oriented quality improvements only after the core platform works.

### Scope
- content search
- richer filtering
- discovery improvements
- editorial curation improvements
- analytics expansion

### Notes
This phase is intentionally late.
Search and discovery matter, but not before the system has real structured content.

---

## 17. Explicitly Deferred Until After v1

Do not build these during v1 unless strategy changes:

- multiplayer
- live arena
- rankings
- complex achievements
- public social feed
- comments system
- messaging
- recommendation engine
- follow graph
- public media uploads
- advanced personalization

---

## 18. Execution Priority Order

If forced to choose what starts first, use this order:

1. prototype freeze and reference discipline
2. schema draft
3. backend foundation
4. content/admin layer
5. content migration
6. public production shell
7. challenge persistence
8. fan question submission
9. profiles baseline
10. media expansion
11. PWA hardening
12. app-store packaging

This ordering is authoritative unless explicitly superseded.

---

## 19. Operating Principle

AI Show v1 succeeds if:
- the product stays focused
- the challenge loop stays clean
- worlds remain anime worlds
- content operations become manageable
- auth and persistence are added without bloating the product
- PWA quality remains first-class
- the prototype informs the production app without becoming it

---

## 20. Final Roadmap Decision

The roadmap direction to commit to now is:

**Freeze the prototype, define the schema, stand up content/backend foundations, then build a new PWA-first production app with store-packaging readiness.**

This is the execution path that best protects product clarity, engineering sanity, and future scale.