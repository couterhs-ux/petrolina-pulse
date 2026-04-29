import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — desktop only.
 * - Small orange dot (12px) follows mouse instantly.
 * - Larger ring (36px) follows with smooth lerp delay.
 * - Expands on hover of links/buttons.
 * - Disabled on touch devices and < 1024px.
 */
export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    const isWide = window.matchMedia("(min-width: 1024px)").matches;
    if (isTouch || !isWide) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom-active");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x - 6}px, ${target.y - 6}px, 0)`;
      }
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 18}px, ${ring.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("cursor-custom-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          width: 12,
          height: 12,
          borderRadius: "9999px",
          backgroundColor: "#FF6B00",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width: 36,
          height: 36,
          borderRadius: "9999px",
          border: "1px solid rgba(255,107,0,0.5)",
          willChange: "transform",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
          ...(hovering
            ? {
                width: 56,
                height: 56,
                marginLeft: -10,
                marginTop: -10,
                backgroundColor: "rgba(255,107,0,0.08)",
                borderColor: "rgba(255,107,0,0.8)",
              }
            : {}),
        }}
      />
    </>
  );
};
