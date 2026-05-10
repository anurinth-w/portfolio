"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (!mounted) return null;

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-300" style={{
        backgroundColor: dark ? "#0e0e0e" : "#faf8f4",
        color: dark ? "#f0ede8" : "#1a1a1a"
      }}>

        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-4" style={{
          borderBottom: dark ? "0.5px solid #2a2a2a" : "0.5px solid #e8e4dc"
        }}>
          <span className="text-sm font-medium text-orange-500">anurinth.dev</span>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-6">
              {["about", "projects", "timeline", "resume"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-sm hover:text-orange-500 transition-colors"
                  style={{ color: dark ? "#888" : "#666" }}
                >
                  {item}
                </a>
              ))}
            </div>
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-colors hover:border-orange-400"
              style={{
                border: dark ? "0.5px solid #333" : "0.5px solid #ddd9d0",
                color: dark ? "#888" : "#666",
                backgroundColor: "transparent"
              }}
            >
              {dark ? "☀ light" : "☽ dark"}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <section className="flex flex-col-reverse sm:flex-row items-center justify-between gap-12 px-8 sm:px-16 py-20 max-w-5xl mx-auto">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full mb-6" style={{
              backgroundColor: dark ? "#2a1a0a" : "#fff3e8",
              color: dark ? "#f09050" : "#c45610"
            }}>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              open to work
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-3">
              Anurinth <span className="text-orange-500">W.</span>
            </h1>

            <p className="text-lg mb-5" style={{ color: dark ? "#888" : "#666" }}>
              DevOps & Full-Stack Engineer
            </p>

            <p className="text-base leading-relaxed max-w-md mb-8" style={{ color: dark ? "#888" : "#666" }}>
              I build and ship systems that actually run — from serverless APIs
              to cloud infrastructure. Currently focused on DevOps, automation,
              and making things reliable at scale.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
              >
                ↓ download resume
              </a>
              <a
                href="mailto:anurinth.w@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors hover:border-orange-400"
                style={{
                  border: dark ? "0.5px solid #333" : "0.5px solid #ddd9d0",
                  color: dark ? "#ccc" : "#444"
                }}
              >
                ✉ get in touch
              </a>
            </div>

            <div className="flex gap-5">
              {[
                { label: "github", href: "https://github.com/anurinth-w" },
                { label: "linkedin", href: "https://linkedin.com/in/anurinth-w" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-orange-500 transition-colors"
                  style={{ color: dark ? "#666" : "#999" }}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-8 sm:mx-16" style={{
          borderTop: dark ? "0.5px solid #2a2a2a" : "0.5px solid #e8e4dc"
        }} />

        {/* Featured Projects */}
        <section id="projects" className="px-8 sm:px-16 py-16 max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: dark ? "#555" : "#aaa" }}>
            featured projects
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
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
                desc: "Kubernetes deployment with monitoring — Prometheus, Grafana, CI/CD pipeline",
                tags: ["K8s", "Prometheus", "Grafana"],
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
            ].map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-5 rounded-xl transition-all hover:-translate-y-0.5"
                style={{
                  border: dark ? "0.5px solid #2a2a2a" : "0.5px solid #e8e4dc",
                  backgroundColor: dark ? "#141414" : "#ffffff"
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#f97316")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = dark ? "#2a2a2a" : "#e8e4dc")}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4" style={{ backgroundColor: p.iconBg }}>
                  {p.icon}
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="shrink-0 text-xs px-2 py-0.5 rounded-full" style={{
                    backgroundColor: p.status === "Production"
                      ? (dark ? "#0a2010" : "#f0fdf4")
                      : (dark ? "#2a1a0a" : "#fff3e8"),
                    color: p.status === "Production"
                      ? (dark ? "#4ade80" : "#16a34a")
                      : (dark ? "#f09050" : "#c45610")
                  }}>
                    {p.status}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: dark ? "#666" : "#888" }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: dark ? "#222" : "#f0ede8",
                        color: dark ? "#666" : "#888"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
