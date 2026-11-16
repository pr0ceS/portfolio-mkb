"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import { ThemeToggle } from "./theme-toggle";

const primary = [{ href: "/projects", key: "nav_projects" }, { href: "/about", key: "nav_about" }, { href: "/contact", key: "nav_contact" }];
const all = [primary[0], primary[1], { href: "/programming", key: "nav_programming" }, { href: "/ecommerce", key: "nav_ecommerce" }, primary[2]];

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
  function switchLanguage() {
    const next = language === "en" ? "nl" : "en";
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
          {primary.map(link => <Link key={link.href} href={link.href} aria-current={current(link.href)}>{t(link.key)}</Link>)}
        </div>
        <div className="nav-controls">
          <button className="language-toggle" onClick={switchLanguage} aria-label={language === "en" ? "Schakel naar Nederlands" : "Switch to English"} lang={language === "en" ? "nl" : "en"}>{language === "en" ? "Nl" : "En"}</button>
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
