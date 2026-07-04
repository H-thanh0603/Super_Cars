# Super_Cars Implementation Plan

> For Hermes: implement phase-by-phase with verification after each milestone.

**Goal:** Xây web showroom bán xe production-grade cho một showroom đơn lẻ, có public storefront premium và admin backend quản lý inventory, lead, lịch hẹn.

**Architecture:** Monorepo app đơn giản bằng Next.js App Router. Public storefront và admin cùng chạy trong một codebase. Prisma là data layer, SQLite cho dev. UI bám token từ DESIGN.md để storefront và admin thống nhất nhưng vẫn khác mức độ polish.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Prisma, SQLite, Zod, React Hook Form, server actions/API routes tùy phù hợp.

---

## Design Read
- Production showroom web cho khách Việt, phục vụ cả xe phổ thông lẫn xe sang.
- Visual language: luxury editorial + Porsche-Tesla clean.
- Dials: variance 7, motion 4, density 4.

## Phase Plan

### Phase 0: Foundation Documents
**Objective:** khóa direction trước khi code.

**Files:**
- Create: `brand.md`
- Create: `DESIGN.md`
- Create: `docs/specs/mvp-spec.md`
- Create: `docs/plans/2026-07-05-super-cars-implementation.md`

**Verify:** đọc lại file và lint `DESIGN.md` nếu tool khả dụng.

### Phase 1: App Scaffold + Theme + Data Foundation
**Objective:** tạo nền fullstack chạy được.

**Files dự kiến:**
- `package.json`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/(store)/...` hoặc cấu trúc tương đương
- `src/components/...`
- `src/lib/...`
- `prisma/schema.prisma`
- `prisma/seed.ts`
- `.env.example`

**Deliverables:**
- Next.js scaffold
- Tailwind theme tokens bám brand
- Prisma schema nền: cars, images, leads, appointments, admin users
- seed data nền

**Verify:** install, prisma generate, migrate/db push, app boot được.

### Phase 2: Public Storefront MVP
**Objective:** tạo website public usable và premium.

**Deliverables:**
- home page
- inventory page
- car detail page
- contact/lead section
- booking form
- shared premium UI components

**Verify:** render từng route, form submit chạy, responsive pass cơ bản.

### Phase 3: Admin MVP
**Objective:** cho showroom quản lý dữ liệu thật.

**Deliverables:**
- admin login
- dashboard overview
- CRUD xe
- lead management
- appointment management

**Verify:** login, create/update/delete, state persisted in DB.

### Phase 4: Production Polish
**Objective:** nâng từ chạy được lên bàn giao được.

**Deliverables:**
- validation, loading, empty, error states
- SEO metadata
- responsive polish
- seed realistic hơn
- README handoff

**Verify:** `npm run build`, smoke test routes, git status sạch.

## Git Strategy
- Commit sau mỗi phase lớn.
- Commit style: `[tính năng] ...`, `[sửa lỗi] ...`, `[tài liệu] ...`
- Push lên `origin/main` sau khi verify phase tương ứng.

## Risks
- UI premium dễ phình scope nếu cố làm quá nhiều page ngay từ đầu.
- Image upload production thật cần cloud storage, chưa làm ở phase 1.
- SQLite đủ cho dev và demo bàn giao ban đầu, nhưng production nên chuyển PostgreSQL.

## Stop Conditions
- Nếu scaffold/tooling fail liên tục, dừng để sửa nền trước.
- Nếu build pass nhưng UX kém, chưa commit phase polish.
- Nếu dữ liệu core chưa chạy thật, không được claim MVP xong.
