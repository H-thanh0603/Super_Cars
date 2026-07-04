import { updateAppointmentStatusAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

const statuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default async function AdminAppointmentsPage() {
  const admin = await requireAdminSession();
  const appointments = await prisma.appointment.findMany({
    include: { car: true },
    orderBy: { preferredDate: "desc" },
  });

  return (
    <AdminShell adminName={admin.fullName}>
      <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-white/42">appointments</p>
        <h1 className="display-title mt-3 text-4xl font-semibold text-white">Quản lý lịch hẹn</h1>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="card-surface rounded-[24px] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xl font-medium text-white">{appointment.fullName}</p>
                <p className="mt-2 text-sm text-white/58">{appointment.phone} • {appointment.email ?? "không có email"}</p>
                <p className="mt-2 text-sm text-white/48">
                  {appointment.car.name} • {formatDate(appointment.preferredDate)} • {appointment.preferredSlot}
                </p>
              </div>
              <form action={updateAppointmentStatusAction} className="flex items-center gap-3">
                <input type="hidden" name="id" value={appointment.id} />
                <select name="status" defaultValue={appointment.status} className="rounded-[14px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-white">
                  {statuses.map((status) => (
                    <option key={status} value={status} className="bg-black">{status}</option>
                  ))}
                </select>
                <button className="rounded-full border border-white/12 px-4 py-3 text-sm text-white/72 hover:border-white/24 hover:text-white">Lưu</button>
              </form>
            </div>
            {appointment.note ? <p className="mt-4 text-sm leading-7 text-white/64">{appointment.note}</p> : null}
          </div>
        ))}
      </div>
      </div>
    </AdminShell>
  );
}
