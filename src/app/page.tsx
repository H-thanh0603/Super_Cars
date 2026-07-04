import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CarCard } from "@/components/car-card";
import { MotionShell } from "@/components/motion-shell";
import { Faux3DCarStage } from "@/components/faux-3d-car-stage";

export default async function HomePage() {
  const [featuredCars, latestCars, inventoryStats] = await Promise.all([
    prisma.car.findMany({
      where: { isFeatured: true, isAvailable: true },
      include: { images: { orderBy: { sortOrder: "asc" } } },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.car.findMany({
      where: { isAvailable: true },
      include: { images: { orderBy: { sortOrder: "asc" } } },
      take: 6,
      orderBy: [{ isFeatured: "desc" }, { price: "desc" }],
    }),
    prisma.car.aggregate({
      _count: true,
      _min: { price: true, mileageKm: true },
      _max: { price: true, horsepower: true },
    }),
  ]);

  const spotlightCar = featuredCars[0] ?? latestCars[0];
  const supportingCars = latestCars.slice(1, 3);
  const browseCars = latestCars.slice(0, 3);

  const marketSignals = [
    {
      value: `${inventoryStats._count}`,
      label: "xe sẵn lịch xem",
      detail: "Từ sedan phổ thông tới các mẫu performance cao.",
    },
    {
      value: formatCurrency(Number(inventoryStats._min.price ?? 0n)),
      label: "mốc vào showroom",
      detail: "Giữ cửa vào đủ thực tế cho khách mua xe quyết định nhanh.",
    },
    {
      value: `${formatNumber(Number(inventoryStats._max.horsepower ?? 0))} hp`,
      label: "đỉnh dải cảm xúc",
      detail: "Có cả xe phục vụ hình ảnh mạnh và cảm giác lái rõ nét.",
    },
  ];

  const conciergeSteps = [
    "Chốt nhanh nhóm xe phù hợp theo ngân sách, hình ảnh và mục tiêu sử dụng.",
    "Giữ lịch xem riêng, lên sẵn xe và route tư vấn trước khi anh tới showroom.",
    "Tách rõ thông tin kỹ thuật, lịch sử sử dụng và phần đàm phán để anh đỡ mất sức.",
  ];

  return (
    <div>
      <SiteHeader />

      <main>
        <MotionShell>
          <section className="container-shell grid min-h-[100dvh] items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
            <div className="space-y-8" data-reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/58">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)] shadow-[0_0_18px_rgba(201,151,77,0.8)]" />
                showroom xe cao cấp • cinematic inventory
              </div>

              <div className="space-y-6">
                <h1 className="display-title max-w-5xl text-5xl font-semibold leading-[0.94] text-white md:text-7xl xl:text-[5.5rem]">
                  Showroom đủ sang để chốt cảm xúc, đủ rõ để chốt quyết định.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-white/66 md:text-xl">
                  Super_Cars được dựng như một storefront showroom thật: có flagship car,
                  phân khúc rõ, nhịp tư vấn rõ, và cảm giác premium hơn một listing site thông thường.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row" data-stagger-group>
                <Link
                  href="/xe"
                  className="rounded-full bg-[var(--gold)] px-7 py-4 text-center text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]"
                >
                  Xem inventory flagship
                </Link>
                <Link
                  href="/lien-he"
                  className="rounded-full border border-white/14 px-7 py-4 text-center text-sm text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Đặt lịch private concierge
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-3" data-stagger-group>
                {marketSignals.map((signal) => (
                  <div key={signal.label} className="luxury-panel rounded-[24px] p-5">
                    <p className="display-title text-3xl font-semibold text-white">{signal.value}</p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-white/46">{signal.label}</p>
                    <p className="mt-4 text-sm leading-7 text-white/62">{signal.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {spotlightCar ? (
              <div data-reveal>
                <Faux3DCarStage
                  title={spotlightCar.name}
                  eyebrow={`flagship spotlight • ${spotlightCar.brand}`}
                  badge={spotlightCar.heroTag}
                  caption="Một stage faux-3D để homepage có cảm giác trưng bày showroom thay vì chỉ là một grid card phẳng."
                  primaryImage={spotlightCar.images[0]?.imageUrl ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"}
                  secondaryImages={spotlightCar.images.slice(1, 3).map((image) => image.imageUrl)}
                />
              </div>
            ) : null}
          </section>

          <section className="section-space border-y border-white/6 bg-white/[0.02]" data-reveal>
            <div className="container-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.18em] text-white/42">showroom narrative</p>
                <h2 className="display-title text-4xl font-semibold text-white md:text-5xl">
                  Không phải chợ xe. Đây là flow dẫn khách từ tò mò đến lịch xem xe.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3" data-stagger-group>
                {conciergeSteps.map((step, index) => (
                  <div key={step} className="rounded-[24px] border border-white/8 bg-black/24 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">0{index + 1}</p>
                    <p className="mt-4 text-sm leading-7 text-white/68">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-space">
            <div className="container-shell flex items-end justify-between gap-6" data-reveal>
              <div className="max-w-3xl space-y-3">
                <p className="text-sm uppercase tracking-[0.18em] text-white/42">featured collection</p>
                <h2 className="display-title text-4xl font-semibold text-white md:text-5xl">
                  Những chiếc xe được chọn để vừa lên hình đẹp, vừa giữ lý do mua đủ rõ.
                </h2>
              </div>
              <Link href="/xe" className="hidden rounded-full border border-white/12 px-5 py-3 text-sm text-white/76 transition hover:border-white/30 hover:text-white md:inline-flex">
                Mở toàn bộ kho xe
              </Link>
            </div>

            <div className="container-shell mt-10 grid gap-8 lg:grid-cols-3" data-stagger-group>
              {browseCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </section>

          <section className="section-space" data-reveal>
            <div className="container-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="luxury-panel rounded-[32px] p-7 md:p-9">
                <p className="text-sm uppercase tracking-[0.2em] text-white/42">editorial spotlight</p>
                <h2 className="display-title mt-4 text-4xl font-semibold text-white md:text-5xl">
                  Một xe flagship kéo cảm xúc. Một lineup đủ tỉnh táo để chốt lead.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/64">
                  Carpla cho em ý tưởng về nhiều entry point và quick chips. Vucar cho em ý tưởng về trust story.
                  Super_Cars sẽ giữ tinh thần showroom cao cấp: ít màu hơn, sạch hơn, nhưng phải giàu nhịp hơn hiện tại.
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-2" data-stagger-group>
                  {supportingCars.map((car) => (
                    <Link
                      key={car.id}
                      href={`/xe/${car.slug}`}
                      className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/18 hover:bg-white/[0.05]"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] text-white/42">{car.brand}</p>
                      <p className="display-title mt-3 text-2xl font-semibold text-white transition group-hover:text-[var(--gold)]">
                        {car.name}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/60">{car.shortDescription}</p>
                      <div className="mt-5 flex items-center justify-between text-sm text-white/70">
                        <span>{formatCurrency(Number(car.price))}</span>
                        <span>{formatNumber(car.mileageKm)} km</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid gap-4" data-stagger-group>
                {[
                  ["Flagship banner", "Hero có chiều sâu hơn bằng faux-3D stage + stats + trust strip thay vì text trái ảnh phải thuần."],
                  ["Filter-first browsing", "Inventory sẽ có price band, condition, fuel, transmission và quick chips để cảm giác thật hơn."],
                  ["Conversion sections", "Thêm concierge, trust, inspection story và related flow để user có lý do để lại lead."],
                ].map(([title, text]) => (
                  <div key={title} className="card-surface rounded-[26px] p-6">
                    <p className="display-title text-2xl font-semibold text-white">{title}</p>
                    <p className="mt-4 text-sm leading-7 text-white/62">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </MotionShell>
      </main>

      <SiteFooter />
    </div>
  );
}
