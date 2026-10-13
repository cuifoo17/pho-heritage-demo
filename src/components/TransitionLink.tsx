"use client";

import Link, { type LinkProps } from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useScene } from "./scene-context";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string } & Partial<LinkProps>;

/** In-site link that closes the window before routing. */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const { navigate } = useScene();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
