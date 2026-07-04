import { updateLeadStatusAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED"];

export default async function AdminLeadsPage() {
  const admin = await requireAdminSession();
  const leads = await prisma.lead.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell adminName={admin.fullName}>
      <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-white/42">lead pipeline</p>
        <h1 className="display-title mt-3 text-4xl font-semibold text-white">Quản lý lead</h1>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.id} className="card-surface rounded-[24px] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xl font-medium text-white">{lead.fullName}</p>
                <p className="mt-2 text-sm text-white/58">{lead.phone} • {lead.email ?? "không có email"}</p>
                <p className="mt-2 text-sm text-white/48">{lead.car?.name ?? "Lead tư vấn chung"} • {formatDate(lead.createdAt)}</p>
              </div>
              <form action={updateLeadStatusAction} className="flex items-center gap-3">
                <input type="hidden" name="id" value={lead.id} />
                <select name="status" defaultValue={lead.status} className="rounded-[14px] border border-white/10 bg-white/4 px-4 py-3 text-sm text-white">
                  {statuses.map((status) => (
                    <option key={status} value={status} className="bg-black">{status}</option>
                  ))}
                </select>
                <button className="rounded-full border border-white/12 px-4 py-3 text-sm text-white/72 hover:border-white/24 hover:text-white">Lưu</button>
              </form>
            </div>
            {lead.note ? <p className="mt-4 text-sm leading-7 text-white/64">{lead.note}</p> : null}
          </div>
        ))}
      </div>
      </div>
    </AdminShell>
  );
}
