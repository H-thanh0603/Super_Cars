import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CarCard } from "@/components/car-card";
import { MotionShell } from "@/components/motion-shell";

const priceBands = [
  { value: "under-2b", label: "Dưới 2 tỷ" },
  { value: "2b-5b", label: "2 tỷ - 5 tỷ" },
  { value: "above-5b", label: "Trên 5 tỷ" },
] as const;

const typeChips = ["Porsche", "BMW", "Mercedes-Benz", "Tesla", "Toyota", "Lamborghini"];

function getPriceFilter(priceBand: string) {
  if (priceBand === "under-2b") {
    return { lte: BigInt(2_000_000_000) };
  }
  if (priceBand === "2b-5b") {
    return { gte: BigInt(2_000_000_000), lte: BigInt(5_000_000_000) };
  }
  if (priceBand === "above-5b") {
    return { gte: BigInt(5_000_000_000) };
  }
  return undefined;
}

export default async function CarsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    brand?: string;
    condition?: string;
    fuel?: string;
    transmission?: string;
    priceBand?: string;
    featured?: string;
    sort?: string;
  }>;
}) {
  const params = (await searchParams) ?? {};
  const q = params.q?.trim() ?? "";
  const brand = params.brand?.trim() ?? "";
  const condition = params.condition?.trim() ?? "";
  const fuel = params.fuel?.trim() ?? "";
  const transmission = params.transmission?.trim() ?? "";
  const priceBand = params.priceBand?.trim() ?? "";
  const featured = params.featured?.trim() ?? "";
  const sort = params.sort?.trim() ?? "latest";

  const orderBy =
    sort === "price-asc"
      ? [{ price: "asc" as const }]
      : sort === "price-desc"
        ? [{ price: "desc" as const }]
        : sort === "mileage-asc"
          ? [{ mileageKm: "asc" as const }]
          : [{ isFeatured: "desc" as const }, { createdAt: "desc" as const }];

  const cars = await prisma.car.findMany({
    where: {
      isAvailable: true,
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q } },
                { brand: { contains: q } },
                { model: { contains: q } },
                { heroTag: { contains: q } },
              ],
            }
          : {},
        brand ? { brand } : {},
        condition ? { condition } : {},
        fuel ? { fuelType: fuel } : {},
        transmission ? { transmission } : {},
        featured === "true" ? { isFeatured: true } : {},
        getPriceFilter(priceBand) ? { price: getPriceFilter(priceBand) } : {},
      ],
    },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy,
  });

  const [brands, stats] = await Promise.all([
    prisma.car.findMany({
      distinct: ["brand"],
      select: { brand: true },
      orderBy: { brand: "asc" },
    }),
    prisma.car.aggregate({
      where: { isAvailable: true },
      _count: true,
      _min: { price: true },
      _max: { price: true },
    }),
  ]);

  return (
    <div>
      <SiteHeader />
      <main>
        <MotionShell>
          <section className="section-space pb-12">
            <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-5" data-reveal>
                <p className="text-sm uppercase tracking-[0.18em] text-white/42">inventory command center</p>
                <h1 className="display-title max-w-4xl text-5xl font-semibold text-white md:text-6xl">
                  Kho xe được dựng để anh lọc nhanh, xem đẹp và chốt lịch ngay khi thấy đúng xe.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-white/66">
                  Em giữ cảm giác premium của showroom nhưng mượn ý tưởng quick-filter từ Carpla và trust-led structure từ Vucar,
                  để trang kho xe bớt demo và giống một inventory thật hơn.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3" data-stagger-group>
                <div className="luxury-panel rounded-[24px] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/44">xe khả dụng</p>
                  <p className="display-title mt-3 text-4xl font-semibold text-white">{stats._count}</p>
                </div>
                <div className="luxury-panel rounded-[24px] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/44">giá thấp nhất</p>
                  <p className="mt-3 text-lg font-medium text-white">{formatCurrency(Number(stats._min.price ?? 0n))}</p>
                </div>
                <div className="luxury-panel rounded-[24px] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/44">giá cao nhất</p>
                  <p className="mt-3 text-lg font-medium text-white">{formatCurrency(Number(stats._max.price ?? 0n))}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-6" data-reveal>
            <div className="container-shell flex flex-wrap gap-3">
              {typeChips.map((chip) => (
                <Link
                  key={chip}
                  href={`/xe?brand=${encodeURIComponent(chip)}`}
                  className={`filter-chip ${brand === chip ? "filter-chip-active" : ""}`}
                >
                  {chip}
                </Link>
              ))}
              <Link href="/xe?featured=true" className={`filter-chip ${featured === "true" ? "filter-chip-active" : ""}`}>
                Featured only
              </Link>
              <Link href="/xe?condition=USED" className={`filter-chip ${condition === "USED" ? "filter-chip-active" : ""}`}>
                Xe đã qua sử dụng
              </Link>
              <Link href="/xe?fuel=ELECTRIC" className={`filter-chip ${fuel === "ELECTRIC" ? "filter-chip-active" : ""}`}>
                EV / Electric
              </Link>
            </div>
          </section>

          <section className="pb-10">
            <div className="container-shell grid gap-6 xl:grid-cols-[320px_1fr]">
              <form className="luxury-panel grid h-fit gap-4 rounded-[28px] p-5 xl:sticky xl:top-24" data-reveal>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/42">search query</p>
                  <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Tên xe, model hoặc cảm giác mua"
                    className="mt-3 w-full rounded-[18px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
                  <select name="brand" defaultValue={brand} className="rounded-[18px] border border-white/10 bg-white/4 px-4 py-4 text-white">
                    <option value="">Tất cả hãng xe</option>
                    {brands.map((item) => (
                      <option key={item.brand} value={item.brand} className="bg-black text-white">
                        {item.brand}
                      </option>
                    ))}
                  </select>

                  <select name="priceBand" defaultValue={priceBand} className="rounded-[18px] border border-white/10 bg-white/4 px-4 py-4 text-white">
                    <option value="">Mọi khoảng giá</option>
                    {priceBands.map((item) => (
                      <option key={item.value} value={item.value} className="bg-black text-white">
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <select name="condition" defaultValue={condition} className="rounded-[18px] border border-white/10 bg-white/4 px-4 py-4 text-white">
                    <option value="">Tình trạng</option>
                    <option value="USED" className="bg-black text-white">USED</option>
                    <option value="NEW" className="bg-black text-white">NEW</option>
                    <option value="CERTIFIED" className="bg-black text-white">CERTIFIED</option>
                  </select>

                  <select name="fuel" defaultValue={fuel} className="rounded-[18px] border border-white/10 bg-white/4 px-4 py-4 text-white">
                    <option value="">Nhiên liệu</option>
                    <option value="GASOLINE" className="bg-black text-white">GASOLINE</option>
                    <option value="HYBRID" className="bg-black text-white">HYBRID</option>
                    <option value="ELECTRIC" className="bg-black text-white">ELECTRIC</option>
                    <option value="DIESEL" className="bg-black text-white">DIESEL</option>
                  </select>

                  <select name="transmission" defaultValue={transmission} className="rounded-[18px] border border-white/10 bg-white/4 px-4 py-4 text-white">
                    <option value="">Hộp số</option>
                    <option value="AUTOMATIC" className="bg-black text-white">AUTOMATIC</option>
                    <option value="MANUAL" className="bg-black text-white">MANUAL</option>
                  </select>

                  <select name="sort" defaultValue={sort} className="rounded-[18px] border border-white/10 bg-white/4 px-4 py-4 text-white">
                    <option value="latest" className="bg-black text-white">Mới nhất / featured</option>
                    <option value="price-asc" className="bg-black text-white">Giá tăng dần</option>
                    <option value="price-desc" className="bg-black text-white">Giá giảm dần</option>
                    <option value="mileage-asc" className="bg-black text-white">Odo thấp trước</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/3 px-4 py-4 text-sm text-white/74">
                  <input type="checkbox" name="featured" value="true" defaultChecked={featured === "true"} className="accent-[var(--gold)]" />
                  Chỉ xem xe spotlight / featured
                </label>

                <div className="flex gap-3">
                  <button className="flex-1 rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]">
                    Lọc inventory
                  </button>
                  <Link href="/xe" className="rounded-full border border-white/12 px-5 py-4 text-sm text-white/70 transition hover:border-white/30 hover:text-white">
                    Reset
                  </Link>
                </div>
              </form>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4" data-reveal>
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-white/42">kết quả lọc</p>
                    <p className="mt-2 text-base text-white/62">
                      {cars.length} xe khớp bộ lọc • range từ {formatCurrency(Number(stats._min.price ?? 0n))} đến {formatCurrency(Number(stats._max.price ?? 0n))}
                    </p>
                  </div>
                </div>

                {cars.length === 0 ? (
                  <div className="card-surface rounded-[28px] p-8 text-center" data-reveal>
                    <p className="display-title text-3xl font-semibold text-white">Chưa có xe khớp bộ lọc này.</p>
                    <p className="mt-3 text-white/58">Thử mở rộng price band hoặc bỏ condition để xem toàn bộ inventory.</p>
                    <Link href="/xe" className="mt-6 inline-flex rounded-full border border-white/12 px-5 py-3 text-sm text-white/74 hover:border-white/30 hover:text-white">
                      Xem lại toàn bộ kho xe
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-8 lg:grid-cols-2 2xl:grid-cols-3" data-stagger-group>
                    {cars.map((car) => (
                      <CarCard key={car.id} car={car} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </MotionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
