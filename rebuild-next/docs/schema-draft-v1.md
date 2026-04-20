# AI Show — Schema Draft v1

## Status
Draft execution schema aligned with:

- `docs/production-decision-pack-v1.md`
- `docs/roadmap-v1.md`

This document defines the first production-ready data model for AI Show v1.
It is intentionally implementation-oriented, but does not include SQL migrations.

---

## 1. Purpose

This schema draft exists to define:

- canonical entities
- essential fields
- relationships
- state models
- ownership boundaries
- naming conventions
- content vs app separation

It must prevent the following mistakes:

- mixing `members` with `users`
- mixing `fan_questions` with `challenge questions`
- embedding challenge content directly into frontend files
- coupling media files to Git
- building multiple engines before the first engine is stable

---

## 2. Schema Principles

### 2.1 Content plane vs App plane
AI Show has two major data planes:

#### Content plane
Editorial/content entities:
- worlds
- members
- challenges
- question_bank_items
- question_options
- tags
- media_assets

#### App plane
Audience/application entities:
- user_profiles
- fan_questions
- challenge_attempts
- attempt_answers
- saved items later if needed

### 2.2 Prototype is not source of truth
`rebuild-next` data files are prototype seeds only.
Production truth must live in database tables.

### 2.3 Slugs are stable
Public-facing slugs should remain stable once published.

### 2.4 IDs are internal
Use UUIDs or equivalent opaque IDs internally.
Do not expose internal IDs as the main public identity.

### 2.5 Publishing is explicit
No content becomes public by accident.
Content must move through explicit states.

---

## 3. Enum Decisions

### 3.1 `publish_status`
Allowed values:
- `draft`
- `in_review`
- `approved`
- `published`
- `archived`

### 3.2 `franchise_status`
For worlds:
- `ongoing`
- `completed`
- `hiatus`

### 3.3 `question_type`
v1-supported types:
- `single_select_text`
- `single_select_image`
- `single_select_audio`
- `single_select_video`

### 3.4 `challenge_engine_type`
v1:
- `single_select`

### 3.5 `difficulty_level`
- `easy`
- `medium`
- `hard`

### 3.6 `fan_question_status`
- `new`
- `triaged`
- `queued`
- `answered`
- `rejected`

### 3.7 `attempt_status`
- `in_progress`
- `submitted`
- `abandoned`

### 3.8 `media_type`
- `image`
- `audio`
- `video`
- `thumbnail`

### 3.9 `member_relation_type`
- `host`
- `specialist`
- `contributor`
- `editorial_face`

---

## 4. Naming Rules

### 4.1 Table naming
Use plural snake_case table names.

### 4.2 Field naming
Use snake_case consistently.

### 4.3 Slug naming
Use kebab-case for public slugs.

Examples:
- `one-piece`
- `attack-on-titan`
- `majed-alamer`

### 4.4 Timestamps
Standard fields:
- `created_at`
- `updated_at`

Optional:
- `published_at`
- `submitted_at`
- `answered_at`

---

## 5. Core Entity Map

### Content entities
- `worlds`
- `members`
- `member_worlds`
- `tags`
- `world_tags`
- `media_assets`
- `question_bank_items`
- `question_options`
- `challenges`
- `challenge_items`

### App entities
- `user_profiles`
- `fan_questions`
- `challenge_attempts`
- `attempt_answers`

### Optional v1.1 entities
- `saved_worlds`
- `saved_challenges`
- `user_preferences`

---

## 6. Public Identity Model

### Public-facing identifiers
The following entities need public slugs:
- worlds
- members
- challenges

### Non-public entities
These should not rely on public slug routing:
- question_bank_items
- question_options
- fan_questions
- challenge_attempts
- attempt_answers
- media_assets

---

## 7. Entity Definitions

## 7.1 `user_profiles`

Purpose:
Audience identity tied to authenticated users.

Required fields:
- `id`
- `auth_user_id`
- `display_name`
- `avatar_asset_id` nullable
- `locale` default `ar`
- `status`
- `created_at`
- `updated_at`

Optional fields:
- `bio_short`
- `favorite_world_id`

Rules:
- one row per authenticated user
- this is not a `member`
- do not store heavy gameplay history here

---

## 7.2 `members`

Purpose:
Editorial/personality records for AI Show team members.

