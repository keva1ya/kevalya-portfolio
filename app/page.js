"use client";

import { useState, useEffect, useRef } from "react";

const data = {
  name: "Kevalya Khandelwal",
  tagline: "Full Stack Developer · UI/UX Enthusiast · Tech Manager",
  bio: "2nd Year B.Tech CSE student specializing in Graphics & Gaming at UPES Dehradun. I integrate technical depth in backend & frontend development with a designer's eye and a manager's mindset creating a unique blend of functionality and aesthetics.",
  email: "kevwal8192@gmail.com",
  linkedin: "https://www.linkedin.com/in/kevalyakhandelwal-3895253a9",
  github: "https://github.com/keva1ya",
  education: [
    { school: "UPES Dehradun", degree: "B.Tech CSE – Graphics & Gaming", year: "2024 – Present", note: "2nd Year" },
    { school: "Guru Siddharth International School, Beawar", degree: "Class XI & XII", year: "2022 – 2024", note: "" },
    { school: "St. Paul's Sr. Sec. School, Beawar", degree: "Up to Class X", year: "2010 – 2022", note: "" },
  ],
  experience: [
    { role: "Management Intern", org: "Kapil India Pharmaceuticals", desc: "Assisted in daily operations, inventory management and in coordination between departments for smooth and efficient workflow.", type: "Professional" },
    { role: "Management Intern", org: "Kapil Diagnostic Centre", desc: "Oversight in operational and administrative management, patient flow coordination, conflict resolution amongst the employees, and process optimization.", type: "Professional" },
    { role: "Social Intern", org: "Bharat Vikas Parishad (NGO)", desc: "Participated in community outreach programs, social welfare initiatives, and organizational events.", type: "Social" },
  ],
  skillGroups: [
    { label: "Languages", skills: ["C / C++", "Python", "Java", "SQL"] },
    { label: "Design", skills: ["UI / UX"] },
    { label: "Management", skills: ["HR Management", "Product Management"] },
  ],
  certificates: [
    { name: "Code with Moana", issuer: "Disney / Infinity Creative", link: "https://drive.google.com/file/d/18lFaB0zAYmjMzeS5XuQ3aZFOYvYPIDFw/view?usp=sharing" },
    { name: "Product Management", issuer: "Online Course", link: "https://drive.google.com/file/d/1wUTdVDdu7hq-Vq5a1bSdjKi4erWYuZ4O/view?usp=sharing" },
  ],
  hobbies: [
    { label: "Reading", icon: "📖" }, { label: "Writing", icon: "✍️" }, { label: "Gaming", icon: "🎮" },
    { label: "Design", icon: "🎨" }, { label: "Basketball", icon: "🏀" }, { label: "Cinema", icon: "🎬" },
  ],
};

