"use client";

import { useState, useEffect } from "react";

const EVENTS = [
  {
    id: "langnam-founder",
    title: "Langnam Development — Founder",
    start: { year: 2020, month: 1 },
    end: null,
    color: "#EA6C1E",
    href: null,
    track: 0,
  },
  {
    id: "game-dev",
    title: "Game Programmer · Work & Travel USA",
    start: { year: 2022, month: 1 },
    end: { year: 2022, month: 12 },
    color: "#EF9F27",
    href: null,
    track: 1,
  },
  {
    id: "graduated",
    title: "Graduated — Bangkok University",
    start: { year: 2023, month: 6 },
    end: { year: 2023, month: 6 },
    color: "#1D9E75",
    href: null,
    track: 0,
    milestone: true,
  },
  {
    id: "automation-langnam",
    title: "Automation Systems @ Langnam",
    start: { year: 2024, month: 1 },
    end: null,
    color: "#378ADD",
    href: null,
    track: 1,
  },
  {
    id: "deploy-client",
    title: "Deploy Automation — External Client",
    start: { year: 2025, month: 1 },
    end: { year: 2025, month: 10 },
    color: "#7F77DD",
    href: null,
    track: 2,
  },
  {
    id: "hotel-finance",
    title: "Financial Summary System — Hotel, Asoke",
    start: { year: 2025, month: 11 },
    end: { year: 2025, month: 12 },
    color: "#D4537E",
    href: null,
    track: 2,
  },
  {
    id: "hybrid-ocr",
    title: "Hybrid OCR",
    start: { year: 2026, month: 1 },
    end: null,
    color: "#378ADD",
    href: "https://github.com/anurinth-w/hybrid-ocr",
    track: 2,
  },
  {
    id: "kayaman",
    title: "Kayaman Shop",
    start: { year: 2026, month: 2 },
    end: { year: 2026, month: 4 },
    color: "#EA6C1E",
    href: "https://github.com/anurinth-w/kayaman-shop",
    track: 3,
  },
  {
    id: "devops-assignment",
    title: "DevOps Assignment",
    start: { year: 2026, month: 4 },
    end: { year: 2026, month: 5 },
    color: "#7F77DD",
    href: "https://github.com/anurinth-w/devops-assignment",
    track: 4,
  },
];

const TL_START_YEAR = 2020;
const TL_NOW_YEAR = 2026;
const TL_NOW_MONTH = 5;
const MIN_H_PER_YEAR = 50;
const H_PER_EVENT = 45;
const TRACK_WIDTH = 10;
const TRACK_GAP = 20;
const LEFT_AXIS = 70;
const TRACKS_START = LEFT_AXIS + 20;
const LABEL_X = 240;
const LABEL_ROW_H = 44;
const LABEL_START_Y = 52;

function getYearDensity(year: number) {
  return EVENTS.filter((ev) => {
    const endYear = ev.end?.year ?? TL_NOW_YEAR;
    return ev.start.year <= year && endYear >= year;
  }).length;
}

function buildYearMap() {
  const map: Record<number, number> = {};
  let y = 40;
  for (let yr = TL_START_YEAR; yr <= TL_NOW_YEAR + 1; yr++) {
    map[yr] = y;
    const density = getYearDensity(yr);
    y += MIN_H_PER_YEAR + density * H_PER_EVENT;
  }
  return map;
}

function toY(yearMap: Record<number, number>, year: number, month: number) {
  const yStart = yearMap[year] ?? 0;
  const yEnd = yearMap[year + 1] ?? yStart + MIN_H_PER_YEAR;
  return yStart + ((month - 1) / 12) * (yEnd - yStart);
}

function toYScaled(
  yearMap: Record<number, number>,
  year: number,
  month: number,
  rawMax: number,
  targetMax: number
) {
  const rawY = toY(yearMap, year, month);
  return (rawY / rawMax) * targetMax;
}

