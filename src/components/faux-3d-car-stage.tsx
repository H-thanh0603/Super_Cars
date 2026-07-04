"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type Faux3DCarStageProps = {
  title: string;
  eyebrow?: string;
  caption?: string;
  primaryImage: string;
  secondaryImages?: string[];
  badge?: string;
  className?: string;
};

export function Faux3DCarStage({
  title,
  eyebrow,
  caption,
  primaryImage,
  secondaryImages = [],
  badge,
  className,
}: Faux3DCarStageProps) {
  const scope = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const sideRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(frameRef.current, { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1 })
        .fromTo(mainRef.current, { y: 24, rotateX: 8, rotateY: -6 }, { y: 0, rotateX: 0, rotateY: 0, duration: 1.2 }, "<0.12")
        .fromTo(sideRefs.current.filter(Boolean), { autoAlpha: 0, x: 26, y: 26 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.9, stagger: 0.1 }, "<0.08")
        .fromTo(glowRef.current, { opacity: 0.25, scale: 0.88 }, { opacity: 0.75, scale: 1, duration: 1.4 }, 0);

      gsap.to(mainRef.current, {
        yPercent: -2.5,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const frame = frameRef.current;
      if (!frame) {
        return;
      }

      const onMove = (event: PointerEvent) => {
        const rect = frame.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(mainRef.current, {
          rotateY: x * 12,
          rotateX: y * -10,
          x: x * 18,
          y: y * 10,
          duration: 0.65,
          ease: "power2.out",
          overwrite: true,
          transformPerspective: 1000,
          transformOrigin: "center center",
        });

        sideRefs.current.forEach((node, index) => {
          gsap.to(node, {
            x: x * (14 + index * 6),
            y: y * (12 + index * 4),
            rotateY: x * (6 + index * 2),
            duration: 0.7,
            ease: "power2.out",
            overwrite: true,
          });
        });

        gsap.to(glowRef.current, {
          x: x * 24,
          y: y * 18,
          opacity: 0.82,
          duration: 0.7,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const onLeave = () => {
        gsap.to(mainRef.current, {
          rotateY: 0,
          rotateX: 0,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(sideRefs.current, {
          x: 0,
          y: 0,
          rotateY: 0,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(glowRef.current, {
          x: 0,
          y: 0,
          opacity: 0.75,
          duration: 0.9,
          ease: "power3.out",
          overwrite: true,
        });
      };

      frame.addEventListener("pointermove", onMove);
      frame.addEventListener("pointerleave", onLeave);

      return () => {
        frame.removeEventListener("pointermove", onMove);
        frame.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className={cn("relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(159,179,200,0.16),transparent_34%),linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]", className)}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="space-y-2">
          {eyebrow ? <p className="text-xs uppercase tracking-[0.24em] text-white/42">{eyebrow}</p> : null}
          <h3 className="display-title max-w-xl text-3xl font-semibold text-white md:text-4xl">{title}</h3>
          {caption ? <p className="max-w-xl text-sm leading-7 text-white/60">{caption}</p> : null}
        </div>
        {badge ? <span className="rounded-full border border-white/12 bg-black/25 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/62">{badge}</span> : null}
      </div>

      <div ref={frameRef} className="group relative aspect-[16/10] overflow-hidden rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(13,14,15,0.25),rgba(13,14,15,0.95))] [perspective:1400px]">
        <div ref={glowRef} className="absolute inset-x-[10%] bottom-[8%] h-24 rounded-full bg-[radial-gradient(circle,rgba(201,151,77,0.5),rgba(201,151,77,0.12)_45%,transparent_72%)] blur-2xl" />

        {secondaryImages.slice(0, 2).map((image, index) => (
          <div
            key={`${image}-${index}`}
            ref={(node) => {
              sideRefs.current[index] = node;
            }}
            className={cn(
              "absolute hidden overflow-hidden rounded-[22px] border border-white/10 bg-black/35 shadow-[0_18px_45px_rgba(0,0,0,0.45)] md:block",
              index === 0 ? "left-5 top-7 h-28 w-44 rotate-[-7deg]" : "bottom-7 right-6 h-32 w-52 rotate-[8deg]",
            )}
          >
            <Image src={image} alt={`${title} preview ${index + 1}`} fill className="object-cover opacity-75" sizes="220px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          </div>
        ))}

        <div ref={mainRef} className="absolute inset-x-[8%] bottom-[10%] top-[12%] overflow-hidden rounded-[26px] border border-white/10 bg-black/20 shadow-[0_30px_60px_rgba(0,0,0,0.35)] will-change-transform">
          <Image src={primaryImage} alt={title} fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,10,11,0.05),rgba(9,10,11,0.15)_42%,rgba(9,10,11,0.78))]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(8,9,10,0.88))]" />
        </div>
      </div>
    </div>
  );
}
