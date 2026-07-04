import Link from "next/link";
import { logoutAdminAction } from "@/app/actions/admin";

type AdminShellProps = {
  adminName: string;
  children: React.ReactNode;
};

const navItems = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/cars", label: "Quản lý xe" },
  { href: "/admin/leads", label: "Lead" },
  { href: "/admin/appointments", label: "Lịch hẹn" },
];

export function AdminShell({ adminName, children }: AdminShellProps) {
  return (
    <div className="min-h-[100dvh] bg-[#0b0c0d] text-white">
      <div className="container-shell grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="card-surface rounded-[24px] p-5 lg:sticky lg:top-8 lg:h-fit">
          <Link href="/" className="display-title text-2xl font-semibold text-white">
            Super_Cars
          </Link>
          <p className="mt-2 text-sm text-white/52">Xin chào, {adminName}</p>
          <nav className="mt-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-[16px] border border-white/8 px-4 py-3 text-sm text-white/72 transition hover:border-white/20 hover:bg-white/4 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAdminAction} className="mt-8">
            <button className="w-full rounded-full border border-white/12 px-4 py-3 text-sm text-white/72 transition hover:border-white/28 hover:text-white">
              Đăng xuất
            </button>
          </form>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