Required fields:
- `id`
- `slug`
- `name_ar`
- `name_en` nullable
- `role_label`
- `bio_short`
- `is_founder`
- `publish_status`
- `sort_order`
- `created_at`
- `updated_at`

Optional fields:
- `bio_long`
- `avatar_asset_id`
- `cover_asset_id`
- `social_links_json`

Rules:
- members are content entities
- they are not authenticated user accounts
- social links remain lightweight in v1

---

## 7.3 `worlds`

Purpose:
Canonical anime universe records.

Required fields:
- `id`
- `slug`
- `title_ar`
- `title_en`
- `description`
- `franchise_status`
- `status_label`
- `publish_status`
- `sort_order`
- `created_at`
- `updated_at`

Optional fields:
- `thumb_asset_id`
- `cover_asset_id`

Rules:
- worlds are anime universes only
- never channel formats
- world order must be editorially controllable

---

## 7.4 `member_worlds`

Purpose:
Many-to-many mapping between members and worlds.

Required fields:
- `id`
- `member_id`
- `world_id`
- `relation_type`
- `sort_order`

Rules:
- one member can relate to many worlds
- one world can relate to many members
- relation_type explains context

---

## 7.5 `tags`

Purpose:
Flat taxonomy records.

Required fields:
- `id`
- `slug`
- `label_ar`
- `label_en` nullable
- `tag_type`

Rules:
- v1 uses flat taxonomy only
- do not build hierarchy trees yet

Suggested `tag_type` values:
- `topic`
- `format`
- `theme`
- `difficulty`
- `discussion`

---

## 7.6 `world_tags`

Purpose:
Attach tags to worlds where useful.

Required fields:
- `id`
- `world_id`
- `tag_id`

Rules:
- optional in v1
- keep simple

---

## 7.7 `media_assets`

Purpose:
Central metadata registry for media.

Required fields:
- `id`
- `provider`
- `storage_key_or_external_id`
- `media_type`
- `mime_type`
- `status`
- `created_at`
- `updated_at`

Optional fields:
- `bucket_name`
- `public_url`
- `duration_seconds`
- `width`
- `height`
- `thumbnail_asset_id`
- `alt_text_ar`
- `caption_ar`
- `uploaded_by_user_id`

Rules:
- actual media files do not live in Git
- `provider` can be:
  - `supabase_storage`
  - `cloudflare_stream`
- `public_url` may be generated or cached depending on storage model

---

## 7.8 `question_bank_items`

Purpose:
Reusable challenge questions.

Required fields:
- `id`
- `slug`
- `world_id` nullable for generic questions
- `prompt_text`
- `question_type`
- `difficulty`
- `status`
- `created_at`
- `updated_at`

Optional fields:
- `explanation_text`
- `primary_media_asset_id`
- `created_by_member_id`
- `published_at`

Rules:
- quiz questions live here
- fan questions do not live here
- world_id may be nullable only if intentionally general

---

## 7.9 `question_options`

Purpose:
Selectable answers for `question_bank_items`.

Required fields:
- `id`
- `question_id`
- `option_key`
- `label_text`
- `is_correct`
- `sort_order`

Optional fields:
- `media_asset_id`

Rules:
- every `single_select_*` question must have at least 2 options
- exactly 1 option should be `is_correct = true` in v1

---

## 7.10 `challenges`

Purpose:
Published playable challenge containers.

Required fields:
- `id`
- `slug`
- `title_ar`
- `description`
- `world_id`
- `engine_type`
- `difficulty`
- `estimated_duration_minutes`
- `publish_status`
- `created_at`
- `updated_at`

Optional fields:
- `host_member_id`
- `display_format_label`
- `hero_asset_id`
- `published_at`

Rules:
- challenge is not the same as question
- a challenge is a curated ordered set of question bank items
- `engine_type` remains `single_select` in v1

---

## 7.11 `challenge_items`

Purpose:
Order questions inside a challenge.

Required fields:
- `id`
- `challenge_id`
- `question_id`
- `sort_order`
- `points`

Rules:
- this table defines challenge composition
- do not embed question arrays directly into the challenge row long-term

---

## 7.12 `fan_questions`

Purpose:
Audience-submitted questions directed to AI Show or specific members/worlds.

Required fields:
- `id`
- `user_id`
- `question_text`
- `status`
- `created_at`

Optional fields:
- `target_member_id`
- `world_id`
- `editor_notes`
- `answered_at`

