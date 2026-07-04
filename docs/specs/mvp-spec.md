# Super_Cars MVP Spec

## 1. Outcomes
- Khách xem danh sách xe, lọc nhanh, vào chi tiết xe, để lại lead hoặc đặt lịch xem xe.
- Showroom có admin để quản lý inventory, lead và lịch hẹn bằng dữ liệu thật.
- Giao diện đủ premium để dùng bàn giao khách hàng, không phải demo học tập.
- Kiến trúc đủ sạch để nâng cấp deploy production, PostgreSQL, cloud image upload sau phase 1.

## 2. In-Scope
- Public storefront: home, inventory listing, car detail, about showroom, contact/lead flow.
- Search/filter/sort cho inventory.
- Lead form và booking form cho lịch xem xe.
- Admin auth.
- Admin dashboard, CRUD xe, quản lý lead, quản lý lịch hẹn.
- Seed data gồm xe phổ thông và xe sang/super car.
- Responsive mobile/tablet/desktop.
- SEO cơ bản cho page chính và detail page.

## 3. Out-of-Scope
- Thanh toán/đặt cọc online.
- Marketplace nhiều người bán.
- Blog/CMS đầy đủ.
- Chat realtime.
- Tích hợp CRM/ERP bên ngoài.
- Đa ngôn ngữ.

## 4. Constraints
- Repo làm trực tiếp tại `D:/Super_Cars`.
- Tech direction: Next.js + TypeScript + Tailwind + Prisma.
- Phase 1 dùng SQLite/dev để build nhanh, kiến trúc mở để đổi PostgreSQL sau.
- UI phải bám `brand.md` và `DESIGN.md`, không hard-code style tùy hứng.
- Mỗi phase xong phải verify rồi mới commit.

## 5. Decisions Already Made
- Business model: showroom đơn lẻ.
- Audience: cả khách phổ thông và khách mua xe sang.
- Brand direction: luxury editorial + Porsche-Tesla clean.
- Language: tiếng Việt.
- No online payment in phase 1.
- Scope target: fullstack cân bằng, production-oriented.

## 6. Tasks Breakdown
1. Khóa brand + tokens + spec + plan.
2. Scaffold app, prisma schema, base theme, layout shell, seed foundation.
3. Build public storefront pages và shared components.
4. Build filter/search/detail/lead/booking flows.
5. Build admin auth, dashboard, CRUD xe, lead, appointment.
6. Polish, test, build verify, README handoff.

## 7. Verification
- `npm install` thành công.
- Prisma schema hợp lệ, migrate/seed chạy được.
- `npm run dev` mở được app local.
- Public pages render đúng.
- Tạo lead và booking lưu được DB.
- Admin login và CRUD xe hoạt động.
- `npm run build` pass.
- `git status` sạch sau mỗi commit chính.