const NAV = ["Home", "Education", "Experience", "Skills", "Certificates", "Hobbies", "Contact"];
const TYPEWRITER_WORDS = ["Full Stack Developer", "UI/UX Enthusiast", "Tech Manager", "Problem Solver"];

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [dark, setDark] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [easterEgg2, setEasterEgg2] = useState(false);
  const [typeText, setTypeText] = useState("");
  const [typeWordIdx, setTypeWordIdx] = useState(0);
  const [typeCharIdx, setTypeCharIdx] = useState(0);
  const [typeDeleting, setTypeDeleting] = useState(false);
  const easterBuffer = useRef("");
  const footerTapCount = useRef(0);
  const footerTapTimer = useRef(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("darkMode", String(dark));
  }, [dark]);

  useEffect(() => {
    const word = TYPEWRITER_WORDS[typeWordIdx];
    let timeout;
    if (!typeDeleting) {
      if (typeCharIdx < word.length) {
        timeout = setTimeout(() => { setTypeText(word.slice(0, typeCharIdx + 1)); setTypeCharIdx(c => c + 1); }, 80);
      } else {
        timeout = setTimeout(() => setTypeDeleting(true), 1800);
      }
    } else {
      if (typeCharIdx > 0) {
        timeout = setTimeout(() => { setTypeText(word.slice(0, typeCharIdx - 1)); setTypeCharIdx(c => c - 1); }, 45);
      } else {
        setTypeDeleting(false);
        setTypeWordIdx(i => (i + 1) % TYPEWRITER_WORDS.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [typeCharIdx, typeDeleting, typeWordIdx]);

  useEffect(() => {
    const secret = "kadva sach";
    const onKey = (e) => {
      easterBuffer.current = (easterBuffer.current + e.key).slice(-secret.length);
      if (easterBuffer.current === secret) setEasterEgg(true);
    };
    window.addEventListener("keypress", onKey);
    return () => window.removeEventListener("keypress", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 40); setShowTop(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const onEnter = () => setCursorHover(true);
    const onLeave = () => setCursorHover(false);
    window.addEventListener("mousemove", onMove);
    const interactives = document.querySelectorAll("a, button, .cert-card, .skill-pill, .hobby-pill, .exp-card");
    interactives.forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.section); }); },
      { threshold: 0.4 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => { sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const handleFooterTap = () => {
    footerTapCount.current += 1;
    clearTimeout(footerTapTimer.current);
    if (footerTapCount.current >= 5) { setEasterEgg2(true); footerTapCount.current = 0; }
    else { footerTapTimer.current = setTimeout(() => { footerTapCount.current = 0; }, 2000); }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const res = await fetch("https://formspree.io/f/xaqdpope", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
    if (res.ok) setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Cabinet+Grotesk:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream: #F4F3F8;
          --white: #F4F3F8;
          --ink: #1E1B2E;
          --ink-light: #5C5470;
          --accent: #7C83C8;
          --accent2: #B07B9E;
          --sage: #C4A0B5;
          --border: #DDD9EC;
          --card: #FFFFFF;
          --shadow: 0 4px 24px rgba(30,27,46,0.08);
          --shadow-lg: 0 12px 48px rgba(30,27,46,0.14);
          --accent-soft: rgba(124,131,200,0.10);
        }

        html.dark {
          --cream: #13111E;
          --white: #1C1929;
          --ink: #E8E6F0;
          --ink-light: #9D97B8;
          --accent: #9099D8;
          --accent2: #C08FAE;
          --sage: #B090A5;
          --border: #2E2A42;
          --card: #1C1929;
          --shadow: 0 4px 24px rgba(0,0,0,0.25);
          --shadow-lg: 0 12px 48px rgba(0,0,0,0.4);
          --accent-soft: rgba(144,153,216,0.10);
        }

        html { scroll-behavior: smooth; }
        body {
          font-family: 'Cabinet Grotesk', sans-serif;
          background: var(--cream); color: var(--ink);
          line-height: 1.75; overflow-x: hidden;
          transition: background 0.4s ease, color 0.4s ease;
        }
        body::before {
          content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(124,131,200,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(176,123,158,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 35% at 60% 10%, rgba(196,160,181,0.12) 0%, transparent 70%);
        }
        body::after {
          content: ''; position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.45;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px 180px; mix-blend-mode: multiply;
        }
        nav, section, footer, .mobile-menu { position: relative; z-index: 2; }

        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2.5rem; display: flex; align-items: center; justify-content: space-between;
          height: 62px; transition: all 0.3s; background: transparent;
        }
        nav.scrolled {
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 24px rgba(30,27,46,0.07);
        }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 900; color: var(--ink); cursor: pointer; letter-spacing: -0.5px; }
        .nav-logo .dot { color: var(--accent); }
        .nav-links { display: flex; gap: 0; list-style: none; }
        .nav-links button {
          background: none; border: none; outline: none; cursor: pointer;
          font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.82rem; font-weight: 500;
          color: var(--ink-light); padding: 0.4rem 0.9rem;
          transition: color 0.2s; position: relative;
        }
        .nav-links button:focus { outline: none; }
        .nav-links button::after {
          content: ''; position: absolute; bottom: 2px; left: 50%; right: 50%;
          height: 1.5px; background: var(--accent);
          transition: left 0.25s cubic-bezier(0.4,0,0.2,1), right 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-links button:hover { color: var(--ink); }
        .nav-links button.active { color: var(--ink); }
        .nav-links button.active::after, .nav-links button:hover::after { left: 0.9rem; right: 0.9rem; }
        .nav-right { display: flex; align-items: center; gap: 0.5rem; }
        .dark-toggle {
          background: none; border: none; outline: none; cursor: pointer;
          color: var(--ink-light); display: flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 50px;
          font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.8rem; transition: all 0.2s;
        }
        .dark-toggle:focus { outline: none; }
        .dark-toggle:hover { color: var(--ink); background: var(--accent-soft); }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--ink); border-radius: 2px; transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          position: fixed; top: 62px; left: 0; right: 0;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          flex-direction: column; padding: 0.5rem 1rem 1.5rem;
          box-shadow: var(--shadow-lg); z-index: 99;
          transform: translateY(-110%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          opacity: 0; display: flex;
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; }
        .mobile-menu button { background: none; border: none; cursor: pointer; font-family: 'Cabinet Grotesk', sans-serif; font-size: 1rem; font-weight: 500; color: var(--ink); padding: 0.9rem 1rem; text-align: left; border-radius: 8px; transition: 0.2s; border-bottom: 1px solid var(--border); }
        .mobile-menu button:last-child { border-bottom: none; }
        .mobile-menu button:hover { background: var(--accent-soft); color: var(--accent); padding-left: 1.4rem; }

        section { min-height: 100vh; padding: 130px 2.5rem 80px; max-width: 1140px; margin: 0 auto; }

        .hero { display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding-top: 62px; position: relative; overflow: hidden; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 1.8rem; animation: fadeUp 0.5s ease both; }
        .hero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s ease-in-out infinite; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(4.5rem, 12vw, 9.5rem); font-weight: 900; line-height: 0.92; letter-spacing: -3px; color: var(--ink); animation: fadeUp 0.6s 0.1s ease both; }
        .hero h1 .first { display: block; }
        .hero h1 .last { display: block; -webkit-text-stroke: 1.5px var(--ink); color: transparent; }
        html.dark .hero h1 .last { -webkit-text-stroke: 1.5px var(--ink); }
        .hero-typewriter { margin-top: 2rem; font-family: 'JetBrains Mono', monospace; font-size: clamp(0.82rem, 1.6vw, 0.95rem); color: var(--ink-light); letter-spacing: 0.5px; animation: fadeUp 0.6s 0.2s ease both; min-height: 1.5em; }
        .typewriter-cursor { display: inline-block; width: 2px; height: 1em; background: var(--accent); vertical-align: text-bottom; animation: blink 1s step-end infinite; margin-left: 2px; }
        .hero-sub { margin-top: 1.5rem; max-width: 460px; font-size: 0.93rem; color: var(--ink-light); line-height: 1.85; animation: fadeUp 0.6s 0.3s ease both; }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2.5rem; animation: fadeUp 0.6s 0.4s ease both; }
        .btn-primary { background: var(--accent); color: white; border: none; padding: 0.88rem 2.2rem; border-radius: 40px; font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(124,131,200,0.35); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,131,200,0.45); }
        .btn-primary:active { transform: scale(0.97); }
        .btn-outline { background: transparent; color: var(--ink); border: 1.5px solid var(--border); padding: 0.88rem 2.2rem; border-radius: 40px; font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); background: var(--accent-soft); }
        .btn-outline:active { transform: scale(0.97); }
        .social-row { display: flex; gap: 1rem; margin-top: 3rem; animation: fadeUp 0.6s 0.5s ease both; }
        .social-link { display: flex; align-items: center; gap: 8px; color: var(--ink-light); text-decoration: none; font-size: 0.82rem; font-weight: 500; padding: 7px 14px; border: 1px solid var(--border); border-radius: 20px; transition: all 0.2s; }
        .social-link:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }
        .hero-scroll { position: absolute; bottom: 2rem; left: 0; display: flex; align-items: center; gap: 12px; color: var(--ink-light); font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; animation: fadeUp 0.6s 0.6s ease both; }
        .scroll-line { width: 40px; height: 1px; background: var(--accent); }
        .hero-number { position: absolute; right: -1rem; top: 50%; transform: translateY(-55%); font-family: 'Playfair Display', serif; font-size: clamp(14rem, 25vw, 22rem); font-weight: 900; line-height: 1; color: transparent; -webkit-text-stroke: 1px var(--border); user-select: none; pointer-events: none; opacity: 0.6; animation: fadeUp 0.8s 0.2s ease both; }
        .hero-visual { position: absolute; right: 5%; top: 50%; transform: translateY(-50%); width: min(360px, 36vw); height: min(360px, 36vw); pointer-events: none; z-index: -1; }
        .hero-ring { position: absolute; border-radius: 50%; animation: rotateRing 18s linear infinite; }
        .hero-ring:nth-child(1) { inset: 0; border: 1px solid rgba(124,131,200,0.25); animation-duration: 22s; }
        .hero-ring:nth-child(2) { inset: 12%; border: 1px solid rgba(176,123,158,0.2); animation-direction: reverse; animation-duration: 16s; }
        .hero-ring:nth-child(3) { inset: 26%; border: 1px solid rgba(124,131,200,0.3); animation-duration: 12s; }
        .hero-ring-dot { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .hero-ring-dot-circle { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px rgba(124,131,200,0.6); }
        .hero-ring:nth-child(2) .hero-ring-dot-circle { background: var(--accent2); box-shadow: 0 0 10px rgba(176,123,158,0.6); }
        .hero-ring-label { font-family: 'JetBrains Mono', monospace; font-size: clamp(0.45rem, 1vw, 0.62rem); color: var(--accent); font-weight: 500; letter-spacing: 1px; white-space: nowrap; background: var(--cream); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); transition: background 0.3s, border 0.3s; }
        .hero-ring:nth-child(2) .hero-ring-label { color: var(--accent2); }
        .hero-center { position: absolute; inset: 36%; border-radius: 50%; background: radial-gradient(circle, rgba(124,131,200,0.15), rgba(176,123,158,0.08)); border: 1px solid rgba(124,131,200,0.2); display: flex; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; font-size: clamp(0.5rem, 1.5vw, 0.8rem); color: var(--accent); opacity: 0.7; letter-spacing: 1px; }

        .section-overline { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 10px; }
        .section-overline::before { content: '—'; opacity: 0.5; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 900; color: var(--ink); line-height: 1.05; margin-bottom: 3.5rem; letter-spacing: -1.5px; }
        .section-title em { font-style: italic; color: var(--accent); }
        .section-divider { display: flex; align-items: center; gap: 1.5rem; max-width: 1140px; margin: 0 auto; padding: 0 2.5rem; }
        .section-divider::before, .section-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .divider-symbol { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--accent); opacity: 0.5; }

        .edu-timeline { display: flex; flex-direction: column; }
        .edu-item { display: grid; grid-template-columns: 140px 1fr; gap: 0 2rem; position: relative; padding-bottom: 3rem; }
        .edu-item:last-child { padding-bottom: 0; }
        .edu-item::before { content: ''; position: absolute; left: 140px; top: 12px; bottom: 0; width: 1px; background: var(--border); }
        .edu-item:last-child::before { display: none; }
        .edu-year { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--ink-light); font-weight: 500; padding-top: 5px; text-align: right; }
        .edu-dot { position: absolute; left: 134px; top: 5px; width: 13px; height: 13px; border-radius: 50%; background: var(--cream); border: 2px solid var(--accent); transition: background 0.3s; }
        .edu-item:hover .edu-dot { background: var(--accent); }
        .edu-content { padding-left: 2.5rem; }
        .edu-school { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
        .edu-degree { font-size: 0.87rem; color: var(--ink-light); font-weight: 500; }
        .edu-note { display: inline-block; margin-top: 8px; background: rgba(124,131,200,0.12); color: var(--accent); font-size: 0.72rem; font-weight: 700; padding: 3px 12px; border-radius: 20px; letter-spacing: 1px; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }

        .exp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .exp-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; box-shadow: var(--shadow); transition: all 0.25s; position: relative; overflow: hidden; }
        .exp-card::before { content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, var(--accent), var(--accent2)); transform: scaleY(0); transform-origin: bottom; transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
        .exp-card:hover::before { transform: scaleY(1); }
        .exp-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .exp-type { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--accent); margin-bottom: 0.8rem; }
        .exp-role { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
        .exp-org { font-size: 0.85rem; color: var(--accent2); font-weight: 700; margin-bottom: 1rem; }
        .exp-desc { font-size: 0.84rem; color: var(--ink-light); line-height: 1.8; }

        .skills-groups { display: flex; flex-direction: column; gap: 0; }
        .skill-group {
          display: grid; grid-template-columns: 140px 1fr;
          gap: 0 2.5rem; align-items: start;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border);
        }
        .skill-group:first-child { border-top: 1px solid var(--border); }
        .skill-group-label {
          font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 700;
          letter-spacing: 2.5px; text-transform: uppercase; color: var(--ink-light);
          padding-top: 0.5rem;
          position: relative;
        }
        .skill-group-label::before {
          content: ''; display: block; width: 18px; height: 1.5px;
          background: var(--accent); margin-bottom: 0.5rem; opacity: 0.6;
        }
        .skill-pills { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .skill-pill { background: var(--card); border: 1.5px solid var(--border); border-radius: 50px; padding: 0.65rem 1.4rem; box-shadow: var(--shadow); transition: all 0.2s; cursor: default; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; font-weight: 500; color: var(--ink); letter-spacing: -0.2px; }
        .skill-pill:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); box-shadow: var(--shadow-lg); background: var(--accent-soft); }

        .cert-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .cert-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 2.2rem; box-shadow: var(--shadow); flex: 1; min-width: 240px; transition: all 0.25s; text-align: center; position: relative; overflow: hidden; text-decoration: none; display: block; }
        .cert-card::after { content: ''; position: absolute; inset: 0; background: var(--accent-soft); opacity: 0; transition: opacity 0.25s; }
        .cert-card:hover::after { opacity: 1; }
        .cert-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--accent); }
        .cert-icon { font-size: 2.5rem; margin-bottom: 1.2rem; position: relative; z-index: 1; }
        .cert-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--ink); margin-bottom: 6px; position: relative; z-index: 1; }
        .cert-issuer { font-size: 0.8rem; color: var(--ink-light); position: relative; z-index: 1; }
        .cert-link { margin-top: 1.2rem; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--accent); font-weight: 700; letter-spacing: 1px; position: relative; z-index: 1; display: block; }

        .section-centered { text-align: center; display: flex; flex-direction: column; align-items: center; }
        .hobbies-row { display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; }
        .hobby-pill { display: flex; align-items: center; gap: 10px; background: var(--card); border: 1px solid var(--border); border-radius: 50px; padding: 0.85rem 1.8rem; font-size: 0.92rem; font-weight: 600; color: var(--ink); box-shadow: var(--shadow); transition: all 0.2s; cursor: default; }
        .hobby-pill:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
        .hobby-pill span:first-child { font-size: 1.3rem; }

        .contact-wrap { max-width: 600px; margin: 0 auto; width: 100%; }
        .contact-links { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2.5rem; }
        .contact-detail { display: flex; align-items: center; gap: 12px; justify-content: center; font-size: 0.88rem; color: var(--ink-light); }
        .contact-detail a { color: var(--ink-light); text-decoration: none; transition: 0.2s; font-weight: 500; }
        .contact-detail a:hover { color: var(--accent); }
        form { display: flex; flex-direction: column; gap: 1.2rem; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 700; color: var(--ink-light); letter-spacing: 2px; text-transform: uppercase; }
        .form-group input, .form-group textarea { font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.92rem; font-weight: 500; color: var(--ink); background: var(--white); border: 1.5px solid var(--border); border-radius: 10px; padding: 0.85rem 1rem; outline: none; transition: 0.2s; resize: vertical; }
        .form-group input:focus, .form-group textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124,131,200,0.15); }
        .success-msg { background: rgba(129,178,154,0.15); border: 1px solid var(--sage); color: var(--sage); border-radius: 10px; padding: 1rem; text-align: center; font-weight: 600; }

        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        * { cursor: none !important; }
        .cursor-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); position: fixed; transform: translate(-50%,-50%); transition: width 0.15s, height 0.15s, background 0.15s; z-index: 9999; pointer-events: none; }
        .cursor-dot.hover { width: 10px; height: 10px; background: var(--accent2); }
        .cursor-ring { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--accent); position: fixed; transform: translate(-50%,-50%); transition: all 0.12s ease; opacity: 0.5; z-index: 9998; pointer-events: none; }
        .cursor-ring.hover { width: 48px; height: 48px; opacity: 0.2; border-color: var(--accent2); }

        .back-to-top { position: fixed; bottom: 2rem; right: 2rem; z-index: 50; width: 44px; height: 44px; border-radius: 50%; background: var(--accent); color: white; border: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(124,131,200,0.4); opacity: 0; transform: translateY(16px); transition: opacity 0.3s, transform 0.3s; font-size: 1.1rem; }
        .back-to-top.visible { opacity: 1; transform: translateY(0); }
        .back-to-top:hover { background: var(--accent2); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(176,123,158,0.4); }

        footer { font-family: 'Cabinet Grotesk', sans-serif; color: var(--ink-light); }
        .footer-quote { border-top: 1px solid var(--border); padding: 5rem 2.5rem 3rem; text-align: center; }
        .footer-quote blockquote { font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(1.1rem, 2.5vw, 1.55rem); font-weight: 700; color: var(--ink); max-width: 700px; margin: 0 auto 1.2rem; line-height: 1.55; user-select: none; }
        .footer-quote blockquote::before { content: open-quote; color: var(--accent); font-size: 2rem; line-height: 0; vertical-align: -0.4rem; margin-right: 4px; }
        .footer-quote blockquote::after { content: close-quote; color: var(--accent); font-size: 2rem; line-height: 0; vertical-align: -0.4rem; margin-left: 4px; }
        .footer-quote cite { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--accent); font-style: normal; letter-spacing: 2px; text-transform: uppercase; }
        .footer-bottom { border-top: 1px solid var(--border); padding: 1.5rem 2.5rem; }
        .footer-inner { max-width: 1140px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
        .footer-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 900; color: var(--ink); }
        .footer-tagline { font-size: 0.75rem; color: var(--ink-light); margin-top: 2px; }
        .footer-copy { font-size: 0.72rem; color: var(--ink-light); opacity: 0.45; }

        .easter-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(19,17,30,0.75); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 2rem; animation: fadeIn 0.3s ease; }
        .easter-box { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 3.5rem 3rem; max-width: 500px; width: 100%; text-align: center; box-shadow: var(--shadow-lg); animation: slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1); position: relative; overflow: hidden; }
        .easter-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent), var(--accent2)); }
        .easter-tag { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; font-style: italic; color: var(--accent); margin-bottom: 1.5rem; }
        .easter-poem { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: var(--ink); line-height: 1.8; font-style: italic; }
        .easter-poem em { display: block; color: var(--accent2); font-style: italic; }
        .easter-close { margin-top: 2rem; background: none; border: 1.5px solid var(--border); border-radius: 20px; padding: 8px 28px; font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.8rem; font-weight: 700; color: var(--ink-light); cursor: pointer; transition: 0.2s; text-transform: uppercase; letter-spacing: 1px; display: inline-block; }
        .easter-close:hover { border-color: var(--accent); color: var(--accent); }

        @keyframes rotateRing { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(5px); } }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          section { padding: 100px 1.5rem 60px; }
          .hero h1 { font-size: clamp(3rem, 15vw, 5rem); letter-spacing: -2px; }
          .hero-number { display: none; }
          .hero-visual { display: none; }
          .edu-item { grid-template-columns: 90px 1fr; }
          .edu-item::before { left: 90px; }
          .edu-dot { left: 84px; }
          .section-divider { padding: 0 1.5rem; }
          .footer-quote { padding: 3rem 1.5rem 2rem; }
          .footer-bottom { padding: 1.5rem; }
          .easter-box { padding: 2rem 1.5rem; }
          .easter-poem { font-size: 1.15rem; }
        }
      `}</style>

      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => scrollTo("Home")}>KK<span className="dot">.</span></div>
        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n}><button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>{n}</button></li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="dark-toggle" onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"} {dark ? "Light" : "Dark"}</button>
          <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV.map((n) => (<button key={n} onClick={() => scrollTo(n)}>{n}</button>))}
      </div>

      <section className="hero" data-section="Home" ref={(el) => (sectionRefs.current["Home"] = el)}>
        <div className="hero-visual">
          <div className="hero-ring"><div className="hero-ring-dot"><div className="hero-ring-dot-circle" /><div className="hero-ring-label">coding</div></div></div>
          <div className="hero-ring"><div className="hero-ring-dot"><div className="hero-ring-dot-circle" /><div className="hero-ring-label">design</div></div></div>
          <div className="hero-ring"><div className="hero-ring-dot"><div className="hero-ring-dot-circle" /><div className="hero-ring-label">management</div></div></div>
          <div className="hero-center">&lt;KK /&gt;</div>
        </div>
        <div className="hero-eyebrow"><span className="hero-eyebrow-dot" /> Open to Opportunities</div>
        <h1><span className="first">Kevalya</span><span className="last">Khandelwal</span></h1>
        <div className="hero-typewriter"><span>{typeText}</span><span className="typewriter-cursor" /></div>
        <p className="hero-sub">{data.bio}</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("Contact")}>Get in Touch →</button>
          <button className="btn-outline" onClick={() => scrollTo("Experience")}>View Experience</button>
        </div>
        <div className="social-row">
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a href={data.github} target="_blank" rel="noreferrer" className="social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            GitHub
          </a>
        </div>
        <div className="hero-scroll"><div className="scroll-line" /> scroll</div>
        <div className="hero-number" aria-hidden="true">2</div>
      </section>

      <div className="section-divider"><div className="divider-symbol">✦</div></div>

      <section data-section="Education" ref={(el) => (sectionRefs.current["Education"] = el)}>
        <div className="section-overline reveal">Background</div>
        <div className="section-title reveal reveal-delay-1">My <em>Education</em></div>
        <div className="edu-timeline">
          {data.education.map((e, i) => (
            <div className={`edu-item reveal reveal-delay-${i + 1}`} key={i}>
              <div className="edu-year">{e.year}</div>
              <div className="edu-dot" />
              <div className="edu-content">
                <div className="edu-school">{e.school}</div>
                <div className="edu-degree">{e.degree}</div>
                {e.note && <span className="edu-note">{e.note}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">✦</div></div>

      <section data-section="Experience" ref={(el) => (sectionRefs.current["Experience"] = el)}>
        <div className="section-overline reveal">Work & Volunteering</div>
        <div className="section-title reveal reveal-delay-1">My <em>Experience</em></div>
        <div className="exp-grid">
          {data.experience.map((ex, i) => (
            <div className={`exp-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="exp-type">{ex.type}</div>
              <div className="exp-role">{ex.role}</div>
              <div className="exp-org">{ex.org}</div>
              <div className="exp-desc">{ex.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">✦</div></div>

      <section data-section="Skills" ref={(el) => (sectionRefs.current["Skills"] = el)}>
        <div className="section-overline reveal">// toolkit</div>
        <div className="section-title reveal reveal-delay-1">My <em>Skills</em></div>
        <div className="skills-groups reveal reveal-delay-2">
          {data.skillGroups.map((group, gi) => (
            <div className="skill-group" key={gi}>
              <div className="skill-group-label">{group.label}</div>
              <div className="skill-pills">
                {group.skills.map((s, si) => (
                  <div className="skill-pill" key={si}>{s}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">✦</div></div>

      <section data-section="Certificates" ref={(el) => (sectionRefs.current["Certificates"] = el)}>
        <div className="section-overline reveal">Achievements</div>
        <div className="section-title reveal reveal-delay-1">My <em>Certificates</em></div>
        <div className="cert-grid">
          {data.certificates.map((c, i) => (
            <a href={c.link} target="_blank" rel="noreferrer" className={`cert-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="cert-icon">🏅</div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-issuer">{c.issuer}</div>
              <div className="cert-link">VIEW CERTIFICATE →</div>
            </a>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">✦</div></div>

      <section data-section="Hobbies" ref={(el) => (sectionRefs.current["Hobbies"] = el)} className="section-centered">
        <div className="section-overline" style={{ justifyContent: "center" }}>Beyond Code</div>
        <div className="section-title">My <em>Hobbies</em></div>
        <div className="hobbies-row">
          {data.hobbies.map((h, i) => (
            <div className="hobby-pill" key={i}><span>{h.icon}</span><span>{h.label}</span></div>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">✦</div></div>

      <section data-section="Contact" ref={(el) => (sectionRefs.current["Contact"] = el)} className="section-centered">
        <div className="section-overline" style={{ justifyContent: "center" }}>Say Hello</div>
        <div className="section-title">Get in <em>Touch</em></div>
        <div className="contact-wrap">
          <div className="contact-links">
            <div className="contact-detail"><span>✉️</span><a href={`mailto:${data.email}`}>{data.email}</a></div>
            <div className="contact-detail"><span>💼</span><a href={data.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/kevalyakhandelwal</a></div>
            <div className="contact-detail"><span>🐙</span><a href={data.github} target="_blank" rel="noreferrer">github.com/keva1ya</a></div>
          </div>
          {sent ? (
            <div className="success-msg">✅ Message sent! I'll get back to you soon.</div>
          ) : (
            <form onSubmit={handleForm} style={{ textAlign: "left" }}>
              <div className="form-group"><label>Your Name</label><input type="text" required placeholder="John Doe" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} /></div>
              <div className="form-group"><label>Email</label><input type="email" required placeholder="john@example.com" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} /></div>
              <div className="form-group"><label>Message</label><textarea rows="5" required placeholder="Tell me about your project or idea..." value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} /></div>
              <div style={{ textAlign: "center" }}><button className="btn-primary" type="submit">Send Message →</button></div>
            </form>
          )}
        </div>
      </section>

      <div className={`cursor-dot ${cursorHover ? "hover" : ""}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className={`cursor-ring ${cursorHover ? "hover" : ""}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
      <button className={`back-to-top ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>

      <footer>
        <div className="footer-quote">
          <blockquote onClick={handleFooterTap}>One must still have chaos in oneself to give birth to a dancing star.</blockquote>
          <cite>— Friedrich Nietzsche</cite>
        </div>
        <div className="footer-bottom">
          <div className="footer-inner">
            <div>
              <div className="footer-name">Kevalya Khandelwal</div>
              <div className="footer-tagline">Full Stack · UI/UX · Management</div>
            </div>
            <div className="footer-copy">Designed & built with intention · {new Date().getFullYear()}</div>
          </div>
        </div>
      </footer>

      {easterEgg && (
        <div className="easter-overlay" onClick={() => setEasterEgg(false)}>
          <div className="easter-box" onClick={(e) => e.stopPropagation()}>
            <div className="easter-tag">कड़वा सच</div>
            <div className="easter-poem">धूल चेहरे पर जमी हुई थी<em>हम कमबख्त शीशा पोंछ रहे थे</em></div>
            <button className="easter-close" onClick={() => setEasterEgg(false)}>close</button>
          </div>
        </div>
      )}

      {easterEgg2 && (
        <div className="easter-overlay" onClick={() => setEasterEgg2(false)}>
          <div className="easter-box" onClick={(e) => e.stopPropagation()}>
            <div className="easter-tag">कड़वा सच</div>
            <div className="easter-poem">
              जिन्दगी का तजुर्बा तो नहीं पर इतना मालूम है —
              <em>छोटा आदमी बड़े मौके पर काम आ जाता है,</em>
              और बड़ा आदमी छोटी सी बात पर औकात दिखा जाता है।
            </div>
            <button className="easter-close" onClick={() => setEasterEgg2(false)}>close</button>
          </div>
        </div>
      )}
    </>
  );
}
