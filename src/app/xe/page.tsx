import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CarCard } from "@/components/car-card";

export default async function CarsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; brand?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const q = params.q?.trim() ?? "";
  const brand = params.brand?.trim() ?? "";

  const cars = await prisma.car.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q } },
                { brand: { contains: q } },
                { model: { contains: q } },
              ],
            }
          : {},
        brand ? { brand } : {},
      ],
    },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  const brands = await prisma.car.findMany({
    distinct: ["brand"],
    select: { brand: true },
    orderBy: { brand: "asc" },
  });

  return (
    <div>
      <SiteHeader />
      <main className="section-space">
        <div className="container-shell space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.18em] text-white/42">inventory</p>
            <h1 className="display-title text-5xl font-semibold text-white md:text-6xl">
              Kho xe dành cho cả quyết định lý trí lẫn cảm xúc.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/66">
              Lọc nhanh theo hãng, tìm theo tên hoặc model, rồi đi thẳng vào chi tiết để xem thông số, tình trạng và đặt lịch.
            </p>
          </div>

          <form className="card-surface grid gap-4 rounded-[24px] p-5 md:grid-cols-[1.5fr_1fr_auto]">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Tìm theo tên xe, hãng hoặc model"
              className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32"
            />
            <select
              name="brand"
              defaultValue={brand}
              className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white"
            >
              <option value="">Tất cả hãng xe</option>
              {brands.map((item) => (
                <option key={item.brand} value={item.brand} className="bg-black text-white">
                  {item.brand}
                </option>
              ))}
            </select>
            <button className="rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]">
              Lọc xe
            </button>
          </form>

          {cars.length === 0 ? (
            <div className="card-surface rounded-[24px] p-8 text-center">
              <p className="display-title text-3xl font-semibold text-white">Chưa có xe khớp bộ lọc.</p>
              <p className="mt-3 text-white/58">Thử đổi từ khóa hoặc bỏ lọc hãng xe để xem toàn bộ inventory.</p>
              <Link href="/xe" className="mt-6 inline-flex rounded-full border border-white/12 px-5 py-3 text-sm text-white/74 hover:border-white/30 hover:text-white">
                Xem lại toàn bộ kho xe
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
