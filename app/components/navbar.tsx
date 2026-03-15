"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="CodeMatrix Logo"
            width={70}
            height={70}
            className="rounded-md"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/80">
          <Link href="/" className="hover:text-white transition-colors">
            Your Team
          </Link>
          <Link href="/solutions" className="hover:text-white transition-colors">
            Solutions
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
        </div>

        {/* Right side - Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-[#6b21a8] hover:bg-[#7c3aed] text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a0a2e]/95 backdrop-blur-md px-6 pb-6 flex flex-col gap-4 text-sm text-white/80 border-t border-white/10">
          <Link href="/" className="py-2 hover:text-white">
            Your Team
          </Link>
          <Link href="/solutions" className="py-2 hover:text-white">
            Solutions
          </Link>
          <Link href="/blog" className="py-2 hover:text-white">
            Blog
          </Link>
          <Link href="/pricing" className="py-2 hover:text-white">
            Pricing
          </Link>
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Link href="/login" className="text-white/80 hover:text-white">
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-[#6b21a8] hover:bg-[#7c3aed] text-white px-5 py-2.5 rounded-full text-sm font-medium text-center transition-all"
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
