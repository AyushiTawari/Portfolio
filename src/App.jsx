import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Download, Menu, X, ArrowDown, ChevronLeft, ChevronRight, Code2, Database, Bot, BrainCircuit, Workflow, Atom, Webhook } from "lucide-react";

const HERO_ROLES = ["Data Scientist", "AI Engineer"];

const stack = [
  { name: "Python", icon: "Code2" }, { name: "SQL", icon: "Database" }, { name: "AI Agents", icon: "Bot" },
  { name: "Machine Learning", icon: "BrainCircuit" }, { name: "ETL Pipelines", icon: "Workflow" },
  { name: "React", icon: "Atom" }, { name: "Rest APIs", icon: "Webhook" },
];

const helpCards = [
  { title: "Applied ML & analytics", body: "Predictive models, ETL pipelines, and forecasting — from raw data to a number a business can act on." },
  { title: "Agentic AI & RAG", body: "Multi-step AI agents and retrieval systems that reason over your data, with guardrails built in, not bolted on." },
  { title: "Backend & deployment", body: "Web frameworks, Dockerized models, and REST APIs that hold up outside a notebook." },
];

const experience = [
  {
    role: "Associate Data Scientist Technical Trainee", org: "Relanto.AI", time: "Mar 2026 – Jun 2026",
    points: [
      "Built IntelliSupply, a unified supply chain platform merging inventory and logistics into one system with role-based access for managers, couriers, inventory staff, and admins.",
      "Combined NL-to-SQL with GraphRAG and a multilingual chatbot that translates queries, retrieves from PostgreSQL and a knowledge graph, and returns answers in the user's language.",
      "Designed an agentic restocking flow with ReAct orchestration, multi-step reasoning, and human-in-the-loop clarification, allowing managers to restock inventory with a single query.",
      "Trained demand forecasting, route prediction, and ETA prediction models (XGBoost) on a large logistics dataset, and built FastAPI services with OAuth and JWT authentication.",
    ],
  },
  {
    role: "Data Analytics Intern", org: "Futurense Technologies", time: "Feb 2024 – Jun 2024",
    points: [
      "Worked on analytics capstone projects that turned raw datasets into meaningful insights and data-driven solutions for business problems.",
      "Performed ETL, exploratory data analysis, data preprocessing, and visualization on structured datasets using Python, Pandas, MySQL, Tableau, and Power BI.",
      "Built and evaluated predictive machine learning models including Linear Regression, Logistic Regression, Decision Trees, Random Forest, and XGBoost, applying feature engineering and model evaluation techniques.",
    ],
  },
];

const projects = [
  {
    name: "FinSight", img: "/finsight.webp", tag: "Agentic financial RAG system", stack: "Python · FastAPI · PostgreSQL · LangGraph",
    description: "An agentic financial RAG platform with hybrid retrieval (pgvector + full-text search + RRF) and a LangGraph execution engine that plans multi-step answers with evidence-based citations.",
    link: "https://github.com/AyushiTawari/FinSight",
  },
  {
    name: "TripPilot", img: "/trip.jpg", tag: "Agentic travel concierge", stack: "Python · Groq · SQLite · Open-Meteo",
    description: "A tool-calling travel agent built with ReAct orchestration, deterministic budget calculations, and human-in-the-loop clarification before booking decisions.",
    link: "https://github.com/AyushiTawari/TripPilot",
  },
  {
    name: "Credit Risk Prediction", img: "/credit_risk.jpg", tag: "Delinquency model, deployed", stack: "Python · XGBoost · Scikit-learn · FastAPI · Docker",
    description: "Compared Logistic Regression, Random Forest, and XGBoost to predict 90+ day delinquency, with SHAP explainability and a cost-aware threshold — deployed as a Dockerized FastAPI service.",
    link: "https://github.com/AyushiTawari/Credit_Risk_Prediction",
  },
  {
    name: "Live Crypto Dashboard", img: "/crypto.webp", tag: "Real-time analytics platform", stack: "Python · FastAPI · Redis · Streamlit · Docker",
    description: "Streams live Binance trades through Redis pub/sub into a FastAPI backend and a JS-embedded Streamlit dashboard with live KPIs, charts, and a searchable symbol table.",
    link: "https://github.com/AyushiTawari/Crypto_Dashboard",
  },
  {
    name: "AI Therapist Chatbot", img: "/therapist.jpg", tag: "Empathetic mental health assistant", stack: "Python · Flask · SQLAlchemy · Llama 3.1",
    description: "An empathetic chatbot using Llama 3.1 with long-term user memory, secure email + Google OAuth login, and persistent session-based conversation history.",
    link: "https://github.com/AyushiTawari/Therapist_Bot",
  },
  {
    name: "Multilingual AI Bot", img: "/multilingual.png", tag: "Speech-to-English pipeline", stack: "Python · FastAPI · Whisper",
    description: "A multilingual pipeline combining LLM-generated welcome messages, BLEU/ROUGE evaluation, and Whisper-powered speech-to-English translation.",
    link: "https://github.com/AyushiTawari/Multilingual_Bot",
  },
];

