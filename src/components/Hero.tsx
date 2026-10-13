import type { ReactNode } from "react";

/** Full-viewport transparent block; the scene shows through from behind. */
export function Hero({ children, align = "center" }: { children: ReactNode; align?: "center" | "left" }) {
  return (
    <section
      data-hero
      className={[
        "flex min-h-dvh flex-col justify-end px-4 pt-40 pb-24 text-cream md:px-8 md:pb-28",
        align === "center" ? "items-center text-center" : "items-start text-left",
      ].join(" ")}
    >
      <div className="reveal w-full max-w-4xl">{children}</div>
    </section>
  );
}

export function Headline({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-tight text-balance [&_em]:text-terracotta">
      {children}
    </h1>
  );
}


export function Sub({ children }: { children: ReactNode }) {
  return <p className="mt-6 font-sans text-base text-cream/85 md:text-lg">{children}</p>;
}
