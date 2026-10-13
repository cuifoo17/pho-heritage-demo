"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { asset } from "@/data/basePath";

export type SceneKey = "home" | "karaoke" | "story";

export const SCENES: Record<SceneKey, string> = {
  home: asset("/scenes/home.svg"),
  karaoke: asset("/scenes/karaoke.svg"),
  story: asset("/scenes/story.svg"),
};

/** Nav pills, in order. Menu has no scene: it slides in as a panel instead of opening a window. */
export const PAGES: { href: string; label: string; scene: SceneKey | null }[] = [
  { href: "/", label: "Home", scene: "home" },
  { href: "/karaoke/", label: "Karaoke", scene: "karaoke" },
  { href: "/our-story/", label: "Our Story", scene: "story" },
  { href: "/menu/", label: "Menu", scene: null },
];

export const isMenu = (pathname: string) => pathname.startsWith("/menu");

export function sceneForPath(pathname: string): SceneKey | null {
  if (pathname.startsWith("/karaoke")) return "karaoke";
  if (pathname.startsWith("/our-story")) return "story";
  if (isMenu(pathname)) return null;
  return "home";
}

/** How the current page was reached. Drives window timing and headline reveal delay. */
export type NavKind = "first" | "window" | "slide";

type Ctx = {
  preview: SceneKey | null;
  setPreview: (k: SceneKey | null) => void;
  /** The scene to show right now. */
  scene: SceneKey;
  nav: NavKind;
  /** Leave the current page for href with the right transition. */
  navigate: (href: string) => void;
  /** True while the current page is playing its leave animation. */
  closing: boolean;
  finishClose: () => void;
};

const SceneContext = createContext<Ctx>({
  preview: null,
  setPreview: () => {},
  scene: "home",
  nav: "first",
  navigate: () => {},
  closing: false,
  finishClose: () => {},
});

export function SceneProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [preview, setPreview] = useState<SceneKey | null>(null);
  const [pending, setPending] = useState<{ from: string; to: string; swapped: boolean } | null>(null);
  const [nav, setNav] = useState<NavKind>("first");
  // The scene the menu slid in over; shown behind it while on the menu.
  const [behindMenu, setBehindMenu] = useState<SceneKey>("home");

  // Clear the departure record on arrival, otherwise coming back to the page we left
  // from would match it again and replay the leave. (State adjustment during render.)
  const [seenPath, setSeenPath] = useState(pathname);
  if (pathname !== seenPath) {
    setSeenPath(pathname);
    setPending(null);
  }

  const closing = pending?.from === pathname;
  const target = closing && pending ? sceneForPath(pending.to) : null;
  // Once the leave animation is done (or while the menu slides out), show the destination scene.
  const scene: SceneKey =
    preview ??
    ((closing && pending?.swapped) || isMenu(pathname) ? target : null) ??
    sceneForPath(pathname) ??
    behindMenu;

  const navigate = useCallback(
    (href: string) => {
      if (closing || href === pathname) return;
      setPreview(null);
      const slide = isMenu(href) || isMenu(pathname);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setNav(slide ? "slide" : "window");
        router.push(href);
        return;
      }
      if (isMenu(href)) {
        // The menu slides in over the current scene; nothing to close first.
        setBehindMenu(scene);
        setNav("slide");
        router.push(href);
        return;
      }
      setPending({ from: pathname, to: href, swapped: false });
    },
    [closing, pathname, router, scene],
  );

  const finishClose = useCallback(() => {
    if (!closing || !pending) return;
    setPending({ ...pending, swapped: true });
    setNav(isMenu(pathname) ? "slide" : "window");
    router.push(pending.to);
  }, [closing, pending, pathname, router]);

  // The new page starts at the top. Layout effect so it happens before paint.
  useLayoutEffect(() => {
    document.querySelector("main")?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SceneContext.Provider value={{ preview, setPreview, scene, nav, navigate, closing, finishClose }}>
      <div className="contents" data-nav={nav}>
        {children}
      </div>
    </SceneContext.Provider>
  );
}

export const useScene = () => useContext(SceneContext);
