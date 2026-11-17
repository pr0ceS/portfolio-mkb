"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Check, ChevronDown, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { T, useLanguage } from "./language-provider";
import { ThemeToggle } from "./theme-toggle";

const all = [{ href: "/projects", key: "nav_projects", en: "Projects", nl: "Projecten" }, { href: "/about", key: "nav_about", en: "About", nl: "Over mij" }, { href: "/programming", key: "nav_programming", en: "Programming", nl: "Programmeren" }, { href: "/ecommerce", key: "nav_ecommerce", en: "E-commerce", nl: "E-commerce" }, { href: "/contact", key: "nav_contact", en: "Contact", nl: "Contact" }];

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const menuButton = useRef<HTMLButtonElement>(null);
  const nl = language === "nl";
  useEffect(() => setOpen(false), [pathname]);
  // The page behind the menu should not scroll while it is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);
  // Language picker: a small menu under the button. It closes on a click outside it and on Escape.
  const [picking, setPicking] = useState(false);
  const picker = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!picking) return;
    const close = (event: PointerEvent) => { if (!picker.current?.contains(event.target as Node)) setPicking(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [picking]);
  function chooseLanguage(next: "en" | "nl") {
    setPicking(false);
    if (next === language) return;
    setLanguage(next);
    if (pathname.startsWith("/projects/")) {
      const base = pathname.replace(/-nl$/, "");
      router.replace(next === "nl" ? `${base}-nl` : base);
    }
  }
  const current = (href: string) => pathname.startsWith(href) ? "page" as const : undefined;
  return (
    <header className={`site-header${open ? " is-open" : ""}`} onKeyDown={event => {
      if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); }
    }}>
      <a className="skip-link" href="#main-content">{nl ? "Naar de inhoud" : "Skip to content"}</a>
      <nav className="site-nav" aria-label={nl ? "Hoofdnavigatie" : "Main navigation"}>
        <Link href="/" className="brand" onClick={() => setOpen(false)}>Mehmet Boz</Link>
        <div className="nav-links">
          {all.map(link => <Link key={link.href} href={link.href} aria-current={current(link.href)}><T en={link.en} nl={link.nl} /></Link>)}
        </div>
        <div className="nav-controls">
          <div className="language-picker" ref={picker} onKeyDown={event => { if (event.key === "Escape" && picking) { event.stopPropagation(); setPicking(false); (picker.current?.firstElementChild as HTMLElement | null)?.focus(); } }}>
            <button className="language-toggle" onClick={() => setPicking(!picking)} aria-expanded={picking} aria-controls="language-menu" aria-label={nl ? "Taal: Nederlands. Kies een taal" : "Language: English. Choose a language"}><Languages size={19} aria-hidden="true" /><span><T en="EN" nl="NL" /></span><ChevronDown size={16} aria-hidden="true" /></button>
            <ul id="language-menu" className="language-menu" hidden={!picking}>
              {([["en", "English"], ["nl", "Nederlands"]] as const).map(([code, name]) => <li key={code}><button lang={code} aria-current={language === code ? "true" : undefined} onClick={() => chooseLanguage(code)}>{name}{language === code && <Check size={17} aria-hidden="true" />}</button></li>)}
            </ul>
          </div>
          <ThemeToggle />
          <button ref={menuButton} className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-menu" aria-label={open ? (nl ? "Menu sluiten" : "Close menu") : (nl ? "Menu openen" : "Open menu")}><span className="burger" aria-hidden="true"><span /><span /></span></button>
        </div>
      </nav>
      <div id="site-menu" className="site-menu" inert={!open}>
        <div className="site-menu-inner">
          <ul className="menu-links">
            {all.map((link, index) => <li key={link.href} style={{ "--i": index } as React.CSSProperties}><Link href={link.href} aria-current={current(link.href)} onClick={() => setOpen(false)}><span>{t(link.key)}</span></Link></li>)}
          </ul>
          <div className="menu-foot">
            <a href="mailto:mkboz889@gmail.com">mkboz889@gmail.com</a>
            <div><a href="https://github.com/pr0ceS" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={18} /></a><a href="https://www.linkedin.com/in/mehmet-boz-135a29359/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={18} /></a></div>
          </div>
        </div>
      </div>
    </header>
  );
}
