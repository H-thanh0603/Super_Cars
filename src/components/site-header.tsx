import Link from "next/link";

const navItems = [
  { href: "/xe", label: "Kho xe" },
  { href: "/lien-he", label: "Liên hệ" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-black/55 backdrop-blur-xl">
      <div className="container-shell flex h-18 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold tracking-[0.24em] text-[var(--gold)]">
            SC
          </span>
          <div>
            <p className="font-[var(--font-display)] text-lg font-semibold tracking-[-0.04em]">
              Super_Cars
            </p>
            <p className="text-xs text-white/56">Showroom premium tại Việt Nam</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/72 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/lien-he"
          className="rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]"
        >
          Nhận tư vấn
        </Link>
      </div>
    </header>
  );
}
