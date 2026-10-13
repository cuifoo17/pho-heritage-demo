"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { isMenu, useScene } from "./scene-context";

/** Cream frame with a hole in it. Re-mounts on every route; opens on arrival, closes before leaving. */
export function Window() {
  const pathname = usePathname();
  return isMenu(pathname) ? null : <Frame key={pathname} />;
}

function Frame() {
  const { nav, closing, finishClose } = useScene();
  // Timing is fixed at mount so later navigations can't retime a finished animation.
  const [mode] = useState(nav);
  const className = [
    "window",
    mode === "window" && "window-fast",
    mode === "slide" && "window-skip",
    closing && "window-closing",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      className={className}
      aria-hidden="true"
      onAnimationEnd={(e) => {
        if (e.animationName === "window-close") finishClose();
      }}
    />
  );
}
