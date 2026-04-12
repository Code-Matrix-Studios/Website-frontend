/* eslint-disable react/no-children-prop */
"use client";

import { useState } from "react";
import Navbar from "../components/navbar";
import {
  useScrollProgress,
  useLenisParallax,
  useElementScrollProgress
} from "../hooks/use-scroll-animations";

/* ══════════════════════════════════════════
   ICON COMPONENTS
   Contact-specific SVG icons
══════════════════════════════════════════ */

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.99-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 4l16 16M4 20L20 4" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   SCROLL ANIMATION WRAPPERS
   Matching the home page hooks
══════════════════════════════════════════ */

function ParallaxSection({
  children, speed = 0, className = "", style
}: {
  children: React.ReactNode; speed?: number;
  className?: string; style?: React.CSSProperties;
}) {
  const { ref, transform } = useLenisParallax(speed);
  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${transform}px)`, ...style }}>
      {children}
    </div>
  );
}

function ProgressReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, progress } = useElementScrollProgress();
  return (
    <div
      ref={ref} className={className}
      style={{
        opacity: Math.min(1, progress * 2),
        transform: `translateY(${(1 - Math.min(1, progress * 2)) * 50}px)`,
        transition: "opacity 0.15s ease-out, transform 0.15s ease-out"
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   REUSABLE UI COMPONENTS
   Identical to home page design system
══════════════════════════════════════════ */

function GlassCard({
  children, className = "", hover = true
}: {
  children: React.ReactNode; className?: string; hover?: boolean;
}) {
  return (
    <div className={`
      relative rounded-2xl border border-white/10
      bg-white/[0.04] backdrop-blur-xl
      shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
      ${hover ? "hover:border-[#1AABFF]/40 hover:bg-white/[0.07] hover:shadow-[0_8px_40px_rgba(26,171,255,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]" : ""}
      transition-all duration-500 ${className}
    `}>
      {children}
    </div>
  );
}

/** GridBg: same illuminated mesh grid as home page */
function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.13,
          backgroundImage:
            "linear-gradient(rgba(26,171,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(26,171,255,0.9) 1px, transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.18,
          backgroundImage: "radial-gradient(circle, rgba(26,171,255,0.8) 1px, transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(45deg, rgba(26,171,255,0.5) 1px, transparent 1px), linear-gradient(-45deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
          backgroundSize: "104px 104px"
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(26,171,255,0.07) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_50%,transparent_35%,#050810_100%)]" />
    </div>
  );
}

/** Noise: film grain texture overlay */
function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        mixBlendMode: "overlay"
      }}
    />
  );
}

/** SectionLabel: consistent eyebrow label used across all sections */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-8 h-[2px]" style={{ background: "linear-gradient(90deg,#1AABFF,#00D4FF)" }} />
      <span className="text-[#1AABFF] text-xs uppercase tracking-[0.3em] font-medium">{text}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   CONTACT INFO DATA
   Edit to update the info cards on the left
══════════════════════════════════════════ */
const CONTACT_INFO = [
  {
    icon: <MailIcon />,
    label: "Email Us",
    value: "hello@codematrix.studio",
    sub: "We reply within 24 hours",
    color: "#1AABFF"
  },
  {
    icon: <PhoneIcon />,
    label: "Call Us",
    value: "+1 (555) 000-0000",
    sub: "Mon – Fri, 9am – 6pm",
    color: "#00D4FF"
  },
  {
    icon: <MapPinIcon />,
    label: "Visit Us",
    value: "123 Digital Ave, SF",
    sub: "San Francisco, CA 94103",
    color: "#1AABFF"
  },
  {
    icon: <ClockIcon />,
    label: "Response Time",
    value: "Under 48 Hours",
    sub: "Guaranteed SLA on all enquiries",
    color: "#00D4FF"
  }
];

const SOCIAL_LINKS = [
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "#" },
  { icon: <TwitterIcon />,  label: "X / Twitter", href: "#" },
  { icon: <GithubIcon />,   label: "GitHub",    href: "#" }
];

/* ══════════════════════════════════════════
   FORM INPUT COMPONENT
   Styled glass input that matches the design
══════════════════════════════════════════ */
function GlassInput({
  label, type = "text", placeholder, value, onChange, required = false
}: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white/50 text-xs uppercase tracking-widest font-medium">
        {label}{required && <span className="text-[#1AABFF] ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] text-white placeholder-white/20 text-sm outline-none transition-all duration-300"
        style={{
          border: focused ? "1px solid rgba(26,171,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 3px rgba(26,171,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)" : "inset 0 1px 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)"
        }}
      />
    </div>
  );
}

/** GlassTextarea: same styling as GlassInput but multiline */
function GlassTextarea({
  label, placeholder, value, onChange, rows = 5, required = false
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; rows?: number; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white/50 text-xs uppercase tracking-widest font-medium">
        {label}{required && <span className="text-[#1AABFF] ml-1">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        rows={rows}
        required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] text-white placeholder-white/20 text-sm outline-none transition-all duration-300 resize-none"
        style={{
          border: focused ? "1px solid rgba(26,171,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 3px rgba(26,171,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06)" : "inset 0 1px 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)"
        }}
      />
    </div>
  );
}

/** GlassSelect: styled dropdown matching the input style */
function GlassSelect({
  label, options, value, onChange, required = false
}: {
  label: string; options: string[]; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white/50 text-xs uppercase tracking-widest font-medium">
        {label}{required && <span className="text-[#1AABFF] ml-1">*</span>}
      </label>
      <select
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 rounded-xl bg-[#050810] text-white text-sm outline-none transition-all duration-300 appearance-none cursor-pointer"
        style={{
          border: focused ? "1px solid rgba(26,171,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 3px rgba(26,171,255,0.08)" : "none",
          backdropFilter: "blur(12px)"
        }}
      >
        <option value="" disabled>Select an option</option>
        {options.map(o => <option key={o} value={o} className="bg-[#050810]">{o}</option>)}
      </select>
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════ */
export default function Contact() {
  const { progress } = useScrollProgress();

  /* ── Form state ── */
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", budget: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    /* Replace this with your actual form submission logic / API call */
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="relative w-full bg-[#050810] font-sans">

      {/* Film grain overlay */}
      <Noise />

      {/* ── Scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 origin-left"
        style={{ transform: `scaleX(${progress})`, background: "linear-gradient(90deg, #1AABFF, #00D4FF)" }}
      />

      {/* ══════════════════════════════════════════
          HERO — Contact page header
          Shorter than home hero, grid bg + glows
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden flex flex-col min-h-[52vh]">
        <GridBg />

        {/* Ambient glows */}
        <ParallaxSection speed={-0.15} className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-25 blur-[150px] pointer-events-none" style={{ background: "radial-gradient(circle, #1AABFF 0%, transparent 70%)" }} children={undefined}>{}</ParallaxSection>
        <ParallaxSection speed={0.08} className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15 blur-[130px] pointer-events-none" style={{ background: "radial-gradient(circle, #0066FF 0%, transparent 70%)" }} children={undefined}>{}</ParallaxSection>
        <ParallaxSection speed={-0.05} className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full opacity-20 blur-[110px] pointer-events-none" style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }} children={undefined}>{}</ParallaxSection>

        <Navbar />

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center text-white px-4 pb-16 pt-8">

          {/* Pill badge */}
          <div className="mb-7 inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#1AABFF]/30 bg-[#1AABFF]/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1AABFF] animate-pulse" />
            <span className="text-[#1AABFF] text-xs font-semibold tracking-[0.25em] uppercase">Let&apos;s Work Together</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.92] mb-5">
            <span className="block text-white">Get In</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #a8d8ff 30%, #1AABFF 60%, #00D4FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              Touch
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="text-base md:text-lg text-white/45 max-w-lg leading-relaxed">
            Have a project in mind? We&apos;d love to hear about it.
            Tell us what you&apos;re building and we&apos;ll get back to you within 48 hours.
          </p>

          {/* Decorative bottom line */}
          <div className="mt-10 w-px h-10 bg-gradient-to-b from-[#1AABFF]/40 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN CONTENT — two-column layout
          Left: contact info + socials
          Right: contact form
      ══════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">

        {/* Ambient glow — left */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full opacity-10 blur-[160px] pointer-events-none" style={{ background: "radial-gradient(circle,#1AABFF,transparent 70%)" }} />
        {/* Ambient glow — right */}
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full opacity-10 blur-[140px] pointer-events-none" style={{ background: "radial-gradient(circle,#00D4FF,transparent 70%)" }} />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 items-start">

            {/* ── LEFT COLUMN: info cards + socials ── */}
            <div className="flex flex-col gap-8">

              {/* Section label + heading */}
              <ProgressReveal>
                <SectionLabel text="Contact" />
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-3">
                  We&apos;re Ready<br />
                  <span style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    When You Are
                  </span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed">
                  Whether you&apos;re starting from scratch or scaling an existing product,
                  our team is ready to partner with you.
                </p>
              </ProgressReveal>

              {/* Info cards grid — 2×2 */}
              <div className="grid grid-cols-2 gap-4">
                {CONTACT_INFO.map((info, i) => (
                  <ProgressReveal key={i}>
                    <GlassCard className="p-5 flex flex-col gap-3 group">
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}
                      >
                        <div className="w-4 h-4" style={{ color: info.color }}>{info.icon}</div>
                      </div>
                      {/* Label */}
                      <div className="text-white/35 text-[10px] uppercase tracking-widest font-medium">{info.label}</div>
                      {/* Value */}
                      <div className="text-white text-sm font-semibold leading-snug">{info.value}</div>
                      {/* Sub */}
                      <div className="text-white/30 text-xs leading-relaxed">{info.sub}</div>
                    </GlassCard>
                  </ProgressReveal>
                ))}
              </div>

              {/* Social links */}
              <ProgressReveal>
                <GlassCard className="p-6" hover={false}>
                  <div className="text-white/35 text-xs uppercase tracking-widest mb-4 font-medium">Follow Us</div>
                  <div className="flex gap-3">
                    {SOCIAL_LINKS.map((s, i) => (
                      <a
                        key={i} href={s.href}
                        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#1AABFF]/40 hover:bg-[#1AABFF]/08 transition-all duration-300"
                      >
                        <div className="w-4 h-4 text-white/40 group-hover:text-[#1AABFF] transition-colors duration-300">{s.icon}</div>
                        <span className="text-white/40 group-hover:text-white/80 text-xs font-medium transition-colors duration-300">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </GlassCard>
              </ProgressReveal>

              {/* Availability badge */}
              <ProgressReveal>
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#1AABFF]/20 bg-[#1AABFF]/5 backdrop-blur-sm w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                  <span className="text-white/60 text-xs tracking-wide">Currently accepting new projects for <span className="text-white/90 font-semibold">Q3 2025</span></span>
                </div>
              </ProgressReveal>

            </div>

            {/* ── RIGHT COLUMN: contact form ── */}
            <ProgressReveal>
              <GlassCard className="p-8 md:p-10" hover={false}>

                {/* Shimmer line at top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px]" style={{ background: "linear-gradient(90deg,transparent,#1AABFF,transparent)" }} />

                {submitted ? (
                  /* ── Success state ── */
                  <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                    {/* Animated check */}
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: "#1AABFF15", border: "1px solid #1AABFF40", boxShadow: "0 0 40px rgba(26,171,255,0.15)" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1AABFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight mb-2">Message Sent!</h3>
                      <p className="text-white/45 text-sm leading-relaxed max-w-sm">
                        Thanks for reaching out. A member of our team will be in touch within 48 hours.
                      </p>
                    </div>
                    {/* Reset button */}
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" }); }}
                      className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white/60 border border-white/10 hover:border-[#1AABFF]/40 hover:text-white/90 transition-all duration-300"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* Form heading */}
                    <div className="mb-2">
                      <SectionLabel text="Send a Message" />
                      <h3 className="text-xl font-black text-white tracking-tight">
                        Tell us about your project
                      </h3>
                    </div>

                    {/* Row 1: Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <GlassInput
                        label="Full Name" placeholder="John Smith"
                        value={form.name} onChange={set("name")} required
                      />
                      <GlassInput
                        label="Email Address" type="email" placeholder="john@company.com"
                        value={form.email} onChange={set("email")} required
                      />
                    </div>

                    {/* Row 2: Company + Service */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <GlassInput
                        label="Company" placeholder="Acme Inc."
                        value={form.company} onChange={set("company")}
                      />
                      <GlassSelect
                        label="Service Needed" required
                        options={["Product Engineering", "Cloud & Infrastructure", "AI & Automation", "ERP Consultancy", "Talent Augmentation", "Other"]}
                        value={form.service} onChange={set("service")}
                      />
                    </div>

                    {/* Budget */}
                    <GlassSelect
                      label="Estimated Budget"
                      options={["< $10k", "$10k – $25k", "$25k – $50k", "$50k – $100k", "$100k+"]}
                      value={form.budget} onChange={set("budget")}
                    />

                    {/* Message */}
                    <GlassTextarea
                      label="Project Details" required
                      placeholder="Describe your project, goals, timeline, and any specific requirements..."
                      value={form.message} onChange={set("message")} rows={5}
                    />

                    {/* Privacy note */}
                    <p className="text-white/25 text-xs leading-relaxed">
                      By submitting this form you agree to our Privacy Policy. We never share your data with third parties.
                    </p>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="relative w-full py-4 rounded-xl font-bold text-[#050810] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed transition-opacity duration-300"
                      style={{ background: "linear-gradient(135deg, #1AABFF, #00D4FF)" }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitting ? (
                          <>
                            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRightIcon />
                          </>
                        )}
                      </span>
                      {/* Hover shimmer */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                  </form>
                )}
              </GlassCard>
            </ProgressReveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ STRIP — quick reassurances
      ══════════════════════════════════════════ */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] opacity-08 blur-[100px] rounded-full" style={{ background: "linear-gradient(90deg,#1AABFF,#0066FF)" }} />
        </div>

        <div className="max-w-6xl mx-auto">
          <ProgressReveal>
            <SectionLabel text="Common Questions" />
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-10">
              Before You Reach Out
            </h2>
          </ProgressReveal>

          {/* FAQ grid — 2 columns */}
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                q: "How quickly will you respond?",
                a: "All enquiries receive an initial response within 24 hours. Full project scoping calls are typically scheduled within 48 hours."
              },
              {
                q: "Do you work with startups?",
                a: "Absolutely. We work with everyone from early-stage startups to enterprise clients. Our pricing scales accordingly."
              },
              {
                q: "What information should I prepare?",
                a: "A rough brief, your timeline, and budget range is enough to get started. We'll guide you through the discovery process."
              },
              {
                q: "Do you sign NDAs?",
                a: "Yes — we're happy to sign NDAs before any sensitive project discussions. Just mention it in your message."
              }
            ].map((faq, i) => (
              <ProgressReveal key={i}>
                <GlassCard className="p-7">
                  <h4 className="text-white font-bold mb-3 text-sm tracking-tight">{faq.q}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{faq.a}</p>
                </GlassCard>
              </ProgressReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global keyframe animations ── */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}