function monthLabel(year: number, month: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[month - 1]} ${year}`;
}

const ABOUT_LINES = [
  "I started as a business owner running a government contracting company_",
  "Somewhere along the way, I got tired of watching my team do the same",
  "manual work over and over — so I started automating it_",
  "",
  "That was the turning point_",
  "",
  "I found myself genuinely enjoying the process of understanding a broken",
  "workflow, designing a fix, and watching it run on its own_",
  "Not just the end result — the problem-solving itself_",
  "",
  `That pulled me toward [DevOps] — infrastructure, pipelines, reliability_`,
  "Work where systems need to be thought through before they're built,",
  "not patched after they break_",
  "",
  "I thrive under pressure, communicate clearly with teammates, and genuinely",
  `enjoy the [why is this broken] part of the job_`,
  "Currently looking for my first engineering role where I can contribute,",
  "learn fast, and grow alongside a strong team_",
];

function TerminalAbout({ dark, mutedColor }: { dark: boolean; mutedColor: string }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const cursor = setInterval(() => setShowCursor(v => !v), 500);
    return () => clearInterval(cursor);
  }, []);

  useEffect(() => {
    if (currentLine >= ABOUT_LINES.length) { setDone(true); return; }
    const line = ABOUT_LINES[currentLine];
    if (line === "") {
      setTimeout(() => {
        setDisplayed(d => [...d, ""]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 120);
      return;
    }
    if (currentChar >= line.length) {
      setTimeout(() => {
        setDisplayed(d => [...d, line]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 80);
      return;
    }
    const speed = line[currentChar] === "_" ? 60 : 18;
    const t = setTimeout(() => setCurrentChar(c => c + 1), speed);
    return () => clearTimeout(t);
  }, [currentLine, currentChar]);

  const currentText = currentLine < ABOUT_LINES.length
    ? ABOUT_LINES[currentLine].slice(0, currentChar)
    : "";

  function renderLine(line: string, key: number) {
    const parts = line.split(/(\[.*?\]|_)/g);
    return (
      <div key={key} className="min-h-5">
        {parts.map((part, i) => {
          if (part === "_") return null;
          if (part.startsWith("[") && part.endsWith("]")) {
            return <span key={i} className="text-orange-500 font-medium">{part.slice(1, -1)}</span>;
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: "14px",
      lineHeight: "1.8",
      color: mutedColor,
      maxWidth: "640px",
    }}>
      {displayed.map((line, i) => renderLine(line, i))}
      {!done && (
        <div className="min-h-5">
          {(() => {
            const parts = currentText.split(/(\[.*?\]|_)/g);
            return parts.map((part, i) => {
              if (part === "_") return null;
              if (part.startsWith("[") && part.endsWith("]")) {
                return <span key={i} className="text-orange-500 font-medium">{part.slice(1, -1)}</span>;
              }
              return <span key={i}>{part}</span>;
            });
          })()}
          <span style={{
            display: "inline-block",
            width: "8px",
            backgroundColor: showCursor ? "#EA6C1E" : "transparent",
            height: "14px",
            verticalAlign: "middle",
            marginLeft: "1px",
          }}/>
        </div>
      )}
      {done && (
        <span style={{
          display: "inline-block",
          width: "8px",
          backgroundColor: showCursor ? "#EA6C1E" : "transparent",
          height: "14px",
          verticalAlign: "middle",
          marginLeft: "1px",
        }}/>
      )}
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [tlHovered, setTlHovered] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (!mounted) return null;

  const projects = [
    {
      name: "Hybrid OCR",
      desc: "Async OCR processing on AWS — S3, SQS, DynamoDB, Docker, Terraform",
      tags: ["AWS", "Docker", "Terraform"],
      href: "https://github.com/anurinth-w/hybrid-ocr",
      status: "In Progress",
      icon: "⚙️",
      iconBg: dark ? "#0a1220" : "#eff6ff",
    },
    {
      name: "Kayaman Shop",
      desc: "Full-stack order management for a real game top-up business",
      tags: ["Serverless", "React", "Cloudflare"],
      href: "https://github.com/anurinth-w/kayaman-shop",
      status: "Production",
      icon: "🎮",
      iconBg: dark ? "#2a1a0a" : "#fff3e8",
    },
    {
      name: "PWM Service",
      desc: "Provincial waterworks management — multi-service Go backend, LINE integration",
      tags: ["Go", "LINE API"],
      href: "https://github.com/anurinth-w/pwm-service",
      status: "In Progress",
      icon: "💧",
      iconBg: dark ? "#0a1a18" : "#f0fdf8",
    },
    {
      name: "DevOps Assignment",
      desc: "Kubernetes deployment with monitoring — Prometheus, CI/CD pipeline",
      tags: ["K8s", "Prometheus", "Kustomize"],
      href: "https://github.com/anurinth-w/devops-assignment",
      status: "Complete",
      icon: "☸️",
      iconBg: dark ? "#1a0a2a" : "#f5f0ff",
    },
    {
      name: "Cinema Booking",
      desc: "Full-stack cinema booking system with Go backend, Docker, and CI/CD",
      tags: ["Go", "Docker", "CI/CD"],
      href: "https://github.com/anurinth-w/cinema-booking",
      status: "Complete",
      icon: "🎬",
      iconBg: dark ? "#1a1a0a" : "#fffbf0",
    },
  ];

  const borderColor = dark ? "#2a2a2a" : "#e8e4dc";
  const mutedColor = dark ? "#888" : "#666";
  const subtleColor = dark ? "#555" : "#aaa";
  const bgColor = dark ? "#0e0e0e" : "#faf8f4";
  const textColor = dark ? "#f0ede8" : "#1a1a1a";
  const cardBg = dark ? "#141414" : "#ffffff";

  // Timeline calculations
  const yearMap = buildYearMap();
  const barHeight = (yearMap[TL_NOW_YEAR + 1] ?? 600) + 40;
  const labelHeight = LABEL_START_Y + EVENTS.length * LABEL_ROW_H + 20;
  const totalHeight = labelHeight;

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: bgColor, color: textColor }}>

        {/* Navbar */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-sm"
          style={{ borderBottom: `0.5px solid ${borderColor}` }}>
          <span className="text-sm font-medium text-orange-500">anurinth.dev</span>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-6">
              {["about", "skills", "timeline", "projects", "blog"].map((item) => (
                <a key={item} href={`#${item}`}
                  className="text-sm hover:text-orange-500 transition-colors"
                  style={{ color: mutedColor }}>
                  {item}
                </a>
              ))}
            </div>
            <button onClick={() => setDark(!dark)}
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-colors hover:border-orange-400"
              style={{ border: `0.5px solid ${borderColor}`, color: mutedColor, backgroundColor: "transparent" }}>
              {dark ? "☀ light" : "☽ dark"}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="px-8 sm:px-16 py-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full mb-6"
            style={{ backgroundColor: dark ? "#2a1a0a" : "#fff3e8", color: dark ? "#f09050" : "#c45610" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            open to work
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-3">
            Anurinth <span className="text-orange-500">W.</span>
          </h1>
          <p className="text-lg mb-5" style={{ color: mutedColor }}>DevOps & Full-Stack Engineer</p>
          <p className="text-base leading-relaxed max-w-md mb-8" style={{ color: mutedColor }}>
            I build and ship systems that actually run — from serverless APIs to cloud infrastructure.
            Currently focused on DevOps, automation, and making things reliable at scale.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <a href="/resume.pdf" download="Anurinth_Wichairum_Resume_2026.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
              ↓ download resume
            </a>
            <a href="mailto:anurinth.w@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors hover:border-orange-400"
              style={{ border: `0.5px solid ${borderColor}`, color: dark ? "#ccc" : "#444" }}>
              ✉ get in touch
            </a>
          </div>
          <div className="flex gap-5">
            {[
              { label: "github", href: "https://github.com/anurinth-w" },
              { label: "linkedin", href: "https://www.linkedin.com/in/anurinth-wichairum-494ab03b0/" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-sm hover:text-orange-500 transition-colors"
                style={{ color: subtleColor }}>
                {s.label} ↗
              </a>
            ))}
          </div>
        </section>

        <div className="mx-8 sm:mx-16" style={{ borderTop: `0.5px solid ${borderColor}` }} />

        {/* About */}
        <section id="about" className="px-8 sm:px-16 py-12 max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: subtleColor }}>
            about
          </p>
          <TerminalAbout dark={dark} mutedColor={mutedColor} />
        </section>

        {/* Divider */}
        <div className="mx-8 sm:mx-16" style={{ borderTop: `0.5px solid ${borderColor}` }} />


        {/* Stats + Skills */}
        <section id="skills" className="px-8 sm:px-16 py-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { number: "5+", label: "projects shipped" },
              { number: "2+", label: "years building" },
              { number: "1", label: "production system" },
              { number: "4", label: "cloud platforms" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col p-4 rounded-xl"
                style={{ backgroundColor: cardBg, border: `0.5px solid ${borderColor}` }}>
                <span className="text-2xl font-semibold text-orange-500 mb-1">{s.number}</span>
                <span className="text-xs" style={{ color: subtleColor }}>{s.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: subtleColor }}>skills</p>
          <div className="flex flex-wrap gap-2">
            {["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Prometheus",
              "Python", "Go", "React", "Next.js", "Cloudflare Workers", "Google Apps Script", "Linux", "CI/CD"
            ].map((skill) => (
              <span key={skill} className="text-xs px-3 py-1.5 rounded-full transition-colors hover:border-orange-400"
                style={{ border: `0.5px solid ${borderColor}`, color: mutedColor, backgroundColor: "transparent" }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <div className="mx-8 sm:mx-16" style={{ borderTop: `0.5px solid ${borderColor}` }} />

        {/* Timeline */}
        <section id="timeline" className="px-8 sm:px-16 py-12 max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: subtleColor }}>timeline</p>
          <h2 className="text-2xl font-semibold mb-2">Career Journey</h2>
          <p className="text-sm mb-8" style={{ color: mutedColor }}>
            Bars show duration. Busier periods are spaced further apart.
          </p>
          <div className="overflow-x-auto">
            <svg width="100%" viewBox={`0 0 640 ${totalHeight}`} style={{ display: "block", minWidth: "400px" }}>

              {/* Year grid */}
              {Array.from({ length: TL_NOW_YEAR - TL_START_YEAR + 2 }, (_, i) => TL_START_YEAR + i).map((yr) => {
                const y = toYScaled(yearMap, yr, 1, barHeight - 20, labelHeight - 20);
                return (
                  <g key={yr}>
                    <line x1={LEFT_AXIS} y1={y} x2={LABEL_X - 10} y2={y}
                      stroke={dark ? "#1a1a1a" : "#ede9e0"} strokeWidth="1" />
                    <text x={LEFT_AXIS - 8} y={y + 4} textAnchor="end"
                      style={{ fontSize: "11px", fill: subtleColor, fontFamily: "sans-serif", fontWeight: 500 }}>
                      {yr}
                    </text>
                  </g>
                );
              })}

              {/* Spine */}
              <line x1={LEFT_AXIS} y1={40} x2={LEFT_AXIS} y2={totalHeight - 20}
                stroke={borderColor} strokeWidth="1.5" />

              {/* Now line */}
              {(() => {
                const nowY = toYScaled(yearMap, TL_NOW_YEAR, TL_NOW_MONTH, barHeight - 20, labelHeight - 20);
                return (
                  <g>
                    <line x1={LEFT_AXIS} y1={nowY} x2={LABEL_X - 10} y2={nowY}
                      stroke="#EA6C1E" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                    <text x={LEFT_AXIS - 8} y={nowY + 4} textAnchor="end"
                      style={{ fontSize: "10px", fill: "#EA6C1E", fontFamily: "sans-serif", fontWeight: 600 }}>
                      now
                    </text>
                  </g>
                );
              })()}

              {/* Divider */}
              <line x1={LABEL_X - 16} y1={30} x2={LABEL_X - 16} y2={totalHeight - 20}
                stroke={borderColor} strokeWidth="0.5" strokeDasharray="3 3" />

              {/* Events */}
              {EVENTS.map((ev, index) => {
                const startY = toYScaled(yearMap, ev.start.year, ev.start.month, barHeight - 20, labelHeight - 20);
                const endM = ev.end ?? { year: TL_NOW_YEAR, month: TL_NOW_MONTH };
                const endY = toYScaled(yearMap, endM.year, endM.month, barHeight - 20, labelHeight - 20);
                const barH = Math.max(endY - startY, ev.milestone ? 0 : 6);
                const barX = TRACKS_START + ev.track * TRACK_GAP;
                const labelY = LABEL_START_Y + index * LABEL_ROW_H;
                const isMilestone = !!ev.milestone;
                const isOngoing = ev.end === null;
                const isHovered = tlHovered === ev.id;
                const midBarY = startY + barH / 2;

                return (
                  <g key={ev.id}
                    style={{ cursor: ev.href ? "pointer" : "default" }}
                    onMouseEnter={() => setTlHovered(ev.id)}
                    onMouseLeave={() => setTlHovered(null)}
                    onClick={() => ev.href && window.open(ev.href, "_blank")}
                  >
                    {isMilestone ? (
                      <>
                        <circle cx={barX + TRACK_WIDTH / 2} cy={startY} r={6}
                          fill={bgColor} stroke={ev.color} strokeWidth={2} />
                        <circle cx={barX + TRACK_WIDTH / 2} cy={startY} r={3} fill={ev.color} />
                      </>
                    ) : (
                      <>
                        <rect x={barX} y={startY} width={TRACK_WIDTH} height={barH} rx={3}
                          fill={ev.color} fillOpacity={isHovered ? 0.5 : 0.2}
                          stroke={ev.color} strokeWidth={isHovered ? 1.5 : 0.8} />
                        <circle cx={barX + TRACK_WIDTH / 2} cy={startY} r={3} fill={ev.color} />
                        {isOngoing
                          ? <circle cx={barX + TRACK_WIDTH / 2} cy={endY} r={3}
                            fill={ev.color} fillOpacity={0.3} stroke={ev.color} strokeWidth={1.5} />
                          : <circle cx={barX + TRACK_WIDTH / 2} cy={endY} r={2.5} fill={ev.color} />
                        }
                      </>
                    )}

                    <path
                      d={`M${barX + TRACK_WIDTH} ${midBarY} L${LABEL_X - 18} ${midBarY} L${LABEL_X - 18} ${labelY + 6} L${LABEL_X} ${labelY + 6}`}
                      fill="none" stroke={ev.color}
                      strokeWidth={isHovered ? 1.5 : 0.5}
                      opacity={isHovered ? 1 : 0.35} />

                    <circle cx={LABEL_X - 6} cy={labelY + 6} r={2.5} fill={ev.color} opacity={0.7} />

                    <text x={LABEL_X + 4} y={labelY + 4}
                      style={{
                        fontSize: "12px", fill: isHovered ? ev.color : textColor,
                        fontFamily: "sans-serif", fontWeight: isHovered ? 500 : 400, dominantBaseline: "middle"
                      }}>
                      {ev.title}{ev.href ? " ↗" : ""}
                    </text>
                    <text x={LABEL_X + 4} y={labelY + 20}
                      style={{ fontSize: "10px", fill: subtleColor, fontFamily: "sans-serif", dominantBaseline: "middle" }}>
                      {monthLabel(ev.start.year, ev.start.month)}
                      {ev.end ? ` – ${monthLabel(ev.end.year, ev.end.month)}` : " – present"}
                    </text>

                    {isHovered && (
                      <rect x={LABEL_X - 8} y={labelY - 4} width={400} height={32} rx={4}
                        fill={ev.color} fillOpacity={0.06} />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </section>

        <div className="mx-8 sm:mx-16" style={{ borderTop: `0.5px solid ${borderColor}` }} />

        {/* Featured Projects */}
        <section id="projects" className="px-8 sm:px-16 py-16 max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: subtleColor }}>
            featured projects
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {projects.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col p-5 rounded-xl transition-all hover:-translate-y-0.5"
                style={{ border: `0.5px solid ${borderColor}`, backgroundColor: cardBg }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#f97316")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = borderColor)}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4"
                  style={{ backgroundColor: p.iconBg }}>
                  {p.icon}
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-full" style={{
                    backgroundColor: p.status === "Production"
                      ? dark ? "#0a2010" : "#f0fdf4"
                      : dark ? "#2a1a0a" : "#fff3e8",
                    color: p.status === "Production"
                      ? dark ? "#4ade80" : "#16a34a"
                      : dark ? "#f09050" : "#c45610",
                  }}>
                    {p.status}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: dark ? "#666" : "#888" }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: dark ? "#222" : "#f0ede8", color: dark ? "#666" : "#888" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Blog placeholder */}
        <section id="blog" className="px-8 sm:px-16 py-16 max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: subtleColor }}>
            blog
          </p>
          <div className="flex flex-col items-center justify-center py-16 rounded-xl"
            style={{ border: `0.5px solid ${borderColor}`, backgroundColor: cardBg }}>
            <p className="text-sm mb-2" style={{ color: mutedColor }}>coming soon</p>
            <p className="text-xs" style={{ color: subtleColor }}>engineer logs, devops notes, and lessons learned</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-8 sm:px-16 py-8 mt-4" style={{ borderTop: `0.5px solid ${borderColor}` }}>
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs" style={{ color: subtleColor }}>© 2026 Anurinth Wichairum</span>
            <div className="flex gap-5">
              {[
                { label: "github", href: "https://github.com/anurinth-w" },
                { label: "linkedin", href: "https://linkedin.com/in/anurinth-wichairum-494ab03b0" },
                { label: "email", href: "mailto:anurinth.w@gmail.com" },
              ].map((s) => (
                <a key={s.label} href={s.href}
                  className="text-xs hover:text-orange-500 transition-colors"
                  style={{ color: subtleColor }}>
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
