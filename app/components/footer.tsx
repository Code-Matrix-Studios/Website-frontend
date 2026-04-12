"use client";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-20 px-6 border-t border-white/10 bg-[#050810] overflow-hidden">

      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 blur-[120px] rounded-full"
          style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Logo + About */}
          <div>
            <h3
              className="text-xl font-black mb-4"
              style={{
                background: "linear-gradient(135deg,#ffffff,#1AABFF,#00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              CodeMatrix Studios
            </h3>

            <p className="text-white/40 text-sm leading-relaxed">
              Building modern digital experiences that push boundaries and deliver real impact.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] hover:border-[#1AABFF]/40 hover:bg-[#1AABFF]/10 transition-all duration-300 cursor-pointer"
                >
                  <Icon size={16} className="text-white/60 hover:text-[#1AABFF]" />
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">
              Company
            </h4>
            <ul className="space-y-3 text-white/40 text-sm">
              {["About", "Careers", "Blog", "Press"].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#1AABFF] transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">
              Services
            </h4>
            <ul className="space-y-3 text-white/40 text-sm">
              {[
                "Web Development",
                "Mobile Apps",
                "Cloud Solutions",
                "Consulting"
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#00D4FF] transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">
              Contact
            </h4>

            <ul className="space-y-3 text-white/40 text-sm">
              <li className="hover:text-white transition">hello@codematrix.com</li>
              <li className="hover:text-white transition">+1 (555) 123-4567</li>
              <li className="hover:text-white transition">San Francisco, CA</li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#1AABFF]/40 to-transparent mb-8" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">

          <p>© 2026 CodeMatrix Studios. All rights reserved.</p>

          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <span
                key={item}
                className="hover:text-[#1AABFF] cursor-pointer transition-colors duration-300"
              >
                {item}
              </span>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}