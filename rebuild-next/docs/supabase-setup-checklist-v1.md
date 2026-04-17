# AI Show — Supabase Setup Checklist v1

## Status
Practical setup checklist aligned with:

- `docs/production-decision-pack-v1.md`
- `docs/roadmap-v1.md`
- `docs/schema-draft-v1.md`
- `docs/backend-bootstrap-plan-v1.md`

This document is an execution checklist.
It does not replace the decision pack or schema draft.
It translates them into concrete setup actions for the first Supabase bootstrap pass.

---

## 1. Purpose

This checklist exists to answer:

**What exactly should be created in Supabase first, in what order, and what must be intentionally postponed?**

It is designed to prevent:
- random project creation without naming discipline
- auth setup before schema clarity
- storage setup without asset rules
- tables appearing before ownership rules
- premature edge functions
- accidental scope expansion

---

## 2. Scope of This Checklist

This checklist covers only:

- Supabase project bootstrap
- environment setup
- auth baseline
- storage baseline
- schema rollout order
- RLS baseline
- service key discipline
- readiness for Directus attachment

This checklist does **not** cover:
- final frontend integration
- SQL migration files
- full Directus configuration
- production launch
- app-store packaging
- analytics
- search
- multiplayer
- recommendation systems

---

## 3. Project Naming and Environment Rules

## Required environments
Create these environments conceptually from the start:

- development
- production

Optional later:
- staging

## Naming recommendation
Use simple, explicit names:

- `ai-show-dev`
- `ai-show-prod`

Do not create:
- vague project names
- temporary names you intend to “rename later”
- multiple experimental projects without ownership

## Environment ownership rule
- development is for setup, schema iteration, import testing
- production is created only after development setup is stable enough

---

## 4. Supabase Project Creation Checklist

### Development project
- [ ] Create Supabase development project
- [ ] Record project name clearly
- [ ] Record project region
- [ ] Record project URL
- [ ] Record anon key securely
- [ ] Record service role key securely
- [ ] Confirm dashboard access is working
- [ ] Confirm database access is available
- [ ] Confirm authentication section is accessible
- [ ] Confirm storage section is accessible

### Rules
- [ ] Do not put service role key into frontend code
- [ ] Do not share service role key casually
- [ ] Do not use the development project as permanent production

---

## 5. Secrets and Environment Discipline

### Required environment variables to standardize
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `SUPABASE_PROJECT_REF`
- [ ] `DIRECTUS_DATABASE_URL` later
- [ ] `DIRECTUS_ADMIN_EMAIL` later
- [ ] `DIRECTUS_ADMIN_PASSWORD` later

### Rules
- [ ] Public variables must be limited to public-safe client variables
- [ ] Service role key must remain server-side only
- [ ] Secrets must not be stored in Git
- [ ] One canonical place must exist for recording project refs and environment names

---

## 6. Auth Baseline Checklist

### First-pass auth scope
- [ ] Enable email auth
- [ ] Enable magic link / OTP flow
- [ ] Disable unused auth providers for now
- [ ] Confirm session creation works
- [ ] Confirm logout works

### Explicitly delay
- [ ] Do not enable phone auth now
- [ ] Do not enable every social provider now
- [ ] Do not design team/member login flows now
- [ ] Do not tie `members` to auth records

### Auth output requirement
- [ ] App can create authenticated users
- [ ] User identity can later map to `user_profiles`
- [ ] Auth is ready without social/platform complexity

---

## 7. Database Rollout Checklist

### Before creating tables
- [ ] Confirm naming rules are fixed
- [ ] Confirm enum/status decisions are accepted
- [ ] Confirm schema draft is the source of truth
- [ ] Confirm no prototype JS file is being treated as production schema

### Table rollout order

#### Group 1 — Content roots
- [ ] `media_assets`
- [ ] `worlds`
- [ ] `members`
- [ ] `tags`

#### Group 2 — Content relations
- [ ] `member_worlds`
- [ ] `world_tags`

#### Group 3 — Question system
- [ ] `question_bank_items`
- [ ] `question_options`

#### Group 4 — Challenge system
- [ ] `challenges`
- [ ] `challenge_items`

#### Group 5 — App layer
- [ ] `user_profiles`
- [ ] `fan_questions`

#### Group 6 — Persistence
- [ ] `challenge_attempts`
- [ ] `attempt_answers`

### Rules
- [ ] Do not create later-group tables before earlier dependencies
- [ ] Do not merge `fan_questions` into `question_bank_items`
- [ ] Do not merge `user_profiles` into `members`

---

## 8. Table Verification Checklist

For every created table, verify:

- [ ] table name is correct
- [ ] primary key exists
- [ ] timestamp fields exist where needed
- [ ] status/publish field exists where required
- [ ] slug field exists on public-facing entities only
- [ ] foreign keys are correct
- [ ] nullability is intentional
- [ ] no prototype-only field leaked into schema accidentally

---

## 9. Storage Baseline Checklist

### Create only the minimum required buckets first
- [ ] `worlds`
- [ ] `members`
- [ ] `challenges`
- [ ] `questions`
- [ ] `general-assets`

Optional later:
- [ ] `fan-questions-internal`

