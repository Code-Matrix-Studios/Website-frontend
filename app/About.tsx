"use client";

import { useState } from "react";
import Navbar from "../components/navbar";

/* ─────────────────────────────────────────
   Shared design tokens (mirrors page.tsx)
───────────────────────────────────────── */
const BG = "#050810";
const BLUE = "#1AABFF";
const CYAN = "#00D4FF";

/* ─── Reusable glass card ─── */
function GlassCard({
  children,
  className = "",
  hover = true,
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}) {
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
      style={style}
    >
      {children}
    </div>
  );
}

/* ─── Noise overlay ─── */
function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        mixBlendMode: "overlay",
      }}
    />
  );
}

/* ─── Grid background ─── */
function GridBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,171,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(26,171,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#050810_100%)]" />
    </div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div
        className="w-8 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg,${BLUE},${CYAN})` }}
      />
      <span
        className="text-xs uppercase tracking-[0.3em] font-medium"
        style={{ color: BLUE }}
      >
        {text}
      </span>
    </div>
  );
}

/* ─── Social icon ─── */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{
        background: "rgba(26,171,255,0.08)",
        border: "1px solid rgba(26,171,255,0.2)",
        color: "rgba(255,255,255,0.4)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = BLUE;
        (e.currentTarget as HTMLAnchorElement).style.borderColor = `${BLUE}60`;
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,171,255,0.15)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 12px rgba(26,171,255,0.2)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(26,171,255,0.2)";
        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,171,255,0.08)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
      }}
    >
      {children}
    </a>
  );
}

/* ─── Team member data ─── */
const departments = [
  "All",
  "Leadership",
  "Engineering",
  "Design",
  "Marketing",
];

const team = [
  {
    name: "Alex Carter",
    role: "Chief Executive Officer",
    dept: "Leadership",
    bio: "Visionary leader with 15+ years scaling digital products from seed to IPO. Former VP at a Fortune 500 tech company.",
    skills: ["Strategy", "Fundraising", "Leadership"],
    initials: "AC",
    accent: BLUE,
    index: 0,
  },
  {
    name: "Maya Patel",
    role: "Chief Technology Officer",
    dept: "Leadership",
    bio: "Full-stack architect obsessed with performance. Loves distributed systems, Rust, and really good coffee.",
    skills: ["Architecture", "Rust", "Distributed Systems"],
    initials: "MP",
    accent: CYAN,
    index: 1,
  },
  {
    name: "Jordan Lee",
    role: "Lead Designer",
    dept: "Design",
    bio: "Crafts delightful, accessible interfaces. Believes great design is invisible — until you remove it.",
    skills: ["Figma", "Motion", "Design Systems"],
    initials: "JL",
    accent: "#60CFFF",
    index: 2,
  },
  {
    name: "Sam Rivera",
    role: "Senior Engineer",
    dept: "Engineering",
    bio: "Open-source contributor and TypeScript evangelist. Turns complex requirements into elegant, maintainable code.",
    skills: ["TypeScript", "React", "Node.js"],
    initials: "SR",
    accent: BLUE,
    index: 3,
  },
  {
    name: "Priya Nair",
    role: "Product Manager",
    dept: "Leadership",
    bio: "Bridges the gap between user pain and product solution. Formerly at two unicorn startups.",
    skills: ["Roadmaps", "User Research", "Agile"],
    initials: "PN",
    accent: CYAN,
    index: 4,
  },
  {
    name: "Chris Tan",
    role: "Frontend Engineer",
    dept: "Engineering",
    bio: "Pixel-perfect craftsperson. Passionate about web performance, accessibility, and CSS that actually sparks joy.",
    skills: ["Next.js", "CSS", "Accessibility"],
    initials: "CT",
    accent: "#60CFFF",
    index: 5,
  },
  {
    name: "Dana Okafor",
    role: "Brand Strategist",
    dept: "Marketing",
    bio: "Story-driven marketer who turns complex tech narratives into campaigns people remember.",
    skills: ["Branding", "Content", "SEO"],
    initials: "DO",
    accent: BLUE,
    index: 6,
  },
  {
    name: "Eli Chen",
    role: "UI/UX Designer",
    dept: "Design",
    bio: "Blends data and intuition to design experiences that convert. Obsessive prototyper and Figma power user.",
    skills: ["User Testing", "Prototyping", "Figma"],
    initials: "EC",
    accent: CYAN,
    index: 7,
  },
  {
    name: "Raj Mehta",
    role: "DevOps Engineer",
    dept: "Engineering",
    bio: "Keeps the lights on at 99.99% uptime. Kubernetes wizard and the person everyone calls at 2 AM.",
    skills: ["Kubernetes", "CI/CD", "AWS"],
    initials: "RM",
    accent: "#60CFFF",
    index: 8,
  },
];

