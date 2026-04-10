"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/About" },
    { label: "Team", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <div
        className="w-full max-w-6xl rounded-full transition-all duration-500"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: scrolled
            ? "rgba(5, 8, 16, 0.75)"
            : "rgba(255, 255, 255, 0.03)",
          border: scrolled
            ? "1px solid rgba(26, 171, 255, 0.15)"
            : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(26,171,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="px-5 py-2.5 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                // background: "linear-gradient(135deg, rgba(26,171,255,0.15), rgba(0,212,255,0.08))",
                // // border: "1px solid rgba(26,171,255,0.25)",
                // boxShadow: "0 0 12px rgba(26,171,255,0.1)",
              }}
            >
              <Image
                src="/logo.png"
                alt="CodeMatrix Logo"
                width={104}
                height={74}
                className="rounded-sm object-contain"
              />
            </div>
            <span
              className="hidden sm:block text-sm font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff, #a8d8ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-1.5 text-sm font-medium rounded-full group transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.95)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,171,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Right Side ── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">

            <Link
              href="/signup"
              className="relative text-sm font-bold px-5 py-2 rounded-full overflow-hidden group transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1AABFF, #00D4FF)",
                color: "#050810",
                boxShadow: "0 0 20px rgba(26,171,255,0.3)",
              }}
            >
              <span className="relative z-10">Get Started</span>
              {/* shine sweep */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.25), transparent)" }}
              />
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            style={{
              background: menuOpen ? "rgba(26,171,255,0.15)" : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: menuOpen ? "#1AABFF" : "rgba(255,255,255,0.7)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 4 4 12" /><path d="m4 4 8 8" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="2" x2="14" y1="5" y2="5" />
                <line x1="2" x2="14" y1="9" y2="9" />
                <line x1="2" x2="10" y1="13" y2="13" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile Dropdown ── */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? "400px" : "0px",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <div
            className="mx-3 mb-3 rounded-2xl px-4 py-4 flex flex-col gap-1"
            style={{
              background: "rgba(5, 8, 16, 0.6)",
              border: "1px solid rgba(26,171,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#1AABFF";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,171,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "rgba(26,171,255,0.5)" }}
                />
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div
              className="my-2 h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(26,171,255,0.2),transparent)" }}
            />

            <div className="flex flex-col gap-2 px-1">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg,#1AABFF,#00D4FF)",
                  color: "#050810",
                  boxShadow: "0 4px 16px rgba(26,171,255,0.25)",
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}