import type { ReactNode } from "react";
import { TransitionLink } from "./TransitionLink";

/** Cream page section, centered serif heading with an italic accent word. */
export function Section({
  id,
  title,
  children,
  tone = "cream",
  className = "",
}: {
  id?: string;
  title?: ReactNode;
  children: ReactNode;
  tone?: "cream" | "sand";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={[
        "px-4 py-24 md:px-8 md:py-40",
        tone === "sand" ? "bg-sand-light" : "bg-cream",
        className,
      ].join(" ")}
    >
      <div className="mx-auto max-w-5xl">
        {title && (
          <h2 className="text-center font-serif text-4xl leading-tight text-ink text-balance md:text-6xl">
            {title}
          </h2>
        )}
        <div className={title ? "mt-12 md:mt-16" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <em className="text-terracotta">{children}</em>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={["rounded-2xl border border-sand bg-cream p-6 md:p-8", className].join(" ")}>
      {children}
    </div>
  );
}

export function Pill({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  const className = [
    "inline-flex min-h-touch items-center justify-center rounded-full px-6 py-3 font-sans text-base font-medium transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
    secondary
      ? "bg-cream text-terracotta ring-1 ring-sand hover:bg-sand/60"
      : "bg-terracotta text-cream hover:bg-terracotta-deep",
  ].join(" ");
  if (href.startsWith("/")) {
    return (
      <TransitionLink href={href} className={className}>
        {children}
      </TransitionLink>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
