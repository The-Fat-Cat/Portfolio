import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", onMove);

    const hoverables = document.querySelectorAll(
      "a, button, input, textarea, .nav-link, .social-item, .btn-submit"
    );

    const onEnter = () => {
      gsap.to(cursor, {
        scale: 2.5,
        backgroundColor: "#6366f1",
        duration: 0.2,
      });
      cursor.style.mixBlendMode = "difference";
    };

    const onLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#f5f5f7",
        duration: 0.2,
      });
      cursor.style.mixBlendMode = "normal";
    };

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return { cursorRef, glowRef };
}
