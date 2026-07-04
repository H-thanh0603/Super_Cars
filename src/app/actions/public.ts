"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { appointmentSchema, leadSchema } from "@/lib/validations";

export async function submitLeadAction(formData: FormData) {
  const parsed = leadSchema.safeParse({
    carId: formData.get("carId")?.toString() || undefined,
    fullName: formData.get("fullName")?.toString(),
    phone: formData.get("phone")?.toString(),
    email: formData.get("email")?.toString() || "",
    budgetLabel: formData.get("budgetLabel")?.toString() || undefined,
    note: formData.get("note")?.toString() || undefined,
  });

  if (!parsed.success) {
    redirect("/lien-he?status=error");
  }

  await prisma.lead.create({
    data: {
      carId: parsed.data.carId,
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      budgetLabel: parsed.data.budgetLabel,
      note: parsed.data.note,
    },
  });

  redirect("/lien-he?status=success");
}

export async function createAppointmentAction(formData: FormData) {
  const parsed = appointmentSchema.safeParse({
    carId: formData.get("carId")?.toString(),
    fullName: formData.get("fullName")?.toString(),
    phone: formData.get("phone")?.toString(),
    email: formData.get("email")?.toString() || "",
    preferredDate: formData.get("preferredDate")?.toString(),
    preferredSlot: formData.get("preferredSlot")?.toString(),
    note: formData.get("note")?.toString() || undefined,
  });

  if (!parsed.success) {
    const carSlug = formData.get("carSlug")?.toString();
    redirect(carSlug ? `/xe/${carSlug}?booking=error` : "/xe?booking=error");
  }

  await prisma.appointment.create({
    data: {
      carId: parsed.data.carId,
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      preferredDate: new Date(parsed.data.preferredDate),
      preferredSlot: parsed.data.preferredSlot,
      note: parsed.data.note,
    },
  });

  const carSlug = formData.get("carSlug")?.toString();
  redirect(carSlug ? `/xe/${carSlug}?booking=success` : "/xe?booking=success");
}
