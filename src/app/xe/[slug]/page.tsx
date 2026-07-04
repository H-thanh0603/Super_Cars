import Link from "next/link";
import { notFound } from "next/navigation";
import { createAppointmentAction } from "@/app/actions/public";
import { appointmentSlots } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CarCard } from "@/components/car-card";
import { MotionShell } from "@/components/motion-shell";
import { Faux3DCarStage } from "@/components/faux-3d-car-stage";

export default async function CarDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ booking?: string }>;
}) {
  const { slug } = await params;
  const query = (await searchParams) ?? {};

  const car = await prisma.car.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  if (!car) {
    notFound();
  }

  const [relatedCars, availableCount] = await Promise.all([
    prisma.car.findMany({
      where: {
        id: { not: car.id },
        isAvailable: true,
        OR: [{ brand: car.brand }, { fuelType: car.fuelType }, { condition: car.condition }],
      },
      include: { images: { orderBy: { sortOrder: "asc" } } },
      take: 3,
      orderBy: [{ isFeatured: "desc" }, { price: "desc" }],
    }),
    prisma.car.count({ where: { isAvailable: true, brand: car.brand } }),
  ]);

  const defaultDate = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  const primaryImage = car.images[0]?.imageUrl ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80";
  const secondaryImages = car.images.slice(1, 3).map((image) => image.imageUrl);

  const trustNotes = [
    ["Tình trạng", car.condition],
    ["Fuel / Drive", `${car.fuelType} • ${car.drivetrain}`],
    ["Phân khúc hãng", `${availableCount} xe ${car.brand} đang khả dụng`],
  ];

  const highlightNotes = [
    `${formatNumber(car.horsepower)} hp giúp chiếc xe này không chỉ đẹp trên ảnh mà còn có câu chuyện vận hành rõ ràng.`,
    `${formatNumber(car.mileageKm)} km đủ để khách đọc nhanh về mức độ sử dụng mà không cần lục lại nhiều nơi.`,
    `${car.heroTag} — đây là angle bán hàng chính để đội showroom chốt cảm xúc trước khi chốt deal.`,
  ];

  return (
    <div>
      <SiteHeader />
      <main>
        <MotionShell>
          <section className="section-space pb-10">
            <div className="container-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="space-y-6" data-reveal>
                <p className="text-sm uppercase tracking-[0.18em] text-white/42">{car.brand} • flagship detail</p>
                <h1 className="display-title max-w-5xl text-5xl font-semibold text-white md:text-6xl xl:text-7xl">{car.name}</h1>
                <p className="max-w-3xl text-lg leading-8 text-white/66">{car.description}</p>
                <div className="flex flex-wrap gap-3" data-stagger-group>
                  {[
                    car.heroTag,
                    `${car.year}`,
                    `${formatNumber(car.mileageKm)} km`,
                    `${car.transmission}`,
                  ].map((item) => (
                    <span key={item} className="filter-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div data-reveal>
                <Faux3DCarStage
                  title={car.name}
                  eyebrow={`${car.brand} • cinematic detail stage`}
                  caption="Layered depth + parallax nhẹ để phần hero detail không còn là gallery tĩnh."
                  badge={car.heroTag}
                  primaryImage={primaryImage}
                  secondaryImages={secondaryImages}
                />
              </div>
            </div>
          </section>

          <section className="pb-12">
            <div className="container-shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr] xl:grid-cols-[0.78fr_1.22fr]">
              <div className="space-y-6 lg:sticky lg:top-24 lg:self-start" data-reveal>
                <div className="luxury-panel rounded-[30px] p-6 md:p-7">
                  <p className="text-sm text-white/48">Giá niêm yết</p>
                  <p className="mt-4 display-title text-4xl font-semibold text-white md:text-5xl">
                    {formatCurrency(Number(car.price))}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-white/74">
                    <div><p className="text-white/42">Năm</p><p>{car.year}</p></div>
                    <div><p className="text-white/42">Odo</p><p>{formatNumber(car.mileageKm)} km</p></div>
                    <div><p className="text-white/42">Động cơ</p><p>{car.engine}</p></div>
                    <div><p className="text-white/42">Công suất</p><p>{car.horsepower} hp</p></div>
                    <div><p className="text-white/42">Nhiên liệu</p><p>{car.fuelType}</p></div>
                    <div><p className="text-white/42">Dẫn động</p><p>{car.drivetrain}</p></div>
                  </div>
                </div>

                <div className="card-surface rounded-[30px] p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="display-title text-2xl font-semibold text-white">Đặt lịch xem xe</p>
                      <p className="mt-2 text-sm leading-7 text-white/58">Chốt lịch riêng để lên xe đúng mẫu, đúng mood và đúng khung giờ.</p>
                    </div>
                    <span className="rounded-full border border-white/12 px-4 py-2 text-xs uppercase tracking-[0.14em] text-white/58">{car.heroTag}</span>
                  </div>

                  {query.booking === "success" ? (
                    <div className="mt-5 rounded-[16px] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                      Đã ghi nhận lịch hẹn. Showroom sẽ liên hệ lại sớm.
                    </div>
                  ) : null}

                  {query.booking === "error" ? (
                    <div className="mt-5 rounded-[16px] border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                      Chưa lưu được lịch hẹn. Vui lòng kiểm tra thông tin và thử lại.
                    </div>
                  ) : null}

                  <form action={createAppointmentAction} className="mt-6 space-y-4">
                    <input type="hidden" name="carId" value={car.id} />
                    <input type="hidden" name="carSlug" value={car.slug} />
                    <input name="fullName" placeholder="Họ và tên" className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" required />
                    <div className="grid gap-4 md:grid-cols-2">
                      <input name="phone" placeholder="Số điện thoại" className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" required />
                      <input name="email" type="email" placeholder="Email (không bắt buộc)" className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <input name="preferredDate" type="date" defaultValue={defaultDate} className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white" required />
                      <select name="preferredSlot" defaultValue={appointmentSlots[0]} className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white" required>
                        <option value="" className="bg-black">Chọn khung giờ</option>
                        {appointmentSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-black">{slot}</option>
                        ))}
                      </select>
                    </div>
                    <textarea name="note" rows={4} placeholder="Điều anh/chị muốn trao đổi trước khi tới showroom" className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
                    <button className="w-full rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]">
                      Gửi yêu cầu đặt lịch
                    </button>
                  </form>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3" data-stagger-group>
                  {trustNotes.map(([title, value]) => (
                    <div key={title} className="luxury-panel rounded-[24px] p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/42">{title}</p>
                      <p className="mt-4 text-base font-medium text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]" data-reveal>
                  <div className="card-surface rounded-[30px] p-6 md:p-7">
                    <p className="text-sm uppercase tracking-[0.18em] text-white/42">vehicle narrative</p>
                    <h2 className="display-title mt-4 text-3xl font-semibold text-white md:text-4xl">Vì sao chiếc xe này đáng lên lịch xem thật?</h2>
                    <div className="mt-6 space-y-5 text-sm leading-8 text-white/66">
                      {highlightNotes.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                  </div>

                  <div className="card-surface rounded-[30px] p-6 md:p-7">
                    <p className="text-sm uppercase tracking-[0.18em] text-white/42">commercial summary</p>
                    <div className="mt-5 grid gap-5 text-sm text-white/70">
                      <div>
                        <p className="text-white/42">Màu xe</p>
                        <p className="mt-2 text-base text-white">{car.color}</p>
                      </div>
                      <div>
                        <p className="text-white/42">Ghế ngồi</p>
                        <p className="mt-2 text-base text-white">{car.seats} chỗ</p>
                      </div>
                      <div>
                        <p className="text-white/42">Transmission</p>
                        <p className="mt-2 text-base text-white">{car.transmission}</p>
                      </div>
                      <Link href="/xe" className="mt-2 inline-flex w-fit rounded-full border border-white/12 px-5 py-3 text-sm text-white/74 transition hover:border-white/30 hover:text-white">
                        Quay lại kho xe
                      </Link>
                    </div>
                  </div>
                </div>

                <div data-reveal>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-white/42">related suggestions</p>
                      <h2 className="display-title mt-3 text-3xl font-semibold text-white md:text-4xl">Nếu anh đang xem chiếc này, có thể anh cũng sẽ cân nhắc những xe dưới đây.</h2>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-8 lg:grid-cols-2 xl:grid-cols-3" data-stagger-group>
                    {relatedCars.map((relatedCar) => (
                      <CarCard key={relatedCar.id} car={relatedCar} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </MotionShell>
      </main>
      <SiteFooter />
    </div>
  );
}
