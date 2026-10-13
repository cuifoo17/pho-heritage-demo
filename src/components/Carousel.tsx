import type { ReactNode } from "react";
import Image from "next/image";
import { asset } from "@/data/basePath";

/** Horizontal snap strip. Cards size by container width so a peek shows there is more. */
export function Carousel({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="@container">
      <h3 className="px-4 font-serif text-2xl text-ink md:px-0 md:text-3xl">{title}</h3>
      <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-px-4 overscroll-x-contain [scrollbar-width:none] md:mx-0 md:snap-none md:px-0 md:scroll-px-0 [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}

export function DishCard({ name, desc, price, image }: { name: string; desc: string; price: number; image?: string }) {
  return (
    <article className="w-[78cqw] max-w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-sand bg-cream">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-sand-light to-sand">
        {image && <Image src={asset(image)} alt={name} fill sizes="(min-width: 768px) 18rem, 78vw" className="object-cover" />}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-serif text-xl text-ink">{name}</p>
          <p className="shrink-0 text-base text-ink">${price}</p>
        </div>
        <p className="mt-2 text-base text-ink-soft">{desc}</p>
      </div>
    </article>
  );
}
