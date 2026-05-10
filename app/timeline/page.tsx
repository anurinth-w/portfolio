"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

const START_YEAR = 2020;
const NOW_YEAR = 2026;
const NOW_MONTH = 5;

function getYearDensity(year: number) {
  return EVENTS.filter((ev) => {
    const endYear = ev.end?.year ?? NOW_YEAR;
    return ev.start.year <= year && endYear >= year;
  }).length;
}

const MIN_H_PER_YEAR = 50;
const H_PER_EVENT = 45;

function buildYearMap() {
  const map: Record<number, number> = {};
  let y = 40;
  for (let yr = START_YEAR; yr <= NOW_YEAR + 1; yr++) {
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
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[month - 1]} ${year}`;
}

const TRACK_WIDTH = 10;
const TRACK_GAP = 20;
const LEFT_AXIS = 70;
const TRACKS_START = LEFT_AXIS + 20;
const LABEL_X = 240;
const LABEL_ROW_H = 44;
const LABEL_START_Y = 52;

export default function Timeline() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (!mounted) return null;

  const yearMap = buildYearMap();
  const barHeight = (yearMap[NOW_YEAR + 1] ?? 600) + 40;
  const labelHeight = LABEL_START_Y + EVENTS.length * LABEL_ROW_H + 20;
  const totalHeight = labelHeight;

  const borderColor = dark ? "#2a2a2a" : "#e8e4dc";
  const mutedColor = dark ? "#888" : "#666";
  const subtleColor = dark ? "#555" : "#aaa";
  const bgColor = dark ? "#0e0e0e" : "#faf8f4";
  const textColor = dark ? "#f0ede8" : "#1a1a1a";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bgColor, color: textColor, transition: "all 0.3s" }}>

      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-sm"
        style={{ borderBottom: `0.5px solid ${borderColor}` }}>
        <Link href="/" className="text-sm font-medium text-orange-500 hover:opacity-80 transition-opacity">
          ← anurinth.dev
        </Link>
        <button onClick={() => setDark(!dark)}
          className="text-xs px-3 py-1.5 rounded-full transition-colors"
          style={{ border: `0.5px solid ${borderColor}`, color: mutedColor, backgroundColor: "transparent" }}>
          {dark ? "☀ light" : "☽ dark"}
        </button>
      </nav>

      <div className="px-8 sm:px-16 py-12 max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: subtleColor }}>
          timeline
        </p>
        <h1 className="text-3xl font-semibold mb-3">Career Journey</h1>
        <p className="text-base" style={{ color: mutedColor }}>
          Bars show duration. Labels on the right are stacked for easy reading.
        </p>
      </div>

      <div className="px-8 sm:px-16 pb-20 max-w-4xl mx-auto overflow-x-auto">
        <svg width="100%" viewBox={`0 0 640 ${totalHeight}`} style={{ display: "block", minWidth: "400px" }}>

          {/* Year grid + labels */}
          {Array.from({ length: NOW_YEAR - START_YEAR + 2 }, (_, i) => START_YEAR + i).map((yr) => {
            const y = toYScaled(yearMap, yr, 1, barHeight - 20, labelHeight - 20);
            return (
              <g key={yr}>
                <line x1={LEFT_AXIS} y1={y} x2={LABEL_X - 10} y2={y}
                  stroke={dark ? "#1a1a1a" : "#ede9e0"} strokeWidth="1"/>
                <text x={LEFT_AXIS - 8} y={y + 4} textAnchor="end"
                  style={{ fontSize: "11px", fill: subtleColor, fontFamily: "sans-serif", fontWeight: 500 }}>
                  {yr}
                </text>
              </g>
            );
          })}

          {/* Spine */}
          <line x1={LEFT_AXIS} y1={40} x2={LEFT_AXIS} y2={totalHeight - 20}
            stroke={borderColor} strokeWidth="1.5"/>

          {/* Now line (bar side only) */}
          {(() => {
            const nowY = toYScaled(yearMap, NOW_YEAR, NOW_MONTH, barHeight - 20, labelHeight - 20);
            return (
              <g>
                <line x1={LEFT_AXIS} y1={nowY} x2={LABEL_X - 10} y2={nowY}
                  stroke="#EA6C1E" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
                <text x={LEFT_AXIS - 8} y={nowY + 4} textAnchor="end"
                  style={{ fontSize: "10px", fill: "#EA6C1E", fontFamily: "sans-serif", fontWeight: 600 }}>
                  now
                </text>
              </g>
            );
          })()}

          {/* Vertical divider between bars and labels */}
          <line x1={LABEL_X - 16} y1={30} x2={LABEL_X - 16} y2={totalHeight - 20}
            stroke={borderColor} strokeWidth="0.5" strokeDasharray="3 3"/>

          {/* Events */}
          {EVENTS.map((ev, index) => {
            const startY = toYScaled(yearMap, ev.start.year, ev.start.month, barHeight - 20, labelHeight - 20);
            const endM = ev.end ?? { year: NOW_YEAR, month: NOW_MONTH };
            const endY = toYScaled(yearMap, endM.year, endM.month, barHeight - 20, labelHeight - 20);
            const barH = Math.max(endY - startY, ev.milestone ? 0 : 6);
            const barX = TRACKS_START + ev.track * TRACK_GAP;
            const labelY = LABEL_START_Y + index * LABEL_ROW_H;
            const isMilestone = !!ev.milestone;
            const isOngoing = ev.end === null;
            const isHovered = hovered === ev.id;
            const midBarY = (startY + Math.min(startY + barH, endY)) / 2;

            return (
              <g key={ev.id}
                style={{ cursor: ev.href ? "pointer" : "default" }}
                onMouseEnter={() => setHovered(ev.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => ev.href && window.open(ev.href, "_blank")}
              >
                {/* Bar */}
                {isMilestone ? (
                  <>
                    <circle cx={barX + TRACK_WIDTH / 2} cy={startY} r={6}
                      fill={bgColor} stroke={ev.color} strokeWidth={2}/>
                    <circle cx={barX + TRACK_WIDTH / 2} cy={startY} r={3} fill={ev.color}/>
                  </>
                ) : (
                  <>
                    <rect x={barX} y={startY} width={TRACK_WIDTH} height={barH} rx={3}
                      fill={ev.color} fillOpacity={isHovered ? 0.5 : 0.2}
                      stroke={ev.color} strokeWidth={isHovered ? 1.5 : 0.8}/>
                    <circle cx={barX + TRACK_WIDTH / 2} cy={startY} r={3} fill={ev.color}/>
                    {isOngoing
                      ? <circle cx={barX + TRACK_WIDTH / 2} cy={endY} r={3}
                          fill={ev.color} fillOpacity={0.3} stroke={ev.color} strokeWidth={1.5}/>
                      : <circle cx={barX + TRACK_WIDTH / 2} cy={endY} r={2.5} fill={ev.color}/>
                    }
                  </>
                )}

                {/* Connector: bar midpoint → label */}
                <path
                  d={`M${barX + TRACK_WIDTH} ${midBarY} L${LABEL_X - 18} ${midBarY} L${LABEL_X - 18} ${labelY + 6} L${LABEL_X} ${labelY + 6}`}
                  fill="none"
                  stroke={ev.color}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                  opacity={isHovered ? 1 : 0.35}
                />

                {/* Label dot */}
                <circle cx={LABEL_X - 6} cy={labelY + 6} r={2.5} fill={ev.color} opacity={0.7}/>

                {/* Label text */}
                <text x={LABEL_X + 4} y={labelY + 4}
                  style={{
                    fontSize: "12px",
                    fill: isHovered ? ev.color : textColor,
                    fontFamily: "sans-serif",
                    fontWeight: isHovered ? 500 : 400,
                    dominantBaseline: "middle",
                  }}>
                  {ev.title}{ev.href ? " ↗" : ""}
                </text>
                <text x={LABEL_X + 4} y={labelY + 20}
                  style={{ fontSize: "10px", fill: subtleColor, fontFamily: "sans-serif", dominantBaseline: "middle" }}>
                  {monthLabel(ev.start.year, ev.start.month)}
                  {ev.end
                    ? ` – ${monthLabel(ev.end.year, ev.end.month)}`
                    : " – present"}
                </text>

                {/* Hover highlight row */}
                {isHovered && (
                  <rect x={LABEL_X - 8} y={labelY - 4} width={400} height={32} rx={4}
                    fill={ev.color} fillOpacity={0.06}/>
                )}
              </g>
            );
          })}

        </svg>
      </div>
    </div>
  );
}