Rules:
- this is not part of the playable challenge engine
- it has a separate lifecycle
- it may later feed editorial content decisions, but not directly the play engine

---

## 7.13 `challenge_attempts`

Purpose:
A user’s attempt for a challenge.

Required fields:
- `id`
- `user_id`
- `challenge_id`
- `started_at`
- `status`

Optional fields:
- `submitted_at`
- `score_raw`
- `score_percent`

Rules:
- one user can have many attempts
- submitted attempts should become immutable except admin corrections
- `score_percent` is derived but may be stored for performance/convenience

---

## 7.14 `attempt_answers`

Purpose:
Per-question answer log within a challenge attempt.

Required fields:
- `id`
- `attempt_id`
- `question_id`
- `selected_option_id`
- `is_correct`
- `answered_at`

Rules:
- this is the auditable record of the attempt
- result screens should read from here, not recompute only from the client

---

## 8. Relationship Rules

### One-to-many
- world → challenges
- world → question_bank_items
- challenge → challenge_items
- question_bank_item → question_options
- challenge_attempt → attempt_answers

### Many-to-many
- members ↔ worlds via `member_worlds`
- worlds ↔ tags via `world_tags`

### App relationships
- user_profiles → fan_questions
- user_profiles → challenge_attempts

---

## 9. Required Invariants

These rules must always hold:

1. `members` and `user_profiles` are separate forever
2. `fan_questions` and `question_bank_items` are separate forever
3. every published challenge must map to at least one `challenge_item`
4. every `single_select` question must have exactly one correct option
5. every published world must have a stable slug
6. media metadata must exist independently from frontend files
7. user result history must be recoverable from persisted attempt tables

---

## 10. v1 Minimal Query Needs

The schema must support these queries efficiently:

### Public app
- list worlds
- fetch world by slug
- list challenges by world
- fetch challenge by slug
- fetch member by slug
- list fan questions by filters
- fetch question/media content for challenge play

### App/user
- create challenge attempt
- save answer
- submit attempt
- fetch result history
- create fan question

### Admin/editorial
- create/edit world
- create/edit challenge
- create/edit question
- review/publish content
- attach/manage media
- triage fan questions

---

## 11. Publish Workflow Model

### Applies to:
- worlds
- members
- question_bank_items
- challenges
- media_assets where relevant

### States
- `draft`
- `in_review`
- `approved`
- `published`
- `archived`

### Rule
Public app reads only:
- `published`

Everything else is internal.

---

## 12. Auth Boundary Rules

### Public users
Managed by auth provider + `user_profiles`

### Staff/editorial identities
May authenticate through the same auth provider but must be controlled by role mapping outside `members`

### Non-rule
Being a visible member of AI Show does not automatically mean being an admin/editor account.

---

## 13. Media Rules

### Images
- okay for v1
- expected in worlds/challenges/questions/members

### Audio
- okay for v1
- short clips only

### Video
- optional in v1
- only if launch content truly requires it

### Required metadata discipline
Every media asset should be traceable by:
- provider
- external key
- type
- publish status

---

## 14. Slug and Routing Rules

### Canonical slug owners
- `worlds.slug`
- `members.slug`
- `challenges.slug`

### Prototype parity
Try to preserve current prototype public slug logic wherever practical.

### No public slug requirements
- `fan_questions`
- `attempt_answers`
- `challenge_attempts`
- `question_options`

---

## 15. v1 Non-goals at Schema Level

Do not model these deeply in v1:
- social graph
- follows
- comments
- threaded discussion
- leaderboard tables
- matchmaking
- live sessions
- public uploads
- achievement engines

---

## 16. Migration Guidance

When migrating from prototype data:

### Worlds
- preserve current anime-world identity
- preserve slugs where possible

### Members
- preserve known roster structure
- map social links carefully

### Questions
- separate quiz questions from fan questions before import

### Challenges
- normalize challenge composition into `challenges` + `challenge_items`

### Assets
- replace static frontend asset assumptions with `media_assets` references

---

## 17. Schema Draft Decision

The schema direction to commit to now is:

- normalized content model
- explicit separation between content and app data
- single challenge engine in v1
- media-ready but not video-dependent
- PWA-first, production-ready backend data model
- migration-friendly alignment with current prototype

This schema draft is the authoritative implementation reference until replaced by a newer approved version.