import { loginAdminAction } from "@/app/actions/admin";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const query = (await searchParams) ?? {};

  return (
    <main className="flex min-h-[100dvh] items-center justify-center px-4">
      <div className="card-surface w-full max-w-md rounded-[28px] p-8">
        <p className="text-sm uppercase tracking-[0.18em] text-white/42">admin portal</p>
        <h1 className="display-title mt-4 text-4xl font-semibold text-white">
          Đăng nhập showroom
        </h1>
        <p className="mt-3 text-sm leading-7 text-white/56">
          Tài khoản seed mặc định: admin@supercars.vn / admin123456
        </p>

        {query.status === "error" ? (
          <div className="mt-5 rounded-[16px] border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            Sai email hoặc mật khẩu.
          </div>
        ) : null}

        <form action={loginAdminAction} className="mt-6 space-y-4">
          <input name="email" type="email" placeholder="Email" required className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
          <input name="password" type="password" placeholder="Mật khẩu" required className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
          <button className="w-full rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]">
            Đăng nhập admin
          </button>
        </form>
      </div>
    </main>
  );
}
