import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CarCard } from "@/components/car-card";

export default async function HomePage() {
  const featuredCars = await prisma.car.findMany({
    where: { isFeatured: true },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const inventoryStats = await prisma.car.aggregate({
    _count: true,
    _min: { price: true },
    _max: { price: true },
  });

  return (
    <div>
      <SiteHeader />

      <main>
        <section className="container-shell grid min-h-[100dvh] items-center gap-10 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/64">
              showroom xe cao cấp cho khách Việt
            </div>
            <div className="space-y-6">
              <h1 className="display-title max-w-4xl text-5xl font-semibold leading-none text-white md:text-7xl">
                Mua xe đẹp hơn, rõ hơn và ít cảm giác bị bán hơn.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/66 md:text-xl">
                Super_Cars tuyển chọn xe phổ thông cao cấp lẫn xe sang hiệu suất cao,
                ưu tiên thông tin thật, ảnh đẹp, lịch hẹn linh hoạt và trải nghiệm xem xe có chiều sâu.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/xe"
                className="rounded-full bg-[var(--gold)] px-6 py-4 text-center text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]"
              >
                Xem kho xe đang có
              </Link>
              <Link
                href="/lien-he"
                className="rounded-full border border-white/14 px-6 py-4 text-center text-sm text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Đặt lịch tư vấn riêng
              </Link>
            </div>
          </div>

          <div className="card-surface rounded-[28px] p-5 lg:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[24px] bg-white/4 p-6">
                <p className="text-sm text-white/48">Inventory hiện tại</p>
                <p className="mt-4 display-title text-5xl font-semibold text-white">
                  {inventoryStats._count}
                </p>
                <p className="mt-2 text-sm text-white/58">xe đã qua tuyển chọn</p>
              </div>
              <div className="rounded-[24px] bg-white/4 p-6">
                <p className="text-sm text-white/48">Khung giá</p>
                <p className="mt-4 text-xl font-medium text-white">
                  {formatCurrency(Number(inventoryStats._min.price ?? 0n))}
                </p>
                <p className="mt-1 text-sm text-white/58">
                  đến {formatCurrency(Number(inventoryStats._max.price ?? 0n))}
                </p>
              </div>
              <div className="rounded-[24px] bg-white/4 p-6 md:col-span-2 lg:col-span-1">
                <p className="text-sm text-white/48">Cam kết làm việc</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/72">
                  <li>- Thông tin tình trạng xe rõ ràng</li>
                  <li>- Có lịch xem xe và trải nghiệm thực tế</li>
                  <li>- Có nhóm xe phổ thông lẫn nhóm xe hình ảnh cao</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-shell flex items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="text-sm uppercase tracking-[0.18em] text-white/42">xe nổi bật</p>
              <h2 className="display-title text-4xl font-semibold text-white md:text-5xl">
                Những chiếc xe giúp showroom chốt cảm xúc lẫn quyết định.
              </h2>
            </div>
            <Link href="/xe" className="hidden rounded-full border border-white/12 px-5 py-3 text-sm text-white/76 transition hover:border-white/30 hover:text-white md:inline-flex">
              Xem toàn bộ kho xe
            </Link>
          </div>
          <div className="container-shell mt-10 grid gap-8 lg:grid-cols-3">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        <section className="section-space">
          <div className="container-shell grid gap-6 lg:grid-cols-3">
            {[
              ["Tư vấn theo nhu cầu", "Tách rõ nhóm khách mua xe thực dụng và khách mua xe cảm xúc để không bị tư vấn lệch."],
              ["Lịch hẹn linh hoạt", "Đặt lịch xem xe hoặc trao đổi riêng trước khi tới showroom để tiết kiệm thời gian đôi bên."],
              ["Nội dung đủ sạch để bàn giao", "Kiến trúc web được làm để còn mở rộng tiếp, không chỉ dừng ở landing page demo."],
            ].map(([title, text]) => (
              <div key={title} className="card-surface rounded-[24px] p-6">
                <p className="display-title text-2xl font-semibold text-white">{title}</p>
                <p className="mt-4 text-sm leading-7 text-white/64">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
