"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adminLoginSchema, carSchema } from "@/lib/validations";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-session";
import { signAdminSession, verifyPassword } from "@/lib/auth";

function normalizeBoolean(value: FormDataEntryValue | null) {
  return value?.toString() === "on";
}

export async function loginAdminAction(formData: FormData) {
  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  });

  if (!parsed.success) {
    redirect("/admin/login?status=error");
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!admin) {
    redirect("/admin/login?status=error");
  }

  const isValid = await verifyPassword(parsed.data.password, admin.passwordHash);

  if (!isValid) {
    redirect("/admin/login?status=error");
  }

  const token = await signAdminSession({
    adminId: admin.id,
    email: admin.email,
    fullName: admin.fullName,
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}

export async function saveCarAction(formData: FormData) {
  const id = formData.get("id")?.toString() || undefined;

  const parsed = carSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    brand: formData.get("brand"),
    model: formData.get("model"),
    year: formData.get("year"),
    price: formData.get("price"),
    mileageKm: formData.get("mileageKm"),
    color: formData.get("color"),
    condition: formData.get("condition"),
    fuelType: formData.get("fuelType"),
    transmission: formData.get("transmission"),
    horsepower: formData.get("horsepower"),
    engine: formData.get("engine"),
    seats: formData.get("seats"),
    drivetrain: formData.get("drivetrain"),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    heroTag: formData.get("heroTag"),
    imageUrls: formData.get("imageUrls"),
    isFeatured: normalizeBoolean(formData.get("isFeatured")),
    isAvailable: normalizeBoolean(formData.get("isAvailable")),
  });

  if (!parsed.success) {
    redirect(id ? `/admin/cars?status=error&id=${id}` : "/admin/cars?status=error");
  }

  const imageUrls = parsed.data.imageUrls
    .split(/\r?\n|,/) 
    .map((item) => item.trim())
    .filter(Boolean);

  const baseData = {
    name: parsed.data.name,
    slug: parsed.data.slug,
    brand: parsed.data.brand,
    model: parsed.data.model,
    year: parsed.data.year,
    price: parsed.data.price,
    mileageKm: parsed.data.mileageKm,
    color: parsed.data.color,
    condition: parsed.data.condition,
    fuelType: parsed.data.fuelType,
    transmission: parsed.data.transmission,
    horsepower: parsed.data.horsepower,
    engine: parsed.data.engine,
    seats: parsed.data.seats,
    drivetrain: parsed.data.drivetrain,
    shortDescription: parsed.data.shortDescription,
    description: parsed.data.description,
    heroTag: parsed.data.heroTag,
    isFeatured: parsed.data.isFeatured,
    isAvailable: parsed.data.isAvailable,
  };

  if (id) {
    await prisma.car.update({
      where: { id },
      data: {
        ...baseData,
        images: {
          deleteMany: {},
          create: imageUrls.map((imageUrl, index) => ({
            imageUrl,
            alt: parsed.data.name,
            sortOrder: index,
          })),
        },
      },
    });
  } else {
    await prisma.car.create({
      data: {
        ...baseData,
        images: {
          create: imageUrls.map((imageUrl, index) => ({
            imageUrl,
            alt: parsed.data.name,
            sortOrder: index,
          })),
        },
      },
    });
  }

  redirect("/admin/cars?status=saved");
}

export async function deleteCarAction(formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) {
    redirect("/admin/cars?status=error");
  }

  await prisma.car.delete({ where: { id } });
  redirect("/admin/cars?status=deleted");
}

export async function updateLeadStatusAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();

  if (!id || !status) {
    redirect("/admin/leads?status=error");
  }

  await prisma.lead.update({
    where: { id },
    data: { status: status as "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" },
  });

  redirect("/admin/leads?status=updated");
}

export async function updateAppointmentStatusAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();

  if (!id || !status) {
    redirect("/admin/appointments?status=error");
  }

  await prisma.appointment.update({
    where: { id },
    data: {
      status: status as "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED",
    },
  });

  redirect("/admin/appointments?status=updated");
}
