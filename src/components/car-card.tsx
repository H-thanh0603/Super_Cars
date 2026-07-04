import Image from "next/image";
import Link from "next/link";
import type { Car, CarImage } from "@prisma/client";
import { formatCurrency, formatNumber } from "@/lib/utils";

type CarCardProps = {
  car: Car & { images: CarImage[] };
};

export function CarCard({ car }: CarCardProps) {
  const cover = car.images[0]?.imageUrl ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80";

  return (
    <article className="group card-surface overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-1 hover:border-white/16 hover:shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={cover}
          alt={car.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,9,0.08),rgba(7,8,9,0.24)_44%,rgba(7,8,9,0.9))]" />
        <div className="absolute inset-x-[12%] bottom-4 h-16 rounded-full bg-[radial-gradient(circle,rgba(201,151,77,0.3),rgba(201,151,77,0.06)_50%,transparent_72%)] blur-xl" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/14 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/88 backdrop-blur">
            {car.heroTag}
          </span>
          {car.isFeatured ? (
            <span className="rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/12 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">
              spotlight
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/58">
              {car.brand}
            </p>
            <h3 className="display-title mt-2 text-2xl font-semibold text-white transition group-hover:text-[var(--gold)]">
              {car.name}
            </h3>
          </div>
          <div className="rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-medium text-black shadow-[0_12px_30px_rgba(201,151,77,0.2)]">
            {formatCurrency(Number(car.price))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-5 py-5 text-sm text-white/70 md:grid-cols-[1.15fr_1fr]">
        <p className="leading-7">{car.shortDescription}</p>
        <div className="grid grid-cols-2 gap-3 text-white/80">
          <div>
            <p className="text-xs text-white/44">Năm</p>
            <p>{car.year}</p>
          </div>
          <div>
            <p className="text-xs text-white/44">Odo</p>
            <p>{formatNumber(car.mileageKm)} km</p>
          </div>
          <div>
            <p className="text-xs text-white/44">Động cơ</p>
            <p>{car.engine}</p>
          </div>
          <div>
            <p className="text-xs text-white/44">Công suất</p>
            <p>{car.horsepower} hp</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/8 px-5 py-4">
        <p className="text-sm text-white/48">{car.color} • {car.transmission}</p>
        <Link
          href={`/xe/${car.slug}`}
          className="rounded-full border border-white/14 px-4 py-2 text-sm text-white transition hover:border-white/30 hover:bg-white/5"
        >
          Xem chi tiết
        </Link>
      </div>
    </article>
  );
}
