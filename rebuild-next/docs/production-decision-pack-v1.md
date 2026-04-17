# AI Show — Production Decision Pack v1

## Status
Authoritative reference for production direction.
This document governs the transition from the current `rebuild-next` prototype to AI Show v1 production architecture.

---

## 1. Executive Verdict

`rebuild-next` is a successful Arabic-first, mobile-first prototype and product reference, but it is **not** the correct base to mutate directly into the final production platform.

The correct direction is:

- keep `rebuild-next` as a **prototype / UX reference**
- build a **new production app in parallel**
- preserve current IA, routes, and product language as much as possible
- move data, auth, media, and challenge logic into a real backend-backed system

The single architecture direction to commit to now is:

**PWA-first production app + store-distribution-ready architecture, using a new production app backed by PostgreSQL/Auth/Storage/Admin systems.**

---

## 2. Product Intent

AI Show is not just a trivia site.

AI Show v1 should become an:

**Arabic-first Anime Challenge Platform**

with:
- anime worlds
- structured challenge system
- scalable question bank
- member profiles
- fan questions
- user accounts
- progress and results
- media-backed content
- admin/editorial operations

---

## 3. Current Reality

The current active prototype lives in:

`rebuild-next`

It is:
- static
- vanilla JS
- hash-routed
- Arabic-first
- mobile-first
- dark premium
- local-data-driven

It already proves:
- Home
- Worlds
- World Detail
- Crew
- Member
- Fan Questions
- Challenge Detail
- Play
- Result

This prototype must be preserved as:
- IA reference
- UX baseline
- product behavior reference
- migration input

It must **not** become the production backend-bearing app by gradual mutation.

---

## 4. Final Production Direction

### The production model will be:

- **Prototype plane:** `rebuild-next`
- **Production plane:** new app
- **Content plane:** worlds / challenges / question bank / members / media
- **Application plane:** auth / profiles / attempts / results / fan questions
- **Operations plane:** admin / editorial / publishing / moderation

---

## 5. Core Architectural Decision

### Commit to this now:

- `rebuild-next` remains a reference prototype
- production app is built separately
- content is stored in database, not JS files
- media is stored in object storage, not Git
- authentication is real
- challenge attempts and results are persisted
- admin/editorial workflow is explicit
- user accounts and member profiles are separate domain concepts

### Explicit rejection

Do **not**:
- keep embedding core production data in local JS files
- merge user accounts with members
- merge fan questions with challenge questions
- evolve the prototype in-place into the final production system

---

## 6. Recommended Production Stack

### Frontend
- **Next.js App Router**
- **TypeScript**
- Arabic-first, mobile-first, PWA-first

### Backend / Application Logic
- **Supabase Edge Functions** for server-only rules and lightweight backend logic

### Database
- **Supabase PostgreSQL**

### Auth
- **Supabase Auth**
- start with:
  - email magic link / OTP
- later:
  - Google sign-in
- do not start with phone auth

### Storage
- **Supabase Storage** for:
  - images
  - audio
  - lightweight media
- **Cloudflare Stream** for video only if video questions are truly required in v1 launch

### Admin / CMS
- **Directus** on the same PostgreSQL database
- use it for:
  - content operations
  - review/publish flow
  - media metadata
  - internal editorial tooling

### Hosting / Deployment
- **Vercel** for production web app
- **Supabase Cloud** for database/auth/storage/functions
- **Directus** hosted separately via container/server

---

## 7. PWA and App Store Distribution Strategy

### Official direction
AI Show v1 is:

**PWA-first**

This means:
- the web app is the primary product
- installability is a core requirement
- app-shell behavior should support mobile usage patterns

### App-store strategy
For App Store and Google Play distribution:

**Use Capacitor as the native wrapper layer**

This keeps:
- one main product experience
- one web codebase
- PWA as the core platform
- native packaging as a distribution layer

