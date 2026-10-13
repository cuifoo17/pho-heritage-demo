/**
 * CSV export of the "Pho Heritage Reviews" Google Sheet (shared as "Anyone with the link, Viewer").
 * The export link regenerates on every request, so edits show on the next page load.
 * Rows 1-3: Platform | Rating | Review Count. Row 5 header, then Name | Date | Stars | Source | Review.
 */
const SHEET_ID = "17t40G6BKSmsiAnyUZDW5r6S0Wm93xWURX4_Qq34pxvg";
const SHEET_GID = "1744938105";
export const REVIEWS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

export type Rating = { label: string; source: "google" | "yelp" };
export type Review = { name: string; date?: string; stars: number; source: string; text: string };

/** Minimal RFC-4180 parser: quoted fields, doubled quotes, newlines inside quotes. */
export function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quoted) {
      if (ch === '"') {
        if (input[i + 1] === '"') { field += '"'; i++; }
        else quoted = false;
      } else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && input[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += ch;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const norm = (s: string | undefined) => (s ?? "").trim();

export function sheetToReviews(csv: string): { ratings: Rating[]; reviews: Review[] } | null {
  const rows = parseCsv(csv);
  const headerIdx = rows.findIndex((r) => norm(r[0]).toLowerCase() === "name");
  if (headerIdx === -1) return null;

  const ratings: Rating[] = [];
  for (const r of rows.slice(0, headerIdx)) {
    const platform = norm(r[0]).toLowerCase();
    const rating = norm(r[1]);
    const count = norm(r[2]);
    if ((platform === "google" || platform === "yelp") && rating) {
      ratings.push({ label: count ? `${rating} stars (${count})` : `${rating} stars`, source: platform });
    }
  }

  const reviews: Review[] = [];
  for (const r of rows.slice(headerIdx + 1)) {
    const name = norm(r[0]);
    const text = norm(r[4]);
    if (!name || !text) continue;
    const stars = Math.min(5, Math.max(1, Math.round(Number(norm(r[2])) || 5)));
    reviews.push({ name, date: norm(r[1]) || undefined, stars, source: norm(r[3]), text });
  }
  if (!reviews.length) return null;
  return { ratings, reviews };
}
