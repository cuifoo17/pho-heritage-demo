export const info = {
  name: "Pho Heritage",
  neighborhood: "the Fan",
  address: "1627 West Main Street, Richmond, VA 23220",
  phone: "(804) 944-5507",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=1627+West+Main+Street,+Richmond,+VA+23220",
  hours: [{ days: "Every day", time: "10 am to 10 pm" }],
  karaokeHours: "Tuesday nights, 6:00 to 10:00",
};

import type { Rating, Review } from "@/data/reviewsSheet";

/** Fallback ratings, shown until the Google Sheet loads (see reviewsSheet.ts). */
export const ratings: Rating[] = [
  { label: "4.8 stars (44)", source: "google" },
  { label: "4.7 stars (3)", source: "yelp" },
];

/** Fallback reviews, shown until the Google Sheet loads or if it fails. */
export const reviews: Review[] = [
  {
    name: "Steelspark",
    source: "Google",
    stars: 5,
    text: "I absolutely love this place. It's in easy walking distance from our house so I've eaten here several times now. The food is always great, the service is excellent, and the portions are really generous. I absolutely recommend it.",
  },
  {
    name: "Veronica",
    source: "Google",
    stars: 5,
    text: "Amazing food!!! Best Vietnamese I've had in Richmond. Happy hour is a good deal and you can order the spring rolls and a drink for 8 total and be full. Or get the classic vermicelli noodle bowls. Tanya is an amazing waitress and hilarious.",
  },
  {
    name: "Sulaiman Popal",
    source: "Google",
    stars: 5,
    text: "Solid Pho spot in the fan. Apps and pho portions are on point. Easily will become a regular spot for Pho and Bahn Mi fix.",
  },
];