### Optional Android shortcut
Trusted Web Activity may be considered later for Android-specific distribution, but it is **not** the primary direction.

### Decision
Commit now to:

- **PWA-first**
- **Capacitor-ready**
- not native-first
- not Android-only wrapper-first

---

## 8. What Stays Simple vs What Becomes Dynamic

### Stays simple / static
- design direction
- IA patterns
- public route concepts
- visual language
- current screen composition logic as a reference
- prototype itself as a frozen reference surface

### Becomes dynamic
- worlds catalog
- member profiles
- challenge definitions
- question bank
- fan questions
- user accounts
- user profiles
- challenge attempts
- result history
- media assets
- publishing states
- moderation workflow

---

## 9. Core Domain Separation

### A. Content domain
Editorial/content entities:
- worlds
- members
- challenges
- question bank items
- tags
- media assets

### B. App domain
Application/user entities:
- users
- profiles
- fan questions
- challenge attempts
- attempt answers

### C. Operations domain
Internal workflow entities:
- content states
- moderation flags
- review/publish pipeline
- audit fields

### Non-negotiable separations
- `members` are not `users`
- `fan_questions` are not `challenge questions`
- `challenges` are not `question bank items`
- `media assets` are not stored inside Git

---

## 10. Core Domain Model

### worlds
Anime universes only.
Never channel formats.

### members
Crew/editorial personalities and contributors.

### users
Audience accounts authenticated into the platform.

### challenges
Published playable challenge containers.

### question_bank_items
Reusable challenge/trivia questions.

### fan_questions
Audience-submitted discussion or crew-directed questions.

### media_assets
Images, audio, video, thumbnails, metadata.

### attempts
A user’s play session against a challenge.

### attempt_answers
Per-question selections and correctness records.

---

## 11. v1 Schema Recommendation

### user_profiles
- id
- auth_user_id
- display_name
- avatar_asset_id
- locale
- status
- created_at

### members
- id
- slug
- name_ar
- name_en
- role_label
- bio_short
- bio_long
- is_founder
- social_links_json
- status
- sort_order

### worlds
- id
- slug
- title_ar
- title_en
- franchise_status
- status_label
- description
- thumb_asset_id
- cover_asset_id
- publish_status
- sort_order

### member_worlds
- member_id
- world_id
- relation_type
- sort_order

### tags
- id
- slug
- label_ar
- label_en
- tag_type

### question_bank_items
- id
- slug
- world_id
- prompt_text
- question_type
- difficulty
- explanation_text
- primary_media_asset_id
- status
- created_by
- published_at

### question_options
- id
- question_id
- option_key
- label_text
- media_asset_id
- is_correct
- sort_order

### challenges
- id
- slug
- title_ar
- description
- world_id
- host_member_id
- display_format_label
- engine_type
- difficulty
- estimated_duration_minutes
- hero_asset_id
- status
- published_at

### challenge_items
- id
- challenge_id
- question_id
- sort_order
- points

### fan_questions
- id
- user_id
- question_text
- target_member_id
- world_id
- status
- editor_notes
- created_at

### challenge_attempts
- id
- user_id
- challenge_id
- started_at
- submitted_at
- score_raw
- score_percent
- status

### attempt_answers
- id
- attempt_id
- question_id
- selected_option_id
- is_correct
- answered_at

### media_assets
- id
- provider
- bucket_or_library
- object_key_or_external_id
- media_type
- mime_type
- duration_seconds
- width
- height
- thumbnail_asset_id
- alt_text_ar
- status

---

## 12. Content Architecture Rules

### Worlds
Canonical anime universe records only.

### Challenges
Containers that define:
- title
- world
- host
- presentation label
- ordered question set

### Question bank
Reusable challenge questions.
Must be normalized and queryable.

### Fan questions
Audience content stream.
Separate table, separate workflow, separate intent.

### Members
Editorial/personality entities only.

### Users
Audience entities only.

