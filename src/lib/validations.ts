import { z } from "zod";

export const leadSchema = z.object({
  carId: z.string().optional(),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  budgetLabel: z.string().optional(),
  note: z.string().max(1000, "Ghi chú quá dài").optional(),
});

export const appointmentSchema = z.object({
  carId: z.string().min(1, "Thiếu xe cần đặt lịch"),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  preferredDate: z.string().min(1, "Vui lòng chọn ngày"),
  preferredSlot: z.string().min(1, "Vui lòng chọn khung giờ"),
  note: z.string().max(1000, "Ghi chú quá dài").optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export const carSchema = z.object({
  name: z.string().min(2, "Tên xe quá ngắn"),
  slug: z.string().min(2, "Slug quá ngắn"),
  brand: z.string().min(2, "Hãng xe quá ngắn"),
  model: z.string().min(1, "Thiếu model"),
  year: z.coerce.number().int().min(1990).max(2035),
  price: z.coerce.number().int().min(1),
  mileageKm: z.coerce.number().int().min(0),
  color: z.string().min(2, "Thiếu màu xe"),
  condition: z.enum(["NEW", "USED", "CERTIFIED"]),
  fuelType: z.enum(["GASOLINE", "DIESEL", "HYBRID", "ELECTRIC"]),
  transmission: z.enum(["AUTOMATIC", "MANUAL"]),
  horsepower: z.coerce.number().int().min(50),
  engine: z.string().min(2, "Thiếu thông tin động cơ"),
  seats: z.coerce.number().int().min(2).max(9),
  drivetrain: z.string().min(2, "Thiếu dẫn động"),
  shortDescription: z.string().min(20, "Mô tả ngắn quá ngắn"),
  description: z.string().min(50, "Mô tả chi tiết quá ngắn"),
  heroTag: z.string().min(4, "Hero tag quá ngắn"),
  imageUrls: z.string().min(10, "Cần ít nhất 1 URL ảnh"),
  isFeatured: z.coerce.boolean().optional().default(false),
  isAvailable: z.coerce.boolean().optional().default(true),
});
