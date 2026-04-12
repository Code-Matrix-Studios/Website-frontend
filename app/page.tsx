/* eslint-disable react/no-children-prop */
"use client";

import Navbar from "./components/navbar";
import {
  useScrollProgress,
  useLenisParallax,
  useVelocitySkew,
  useScrollScale,
  useScrollRotate,
  useElementScrollProgress
} from "./hooks/use-scroll-animations";

/* ══════════════════════════════════════════
   ICON COMPONENTS
   Simple SVG icons used throughout the page
══════════════════════════════════════════ */

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function BracketsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   GEAR RING COMPONENT
   Reusable animated SVG gear ring.
   Props:
     size       — wrapper diameter in px
     teeth      — number of gear teeth
     toothW/H   — tooth rectangle size
     radius     — distance from centre to tooth
     ringR      — main circle radius
     hubR       — inner dashed hub radius
     color      — stroke/fill colour
     duration   — spin seconds (negative = reverse)
     opacity    — overall SVG opacity
══════════════════════════════════════════ */
function GearRing({
  size, teeth, toothW, toothH,
  radius, ringR, hubR,
  color, duration, opacity = 0.3
}: {
  size: number; teeth: number;
  toothW: number; toothH: number;
  radius: number; ringR: number; hubR: number;
  color: string; duration: number; opacity?: number;
}) {
  const centre = size / 2;
  const isReverse = duration < 0;

  return (
    <div
      className="absolute"
      style={{
        width: size, height: size,
        animation: `spin ${Math.abs(duration)}s linear infinite ${isReverse ? "reverse" : ""}`
      }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" style={{ opacity }}>
        <g fill="none" stroke={color} strokeWidth="1">
          {/* Evenly spaced gear teeth around the ring */}
          {Array.from({ length: teeth }).map((_, i) => {
            const angle = (i / teeth) * 360;
            const rad = (angle * Math.PI) / 180;
            const cx = centre + radius * Math.cos(rad);
            const cy = centre + radius * Math.sin(rad);
            return (
              <rect
                key={i}
                x={cx - toothW / 2} y={cy - toothH / 2}
                width={toothW} height={toothH} rx="1"
                fill={color} fillOpacity="0.15"
                stroke={color} strokeOpacity="0.5"
                transform={`rotate(${angle}, ${cx}, ${cy})`}
              />
            );
          })}
          {/* Outer ring stroke */}
          <circle cx={centre} cy={centre} r={ringR} strokeOpacity="0.25" />
          {/* Inner hub — dashed */}
          <circle cx={centre} cy={centre} r={hubR} strokeOpacity="0.15" strokeDasharray="4 8" />
        </g>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════
   SATELLITE GEAR COMPONENT
   Small spinning gear ring layered behind a
   static glass card — used for the two
   orbiting satellite circles in About section
══════════════════════════════════════════ */
function SatelliteGear({
  size, teeth, color, duration, icon, className = ""
}: {
  size: number; teeth: number;
  color: string; duration: number;
  icon: React.ReactNode; className?: string;
}) {
  const centre = size / 2;
  const toothRadius = centre * 0.88;
  const isReverse = duration < 0;

  return (
    <div className={`absolute z-10 ${className}`} style={{ width: size, height: size }}>

      {/* Spinning gear SVG — behind the glass card */}
      <div
        className="absolute inset-0"
        style={{ animation: `spin ${Math.abs(duration)}s linear infinite ${isReverse ? "reverse" : ""}` }}
      >
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full opacity-35">
          {Array.from({ length: teeth }).map((_, i) => {
            const angle = (i / teeth) * 360;
            const rad = (angle * Math.PI) / 180;
            const cx = centre + toothRadius * Math.cos(rad);
            const cy = centre + toothRadius * Math.sin(rad);
            return (
              <rect
                key={i}
                x={cx - 3} y={cy - 6} width="6" height="12" rx="1"
                fill={color} stroke={color} strokeWidth="0.5"
                transform={`rotate(${angle}, ${cx}, ${cy})`}
              />
            );
          })}
          <circle cx={centre} cy={centre} r={toothRadius * 0.82}
            fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* Glass card — static, centred on top of gear */}
      <div className="
        absolute inset-0 rounded-full flex items-center justify-center
        border border-white/10 bg-white/[0.04] backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
        hover:border-[#1AABFF]/40 hover:bg-white/[0.07]
        transition-all duration-500
      ">
        <div className="w-1/3 h-1/3" style={{ color }}>{icon}</div>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════
   SCROLL ANIMATION WRAPPERS
   Reusable components that apply scroll-based
   transformations to their children
══════════════════════════════════════════ */

/** Parallax: moves children at a different scroll speed */
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

/** ScaleSection: scales children as they enter the viewport */
function ScaleSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, scale } = useScrollScale(0.85, 1);
  return (
    <div ref={ref} className={className} style={{ transform: `scale(${scale})`, transition: "transform 0.1s ease-out" }}>
      {children}
    </div>
  );
}

/** RotateSection: gently rotates children based on scroll position */
function RotateSection({
  children, className = "", maxRotation = 5
}: {
  children: React.ReactNode; className?: string; maxRotation?: number;
}) {
  const { ref, rotation } = useScrollRotate(maxRotation);
  return (
    <div ref={ref} className={className} style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.1s ease-out" }}>
      {children}
    </div>
  );
}

/** ProgressReveal: fades + slides children in as they scroll into view */
function ProgressReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, progress } = useElementScrollProgress();
  return (
    <div
      ref={ref} className={className}
      style={{
        opacity: Math.min(1, progress * 2),
        transform: `translateY(${(1 - Math.min(1, progress * 2)) * 60}px)`,
        transition: "opacity 0.1s ease-out, transform 0.1s ease-out"
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   REUSABLE UI COMPONENTS
══════════════════════════════════════════ */

/** GlassCard: glassmorphism card with optional hover glow */
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

/** GridBg: illuminated mesh grid for the hero background */
function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary grid lines — brighter, tighter pitch */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.13,
          backgroundImage:
            "linear-gradient(rgba(26,171,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(26,171,255,0.9) 1px, transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />
      {/* Intersection glow dots — tiny radial at every crosspoint */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.18,
          backgroundImage: "radial-gradient(circle, rgba(26,171,255,0.8) 1px, transparent 1px)",
          backgroundSize: "52px 52px"
        }}
      />
      {/* Diagonal shimmer — adds mesh depth */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(45deg, rgba(26,171,255,0.5) 1px, transparent 1px), linear-gradient(-45deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
          backgroundSize: "104px 104px"
        }}
      />
      {/* Centre radial spotlight — brighter pool around hero text */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(26,171,255,0.07) 0%, transparent 70%)" }}
      />
      {/* Edge fade — prevents grid bleeding to page boundary */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_50%,transparent_35%,#050810_100%)]" />
    </div>
  );
}

/** Noise: fixed film grain overlay for texture and depth */
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

/* ══════════════════════════════════════════
   SERVICE CARDS DATA
   Edit here to update the "Our Services" grid
══════════════════════════════════════════ */
const SERVICE_ITEMS = [
  {
    title: "A Wide Range of Services",
    desc: "From product engineering and cloud migration to AI solutions and ERP consultancy.",
    icon: <CodeIcon />
  },
  {
    title: "Premium Talent, Matched to You",
    desc: "Access top developers, architects, and engineers tailored to your needs.",
    icon: <TerminalIcon />
  },
  {
    title: "ISO-Certified Security & Compliance",
    desc: "Your systems are protected with internationally recognised standards.",
    icon: <BracketsIcon />
  },
  {
    title: "Seamless Scalability",
    desc: "Scale your team and solutions quickly as your business grows.",
    icon: <CodeIcon />
  }
];

/* ══════════════════════════════════════════
   STATS DATA
   Edit here to update the stats in Section 4
══════════════════════════════════════════ */
const STATS = [
  { num: "10+",  label: "Projects Completed" },
  { num: "100+", label: "Happy Clients"       },
  { num: "20+",  label: "Team Members"        },
  { num: "10+",  label: "Years Experience"    }
];

/* ══════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════ */
export default function Home() {
  const { progress } = useScrollProgress();
  const skew = useVelocitySkew(1); // reduced: max 1deg skew on fast scroll

  return (
    <div className="relative w-full bg-[#050810] font-sans">

      {/* Film grain overlay — fixed, always on top */}
      <Noise />

      {/* ── Scroll progress bar (top of viewport) ── */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 origin-left"
        style={{ transform: `scaleX(${progress})`, background: "linear-gradient(90deg, #1AABFF, #00D4FF)" }}
      />

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
          Full-viewport landing with parallax glows,
          headline, sub-copy, and CTA buttons
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden flex flex-col">
        <GridBg />

        {/* Ambient background glows */}
        <ParallaxSection speed={-0.2} className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30 blur-[160px]" style={{ background: "radial-gradient(circle, #1AABFF 0%, transparent 70%)" }} children={undefined} />
        <ParallaxSection speed={0.1}  className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[140px]"   style={{ background: "radial-gradient(circle, #0066FF 0%, transparent 70%)" }} children={undefined} />
        <ParallaxSection speed={-0.05} className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full opacity-25 blur-[120px]" style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }} children={undefined} />

        <Navbar />

        {/* Hero text + CTA — skews slightly with scroll velocity */}
        <div
          className="relative z-10 flex flex-col items-center justify-center flex-1 text-center text-white px-4 pt-20 pb-20"
          style={{ transform: `skewY(${skew}deg)` }}
        >
          {/* Status pill — establishes brand identity immediately */}
          <ParallaxSection speed={-0.03}>
            <div className="mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#1AABFF]/30 bg-[#1AABFF]/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1AABFF] animate-pulse" />
              <span className="text-[#1AABFF] text-xs font-semibold tracking-[0.25em] uppercase">Engineering · Design · Innovation</span>
            </div>
          </ParallaxSection>

          {/* Main headline — bold value proposition */}
          <ParallaxSection speed={-0.05}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-[0.92]">
              {/* Line 1: action verb + subject */}
              <span className="block text-white">We Build</span>
              {/* Line 2: gradient highlight — the core differentiator */}
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #a8d8ff 30%, #1AABFF 60%, #00D4FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  padding:10,
                }}
              >
                Digital Products
              </span>
              {/* Line 3: qualifier — sets expectation of quality */}
              <span className="block text-white/90">That Scale.</span>
            </h1>
          </ParallaxSection>

          {/* Sub-copy — specific, credible, benefit-led */}
          <ParallaxSection speed={-0.04}>
            <p className="text-base md:text-lg mb-4 text-white/50 max-w-xl leading-relaxed tracking-wide">
              From concept to deployment — we craft high-performance web platforms,
              intelligent systems, and scalable cloud infrastructure for ambitious businesses.
            </p>
          </ParallaxSection>

          {/* Trust signals — quick proof points below the copy */}
          <ParallaxSection speed={-0.03}>
            <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
              {[
                { value: "100+", label: "Clients Worldwide" },
                { value: "10+",  label: "Years Delivering" },
                { value: "99%",  label: "Satisfaction Rate" }
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i > 0 && <div className="w-px h-6 bg-white/10" />}
                  <div className="text-center">
                    <div
                      className="text-lg font-black leading-none"
                      style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </ParallaxSection>

          {/* CTA buttons */}
          <ParallaxSection speed={-0.01}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary CTA */}
              <button
                className="relative px-8 py-3.5 rounded-full font-semibold text-[#050810] overflow-hidden group"
                style={{ background: "linear-gradient(135deg, #1AABFF, #00D4FF)" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              {/* Secondary CTA */}
              <button className="px-8 py-3.5 rounded-full font-semibold text-white border border-white/15 bg-white/5 backdrop-blur-sm hover:border-[#1AABFF]/50 hover:bg-[#1AABFF]/10 transition-all duration-300 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                See Our Work
              </button>
            </div>
          </ParallaxSection>

          {/* Scroll hint — anchors bottom of hero */}
          {/* <ParallaxSection speed={-0.01}>
            <div className="mt-1 flex flex-col items-center gap-2 opacity-30">
              <span className="text-white text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
              <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" style={{ animation: "scrollBounce 2s ease-in-out infinite" }} />
            </div>
          </ParallaxSection> */}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — ABOUT US
          Two-column: text card left,
          animated gear rings + satellite cards right
      ══════════════════════════════════════════ */}
      <section className="relative py-36 px-6 overflow-hidden">
        {/* Ambient glow — top right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[180px] pointer-events-none" style={{ background: "radial-gradient(circle, #1AABFF, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto">
          {/* Section label + heading */}
          <ProgressReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px]" style={{ background: "linear-gradient(90deg,#1AABFF,#00D4FF)" }} />
              <span className="text-[#1AABFF] text-xs uppercase tracking-[0.3em] font-medium">About us</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter">
              Who We <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(26,171,255,0.6)" }}>Are</span>
            </h2>
          </ProgressReveal>

          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* Left: text card with quick stats */}
            <ProgressReveal>
              <GlassCard className="p-8 md:p-10">
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p className="text-white/60 text-lg leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
                {/* Quick stats row */}
                <div className="mt-8 pt-6 border-t border-white/8 flex gap-8">
                  <div>
                    <div className="text-[#1AABFF] text-2xl font-black">99%</div>
                    <div className="text-white/35 text-xs uppercase tracking-widest mt-1">Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-[#1AABFF] text-2xl font-black">48h</div>
                    <div className="text-white/35 text-xs uppercase tracking-widest mt-1">Avg. Response</div>
                  </div>
                  <div>
                    <div className="text-[#1AABFF] text-2xl font-black">∞</div>
                    <div className="text-white/35 text-xs uppercase tracking-widest mt-1">Revisions</div>
                  </div>
                </div>
              </GlassCard>
            </ProgressReveal>

            {/* Right: gear orbit rings + satellite icon cards */}
            <div className="relative h-96 flex items-center justify-center">

              {/* Outer gear ring — 24 teeth, clockwise slow */}
              <GearRing
                size={320} teeth={24} toothW={8} toothH={16}
                radius={148} ringR={140} hubR={118}
                color="#1AABFF" duration={25} opacity={0.28}
              />

              {/* Middle gear ring — 16 teeth, counter-clockwise */}
              <GearRing
                size={240} teeth={16} toothW={8} toothH={14}
                radius={108} ringR={100} hubR={82}
                color="#00D4FF" duration={-16} opacity={0.32}
              />

              {/* Centre logo — scroll-rotates gently */}
              <RotateSection maxRotation={50} className="absolute z-10">
                <GlassCard className="w-48 h-48 rounded-full flex items-center justify-center" hover={false}>
                  <img src="/logo.png" alt="Logo" className="w-28 h-20 object-contain" />
                </GlassCard>
              </RotateSection>

              {/* Satellite gear — top right: Terminal icon */}
              <SatelliteGear
                size={112} teeth={10} color="#1AABFF" duration={8}
                icon={<TerminalIcon />}
                className="-top-2 -right-4 md:top-6 md:right-8"
              />

              {/* Satellite gear — bottom left: Brackets icon */}
              <SatelliteGear
                size={96} teeth={8} color="#00D4FF" duration={-6}
                icon={<BracketsIcon />}
                className="-bottom-2 -left-4 md:bottom-10 md:left-2"
              />

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — OUR SERVICES
          Normal section (no sticky / scroll trap).
          Left: looping brand video.
          Right: 2×2 service feature cards.
      ══════════════════════════════════════════ */}
      <section className="relative py-36 px-6 overflow-hidden">
        {/* Ambient glow — centre horizontal */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] opacity-10 blur-[100px] rounded-full" style={{ background: "linear-gradient(90deg,#1AABFF,#0066FF)" }} />
        </div>

        <div className="max-w-6xl mx-auto">

          {/* Section label + heading */}
          <ProgressReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px]" style={{ background: "linear-gradient(90deg,#1AABFF,#00D4FF)" }} />
              <span className="text-[#1AABFF] text-xs uppercase tracking-[0.3em] font-medium">What we offer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-14 tracking-tighter">
              Our{" "}
              <span style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Services
              </span>
            </h2>
          </ProgressReveal>

          {/* Two-column: video left, feature cards right */}
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Left: looping brand video */}
            <ProgressReveal>
              <GlassCard className="overflow-hidden p-0 pt-0 h-full min-h-[420px]">
                <video
                  src="./work.mp4"
                  className="w-full pt-20 pb-10 h-full object-cover rounded-2xl"
                  autoPlay muted loop playsInline
                />
              </GlassCard>
            </ProgressReveal>

            {/* Right: 2×2 service feature cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {SERVICE_ITEMS.map((item, i) => (
                <ProgressReveal key={i}>
                  <GlassCard className="p-6 h-full flex flex-col">
                    {/* Icon badge */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0" style={{ background: "#1AABFF15", border: "1px solid #1AABFF30" }}>
                      <div className="w-5 h-5 text-[#1AABFF]">{item.icon}</div>
                    </div>
                    {/* Title */}
                    <h3 className="text-white font-bold mb-2 text-base leading-snug">{item.title}</h3>
                    {/* Description */}
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </ProgressReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — WHY CHOOSE CODEMATRIX
          Left: headline + feature bullet list.
          Right: 2×2 scroll-scale stat counters.
      ══════════════════════════════════════════ */}
      <section className="relative py-36 px-6 overflow-hidden">
        {/* Ambient glow — bottom left */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-10 blur-[160px] pointer-events-none" style={{ background: "radial-gradient(circle,#1AABFF,transparent 70%)" }} />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left: heading + bullet feature list */}
            <ProgressReveal>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[2px]" style={{ background: "linear-gradient(90deg,#1AABFF,#00D4FF)" }} />
                  <span className="text-[#1AABFF] text-xs uppercase tracking-[0.3em] font-medium">Our edge</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                  Why Choose<br />
                  <span style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    CodeMatrix Studio
                  </span>
                </h2>
                <p className="text-white/45 text-base leading-relaxed mb-10">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae.
                </p>
                <ul className="space-y-4">
                  {["Innovative Solutions", "Expert Team", "24/7 Support", "Competitive Pricing"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: "#1AABFF15", border: "1px solid #1AABFF30" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1AABFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <span className="text-white/65 group-hover:text-white/90 transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ProgressReveal>

            {/* Right: scroll-scale stat counter cards */}
            <div className="grid grid-cols-2 gap-5">
              {STATS.map((stat, i) => (
                <ScaleSection key={i}>
                  <GlassCard className="p-7 text-center h-full">
                    <div className="text-4xl md:text-5xl font-black mb-2" style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {stat.num}
                    </div>
                    <div className="text-white/35 text-xs uppercase tracking-widest leading-tight">{stat.label}</div>
                  </GlassCard>
                </ScaleSection>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — CTA (CALL TO ACTION)
          Centred glass card with headline,
          sub-copy, and primary + secondary buttons
      ══════════════════════════════════════════ */}
      <section className="relative py-36 px-6 overflow-hidden">
        {/* Full-width glow behind CTA card */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-15 blur-[120px] rounded-full" style={{ background: "linear-gradient(135deg,#1AABFF,#0044CC)" }} />
        </div>

        <ParallaxSection speed={0.1} className="relative max-w-4xl mx-auto">
          <ProgressReveal>
            <GlassCard className="p-12 md:p-20 text-center" hover={false}>
              {/* Decorative top-centre shimmer line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px]" style={{ background: "linear-gradient(90deg,transparent,#1AABFF,transparent)" }} />

              {/* Pill label */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1AABFF]/25 bg-[#1AABFF]/5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1AABFF] animate-pulse" />
                <span className="text-[#1AABFF] text-xs font-medium tracking-widest uppercase">Let&apos;s build together</span>
              </div>

              {/* CTA headline */}
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
                Ready to Get<br />
                <span style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Started?
                </span>
              </h2>

              {/* Sub-copy */}
              <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="relative px-10 py-4 rounded-full font-bold text-[#050810] overflow-hidden group" style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)" }}>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Your Project
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                <button className="px-10 py-4 rounded-full font-bold text-white border border-white/15 bg-white/5 backdrop-blur-sm hover:border-[#1AABFF]/50 hover:bg-[#1AABFF]/10 transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </GlassCard>
          </ProgressReveal>
        </ParallaxSection>
      </section>

      {/* ── Global keyframe animations ── */}
      <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          80%       { transform: translateY(14px); opacity: 0.3; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}