### Tags
Flat taxonomy in v1.
Do not build complex hierarchy yet.

---

## 13. Challenge Engine Decision

### v1 engine decision
Use one main scored engine in v1:

**single-select**

This engine should support:
- text prompt
- image prompt
- audio prompt
- video prompt
- media-backed options if needed

### Important clarification
Formats like:
- Veto
- guess-character
- lore
- theory
should remain mostly:
- display framing
- editorial labeling
- challenge presentation style

They should **not** become multiple real engines in v1 unless absolutely necessary.

### Scoring
Store:
- raw score
- percentage
- correctness per answer

Do not build:
- real-time multiplayer
- leaderboard logic
- rank systems
- advanced gamification in v1

---

## 14. Media Strategy

### Images
- store in Supabase Storage
- create usable variants/thumbnails
- store metadata in database

### Audio
- support short clips in v1
- keep metadata normalized

### Video
- optional for v1
- use Cloudflare Stream only if launch scope truly needs video-backed questions

### Media rules
- media upload is staff-only in v1
- no public media uploads
- no Git-based asset storage for production media
- publish state must control visibility, not just upload existence

---

## 15. Admin and Content Operations Model

### Roles
- Admin
- Editor
- Reviewer
- Publisher

### Content states
- draft
- in_review
- approved
- published
- archived

### Responsibilities
- Editor creates/edits
- Reviewer verifies quality
- Publisher publishes
- Admin controls permissions/system

### Directus role
Use Directus for:
- internal content management
- structured editing
- status workflow
- media metadata
- auditability

Do not use Directus as the public app.

---

## 16. v1 Scope

### In scope
- production web app
- PWA installability
- auth baseline
- user profile baseline
- worlds catalog
- member pages
- challenge detail / play / result
- persisted attempts/results
- fan question submission
- admin/content workflow
- image/audio support
- structured question bank

### Conditionally in scope
- video-backed questions
only if launch content genuinely depends on them

---

## 17. Explicitly Out of Scope for v1

- multiplayer
- live arena
- rankings / leaderboard
- social graph
- comments
- follow systems
- public media uploads
- chat
- recommendation engine
- advanced personalization
- full notification platform
- complex gamification

---

## 18. Migration Path

### Phase 1 — Data and content foundation
- freeze `rebuild-next` as reference
- stand up Supabase + Directus
- create production schema
- import current static data
- normalize worlds, members, challenges, questions
- split fan questions from challenge questions
- introduce media asset model

### Phase 2 — Production public app
- build new production app
- recreate approved public surfaces
- preserve current IA where possible
- connect public read paths to live data
- ship auth shell + basic profile + fan question intake

### Phase 3 — Persistence and richer operations
- persisted attempts/results
- moderation and editorial workflow
- richer media usage
- search
- refined operations

---

## 19. Biggest Technical Risks

- mixing users and members
- mixing fan questions and challenge questions
- keeping challenge content embedded in frontend files
- weak storage/auth boundaries
- overbuilding custom admin too early
- introducing too many engines too early
- shipping video complexity before content needs it

---

## 20. Biggest Product Risks

- trying to launch too many systems at once
- drifting back into channel-format-as-world confusion
- over-gamifying before the challenge loop is mature
- adding auth before content volume is strong enough
- allowing visual/design complexity to outrun product clarity

---

## 21. Final Recommendation

Commit now to this exact direction:

- `rebuild-next` remains prototype/reference
- build a new production app in parallel
- production app is **PWA-first**
- app-store path is **Capacitor-ready**
- backend platform is **Supabase**
- content/admin plane is **Directus on the same Postgres**
- v1 challenge engine is **single-select scored**
- fan questions and challenge questions remain separate forever
- video is optional, not foundational

### Architectural commitment
**Parallel rebuild with shared product language, not in-place mutation of the prototype.**

This is the production direction to treat as authoritative unless explicitly superseded by a later architecture decision.