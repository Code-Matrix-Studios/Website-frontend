"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      {/* Modern Rounded Container */}
      <div className="w-full max-w-6xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
        
        <div className="px-6 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="CodeMatrix Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-white font-semibold text-sm tracking-wide">
              CodeMatrix
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-white/90 hover:text-white transition-all duration-200">
              Home
            </Link>
            <Link href="/" className="text-white/90 hover:text-white transition-all duration-200">
              Team
            </Link>
            <Link href="/solutions" className="text-white/90 hover:text-white transition-all duration-200">
              Solutions
            </Link>
            <Link href="/blog" className="text-white/90 hover:text-white transition-all duration-200">
              Blog
            </Link>
            <Link href="/pricing" className="text-white/90 hover:text-white transition-all duration-200">
              Pricing
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">

            <Link
              href="/signup"
              className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 text-sm text-white border-t border-white/10">
            <Link href="/" className="py-2 hover:text-gray-300">
              Home
            </Link>
            <Link href="/" className="py-2 hover:text-gray-300">
              Team
            </Link>
            <Link href="/solutions" className="py-2 hover:text-gray-300">
              Solutions
            </Link>
            <Link href="/blog" className="py-2 hover:text-gray-300">
              Blog
            </Link>
            <Link href="/pricing" className="py-2 hover:text-gray-300">
              Pricing
            </Link>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <Link href="/login" className="hover:text-gray-300">
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-white text-black px-4 py-2 rounded-full text-center font-medium hover:bg-gray-200 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}