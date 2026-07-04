"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MotionShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function MotionShell({ children, className }: MotionShellProps) {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      reveals.forEach((node, index) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 44, scale: index === 0 ? 1 : 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      const groups = gsap.utils.toArray<HTMLElement>("[data-stagger-group]");
      groups.forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    },
    { scope },
  );

  return <div ref={scope} className={cn(className)}>{children}</div>;
}
