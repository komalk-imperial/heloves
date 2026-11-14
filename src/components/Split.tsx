"use client";

import { Children, Fragment, isValidElement, useEffect, useRef, useState } from "react";

/** Flattens fragments so their text can be split too (keeps <br /> and other elements). */
function flatten(children: React.ReactNode): React.ReactNode[] {
  return Children.toArray(children).flatMap((child) =>
    isValidElement<{ children?: React.ReactNode }>(child) && child.type === Fragment ? flatten(child.props.children) : [child],
  );
}

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * Heading that rises word by word from behind a mask when it scrolls into view.
 * The word spans are rendered by React (not injected afterwards), so server and
 * client HTML always match and the text updates normally between pages.
 */
export default function Split({ as: As = "h2", className = "", children }: { as?: Tag; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.15 },
    );
    io.observe(el);
    // safety net: anything already on screen or scrolled past shows on the next frame
    const id = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        setShown(true);
        io.disconnect();
      }
    });
    return () => {
      io.disconnect();
      cancelAnimationFrame(id);
    };
  }, []);

  let i = 0;
  const parts = flatten(children).flatMap((child, c) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child)
        .split(/(\s+)/)
        .filter(Boolean)
        .map((w, k) =>
          /^\s+$/.test(w) ? (
            " "
          ) : (
            <span key={`${c}-${k}`} className="sw">
              <span className="swi" style={{ "--i": i++ } as React.CSSProperties}>
                {w}
              </span>
            </span>
          ),
        );
    }
    return isValidElement(child) ? [<Fragment key={`el-${c}`}>{child}</Fragment>] : [];
  });

  return (
    <As ref={ref} data-split className={`${shown ? "split-in" : ""} ${className}`}>
      {parts}
    </As>
  );
}
