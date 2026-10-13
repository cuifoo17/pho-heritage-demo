"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Section";
import { GoogleG } from "@/components/GoogleG";
import { YelpMark } from "@/components/YelpMark";
import { REVIEWS_CSV_URL, sheetToReviews, type Rating, type Review } from "@/data/reviewsSheet";

/** Renders the fallback data immediately, then swaps in the Google Sheet once it loads. */
export function Reviews({ fallbackRatings, fallbackReviews }: { fallbackRatings: Rating[]; fallbackReviews: Review[] }) {
  const [ratings, setRatings] = useState(fallbackRatings);
  const [reviews, setReviews] = useState(fallbackReviews);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(REVIEWS_CSV_URL, { cache: "no-store", signal: ctrl.signal })
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
      .then((csv) => {
        const data = sheetToReviews(csv);
        if (!data) return;
        if (data.ratings.length) setRatings(data.ratings);
        setReviews(data.reviews);
      })
      .catch(() => {}); // keep fallback
    return () => ctrl.abort();
  }, []);

  return (
    <>
      <ul className="-mt-6 mb-10 flex flex-wrap justify-center gap-2 md:-mt-8 md:mb-12">
        {ratings.map((r) => (
          <li key={r.source} className="inline-flex min-h-touch items-center gap-2.5 rounded-full bg-cream py-2 pr-5 pl-2 font-sans text-base font-medium text-ink ring-1 ring-sand">
            <SourceMark source={r.source} />
            {r.label}
          </li>
        ))}
      </ul>
      <div className="@container -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-px-4 overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:snap-none md:px-0 md:scroll-px-0">
        {reviews.map((r, i) => (
          <Card key={`${r.name}-${i}`} className="w-[85cqw] max-w-96 shrink-0 snap-start">
            <p className="text-terracotta" aria-label={`${r.stars} stars`}>{"★".repeat(r.stars)}</p>
            <p className="mt-3 text-base text-ink">{r.text}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
              <SourceMark source={r.source} small />
              <span>
                {r.name}
                {r.date ? ` · ${r.date}` : ""}
              </span>
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}

function SourceMark({ source, small }: { source: string; small?: boolean }) {
  const s = source.trim().toLowerCase();
  if (s === "google") {
    return (
      <span className={`flex items-center justify-center rounded-full bg-white ${small ? "size-6" : "size-9"}`} aria-label="Google">
        <GoogleG className={small ? "size-3.5" : "size-5"} />
      </span>
    );
  }
  if (s === "yelp") return <YelpMark className={small ? "size-6" : "size-9"} />;
  return null;
}
