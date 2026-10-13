"use client";

import type { ReactNode } from "react";
import { useScene } from "./scene-context";

/** The menu page body. Slides in from the right on arrival and back out when leaving. */
export function MenuPanel({ children }: { children: ReactNode }) {
  const { closing, finishClose } = useScene();
  return (
    <div
      className={closing ? "menu-panel menu-leaving" : "menu-panel"}
      onAnimationEnd={(e) => {
        if (e.animationName === "slide-out") finishClose();
      }}
    >
      {children}
    </div>
  );
}
