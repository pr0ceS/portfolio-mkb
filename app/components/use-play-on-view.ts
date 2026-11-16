"use client";
import { useEffect, useRef } from "react";

// Marks an element data-state="waiting", then "playing" the first time it scrolls into view.
// CSS uses those states to run an animation. Without the script the finished state shows.
// With `loop`, the element also gets data-paused while it is off screen, so a repeating
// animation does no work when nobody can see it.
export function usePlayOnView<T extends HTMLElement>(threshold = .5, loop = false) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.state = "waiting";
    const observer = new IntersectionObserver(entries => {
      const visible = entries.some(entry => entry.isIntersecting);
      if (visible) element.dataset.state = "playing";
      if (!loop) { if (visible) observer.disconnect(); return; }
      if (visible) delete element.dataset.paused; else element.dataset.paused = "";
    }, { threshold: loop ? [0, threshold] : threshold });
    observer.observe(element);
    return () => { observer.disconnect(); delete element.dataset.state; delete element.dataset.paused; };
  }, [threshold, loop]);
  return ref;
}
