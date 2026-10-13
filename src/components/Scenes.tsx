"use client";

import { SCENES, useScene, type SceneKey } from "./scene-context";

export function Scenes() {
  const { scene: active, closing } = useScene();

  return (
    <div className="fixed inset-0 z-0 bg-ink" aria-hidden="true" data-instant={closing || undefined}>
      {(Object.keys(SCENES) as SceneKey[]).map((key) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={key}
          src={SCENES[key]}
          alt=""
          className="scene"
          data-active={active === key}
          draggable={false}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent" />
    </div>
  );
}