const education = [
  { degree: "B.Tech in Artificial Intelligence & Data Engineering", school: "Jain (Deemed-to-be University), Bangalore", time: "2022 – 2026", score: "8.7 CGPA" },
  { degree: "Higher Secondary", school: "Chinmaya Vidyalaya Vaduthala", time: "", score: "96%" },
  { degree: "Secondary School", school: "Chinmaya Vidyalaya Vaduthala", time: "", score: "97%" },
];

const hobbies = [
  { name: "Badminton", img: "/badminton.jpg", color: "#2f87c4" },
  { name: "Cooking", img: "/cooking.jpg", color: "#c2703b" },
  { name: "Dancing", img: "/dancing.jpg", color: "#a84fc7" },
  { name: "Reading", img: "/reading.jpg", color: "#3bb273" },
  { name: "Event Organizing", img: "/events.jpg", color: "#e2685a" },
];

const NAV_LINKS = ["About", "Experience", "Projects", "Education", "Hobbies", "Contact"];
const STACK_ICONS = { Code2, Database, Bot, BrainCircuit, Workflow, Atom, Webhook };

/* Cycles between roles with a blue wipe + fade. */
function useRoleCycle(words, holdMs = 3000, transitionMs = 650) {
  const [display, setDisplay] = useState(words[0]);
  const [transitioning, setTransitioning] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let holdTimeout, transitionTimeout;
    const cycle = () => {
      holdTimeout = window.setTimeout(() => {
        setTransitioning(true);
        transitionTimeout = window.setTimeout(() => {
          indexRef.current = (indexRef.current + 1) % words.length;
          setDisplay(words[indexRef.current]);
          setTransitioning(false);
          cycle();
        }, transitionMs);
      }, holdMs);
    };
    cycle();
    return () => { window.clearTimeout(holdTimeout); window.clearTimeout(transitionTimeout); };
  }, [words, holdMs, transitionMs]);

  return { display, transitioning };
}

/* Slides a whole block in once it enters view. */
function Reveal({ children, from = "left", as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.unobserve(el); } },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <Tag ref={ref} className={`reveal reveal-${from} ${shown ? "is-visible" : ""} ${className}`}>{children}</Tag>;
}

