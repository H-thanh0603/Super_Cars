import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black/40 py-8">
      <div className="container-shell grid gap-8 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[var(--font-display)] text-2xl font-semibold tracking-[-0.04em] text-white">
            Super_Cars
          </p>
          <p className="max-w-md text-sm leading-7 text-white/60">
            Showroom tuyển chọn xe phổ thông cao cấp và xe sang hiệu suất cao,
            ưu tiên trải nghiệm xem xe thật, thông tin rõ và tư vấn đủ chiều sâu.
          </p>
        </div>

        <div className="space-y-3 text-sm text-white/64">
          <p className="font-medium text-white">Điều hướng</p>
          <div className="flex flex-col gap-2">
            <Link href="/xe">Kho xe</Link>
            <Link href="/lien-he">Liên hệ</Link>
            <Link href="/admin/login">Đăng nhập admin</Link>
          </div>
        </div>

        <div className="space-y-3 text-sm text-white/64">
          <p className="font-medium text-white">Thông tin showroom</p>
          <div className="space-y-2">
            <p>TP.HCM - nhận lịch hẹn theo yêu cầu</p>
            <p>Hotline: 0900 000 888</p>
            <p>Email: hello@supercars.vn</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
