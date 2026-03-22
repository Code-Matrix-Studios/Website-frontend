"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-[#1a2a3a]">
      <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">CodeMatrix</h3>
            <p className="text-[#6b7d8a] text-sm leading-relaxed">
              Building modern digital experiences for businesses worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <Github className="hover:text-white cursor-pointer" size={18} />
              <Linkedin className="hover:text-white cursor-pointer" size={18} />
              <Twitter className="hover:text-white cursor-pointer" size={18} />
              <Mail className="hover:text-white cursor-pointer" size={18} />
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-[#6b7d8a] text-sm">
              <li className="hover:text-[#0077CC] cursor-pointer">About</li>
              <li className="hover:text-[#0077CC] cursor-pointer">Careers</li>
              <li className="hover:text-[#0077CC] cursor-pointer">Blog</li>
              <li className="hover:text-[#0077CC] cursor-pointer">Press</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-[#6b7d8a] text-sm">
              <li className="hover:text-[#0077CC] cursor-pointer">Web Development</li>
              <li className="hover:text-[#0077CC] cursor-pointer">Mobile Apps</li>
              <li className="hover:text-[#0077CC] cursor-pointer">Cloud Solutions</li>
              <li className="hover:text-[#0077CC] cursor-pointer">Consulting</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-[#6b7d8a] text-sm">
              <li>hello@codematrix.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#1a2a3a] text-center text-[#6b7d8a] text-sm">
          &copy; 2026 CodeMatrix. All rights reserved.
        </div>

      </div>
    </footer>
  );
}