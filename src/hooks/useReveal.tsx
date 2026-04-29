import { useEffect } from "react";

/**
 * Global reveal-on-scroll hook.
 * Watches all elements with the `.reveal` class and adds `.visible`
 * when they enter the viewport. Children with `[data-reveal-child]`
 * inside a revealed container get a staggered delay (80ms each).
 */
export const useReveal = () => {
  useEffect(() => {
    const observed = new WeakSet<Element>();

    const apply = (el: Element) => {
      el.classList.add("visible");
      const children = el.querySelectorAll<HTMLElement>("[data-reveal-child]");
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 80}ms`;
        child.classList.add("visible");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            apply(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const scan = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        // If already in viewport on mount, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          apply(el);
        } else {
          observer.observe(el);
        }
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
};
