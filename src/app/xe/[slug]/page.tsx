import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createAppointmentAction } from "@/app/actions/public";
import { appointmentSlots } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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

  const defaultDate = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);

  return (
    <div>
      <SiteHeader />
      <main className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.18em] text-white/42">{car.brand}</p>
              <h1 className="display-title text-5xl font-semibold text-white md:text-6xl">{car.name}</h1>
              <p className="max-w-2xl text-lg leading-8 text-white/66">{car.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {car.images.map((image, index) => (
                <div key={image.id} className={index === 0 ? "relative aspect-[16/11] overflow-hidden rounded-[24px] md:col-span-2" : "relative aspect-[4/3] overflow-hidden rounded-[24px]"}>
                  <Image src={image.imageUrl} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-surface rounded-[24px] p-6">
              <p className="text-sm text-white/48">Giá niêm yết</p>
              <p className="mt-4 display-title text-4xl font-semibold text-white">
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

            <div className="card-surface rounded-[24px] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="display-title text-2xl font-semibold text-white">Đặt lịch xem xe</p>
                  <p className="mt-2 text-sm leading-7 text-white/58">Chốt lịch riêng để xem xe đúng mẫu, đúng thời gian.</p>
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

            <Link href="/xe" className="inline-flex rounded-full border border-white/12 px-5 py-3 text-sm text-white/74 transition hover:border-white/30 hover:text-white">
              Quay lại kho xe
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
