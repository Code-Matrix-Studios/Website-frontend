"use client";

import Navbar from "./components/navbar";
import {
  useScrollProgress,
  useLenisParallax,
  useVelocitySkew,
  useHorizontalScroll,
  useScrollScale,
  useScrollRotate,
  useElementScrollProgress
} from "./hooks/use-scroll-animations";

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

function ParallaxSection({ children, speed = 0, className = "", style }: { children: React.ReactNode; speed?: number; className?: string; style?: React.CSSProperties }) {
  const { ref, transform } = useLenisParallax(speed);
  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${transform}px)`, ...style }}>
      {children}
    </div>
  );
}

function ScaleSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, scale } = useScrollScale(0.85, 1);
  return (
    <div ref={ref} className={className} style={{ transform: `scale(${scale})`, transition: "transform 0.1s ease-out" }}>
      {children}
    </div>
  );
}

function RotateSection({ children, className = "", maxRotation = 5 }: { children: React.ReactNode; className?: string; maxRotation?: number }) {
  const { ref, rotation } = useScrollRotate(maxRotation);
  return (
    <div ref={ref} className={className} style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.1s ease-out" }}>
      {children}
    </div>
  );
}

function ProgressReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, progress } = useElementScrollProgress();
  return (
    <div
      ref={ref}
      className={className}
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

/* ─── Glassmorphism card ─── */
function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={`
        relative rounded-2xl border border-white/10
        bg-white/[0.04] backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
        ${hover ? "hover:border-[#1AABFF]/40 hover:bg-white/[0.07] hover:shadow-[0_8px_40px_rgba(26,171,255,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]" : ""}
        transition-all duration-500
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* ─── Animated grid background ─── */
function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,171,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(26,171,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />
      {/* fade-out towards edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#050810_100%)]" />
    </div>
  );
}

/* ─── Noise texture overlay ─── */
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

export default function Home() {
  const { progress } = useScrollProgress();
  const skew = useVelocitySkew(3);
  const { containerRef, scrollRef, translateX } = useHorizontalScroll();

  return (
    <div className="relative w-full bg-[#050810] font-sans">
      <Noise />

      {/* ── Progress bar ── */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, #1AABFF, #00D4FF)"
        }}
      />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden flex flex-col">
        <GridBg />

        {/* Deep ambient glows */}
        <ParallaxSection speed={-0.2} className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30 blur-[160px]" style={{ background: "radial-gradient(circle, #1AABFF 0%, transparent 70%)" }} children={undefined} />
        <ParallaxSection speed={0.1} className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[140px]" style={{ background: "radial-gradient(circle, #0066FF 0%, transparent 70%)" }} children={undefined} />
        <ParallaxSection speed={-0.05} className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full opacity-25 blur-[120px]" style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }} children={undefined} />

        <Navbar />

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center flex-1 text-center text-white px-4 pb-20"
          style={{ transform: `skewY(${skew}deg)` }}
        >
          {/* Pill badge */}
          <ParallaxSection speed={-0.08}>
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1AABFF]/30 bg-[#1AABFF]/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1AABFF] animate-pulse" />
              <span className="text-[#1AABFF] text-xs font-medium tracking-widest uppercase">CodeMatrix Digital Studios</span>
            </div>
          </ParallaxSection>

          <ParallaxSection speed={-0.15}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
              <span className="block text-white/30 font-light text-3xl md:text-4xl tracking-[0.3em] uppercase mb-3">Welcome to</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #a8d8ff 40%, #1AABFF 70%, #00D4FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                CodeMatrix
              </span>
              <span className="block text-white">Studios</span>
            </h1>
          </ParallaxSection>

          <ParallaxSection speed={-0.1}>
            <p className="text-lg md:text-xl mb-10 text-white/40 max-w-lg tracking-wide">
              Building modern digital experiences that push the boundaries of what&apos;s possible.
            </p>
          </ParallaxSection>

          <ParallaxSection speed={-0.05}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="relative px-8 py-3.5 rounded-full font-semibold text-[#050810] overflow-hidden group"
                style={{ background: "linear-gradient(135deg, #1AABFF, #00D4FF)" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="px-8 py-3.5 rounded-full font-semibold text-white border border-white/15 bg-white/5 backdrop-blur-sm hover:border-[#1AABFF]/50 hover:bg-[#1AABFF]/10 transition-all duration-300">
                View Our Work
              </button>
            </div>
          </ParallaxSection>
        </div>
      </section>

      <section className="relative py-36 px-6 overflow-hidden">
        {/* Ambient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[180px] pointer-events-none" style={{ background: "radial-gradient(circle, #1AABFF, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto">
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
            <ProgressReveal>
              <GlassCard className="p-8 md:p-10">
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p className="text-white/60 text-lg leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
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

            {/* 3 Circles */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Outer ring glow */}
              <div className="absolute w-72 h-72 rounded-full border border-[#1AABFF]/10" style={{ animation: "spin 20s linear infinite" }} />
              <div className="absolute w-56 h-56 rounded-full border border-[#00D4FF]/10" style={{ animation: "spin 14s linear infinite reverse" }} />

              <RotateSection maxRotation={50} className="absolute">
                <GlassCard className="w-56 h-56 rounded-full flex items-center justify-center" hover={false}>
                  <img src="/logo.png" alt="Logo" className="w-32 h-24 object-contain" />
                </GlassCard>
              </RotateSection>

              <RotateSection maxRotation={50} className="absolute -top-2 -right-4 md:top-6 md:right-8">
                <GlassCard className="w-28 h-28 rounded-full flex items-center justify-center">
                  <div className="w-9 h-9 text-[#1AABFF]"><TerminalIcon /></div>
                </GlassCard>
              </RotateSection>

              <RotateSection maxRotation={50} className="absolute -bottom-2 -left-4 md:bottom-10 md:left-2">
                <GlassCard className="w-24 h-24 rounded-full flex items-center justify-center">
                  <div className="w-7 h-7 text-[#00D4FF]"><BracketsIcon /></div>
                </GlassCard>
              </RotateSection>
            </div>
          </div>
        </div>
      </section>

      <section ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] opacity-10 blur-[100px] rounded-full" style={{ background: "linear-gradient(90deg,#1AABFF,#0066FF)" }} />
          </div>

          <div className="absolute top-16 left-6 md:left-12 z-10">
            <ProgressReveal>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-8 h-[2px]" style={{ background: "linear-gradient(90deg,#1AABFF,#00D4FF)" }} />
                <span className="text-[#1AABFF] text-xs uppercase tracking-[0.3em] font-medium">What we offer</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Our <span style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Services</span>
              </h2>
              <p className="text-white/30 text-sm mt-1 tracking-widest uppercase">Drag or scroll to explore →</p>
            </ProgressReveal>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 pl-6 md:pl-12 pt-36"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {[
              { title: "Web Development", desc: "Praesent commodo cursus magna, vel scelerisque nisl consectetur. Nullam id dolor id nibh ultricies vehicula ut id.", icon: <CodeIcon />, accent: "#1AABFF" },
              { title: "Mobile Apps", desc: "Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla.", icon: <TerminalIcon />, accent: "#00D4FF" },
              { title: "Cloud Solutions", desc: "Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur.", icon: <BracketsIcon />, accent: "#0066FF" },
              { title: "UI/UX Design", desc: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio dapibus ac facilisis in.", icon: <CodeIcon />, accent: "#1AABFF" },
              { title: "Data Analytics", desc: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh ut fermentum massa justo sit.", icon: <TerminalIcon />, accent: "#00D4FF" },
              { title: "Consulting", desc: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis.", icon: <BracketsIcon />, accent: "#0066FF" },
            ].map((service, i) => (
              <div
                key={i}
                className="shrink-0 w-80 md:w-96 group"
                style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 1.5}deg)` }}
              >
                <GlassCard className="p-8 h-full">
                  {/* Top accent line */}
                  <div className="w-full h-[1px] mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }} />

                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${service.accent}15`, border: `1px solid ${service.accent}30` }}
                  >
                    <div className="w-6 h-6" style={{ color: service.accent }}>{service.icon}</div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm">{service.desc}</p>

                  <div className="mt-8 flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: service.accent }}>
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </GlassCard>
              </div>
            ))}
            <div className="shrink-0 w-24" />
          </div>
        </div>
      </section>

      <section className="relative py-36 px-6 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-10 blur-[160px] pointer-events-none" style={{ background: "radial-gradient(circle,#1AABFF,transparent 70%)" }} />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ProgressReveal>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-[2px]" style={{ background: "linear-gradient(90deg,#1AABFF,#00D4FF)" }} />
                  <span className="text-[#1AABFF] text-xs uppercase tracking-[0.3em] font-medium">Our edge</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                  Why Choose<br />
                  <span style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>CodeMatrix</span>
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

            <div className="grid grid-cols-2 gap-5">
              {[
                { num: "10+", label: "Projects Completed"},
                { num: "100+", label: "Happy Clients"},
                { num: "20+", label: "Team Members"},
                { num: "10+", label: "Years Experience"},
              ].map((stat, i) => (
                <ScaleSection key={i}>
                  <GlassCard className="p-7 text-center h-full">
                    <div
                      className="text-4xl md:text-5xl font-black mb-2"
                      style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
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

      <section className="relative py-36 px-6 overflow-hidden">
        {/* Full-width glow behind CTA */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-15 blur-[120px] rounded-full" style={{ background: "linear-gradient(135deg,#1AABFF,#0044CC)" }} />
        </div>

        <ParallaxSection speed={0.1} className="relative max-w-4xl mx-auto">
          <ProgressReveal>
            <GlassCard className="p-12 md:p-20 text-center" hover={false}>
              {/* Decorative top border glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px]" style={{ background: "linear-gradient(90deg,transparent,#1AABFF,transparent)" }} />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1AABFF]/25 bg-[#1AABFF]/5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1AABFF] animate-pulse" />
                <span className="text-[#1AABFF] text-xs font-medium tracking-widest uppercase">Let&apos;s build together</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
                Ready to Get<br />
                <span style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Started?
                </span>
              </h2>
              <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="relative px-10 py-4 rounded-full font-bold text-[#050810] overflow-hidden group"
                  style={{ background: "linear-gradient(135deg,#1AABFF,#00D4FF)" }}
                >
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

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="relative border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#1AABFF20,#00D4FF20)", border: "1px solid #1AABFF30" }}>
              <div className="w-4 h-4 text-[#1AABFF]"><CodeIcon /></div>
            </div>
            <span className="text-white/50 text-sm font-medium">CodeMatrix Studios</span>
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase">© 2025 CodeMatrix Studios. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-white/30 text-xs hover:text-[#1AABFF] transition-colors duration-300 tracking-wide uppercase">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(14px); opacity: 0.3; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}