/* ─── Team Member Card ─── */
function TeamCard({ member }: { member: (typeof team)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${member.index * 80}ms` }}
    >
      <GlassCard className="p-6 h-full flex flex-col">
        {/* Top accent line on hover */}
        <div
          className="absolute top-0 left-6 right-6 h-[1px] rounded-full transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Avatar + social row */}
        <div className="flex items-start justify-between mb-5">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black transition-all duration-300 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${member.accent}25, ${member.accent}08)`,
                border: `1px solid ${member.accent}35`,
                color: member.accent,
                boxShadow: hovered ? `0 0 20px ${member.accent}25` : "none",
              }}
            >
              {member.initials}
            </div>
            {/* Online dot */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
              style={{
                background: BLUE,
                borderColor: BG,
                boxShadow: `0 0 6px ${BLUE}`,
              }}
            />
          </div>

          {/* Socials — revealed on hover */}
          <div
            className="flex items-center gap-1.5 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-6px)" }}
          >
            <SocialLink href="#" label="LinkedIn">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialLink>
            <SocialLink href="#" label="GitHub">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </SocialLink>
            <SocialLink href="#" label="Twitter">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </SocialLink>
          </div>
        </div>

        {/* Name & role */}
        <div className="mb-3">
          <h3
            className="text-base font-bold tracking-tight mb-0.5 transition-colors duration-300"
            style={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.9)" }}
          >
            {member.name}
          </h3>
          <p className="text-xs font-medium" style={{ color: member.accent }}>
            {member.role}
          </p>
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          {member.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium uppercase tracking-wide"
              style={{
                background: `${member.accent}10`,
                border: `1px solid ${member.accent}25`,
                color: member.accent,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function TeamPage() {
  const [activeDept, setActiveDept] = useState("All");

  const filtered =
    activeDept === "All" ? team : team.filter((m) => m.dept === activeDept);

  return (
    <div className="relative w-full min-h-screen font-sans" style={{ background: BG }}>
      <Noise />
      <GridBg />

      {/* Ambient glows */}
      <div
        className="fixed -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-[180px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${BLUE}, transparent 70%)` }}
      />
      <div
        className="fixed top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[160px] pointer-events-none"
        style={{ background: `radial-gradient(circle, #0044CC, transparent 70%)` }}
      />
      <div
        className="fixed bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-15 blur-[140px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${CYAN}, transparent 70%)` }}
      />

      <Navbar />

      <main className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── Hero heading ── */}
          <div className="text-center mb-20">
            <SectionLabel text="The people behind the code" />
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              <span
                style={{
                  background: `linear-gradient(135deg, #ffffff 0%, #a8d8ff 40%, ${BLUE} 70%, ${CYAN} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Meet the
              </span>
              <br />
              <span className="text-white">Team</span>
            </h1>
            <p
              className="text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              A collective of engineers, designers, and strategists who believe the best digital products are built at the intersection of craft and curiosity.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a
                href="/careers"
                className="relative px-8 py-3 rounded-full font-bold text-sm overflow-hidden group transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`,
                  color: BG,
                  boxShadow: `0 0 24px rgba(26,171,255,0.3)`,
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Join the Team
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="/contact"
                className="px-8 py-3 rounded-full font-bold text-sm text-white border transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: "rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${BLUE}60`;
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,171,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* ── Stats bar ── */}
          <GlassCard className="px-8 py-6 mb-16 flex flex-wrap justify-around gap-6" hover={false}>
            {[
              { num: "50+", label: "Team Members" },
              { num: "12", label: "Nationalities" },
              { num: "4", label: "Time Zones" },
              { num: "100%", label: "Remote-Friendly" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl font-black mb-1"
                  style={{
                    background: `linear-gradient(135deg,${BLUE},${CYAN})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.num}
                </div>
                <div
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </GlassCard>

          {/* ── Department filter ── */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {departments.map((dept) => {
              const active = activeDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  style={
                    active
                      ? {
                          background: `linear-gradient(135deg,${BLUE},${CYAN})`,
                          color: BG,
                          boxShadow: `0 0 18px rgba(26,171,255,0.35)`,
                          transform: "scale(1.04)",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.45)",
                          backdropFilter: "blur(8px)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = `${BLUE}50`;
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(26,171,255,0.08)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                    }
                  }}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* ── Team grid ── */}
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
          >
            {filtered.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>

          {/* ── Culture / Values strip ── */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <SectionLabel text="How we work" />
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Our{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg,${BLUE},${CYAN})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Culture
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: (
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="m2 17 10 5 10-5" />
                      <path d="m2 12 10 5 10-5" />
                    </svg>
                  ),
                  title: "Ship Fast, Learn Faster",
                  body: "We prototype in days, not months. Iteration is our superpower — every failure is a data point.",
                  accent: BLUE,
                },
                {
                  icon: (
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4l3 3" />
                    </svg>
                  ),
                  title: "Async by Default",
                  body: "We respect deep work. Async-first culture means fewer meetings and more flow state for everyone.",
                  accent: CYAN,
                },
                {
                  icon: (
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: "Radical Transparency",
                  body: "Open salaries, open roadmaps, open feedback. We believe trust is built through honesty, not secrecy.",
                  accent: "#60CFFF",
                },
              ].map((val) => (
                <GlassCard key={val.title} className="p-7">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                    style={{
                      background: `${val.accent}12`,
                      border: `1px solid ${val.accent}28`,
                      color: val.accent,
                    }}
                  >
                    {val.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">{val.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {val.body}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* ── Open roles CTA ── */}
          <div className="mt-20 relative">
            <GlassCard className="p-12 md:p-16 text-center overflow-hidden" hover={false}>
              {/* top border glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-[1px]"
                style={{ background: `linear-gradient(90deg,transparent,${BLUE},transparent)` }}
              />
              {/* inner glow blob */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] opacity-10 blur-[80px] rounded-full pointer-events-none"
                style={{ background: `linear-gradient(135deg,${BLUE},${CYAN})` }}
              />

              <div className="relative z-10">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                  style={{
                    border: `1px solid ${BLUE}30`,
                    background: `${BLUE}08`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: BLUE }}
                  />
                  <span className="text-xs font-medium uppercase tracking-widest" style={{ color: BLUE }}>
                    We&apos;re hiring
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
                  Want to build the future<br />
                  <span
                    style={{
                      background: `linear-gradient(135deg,${BLUE},${CYAN})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    with us?
                  </span>
                </h2>
                <p
                  className="text-base max-w-lg mx-auto leading-relaxed mb-10"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  We have open roles across engineering, design, and growth. Remote-first, equity-backed, and genuinely exciting problems to solve.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/careers"
                    className="relative px-10 py-3.5 rounded-full font-bold text-sm overflow-hidden group transition-all duration-300 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg,${BLUE},${CYAN})`,
                      color: BG,
                      boxShadow: `0 0 24px rgba(26,171,255,0.3)`,
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Open Roles
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                  <a
                    href="/contact"
                    className="px-10 py-3.5 rounded-full font-bold text-sm text-white border transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: "rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    Say Hello
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 border-t py-10 px-6"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg,${BLUE}20,${CYAN}10)`,
                border: `1px solid ${BLUE}30`,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              CodeMatrix Studios
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2025 CodeMatrix Studios. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs uppercase tracking-wide transition-colors duration-300"
                style={{ color: "rgba(255,255,255,0.3)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = BLUE)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}