/** GitHub Pages serves the site under /<repo>; locally the base is "". Set at build time by NEXT_PUBLIC_BASE_PATH. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a /public asset path. next/link and routing handle this on their own; <img> and unoptimized next/image do not. */
export const asset = (path: string) => `${BASE_PATH}${path}`;
