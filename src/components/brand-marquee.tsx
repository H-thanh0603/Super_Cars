type BrandMarqueeProps = {
  items: string[];
};

export function BrandMarquee({ items }: BrandMarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className="marquee-shell overflow-hidden rounded-full border border-white/8 bg-white/[0.03] py-3">
      <div className="marquee-track flex min-w-max items-center gap-4 px-4">
        {track.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-4 whitespace-nowrap text-xs uppercase tracking-[0.22em] text-white/50">
            <span>{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
