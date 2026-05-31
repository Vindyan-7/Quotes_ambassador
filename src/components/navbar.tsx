"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Benefits", href: "#benefits" },
  { label: "Responsibilities", href: "#responsibilities" },
  { label: "FAQ", href: "#faq" },
  { label: "Stories", href: "#stories" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#090b10]/95 backdrop-blur-md border-b border-dq-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-1 shrink-0">
          <span className="font-display font-800 text-lg text-white tracking-tight">
            Data<span className="text-dq-gold">Quotes</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-2 text-sm text-dq-muted hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/apply"
            className="px-5 py-2 rounded-full bg-dq-gold text-black font-display font-semibold text-sm hover:bg-dq-gold-hover transition-all duration-200 shadow-lg shadow-dq-gold/20 hover:shadow-dq-gold/40 hover:scale-105 active:scale-95"
          >
            Apply as Ambassador →
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-dq-muted hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#090b10]/98 backdrop-blur-md border-t border-dq-border px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-3 text-sm text-dq-muted hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/apply"
            onClick={() => setMenuOpen(false)}
            className="mt-3 px-5 py-3 rounded-full bg-dq-gold text-black font-display font-semibold text-sm text-center hover:bg-dq-gold-hover transition-all duration-200"
          >
            Apply as Ambassador →
          </a>
        </div>
      )}
    </header>
  );
}