"use client";
import { useEffect } from "react";

// A short tick under the finger on phones. Android vibrates through the Vibration API. iPhones have no such API,
// but Safari gives its own tick when a switch control flips, so a hidden one is flipped instead.
// Both only work as the direct result of a touch, so every tick is fired from the tap itself.
function tick() {
  if (typeof navigator.vibrate === "function") { navigator.vibrate(9); return; }
  const label = document.createElement("label");
  label.setAttribute("aria-hidden", "true");
  label.setAttribute("data-haptic", "");
  label.style.display = "none";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.setAttribute("switch", "");
  label.appendChild(input);
  document.head.appendChild(label);
  label.click();
  label.remove();
}
// Two ticks: something was switched or confirmed.
function confirm() {
  if (typeof navigator.vibrate === "function") { navigator.vibrate([9, 70, 14]); return; }
  tick(); setTimeout(tick, 110);
}

export function Haptics() {
  useEffect(() => {
    if (!matchMedia("(pointer: coarse)").matches) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest || target.closest("[data-haptic]")) return;
      const hit = target.closest("a, button, summary, [role='button']");
      if (!hit || hit.hasAttribute("disabled")) return;
      if (hit.closest(".language-menu, .theme-toggle") || hit.matches("[aria-pressed]")) confirm(); else tick();
    };
    document.addEventListener("click", onClick, true);
    // First visit: the intro ends as the visitor touches the screen, and the page settles with a double tick.
    const onTouch = () => { if (/\bintro\b/.test(document.documentElement.className)) confirm(); };
    document.addEventListener("touchend", onTouch, { once: true, passive: true });
    return () => { document.removeEventListener("click", onClick, true); document.removeEventListener("touchend", onTouch); };
  }, []);
  return null;
}
