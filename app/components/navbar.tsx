"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          CodeMatrix Studios
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/about" className="hover:text-gray-400">About</Link>
          <Link href="/services" className="hover:text-gray-400">Services</Link>
          <Link href="/contact" className="hover:text-gray-400">Contact</Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 pb-4 flex flex-col gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </nav>
  );
}