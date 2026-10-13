"use client";

import { TransitionLink as Link } from "./TransitionLink";
import { usePathname } from "next/navigation";
import { PAGES, useScene } from "./scene-context";

export function Header() {
  const pathname = usePathname();
  const { setPreview } = useScene();

  return (
    <>
      <Link
        href="/"
        className="fixed top-4 left-1/2 z-30 -translate-x-1/2 pt-safe-top font-serif text-2xl text-white mix-blend-difference select-none md:top-6 md:left-8 md:translate-x-0 md:text-3xl"
        onMouseEnter={() => setPreview("home")}
        onMouseLeave={() => setPreview(null)}
      >
        Pho Heritage
      </Link>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 pt-safe-top">
        <div className="flex justify-center px-4 pt-16 md:justify-end md:px-8 md:pt-6">
          <nav aria-label="Pages" className="pointer-events-auto">
            <ul className="flex max-w-full gap-1 rounded-full bg-cream/90 p-1 ring-1 ring-sand backdrop-blur select-none md:gap-2">
              {PAGES.map((page) => {
                const isCurrent = page.href === "/" ? pathname === "/" : pathname.startsWith(page.href);
                return (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      aria-current={isCurrent ? "page" : undefined}
                      onMouseEnter={() => page.scene && setPreview(page.scene)}
                      onMouseLeave={() => setPreview(null)}
                      className={[
                        "flex min-h-touch items-center rounded-full px-3 font-sans text-sm font-medium whitespace-nowrap transition active:scale-[0.98] md:px-5 md:text-base",
                        isCurrent
                          ? "bg-terracotta text-cream"
                          : "text-ink hover:bg-sand/60 active:bg-sand",
                      ].join(" ")}
                    >
                      {page.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