### Rules
- [ ] No public user upload bucket in v1 bootstrap
- [ ] Upload availability does not mean publish availability
- [ ] Every uploaded asset must map to a `media_assets` row
- [ ] Images/audio first, video later if justified

### Delay
- [ ] Do not stand up video pipeline yet unless confirmed necessary
- [ ] Do not build public upload flows

---

## 10. `user_profiles` Bootstrap Checklist

### After auth baseline
- [ ] Define `user_profiles` table
- [ ] Ensure one app profile per auth user
- [ ] Decide profile creation strategy:
  - trigger-based
  - or app-created on first login
- [ ] Confirm app identity references `user_profiles`, not raw auth structure

### Rules
- [ ] `user_profiles` are audience accounts only
- [ ] members are not profiles
- [ ] profiles stay lightweight in v1

---

## 11. RLS Baseline Checklist

### Before frontend writes anything
- [ ] Enable RLS where needed
- [ ] Define public read rules for published content only
- [ ] Define user-owned write rules for:
  - `fan_questions`
  - `challenge_attempts`
  - `attempt_answers`
  - `user_profiles` where appropriate
- [ ] Confirm content/admin tables are not publicly writable

### Required access model
#### Public read
- [ ] published worlds
- [ ] published members
- [ ] published challenges
- [ ] publicly readable content-safe media only

#### Authenticated user writes
- [ ] own `fan_questions`
- [ ] own `challenge_attempts`
- [ ] own `attempt_answers`
- [ ] own `user_profiles` fields where allowed

#### Staff/content writes
- [ ] not open directly to the public app

### Rules
- [ ] Never trust hidden frontend controls as security
- [ ] Never use service role key in client contexts
- [ ] Deny by default unless clearly justified

---

## 12. Seed Content Checklist

### Before seed/import
- [ ] Confirm worlds data is cleaned
- [ ] Confirm members data is cleaned
- [ ] Confirm challenge rows are normalized
- [ ] Confirm question bank and fan questions are split
- [ ] Confirm current asset paths are treated as migration hints, not permanent truth

### Seed/import order
- [ ] worlds
- [ ] members
- [ ] member_worlds
- [ ] tags if needed
- [ ] question_bank_items
- [ ] question_options
- [ ] challenges
- [ ] challenge_items
- [ ] media_assets placeholders or real rows

### Rules
- [ ] Preserve stable slugs where possible
- [ ] Do not import broken prototype assumptions blindly
- [ ] Normalize challenge composition before import

---

## 13. Directus Readiness Checklist

### Before attaching Directus
- [ ] Core schema exists
- [ ] table names are stable
- [ ] status fields are stable
- [ ] content relationships are usable
- [ ] media metadata model exists
- [ ] no major schema churn is expected immediately

### Do not attach Directus yet if:
- [ ] schema is still in flux
- [ ] content ownership is unclear
- [ ] relation model is still unstable
- [ ] publish-state model is undecided

### Directus should be attached only when:
- [ ] content model is stable enough to manage
- [ ] editor/reviewer/publisher workflow is meaningful

---

## 14. Edge Functions Checklist

### Delay by default
Do not create functions unless one of these is immediately needed:

- [ ] challenge scoring validation
- [ ] signed upload flow
- [ ] privileged content/admin mutation
- [ ] webhook/background logic

### Explicit delay
- [ ] Do not create a giant API layer during bootstrap
- [ ] Do not rewrite CRUD that the platform already provides
- [ ] Do not create functions “just to be proper backend”

---

## 15. Frontend Integration Readiness Checklist

The backend is ready for first frontend integration only when:

- [ ] auth baseline works
- [ ] core tables exist
- [ ] RLS baseline exists
- [ ] published content can be queried safely
- [ ] seed content exists
- [ ] media metadata exists
- [ ] frontend team/app can read content without guessing structure

---

## 16. What Must Be Delayed Intentionally

Do not bootstrap these now:

- [ ] search system
- [ ] analytics system
- [ ] notifications
- [ ] public uploads
- [ ] leaderboard/rank systems
- [ ] multiplayer
- [ ] social graph
- [ ] comments
- [ ] recommendation engine
- [ ] Capacitor packaging
- [ ] app-store workflows
- [ ] Cloudflare Stream unless video is genuinely required

---

## 17. Bootstrap Completion Definition

Supabase bootstrap is considered complete when:

- [ ] development project exists
- [ ] secrets are organized
- [ ] auth baseline works
- [ ] storage baseline works
- [ ] schema tables exist in correct order
- [ ] RLS baseline exists
- [ ] content seed/import can begin
- [ ] Directus attachment is feasible
- [ ] production app can start integrating reads next

---

## 18. Immediate Next Actions

Once this checklist is accepted, the next real execution actions are:

1. create Supabase development project
2. set environment naming and secret storage discipline
3. create core tables in rollout order
4. establish auth baseline
5. establish storage baseline
6. define RLS baseline
7. prepare seed/import plan
8. attach Directus after schema stability

---

## 19. Final Setup Decision

The correct Supabase setup direction for AI Show v1 is:

**Create a development Supabase project first, establish auth/storage/schema/RLS in strict order, delay non-essential systems, then import content and attach Directus only after core schema stability.**

This checklist is the operational bootstrap reference until replaced by a newer approved version.