/* 3D circular carousel of flippable project cards. */
function ProjectCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(null);
  const count = items.length, step = 360 / count, radius = 340;
  const go = (dir) => { setFlipped(null); setIndex((i) => i + dir); };

  useEffect(() => {
    const onKey = (e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = ((index % count) + count) % count;
  const toggle = (i, isFlipped) => setFlipped(isFlipped ? null : i);

  return (
    <div className="carousel-block">
      <div className="carousel-stage">
        <div className="carousel-ring" style={{ transform: `translateZ(-${radius}px) rotateY(${-index * step}deg)` }}>
          {items.map((p, i) => {
            const isActive = i === active, isFlipped = flipped === i;
            return (
              <div key={p.name} className={`carousel-slot ${isActive ? "active" : ""}`}
                style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}>
                <div className={`flip-card ${isFlipped ? "flipped" : ""}`} role="button" tabIndex={isActive ? 0 : -1}
                  aria-label={`${p.name}, click to show details`}
                  onClick={() => isActive && toggle(i, isFlipped)}
                  onKeyDown={(e) => { if (isActive && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(i, isFlipped); } }}>
                  <div className="flip-face flip-front">
                    <img className="card-img-bg" src={p.img} alt="" />
                    <div className="card-img-overlay" />
                    <span className="card-index">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{p.name}</h3>
                    <p className="card-tag">{p.tag}</p>
                    <span className="card-hint">Click to open</span>
                  </div>
                  <div className="flip-face flip-back">
                    <p className="card-stack">{p.stack}</p>
                    <p className="card-desc">{p.description}</p>
                    <a className="card-link" href={p.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                      View on GitHub <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={() => go(-1)} aria-label="Previous project"><ChevronLeft size={20} /></button>
        <span className="carousel-count">{String(active + 1).padStart(2, "0")} <i>/</i> {String(count).padStart(2, "0")}</span>
        <button onClick={() => go(1)} aria-label="Next project"><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

/* Vertical timeline — one role below the other. */
function ExperienceTimeline({ items }) {
  return (
    <div className="timeline">
      {items.map((e, i) => (
        <div className="timeline-item" key={e.org}>
          <div className="timeline-num">{i + 1}</div>
          <div className="timeline-head"><h3>{e.role}</h3><span className="timeline-time">{e.time}</span></div>
          <div className="timeline-org">{e.org}</div>
          <ul>{e.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

function HobbiesMarquee({ items }) {
  const looped = [...items, ...items];
  return (
    <div className="hobby-marquee-wrap">
      <div className="hobby-marquee-track">
        {looped.map((h, i) => (
          <div className="hobby-box" key={i} style={{ backgroundImage: `url(${h.img})` }}>
            <div className="hobby-overlay" />
            <span className="hobby-name">{h.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const roleCycle = useRoleCycle(HERO_ROLES, 3000, 650);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100);
      setNavSolid(h.scrollTop > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page">
      <video autoPlay muted loop playsInline className="bg-video"><source src="/video2.mp4" type="video/mp4" /></video>
      <div className="bg-video-overlay" />
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=Caveat:wght@600;700&display=swap');
:root {
  --bg: #061523; --bg-deep: #030d17; --bg-elevated: #0d2338; --ocean: #14497a; --blue: #2f87c4;
  --ice: #6fc9f2; --ice-soft: #a8e2fb; --text: #e6f3fb; --muted: #8bb0c9;
  --line: rgba(230, 243, 251, 0.14); --line-strong: rgba(230, 243, 251, 0.26);
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
.page { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; line-height: 1.6; min-height: 100vh; overflow-x: hidden; position: relative; }
.page h1, .page h2, .page h3 { font-family: 'Fraunces', serif; font-weight: 500; margin: 0; }
.bg-video { position: fixed; inset: 0; width: 100%; height: 100%; transform: scale(1.06);object-fit: cover; z-index: 0; opacity: 0.85; }
.bg-video-overlay { position: fixed; inset: 0; z-index: 0; background: linear-gradient(180deg, rgba(6, 21, 35, 0.28), rgba(3, 13, 23, 0.45)); pointer-events: none; }
.wrap { max-width: 1080px; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
#about, #experience, #projects{ scroll-margin-top: 70px; }
#education, #hobbies, #contact  { scroll-margin-top: 40px; } 
a { color: inherit; }

.orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
.orb-1 { width: 560px; height: 560px; background: radial-gradient(circle, rgba(20, 73, 122, 0.7), transparent 70%); top: -140px; right: -120px; animation: drift1 26s ease-in-out infinite alternate; }
.orb-2 { width: 460px; height: 460px; background: radial-gradient(circle, rgba(47, 135, 196, 0.32), transparent 70%); bottom: -160px; left: -130px; animation: drift2 32s ease-in-out infinite alternate; }
@keyframes drift1 { to { transform: translate(-70px, 90px) scale(1.15); } }
@keyframes drift2 { to { transform: translate(80px, -70px) scale(1.12); } }
.progress { position: fixed; top: 0; left: 0; height: 2px; background: linear-gradient(90deg, var(--ocean), var(--ice)); z-index: 60; transition: width 0.1s linear; }

.icon-link { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: 1px solid var(--line); border-radius: 50%; color: var(--muted); transition: color 0.25s var(--ease), border-color 0.25s var(--ease), transform 0.25s var(--ease); }
.icon-link:hover { color: var(--ice); border-color: var(--ice); transform: translateY(-2px); }

nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(6, 21, 35, 0.84); backdrop-filter: blur(10px); border-bottom: 1px solid transparent; opacity: 0; transform: translateY(-100%); transition: opacity 0.5s var(--ease), transform 0.5s var(--ease), border-color 0.5s var(--ease); pointer-events: none; }
nav.solid { opacity: 1; transform: translateY(0); border-bottom-color: var(--line); pointer-events: auto; }
.nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; }
.nav-name { font-family: 'Fraunces', serif; font-size: 26px; }
.nav-links { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
.nav-links button { background: none; border: none; color: var(--muted); font-family: 'Inter', sans-serif; font-size: 15px; cursor: pointer; padding: 4px 0; position: relative; transition: color 0.25s var(--ease); }
.nav-links button::after { content: ""; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px; background: var(--ice); transform: scaleX(0); transform-origin: left; transition: transform 0.35s var(--ease); }
.nav-links button:hover { color: var(--text); }
.nav-links button:hover::after { transform: scaleX(1); }
.nav-right { display: flex; align-items: center; gap: 12px; }
.nav-resume-btn { padding: 8px 16px; font-size: 14px; }
.nav-toggle { display: none; background: none; border: none; color: var(--text); cursor: pointer; }
.nav-mobile-panel { display: none; }

/* HERO */
.hero { min-height: 100vh; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; position: relative; }
.hero-stack { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; text-align: left; margin-left: 6%; }
.hero-name-reveal { position: relative; display: inline-block; overflow: visible; margin: 0; padding: 0; line-height: 1.1; }
.hero-name {
  display: inline-block; font-family: 'Fraunces', serif; font-size: clamp(38px, 5.5vw, 64px); line-height: 1.1;
  padding: 0.05em 0.12em 0.24em 0.06em; /* room so gradient text isn't clipped on descenders (y, comma) */
  background: linear-gradient(120deg, var(--ice), var(--ice-soft), var(--blue));
  -webkit-background-clip: text; background-clip: text; color: transparent;
  opacity: 0; transform: translateX(-30px); animation: nameTextIn 0.8s var(--ease) 0.55s forwards;
}
.hero-name-prefix { font-size: 0.72em; white-space: nowrap; }
.hero-name-bar { position: absolute; z-index: 3; left: -30%; top: 0; width: 28%; height: 100%; background: linear-gradient(90deg, var(--blue), var(--ice)); transform: skewX(-16deg); animation: nameBarIn 1s var(--ease) 0.35s forwards; pointer-events: none; }
@keyframes nameTextIn { to { opacity: 1; transform: translateX(0); } }
@keyframes nameBarIn {
  0% { left: -30%; width: 28%; opacity: 1; }
  35% { width: 35%; }
  85% { opacity: 1; }
  100% { left: 115%; width: 28%; opacity: 0; } /* fades out so the box doesn't linger */
}

.hero-tagline-row { display: flex; align-items: center; justify-content: flex-start; gap: 14px; opacity: 0; animation: heroFade 0.8s var(--ease) 0.9s forwards; }
.tagline-divider { width: 1px; height: 26px; background: var(--line-strong); opacity: 0.7; }
.hero-role { position: relative; display: inline-flex; align-items: center; min-width: 280px; min-height: 38px; overflow: hidden; color: var(--ice); font-size: 17px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; text-align: left; }
.hero-role-text { position: relative; z-index: 2; display: inline-block; transition: opacity 0.3s ease, transform 0.3s ease; }
.hero-role.is-changing .hero-role-text { opacity: 0; transform: translateX(-18px); }
.hero-role-wipe { position: absolute; z-index: 3; left: -110%; top: -10%; width: 110%; height: 120%; background: linear-gradient(90deg, transparent 0%, var(--blue) 18%, var(--ice) 50%, var(--blue) 82%, transparent 100%); opacity: 0; transform: skewX(-15deg); pointer-events: none; }
.hero-role.is-changing .hero-role-wipe { animation: roleWipe 0.65s var(--ease) forwards; }
@keyframes roleWipe {
  0% { left: -110%; opacity: 0; }
  18% { opacity: 1; }
  50% { left: 0%; opacity: 1; }
  82% { opacity: 1; }
  100% { left: 110%; opacity: 0; }
}
@keyframes heroFade { to { opacity: 1; } }

.scroll-cue { position: absolute; bottom: 42px; display: flex; align-items: center; gap: 10px; color: var(--muted); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0; animation: heroFade 0.8s var(--ease) 1.5s forwards; }
.scroll-cue svg { animation: bob 2s ease-in-out infinite; }
@keyframes bob { 0%, 100% { transform: translateY(0); opacity: 0.6; } 50% { transform: translateY(6px); opacity: 1; } }

.reveal { opacity: 0; transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); will-change: opacity, transform; }
.reveal-left { transform: translateX(-70px); }
.reveal-right { transform: translateX(70px); }
.reveal-up { transform: translateY(36px); }
.reveal.is-visible { opacity: 1; transform: none; }

.stack-strip { border-top: 1px solid var(--line-strong); border-bottom: 1px solid var(--line-strong); padding: 32px 0; position: relative; z-index: 1; }
.stack-track { display: flex; gap: 56px; justify-content: center; flex-wrap: wrap; }
.stack-track span { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 15px; letter-spacing: 0.02em; transition: color 0.25s var(--ease), transform 0.25s var(--ease); cursor: default; }
.stack-track span:hover { color: var(--ice); transform: translateY(-3px); }

#about { padding-bottom: 160px; }
section { min-height: 100vh; padding: 100px 0; display: flex; flex-direction: column; justify-content: center; }
.section-head { margin-bottom: 48px; max-width: 60ch; }
.section-head h2 { font-size: clamp(30px, 4vw, 40px); margin-bottom: 14px; display: inline-block; position: relative; }
.section-head h2::after { content: ""; position: absolute; left: 0; bottom: -8px; width: 100%; height: 1px; background: linear-gradient(90deg, var(--ice), transparent); }

/* ABOUT */
.about-layout { display: flex; flex-direction: column; gap: 54px; }
.about-body { max-width: 1000px; }
.about-body h2 { font-size: clamp(30px, 4vw, 40px); margin-bottom: 22px; }
.about-body p { color: var(--muted); font-size: 16.5px; margin: 0 0 16px; max-width: 72ch; }
.about-body > p:first-of-type { max-width: 1000px; }
.about-body p:last-child { margin-bottom: 0; }
.about-quote { font-family: 'Caveat', cursive; font-weight: 700; color: var(--ice-soft); font-size: clamp(28px, 2.2vw, 38px) !important; line-height: 1.2; margin: 32px 0 0; padding-top: 22px; border-top: 1px solid var(--line); max-width: 100%; }
.help-cards-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.help-card { border: 1px solid var(--line-strong); border-radius: 12px; padding: 28px 30px; min-height: 190px; transition: transform 0.3s var(--ease), border-color 0.3s var(--ease), background 0.3s var(--ease); }
.help-card:hover { transform: translateY(-5px); border-color: var(--ice); background: rgba(13, 35, 56, 0.3); }
.help-card h3 { font-size: 19px; margin-bottom: 10px; color: var(--ice); }
.help-card p { color: var(--muted); font-size: 15.5px; margin: 0; }

/* EXPERIENCE */
.timeline { position: relative; padding-left: 48px; }
.timeline::before { content: ""; position: absolute; left: 15px; top: 6px; bottom: 6px; width: 1px; background: linear-gradient(180deg, var(--ice), var(--line), transparent); }
.timeline-item { position: relative; margin-bottom: 56px; }
.timeline-item:last-child { margin-bottom: 0; }
.timeline-num { position: absolute; left: -48px; top: 0; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--blue); color: var(--ice); font-family: 'Fraunces', serif; font-size: 14px; display: flex; align-items: center; justify-content: center; background: var(--bg); box-shadow: 0 0 0 6px var(--bg), 0 0 20px rgba(111, 201, 242, 0.3); }
.timeline-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px 20px; margin-bottom: 6px; }
.timeline-head h3 { font-size: 20px; }
.timeline-org { color: var(--ice); font-size: 15px; margin-bottom: 12px; }
.timeline-time { color: var(--muted); font-size: 14px; white-space: nowrap; }
.timeline-item ul { margin: 0; padding-left: 18px; color: var(--muted); font-size: 15px; }
.timeline-item li { margin-bottom: 8px; }
.timeline-item li::marker { color: var(--blue); }

/* PROJECTS */
#projects .section-head { margin-bottom: 60px; }
.carousel-block { margin-bottom: 20px; position: relative; }
.carousel-stage { position: relative; height: 400px; perspective: 1400px; perspective-origin: 50% 50%; overflow: hidden; }
.carousel-ring { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 0.9s var(--ease); }
.carousel-slot { position: absolute; top: 50%; left: 50%; width: 330px; height: 330px; margin: -165px 0 0 -165px; transform-style: preserve-3d; }
.flip-card { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.75s var(--ease), opacity 0.6s var(--ease); cursor: default; opacity: 0.35; filter: blur(1px); }
.carousel-slot.active .flip-card { opacity: 1; filter: none; cursor: pointer; }
.flip-card.flipped { transform: rotateY(180deg); }
.flip-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border: 1px solid var(--line-strong); border-radius: 10px; padding: 30px; display: flex; flex-direction: column; background: linear-gradient(155deg, var(--bg-elevated), var(--bg-deep)); box-shadow: 0 20px 50px rgba(3, 13, 23, 0.6); }
.carousel-slot.active .flip-face { border-color: rgba(111, 201, 242, 0.45); box-shadow: 0 24px 60px rgba(3, 13, 23, 0.7), 0 0 40px rgba(47, 135, 196, 0.18); }
.flip-front { justify-content: center; align-items: flex-start; }
.card-img-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0.6; }
.card-img-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(13, 35, 56, 0.15), var(--bg-elevated) 90%); z-index: 0; }
.card-index, .flip-front h3, .flip-front .card-tag, .flip-front .card-hint { position: relative; z-index: 1; }
.card-index { font-family: 'Fraunces', serif; font-size: 13px; color: var(--blue); letter-spacing: 0.1em; margin-bottom: 14px; }
.flip-front h3 { font-size: 27px; line-height: 1.15; margin-bottom: 10px; }
.card-tag { color: var(--ice); font-size: 14px; margin: 0; }
.card-hint { margin-top: auto; color: var(--muted); font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase; }
.flip-back { transform: rotateY(180deg); justify-content: flex-start; }
.card-stack { color: var(--ice); font-size: 12.5px; margin: 0 0 14px; letter-spacing: 0.02em; }
.card-desc { color: var(--muted); font-size: 14.5px; margin: 0; overflow-y: auto; }
.card-link { margin-top: auto; padding-top: 16px; display: inline-flex; align-items: center; gap: 7px; color: var(--ice); font-size: 14px; text-decoration: none; transition: gap 0.25s var(--ease); }
.card-link:hover { gap: 12px; }
.carousel-controls { display: flex; align-items: center; justify-content: center; gap: 26px; margin-top: 36px; }
.carousel-controls button { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--line-strong); background: none; color: var(--muted); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: color 0.25s var(--ease), border-color 0.25s var(--ease), transform 0.25s var(--ease); }
.carousel-controls button:hover { color: var(--ice); border-color: var(--ice); transform: scale(1.08); }
.carousel-count { font-family: 'Fraunces', serif; font-size: 15px; color: var(--muted); min-width: 72px; text-align: center; }
.carousel-count i { color: var(--blue); font-style: normal; margin: 0 2px; }

/* EDUCATION */
.edu-item { border-top: 1px solid var(--line); padding: 26px 0; display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px 20px; transition: padding-left 0.35s var(--ease); }
.edu-item:first-child { border-top: none; padding-top: 0; }
.edu-item:hover { padding-left: 12px; }
.edu-item h3 { font-size: 18px; margin-bottom: 4px; }
.edu-item p { color: var(--muted); font-size: 14.5px; margin: 0; }
.edu-score { color: var(--ice); font-family: 'Fraunces', serif; font-size: 22px; white-space: nowrap; }

/* HOBBIES */
.hobby-marquee-wrap { overflow: hidden; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; }
.hobby-marquee-track { display: flex; gap: 48px; width: max-content; animation: hobbyScroll 30s linear infinite; }
.hobby-marquee-wrap:hover .hobby-marquee-track { animation-play-state: paused; }
@keyframes hobbyScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.hobby-box { position: relative; width: 300px; height: 360px; border-radius: 16px; overflow: hidden; background-size: cover; background-position: center; flex-shrink: 0; border: 1px solid var(--line-strong); }
.hobby-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(3, 13, 23, 0.85) 100%); }
.hobby-name { position: absolute; left: 20px; bottom: 18px; font-family: 'Fraunces', serif; font-size: 22px; color: var(--text); z-index: 2; }

/* CONTACT + FOOTER */
.contact { text-align: center; max-width: 660px; margin: 0 auto; }
.contact h2 { font-size: clamp(34px, 5vw, 48px); margin-bottom: 18px; }
.contact p { color: var(--muted); font-size: 16.5px; margin: 0 auto 36px; max-width: 46ch; }
.contact-links { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 22px; border-radius: 3px; font-size: 15px; font-weight: 500; text-decoration: none; cursor: pointer; border: 1px solid transparent; transition: transform 0.25s var(--ease), background 0.25s var(--ease), border-color 0.25s var(--ease); }
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--blue); color: #04121f; font-weight: 600; }
.btn-primary:hover { background: var(--ice); }
.btn-ghost { border-color: var(--line); color: var(--text); background: none; }
.btn-ghost:hover { border-color: var(--ice); }
footer { border-top: 1px solid var(--line); padding: 28px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; position: relative; z-index: 1; }
footer p { color: var(--muted); font-size: 13.5px; margin: 0; }
.footer-icons { display: flex; gap: 10px; }
.monica-note { margin: 20px auto 0; max-width: 750px; text-align: center; font-size: 1.00rem; line-height: 1.6; opacity: 0.75; font-style: italic;}
@media (prefers-reduced-motion: reduce) {
  .reveal, .scroll-cue, .hero-tagline-row, .hero-name { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
  .hero-name-bar { display: none; }
}

@media (max-width: 760px) {
  .nav-links { display: none; }
  .nav-toggle { display: inline-flex; }
  .nav-mobile-panel.open { display: flex; flex-direction: column; padding: 8px 0 20px; border-top: 1px solid var(--line); }
  .nav-mobile-panel button { background: none; border: none; color: var(--muted); text-align: left; padding: 10px 0; font-size: 16px; }
  .hero-stack { margin-left: 0; }
  .hero-role { min-width: 220px; font-size: 14px; letter-spacing: 0.1em; }
  .hero-tagline-row { gap: 10px; }
  .about-layout { gap: 40px; }
  .about-body, .about-body > p:first-of-type { max-width: 100%; }
  .help-cards-grid { grid-template-columns: 1fr; }
  .about-quote { font-size: clamp(30px, 8vw, 42px) !important; }
  section { padding: 80px 0; }
  #about { padding-bottom: 90px; }
  .scroll-cue { display: none; }
  .reveal-left, .reveal-right { transform: translateY(30px); }
  .carousel-stage { height: 360px; perspective: 900px; }
  .carousel-slot { width: 270px; height: 300px; margin: -150px 0 0 -135px; }
  .flip-face { padding: 24px; }
  .flip-front h3 { font-size: 23px; }
  .hobby-box { width: 220px; height: 280px; }
}
`}</style>

      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <nav className={navSolid ? "solid" : ""}>
        <div className="wrap nav-inner">
          <span className="nav-name">Ayushi Tawari</span>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => <li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>)}
          </ul>
          <div className="nav-right">
            <a className="btn btn-primary nav-resume-btn" href="/resume.pdf" target="_blank" rel="noreferrer">Resume <Download size={14} /></a>
            <a className="icon-link" href="https://github.com/AyushiTawari" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
            <a className="icon-link" href="https://www.linkedin.com/in/ayushi-tawari-26186a2b9/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <div className={`wrap nav-mobile-panel ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((l) => <button key={l} onClick={() => scrollTo(l)}>{l}</button>)}
        </div>
      </nav>

      {/* HERO */}
      <header className="wrap hero">
        <div className="hero-stack">
          <h1 className="hero-name-reveal">
            <span className="hero-name">
              <span className="hero-name-prefix">Hey, I'm</span> <span className="hero-name-main">Ayushi Tawari</span>
            </span>
            <span className="hero-name-bar" aria-hidden="true" />
          </h1>
          <div className="hero-tagline-row">
            <span className="tagline-divider" />
            <span className={`hero-role ${roleCycle.transitioning ? "is-changing" : ""}`}>
              <span className="hero-role-wipe" aria-hidden="true" />
              <span className="hero-role-text">{roleCycle.display}</span>
            </span>
          </div>
        </div>
        <div className="scroll-cue">Scroll <ArrowDown size={16} /></div>
      </header>

      {/* STACK */}
      <Reveal from="up" className="stack-strip">
        <div className="wrap stack-track">
          {stack.map((s) => {
            const Icon = STACK_ICONS[s.icon];
            return <span key={s.name} className="stack-pill"><Icon size={16} /> {s.name}</span>;
          })}
        </div>
      </Reveal>

      {/* ABOUT */}
      <section id="about" className="wrap">
        <div className="about-layout">
          <Reveal from="left" className="about-body">
            <h2>About me</h2>
            <p>
              I'm a B.Tech graduate in Artificial Intelligence &amp; Data Engineering with
              hands-on experience across machine learning, agentic AI, and backend
              development. 
              <br/>
              <br/>I'm a positive and curious person who enjoys building
              things, exploring new ideas, and turning problems into practical
              solutions.
            </p>
            <p className="about-quote">My goal is simple: turn complex problems into reliable, useful products.</p>
          </Reveal>
          <Reveal from="up" className="help-cards-grid">
            {helpCards.map((c) => (
              <div className="help-card" key={c.title}><h3>{c.title}</h3><p>{c.body}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="wrap">
        <Reveal from="left" className="section-head"><h2>Work experience</h2></Reveal>
        <Reveal from="left"><ExperienceTimeline items={experience} /></Reveal>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="wrap">
        <Reveal from="left" className="section-head"><h2>Projects</h2></Reveal>
        <Reveal from="up"><ProjectCarousel items={projects} /></Reveal>
      </section>

      {/* EDUCATION */}
      <section id="education" className="wrap">
        <Reveal from="left" className="section-head"><h2>Education</h2></Reveal>
        <Reveal from="left">
          {education.map((e) => (
            <div className="edu-item" key={e.degree}>
              <div><h3>{e.degree}</h3><p>{e.school}{e.time ? ` · ${e.time}` : ""}</p></div>
              <div className="edu-score">{e.score}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* HOBBIES */}
      <section id="hobbies" className="wrap">
        <Reveal from="left" className="section-head"><h2>Hobbies</h2></Reveal>
        <Reveal from="up"><HobbiesMarquee items={hobbies} /></Reveal>
        <p className="monica-note">
          “A little Monica at heart — I like things organized, plans thought through,
          and somehow still end up enjoying the chaos.”
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="wrap">
        <Reveal from="up" className="contact">
          <h2>Let's work together.</h2>
          <p>Open to data scientist and applied AI/ML roles. I usually reply within a day.</p>
          <div className="contact-links">
            <a className="btn btn-primary" href="mailto:ayushitawari03@gmail.com"><Mail size={16} /> ayushitawari03@gmail.com</a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/ayushi-tawari-26186a2b9/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            <a className="btn btn-ghost" href="https://github.com/AyushiTawari" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="wrap">
        <p>© {new Date().getFullYear()} Ayushi Tawari</p>
        <div className="footer-icons">
          <a className="icon-link" href="https://github.com/AyushiTawari" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /></a>
          <a className="icon-link" href="https://www.linkedin.com/in/ayushi-tawari-26186a2b9/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a>
          <a className="icon-link" href="mailto:ayushitawari03@gmail.com" aria-label="Email"><Mail size={15} /></a>
        </div>
      </footer>
    </div>
  );
}