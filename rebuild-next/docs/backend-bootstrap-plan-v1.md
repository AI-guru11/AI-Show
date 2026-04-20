# AI Show — Backend Bootstrap Plan v1

## Status
Bootstrap execution reference aligned with:

- `docs/production-decision-pack-v1.md`
- `docs/roadmap-v1.md`
- `docs/schema-draft-v1.md`

This document defines the correct backend setup order for AI Show v1.
It is intentionally practical and sequencing-focused.

---

## 1. Purpose

This plan exists to answer one question clearly:

**What do we stand up first, in what order, and what do we intentionally delay?**

It prevents:
- premature API building
- random schema creation
- auth before boundaries are clear
- storage before asset rules are defined
- admin before content ownership is stable
- backend sprawl before product scope is controlled

---

## 2. Governing Rule

All backend setup decisions must follow:

- `docs/production-decision-pack-v1.md`
- `docs/schema-draft-v1.md`

If implementation pressure conflicts with those documents, those documents win unless explicitly superseded.

---

## 3. Backend Goal for v1

AI Show v1 backend must support:

- structured content storage
- authentication baseline
- media storage baseline
- challenge persistence
- fan question intake
- admin/content workflow readiness
- PWA-first production app

It does **not** need to support in v1:
- multiplayer
- leaderboard systems
- social graph
- public uploads
- advanced real-time mechanics
- recommendation engine

---

## 4. Platform Decision

### Backend platform
- **Supabase** is the backend platform of record

### Database
- **PostgreSQL via Supabase**

### Auth
- **Supabase Auth**

### Storage
- **Supabase Storage**

### Server-side logic
- **Supabase Edge Functions** only where needed

### Content/admin layer
- **Directus** on the same PostgreSQL database

### Rule
Do not start by building a custom Python backend for everything.
Use the platform-first approach for v1 speed and operational simplicity.

---

## 5. Bootstrap Strategy

The backend must be stood up in this order:

1. Environment and project structure
2. Database foundation
3. Auth baseline
4. Storage baseline
5. Core schema rollout
6. RLS and role rules
7. Directus bootstrap
8. Seed/import path
9. Minimal server-side functions
10. Frontend integration baseline

This order is deliberate.
Do not begin at Step 9 or 10.

---

## 6. Phase A — Environment Bootstrap

### Goal
Create clean project environments before any schema work.

### Required environments
- local/development
- staging
- production

### Deliverables
- one Supabase project for development
- one Supabase project for production later
- environment variable naming standard
- secret storage discipline
- service role handling rules

### Required decisions
- project naming convention
- database branch strategy if used
- migration ownership model
- role naming strategy

### Rules
- never share production service role keys casually
- never hardcode keys into frontend files
- never use the prototype as a config source of truth

### Success criteria
- development backend exists
- secrets are centrally managed
- environment discipline is defined before schema rollout

---

## 7. Phase B — Database Foundation

### Goal
Stand up the database before auth/storage logic starts spreading.

### Deliverables
- Postgres instance live
- migration discipline chosen
- schema namespace approach decided
- extension policy defined

### Recommended baseline
- use default `public` schema for app-facing tables
- use `auth` only for managed auth system tables
- keep content/app tables explicit and clean
- do not create multiple custom schemas unless clearly justified

### Required extensions later if needed
- `pg_trgm`
- full text search support
- uuid support if not already standard

### Rules
- schema first, data second
- no ad-hoc table creation from the UI
- no “we’ll clean it later” table naming

### Success criteria
- base DB exists
- naming discipline is fixed
- migration path is clear

---

## 8. Phase C — Auth Baseline

### Goal
Enable user identity without overbuilding the account system.

### v1 auth scope
- email magic link / OTP
- basic session handling
- profile row creation
- role awareness for internal users later

### Explicitly not in first auth pass
- phone auth
- multi-provider sprawl
- advanced team invitation systems
- public profile social features

### Required tables tied to auth
- `user_profiles`

### Required flow
1. auth user signs in
2. app ensures `user_profiles` row exists
3. app uses `user_profiles.id` as app identity reference where needed

### Rules
- do not use auth raw table structure as app profile model
- do not mix content-member logic into auth logic

### Success criteria
- development sign-in works
- user profile linkage works
- profile creation is deterministic

---

## 9. Phase D — Storage Baseline

### Goal
Make image/audio/media storage available before content begins depending on fake local assets.

### v1 storage scope
- image support
- audio support
- optional video planning
- admin/staff-only uploads

### Buckets recommendation
- `worlds`
- `members`
- `challenges`
- `questions`
- `fan-questions-internal` only if needed
- `general-assets`

### Rules
- no public user uploads in v1
- no storing media in Git for production
- every stored asset must have metadata representation in `media_assets`
- upload does not equal publish

### Video rule
Do not stand up Cloudflare Stream until video-backed question/content is confirmed as real v1 need.

### Success criteria
- staff uploads are possible
- asset metadata model is ready
- images/audio can enter the system safely

---

## 10. Phase E — Core Schema Rollout Order

### Goal
Create tables in dependency-aware order.

### Recommended rollout order

#### Group 1 — content roots
1. `media_assets`
2. `worlds`
3. `members`
4. `tags`

#### Group 2 — content relations
5. `member_worlds`
6. `world_tags`

#### Group 3 — question system
7. `question_bank_items`
8. `question_options`

#### Group 4 — challenge system
9. `challenges`
10. `challenge_items`

#### Group 5 — app/user layer
11. `user_profiles`
12. `fan_questions`

