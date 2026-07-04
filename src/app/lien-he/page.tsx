import { submitLeadAction } from "@/app/actions/public";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const query = (await searchParams) ?? {};

  return (
    <div>
      <SiteHeader />
      <main className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.18em] text-white/42">liên hệ showroom</p>
            <h1 className="display-title text-5xl font-semibold text-white md:text-6xl">
              Để lại nhu cầu. Phần tư vấn sâu tụi em lo tiếp.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/66">
              Form này phù hợp khi anh/chị chưa chốt mẫu xe cụ thể nhưng cần tư vấn theo ngân sách, nhu cầu sử dụng hoặc nhóm xe đang cân nhắc.
            </p>
            <div className="card-surface rounded-[24px] p-6 text-sm leading-7 text-white/68">
              <p>Hotline: 0900 000 888</p>
              <p>Email: hello@supercars.vn</p>
              <p>Hình thức làm việc: hẹn lịch trước, xem xe theo slot riêng</p>
            </div>
          </div>

          <div className="card-surface rounded-[28px] p-6 lg:p-8">
            <h2 className="display-title text-3xl font-semibold text-white">Nhận tư vấn theo nhu cầu</h2>
            <p className="mt-3 text-sm leading-7 text-white/56">
              Điền đủ thông tin cơ bản để showroom gợi ý nhóm xe hợp hơn, tránh mất thời gian xem xe không đúng nhu cầu.
            </p>

            {query.status === "success" ? (
              <div className="mt-5 rounded-[16px] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                Đã ghi nhận yêu cầu. Showroom sẽ liên hệ sớm.
              </div>
            ) : null}

            {query.status === "error" ? (
              <div className="mt-5 rounded-[16px] border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                Chưa gửi được yêu cầu. Vui lòng kiểm tra lại thông tin.
              </div>
            ) : null}

            <form action={submitLeadAction} className="mt-6 space-y-4">
              <input name="fullName" placeholder="Họ và tên" required className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
              <div className="grid gap-4 md:grid-cols-2">
                <input name="phone" placeholder="Số điện thoại" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
                <input name="email" type="email" placeholder="Email" className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
              </div>
              <input name="budgetLabel" placeholder="Ngân sách dự kiến (ví dụ: 1.5 tỷ - 3 tỷ)" className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
              <textarea name="note" rows={6} placeholder="Nhu cầu sử dụng, nhóm xe quan tâm, số chỗ, ưu tiên thương hiệu..." className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
              <button className="w-full rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]">
                Gửi yêu cầu tư vấn
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
