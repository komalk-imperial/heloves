"use client";

import { Children, Fragment, isValidElement, useEffect, useLayoutEffect, useRef, useState } from "react";

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

  // Next keeps visited pages alive in a hidden <Activity>; when one is shown again its effects
  // re-mount, so hide before paint and let the observer below play the entrance once more.
  useLayoutEffect(() => {
    // snap back to hidden without animating the way out (see [data-reveal-reset] in globals.css)
    if (shown) ref.current?.setAttribute("data-reveal-reset", "");
    setShown(false); // eslint-disable-line react-hooks/set-state-in-effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-runs whenever `shown` drops back to false, so the observers start only after the hidden state is committed
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    // nothing rises until the hidden state has been painted for a frame, otherwise there is
    // no starting point and the transition is skipped (e.g. a kept-alive page being shown again)
    let ready = false;
    let seen = false;
    const show = () => {
      if (!ready) return;
      el.removeAttribute("data-reveal-reset");
      setShown(true);
      io.disconnect();
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          seen = true;
          show();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.15 },
    );
    io.observe(el);
    // safety net: anything already on screen or scrolled past shows after two frames
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => {
        ready = true;
        if (seen || el.getBoundingClientRect().top < window.innerHeight) show();
      });
    });
    return () => {
      io.disconnect();
      cancelAnimationFrame(id);
    };
  }, [shown]);

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