#### Group 6 — interaction persistence
13. `challenge_attempts`
14. `attempt_answers`

### Rules
- do not create challenge attempts before challenge schema exists
- do not create fan questions before user profile identity exists
- do not create question options before question items

### Success criteria
- schema is rolled out without circular confusion
- foreign key ordering stays sane
- content model is available before app logic depends on it

---

## 11. Phase F — RLS and Access Model

### Goal
Lock down access before the frontend starts writing data.

### Access principle
Default should be:
- deny writes unless explicitly allowed
- public reads only for published content
- user writes only to their own app-side records
- staff/admin actions remain privileged

### RLS direction by table

#### Public read-only tables
- `worlds` → published only
- `members` → published only
- `challenges` → published only
- `question_bank_items` → published only where needed by challenge play
- `media_assets` → only those tied to public published content

#### User-owned tables
- `user_profiles`
- `fan_questions`
- `challenge_attempts`
- `attempt_answers`

#### Staff-only content tables
- content creation and status changes should not be open to the public app directly

### Rules
- do not leave tables writable by authenticated users by default
- do not rely on frontend hiding as security
- do not give service-role semantics to normal app flows

### Success criteria
- public content is readable safely
- users can create only their own app-side records
- editorial/content writes are controlled

---

## 12. Phase G — Directus Bootstrap

### Goal
Stand up content operations only after core schema exists.

### Directus should manage:
- worlds
- members
- tags
- question bank items
- question options
- challenges
- challenge items
- media metadata
- publish workflows

### Directus should not be used as:
- the public app
- the challenge-playing interface
- the user profile application layer

### Required setup
- role mapping
- editor permissions
- reviewer permissions
- publisher permissions
- status field handling
- relationship visibility sanity

### Rules
- Directus is content/admin plane only
- avoid letting Directus become business logic source for gameplay
- publish state must remain canonical in DB

### Success criteria
- editors can manage content
- reviewers can review
- publishers can publish
- no code edits are needed for normal content entry

---

## 13. Phase H — Seed and Import Path

### Goal
Move prototype content into the real backend cleanly.

### Seed/import priority
1. worlds
2. members
3. member-world relations
4. tags if needed
5. question bank items
6. options
7. challenges
8. challenge items
9. media asset placeholders/links

### Prototype import rules
- preserve slugs where possible
- split fan questions from challenge questions before import
- normalize challenge/question structure instead of copying current arrays blindly
- treat current local image paths as migration hints, not permanent production truth

### Success criteria
- prototype content exists in DB form
- manual admin correction is possible
- prototype is no longer the only content store

---

## 14. Phase I — Minimal Edge Functions

### Goal
Add server-side logic only where it materially improves correctness or security.

### v1-valid uses
- challenge scoring validation
- protected fan question submission rules if needed
- upload signing
- admin-only privileged operations
- content webhooks or background hooks later

### Explicitly avoid in first pass
- building a giant custom API layer
- recreating everything Supabase already provides
- using functions for simple reads that can be served by RLS-safe queries

### Rule
Functions must exist for a clear reason, not because “backend feels more proper”.

### Success criteria
- only critical logic is server-side
- platform primitives do most of the work
- operations remain understandable

---

## 15. Phase J — Frontend Integration Baseline

### Goal
Connect the new production public app to the backend with minimum complexity.

### First integration targets
- worlds list
- world detail
- members list
- member detail
- challenges list/detail
- fan question listing if public
- play session reads
- auth shell
- fan question submission
- result persistence later in sequence

### Rules
- do not port the prototype screen-by-screen before content is queryable
- do not connect unfinished backend surfaces into the public app
- use data contracts that reflect the schema, not the prototype JS structure

### Success criteria
- production app can read real content
- backend data replaces local arrays gradually
- no false dependency on prototype runtime files remains

---

## 16. What Must Be Done First

If forced to start tomorrow with minimal ambiguity, do this exact order:

1. create `schema-draft-v1.md` final review
2. create Supabase development project
3. define env/secret discipline
4. create core tables in rollout order
5. enable auth baseline
6. enable storage baseline
7. define RLS baseline
8. stand up Directus
9. import prototype content
10. only then begin production public app integration

This is the bootstrap spine.

---

## 17. What Must Not Start Yet

Do **not** start these during bootstrap:

- advanced search
- recommendation engine
- notification platform
- comments
- social graph
- ranking system
- multiplayer
- public uploads
- deep analytics instrumentation
- Cloudflare Stream setup unless video is confirmed
- app-store packaging work

These are later concerns.

---

## 18. Operational Guardrails

### Guardrail 1
No schema shortcuts because “it’s just v1”.

### Guardrail 2
No content app writes directly to content tables without clear permissions.

### Guardrail 3
No mixing prototype local data assumptions into production contracts.

### Guardrail 4
No backend layer explosion before real need.

### Guardrail 5
No admin-first product decisions that distort the public experience.

---

## 19. Bootstrap Success Criteria

Backend bootstrap is considered successful when:

- development Supabase exists
- schema exists in correct order
- auth baseline works
- storage baseline works
- RLS baseline exists
- Directus can manage content
- prototype content can be imported
- production app integration can begin without guessing

---

## 20. Final Bootstrap Decision

The backend bootstrap direction to commit to now is:

**Supabase-first platform setup, schema-first rollout, Directus after schema, import prototype content next, and only then start production app integration.**

This is the authoritative backend setup sequence for AI Show v1 until explicitly replaced by a newer approved version.