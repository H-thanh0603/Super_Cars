---
version: alpha
name: Super Cars
description: Luxury editorial automotive storefront with cinematic dark surfaces, precision layout, and premium lead-conversion clarity.
colors:
  primary: "#C9974D"
  secondary: "#9FB3C8"
  tertiary: "#171918"
  neutral: "#F7F7F5"
  neutral-100: "#ECECE8"
  neutral-200: "#D8D9D2"
  neutral-300: "#B8BAB3"
  neutral-400: "#8B8F89"
  neutral-500: "#666B67"
  neutral-600: "#444844"
  neutral-700: "#2B2E2D"
  neutral-800: "#171918"
  neutral-900: "#0B0C0D"
  success: "#1F8F5F"
  warning: "#D08A28"
  danger: "#C94949"
  info: "#4E7DD6"
typography:
  h1:
    fontFamily: Geist
    fontSize: 4.5rem
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  h2:
    fontFamily: Geist
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  h3:
    fontFamily: Geist
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "-0.01em"
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  label:
    fontFamily: Geist Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  xs: 6px
  sm: 10px
  md: 16px
  lg: 24px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  4xl: 64px
  5xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "#D9AA63"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.pill}"
    padding: 14px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: 14px
  card-dark:
    backgroundColor: "#121415"
    textColor: "#FFFFFF"
    rounded: "{rounded.lg}"
    padding: 24px
  card-light:
    backgroundColor: "#F7F7F5"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.lg}"
    padding: 24px
  input-default:
    backgroundColor: "#111315"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: 16px
---

## Overview

Super_Cars dùng dark premium foundation để tạo cảm giác showroom cao cấp, nhưng vẫn giữ độ sáng và độ thoáng vừa đủ để khách phổ thông không thấy khó tiếp cận. Bản sắc thị giác phải gợi cảm giác xe thật, kim loại thật, ánh sáng thật, thay vì một landing page công nghệ generic.

## Colors

- Primary `#C9974D` là accent duy nhất cho CTA, trạng thái active và các điểm chốt chuyển đổi.
- Secondary `#9FB3C8` dùng tiết chế cho metadata, chip hoặc support visuals.
- Neutrals đi từ bone-light tới graphite-black để phục vụ nhịp dark-light cinematic.
- Không dùng thêm accent thứ hai trên cùng page.

## Typography

- Geist cho display giúp headline hiện đại, sạch, gọn, không bị quá tech-bro.
- Inter cho body để đảm bảo readability và hỗ trợ tiếng Việt ổn định.
- Geist Mono chỉ dùng cho label nhỏ, spec line, filter label hoặc metadata.

## Layout

- Hero phải fit viewport, CTA nhìn thấy ngay.
- Listing ưu tiên rhythm của ảnh, thông số chính, giá, trạng thái, CTA.
- Detail page phải chia rõ 3 lớp: visual gallery, commercial summary, trust info.
- Admin đi theo layout clean và thực dụng hơn storefront.

## Elevation & Depth

- Chủ yếu tạo depth bằng nền tối, border tinh, blur nhẹ và shadow mềm.
- Không lạm dụng glassmorphism.
- Hình ảnh xe và ánh sáng là lớp depth chính.

## Shapes

- Toàn hệ thống dùng radius mềm nhưng kỷ luật: 10, 16, 24, pill.
- Button, filter chip, badges đều bám cùng hệ radius.

## Components

- CTA chính luôn dùng accent gold và text tối.
- CTA phụ dùng outline hoặc nền trong suốt trên dark surface.
- Card xe phải có tỷ lệ ảnh đẹp, metadata rõ, không nhồi quá nhiều text.
- Form lead cần độ tương phản cao, dễ nhập, mobile-friendly.

## Do's and Don'ts

- Do: dùng real photography, hierarchy rõ, spacing thoáng, accent một màu.
- Do: giữ cảm giác showroom cao cấp nhưng conversion rõ ràng.
- Don't: làm giống chợ xe, nhiều badge màu, nhiều banner khuyến mãi.
- Don't: dùng hiệu ứng neon, AI gradient, hoặc card grid lặp vô nghĩa.
