import { deleteCarAction, saveCarAction } from "@/app/actions/admin";
import { AdminShell } from "@/components/admin-shell";
import { requireAdminSession } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";

export default async function AdminCarsPage({
  searchParams,
}: {
  searchParams?: Promise<{ id?: string; status?: string }>;
}) {
  const admin = await requireAdminSession();
  const query = (await searchParams) ?? {};

  const [cars, currentCar] = await Promise.all([
    prisma.car.findMany({ include: { images: { orderBy: { sortOrder: "asc" } } }, orderBy: { createdAt: "desc" } }),
    query.id ? prisma.car.findUnique({ where: { id: query.id }, include: { images: { orderBy: { sortOrder: "asc" } } } }) : null,
  ]);

  return (
    <AdminShell adminName={admin.fullName}>
      <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-white/42">inventory admin</p>
        <h1 className="display-title mt-3 text-4xl font-semibold text-white">Quản lý xe</h1>
      </div>

      {query.status ? (
        <div className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/74">
          Trạng thái: {query.status}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <form action={saveCarAction} className="card-surface rounded-[24px] p-6 space-y-4">
          <input type="hidden" name="id" value={currentCar?.id ?? ""} />
          <h2 className="display-title text-2xl font-semibold text-white">
            {currentCar ? "Cập nhật xe" : "Thêm xe mới"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" defaultValue={currentCar?.name} placeholder="Tên xe" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
            <input name="slug" defaultValue={currentCar?.slug} placeholder="slug" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
            <input name="brand" defaultValue={currentCar?.brand} placeholder="Hãng xe" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
            <input name="model" defaultValue={currentCar?.model} placeholder="Model" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
            <input name="year" type="number" defaultValue={currentCar?.year} placeholder="Năm" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white" />
            <input name="price" type="number" defaultValue={currentCar ? Number(currentCar.price) : undefined} placeholder="Giá VND" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white" />
            <input name="mileageKm" type="number" defaultValue={currentCar?.mileageKm} placeholder="Odo km" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white" />
            <input name="color" defaultValue={currentCar?.color} placeholder="Màu xe" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
            <input name="horsepower" type="number" defaultValue={currentCar?.horsepower} placeholder="Công suất hp" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white" />
            <input name="engine" defaultValue={currentCar?.engine} placeholder="Động cơ" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
            <input name="seats" type="number" defaultValue={currentCar?.seats} placeholder="Số chỗ" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white" />
            <input name="drivetrain" defaultValue={currentCar?.drivetrain} placeholder="Dẫn động" required className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
            <select name="condition" defaultValue={currentCar?.condition ?? "USED"} className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white"><option value="NEW" className="bg-black">NEW</option><option value="USED" className="bg-black">USED</option><option value="CERTIFIED" className="bg-black">CERTIFIED</option></select>
            <select name="fuelType" defaultValue={currentCar?.fuelType ?? "GASOLINE"} className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white"><option value="GASOLINE" className="bg-black">GASOLINE</option><option value="DIESEL" className="bg-black">DIESEL</option><option value="HYBRID" className="bg-black">HYBRID</option><option value="ELECTRIC" className="bg-black">ELECTRIC</option></select>
            <select name="transmission" defaultValue={currentCar?.transmission ?? "AUTOMATIC"} className="rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white"><option value="AUTOMATIC" className="bg-black">AUTOMATIC</option><option value="MANUAL" className="bg-black">MANUAL</option></select>
          </div>
          <input name="heroTag" defaultValue={currentCar?.heroTag} placeholder="Hero tag" required className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
          <textarea name="shortDescription" defaultValue={currentCar?.shortDescription} rows={3} placeholder="Mô tả ngắn" required className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
          <textarea name="description" defaultValue={currentCar?.description} rows={6} placeholder="Mô tả chi tiết" required className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
          <textarea name="imageUrls" defaultValue={currentCar?.images.map((image) => image.imageUrl).join("\n")} rows={5} placeholder="Mỗi dòng 1 URL ảnh" required className="w-full rounded-[16px] border border-white/10 bg-white/4 px-4 py-4 text-white placeholder:text-white/32" />
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <label className="flex items-center gap-2"><input type="checkbox" name="isFeatured" defaultChecked={currentCar?.isFeatured ?? false} /> Featured</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="isAvailable" defaultChecked={currentCar?.isAvailable ?? true} /> Available</label>
          </div>
          <button className="rounded-full bg-[var(--gold)] px-6 py-4 text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]">
            {currentCar ? "Lưu cập nhật" : "Tạo xe mới"}
          </button>
        </form>

        <div className="space-y-4">
          {cars.map((car) => (
            <div key={car.id} className="card-surface rounded-[24px] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="display-title text-2xl font-semibold text-white">{car.name}</p>
                  <p className="mt-2 text-sm text-white/58">{car.brand} • {car.year} • {Number(car.price).toLocaleString("vi-VN")} VND</p>
                </div>
                <div className="flex gap-3">
                  <a href={`/admin/cars?id=${car.id}`} className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/70 hover:border-white/24 hover:text-white">Sửa</a>
                  <form action={deleteCarAction}>
                    <input type="hidden" name="id" value={car.id} />
                    <button className="rounded-full border border-rose-500/30 px-4 py-2 text-sm text-rose-200 hover:bg-rose-500/10">Xóa</button>
                  </form>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/66">{car.shortDescription}</p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </AdminShell>
  );
}
