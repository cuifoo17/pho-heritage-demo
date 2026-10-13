"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Placeholder. Will link to the Toast online-ordering URL. Shows once the hero has scrolled out. */
export function OrderNow() {
  const pathname = usePathname();
  return <FloatingOrder key={pathname} />;
}

function FloatingOrder() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    const hero = main?.querySelector("[data-hero]");
    if (!main || !hero) {
      const id = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      root: main,
      threshold: 0,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={[
        "fixed right-4 bottom-4 z-30 pb-safe-bottom transition-all duration-300 ease-out md:right-8 md:bottom-8",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <button
        type="button"
        tabIndex={show ? 0 : -1}
        className="min-h-touch rounded-full bg-terracotta px-6 py-3 font-sans text-base font-medium text-cream shadow-lg shadow-black/20 select-none transition active:scale-[0.98] active:bg-terracotta-deep hover:bg-terracotta-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
      >
        Order now
      </button>
    </div>
  );
}
