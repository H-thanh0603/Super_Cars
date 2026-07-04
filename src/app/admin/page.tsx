import Link from "next/link";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const admin = await requireAdminSession();

  const [cars, leads, appointments] = await Promise.all([
    prisma.car.count(),
    prisma.lead.count(),
    prisma.appointment.count(),
  ]);

  const latestLeads = await prisma.lead.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const featured = await prisma.car.findFirst({
    where: { isFeatured: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <AdminShell adminName={admin.fullName}>
      <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-white/42">dashboard</p>
        <h1 className="display-title mt-3 text-4xl font-semibold text-white">Tổng quan vận hành showroom</h1>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Tổng xe", cars.toString()],
          ["Lead đã lưu", leads.toString()],
          ["Lịch hẹn", appointments.toString()],
        ].map(([label, value]) => (
          <div key={label} className="card-surface rounded-[24px] p-5">
            <p className="text-sm text-white/44">{label}</p>
            <p className="display-title mt-4 text-4xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card-surface rounded-[24px] p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="display-title text-2xl font-semibold text-white">Lead mới nhất</h2>
            <Link href="/admin/leads" className="text-sm text-white/60 hover:text-white">Xem tất cả</Link>
          </div>
          <div className="mt-6 space-y-4">
            {latestLeads.map((lead) => (
              <div key={lead.id} className="rounded-[18px] border border-white/8 bg-white/3 px-4 py-4 text-sm text-white/74">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{lead.fullName}</p>
                    <p className="text-white/48">{lead.phone} • {lead.email ?? "chưa có email"}</p>
                  </div>
                  <p className="text-white/42">{formatDate(lead.createdAt)}</p>
                </div>
                <p className="mt-3 text-white/62">{lead.car?.name ?? "Lead tư vấn chung"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface rounded-[24px] p-6">
          <h2 className="display-title text-2xl font-semibold text-white">Xe featured gần nhất</h2>
          {featured ? (
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p className="text-white text-xl font-medium">{featured.name}</p>
              <p>{featured.brand} • {featured.year}</p>
              <p>{formatCurrency(Number(featured.price))}</p>
              <p>{featured.shortDescription}</p>
            </div>
          ) : (
            <p className="mt-6 text-white/58">Chưa có xe featured.</p>
          )}
        </div>
      </section>
      </div>
    </AdminShell>
  );
}
