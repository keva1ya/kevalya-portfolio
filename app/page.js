"use client";

import { useState, useEffect, useRef } from "react";

const data = {
  name: "Kevalya Khandelwal",
  tagline: "Full Stack Developer · UI/UX Enthusiast · Tech Manager",
  bio: "2nd Year B.Tech CSE student specializing in Graphics & Gaming at UPES Dehradun. I blend technical depth in backend & frontend development with a designer's eye and a manager's mindset.",
  email: "kevwal8192@gmail.com",
  linkedin: "https://www.linkedin.com/in/kevalyakhandelwal-3895253a9",
  github: "https://github.com/keva1ya",
  education: [
    {
      school: "UPES Dehradun",
      degree: "B.Tech CSE – Graphics & Gaming",
      year: "2024 – Present",
      note: "2nd Year",
    },
    {
      school: "Guru Siddharth International School, Beawar",
      degree: "Class XI & XII",
      year: "2022 – 2024",
      note: "",
    },
    {
      school: "St. Paul's Sr. Sec. School, Beawar",
      degree: "Up to Class X",
      year: "2010 – 2022",
      note: "",
    },
  ],
  experience: [
    {
      role: "Management Intern",
      org: "Kapil India Pharmaceuticals",
      desc: "Assisted in day-to-day operations, inventory management, and coordinating between departments for smooth workflow.",
      type: "Professional",
    },
    {
      role: "Management Intern",
      org: "Kapil Diagnostic Centre",
      desc: "Supported operational and administrative management, patient flow coordination, and process optimization.",
      type: "Professional",
    },
    {
      role: "Social Intern",
      org: "Bharat Vikas Parishad (NGO)",
      desc: "Participated in community outreach programs, social welfare initiatives, and organizational events.",
      type: "Social",
    },
  ],
  certificates: [
    { name: "Code with Moana", issuer: "Disney / Infinity Creative", link: "https://drive.google.com/file/d/18lFaB0zAYmjMzeS5XuQ3aZFOYvYPIDFw/view?usp=sharing" },
    { name: "Product Management", issuer: "Online Course", link: "https://drive.google.com/file/d/1wUTdVDdu7hq-Vq5a1bSdjKi4erWYuZ4O/view?usp=sharing" },
  ],
  skills: [
    { name: "C / C++", level: 80 },
    { name: "Python", level: 75 },
    { name: "Java", level: 70 },
    { name: "SQL", level: 72 },
    { name: "UI / UX", level: 78 },
    { name: "HR Management", level: 70 },
    { name: "Product Management", level: 65 },
  ],
  hobbies: [
    { label: "Reading", icon: "📖" },
    { label: "Writing", icon: "✍️" },
    { label: "Gaming", icon: "🎮" },
    { label: "Design", icon: "🎨" },
    { label: "Basketball", icon: "🏀" },
  ],
};

const NAV = ["Home", "Education", "Experience", "Skills", "Certificates", "Hobbies", "Contact"];

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const sectionRefs = useRef({});

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
    const interactives = document.querySelectorAll("a, button, .cert-card, .skill-item, .hobby-pill");
    interactives.forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.section);
        });
      },
      { threshold: 0.4 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const res = await fetch("https://formspree.io/f/xaqdpope", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
    if (res.ok) setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

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
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Libre Baskerville', serif;
          background-color: var(--cream);
          color: var(--ink);
          line-height: 1.85;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(124,131,200,0.13) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(176,123,158,0.13) 0%, transparent 70%),
            radial-gradient(ellipse 40% 35% at 60% 10%, rgba(196,160,181,0.08) 0%, transparent 70%);
        }

        body::after {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.55;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px 180px;
          mix-blend-mode: multiply;
        }

        /* Ensure all content sits above the grain */
        nav, section, footer, .mobile-menu { position: relative; z-index: 2; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
          transition: background 0.3s, box-shadow 0.3s;
        }
        nav.scrolled {
          background: rgba(250,249,246,0.92);
          backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 var(--border);
        }
        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 700;
          color: var(--ink); cursor: pointer; letter-spacing: 1px;
          
        }
        .nav-logo span { color: var(--accent);  }
        .nav-links { display: flex; gap: 0.2rem; list-style: none; }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.5px;
          color: var(--ink-light);
          padding: 0.4rem 0.8rem; border-radius: 20px;
          transition: all 0.2s;
        }
        .nav-links button:hover, .nav-links button.active {
          color: var(--accent); background: rgba(124,131,200,0.08);
        }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--ink); border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          position: fixed; top: 64px; left: 0; right: 0;
          background: rgba(244,243,248,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          flex-direction: column; padding: 0.5rem 1rem 1rem;
          box-shadow: var(--shadow-lg); z-index: 99;
          transform: translateY(-110%);
          transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
          opacity: 0; display: flex;
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; }
        .mobile-menu button {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 1rem;
          color: var(--ink); padding: 0.9rem 1rem; text-align: left;
          border-radius: 10px; transition: 0.2s;
          border-bottom: 1px solid var(--border);
        }
        .mobile-menu button:last-child { border-bottom: none; }
        .mobile-menu button:hover { background: rgba(124,131,200,0.08); color: var(--accent); padding-left: 1.4rem; }

        /* SECTIONS */
        section {
          min-height: 100vh; padding: 100px 2rem 80px;
          max-width: 1100px; margin: 0 auto;
        }
        section.full { max-width: 100%; padding-left: 0; padding-right: 0; }

        /* HERO */
        .hero {
          display: flex; flex-direction: column;
          justify-content: center; min-height: 100vh;
          padding-top: 120px;
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; top: -100px; right: -150px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(124,131,200,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero::after {
          content: '';
          position: absolute; bottom: -50px; left: -100px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(176,123,158,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,131,200,0.1); border: 1px solid rgba(124,131,200,0.25);
          border-radius: 20px; padding: 6px 14px;
          font-size: 0.8rem; color: var(--accent); font-weight: 500;
          margin-bottom: 1.5rem; width: fit-content;
          animation: fadeUp 0.6s ease both;
        }
        .hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(5.5rem, 14vw, 11rem);
          font-weight: 700; line-height: 0.9;
          letter-spacing: -2px; color: var(--ink);
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .hero h1 .line-one { display: block; color: var(--ink); }
        .hero h1 .accent { display: block; color: var(--accent); }
        .hero-sub {
          font-family: 'Libre Baskerville', serif;
          font-size: 0.92rem; color: var(--ink-light); opacity: 0.7;
          margin: 1.8rem 0 2.5rem; max-width: 440px; line-height: 1.9;
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .hero-actions {
          display: flex; gap: 1rem; flex-wrap: wrap;
          animation: fadeUp 0.7s 0.3s ease both;
        }
        .btn-primary {
          background: var(--accent); color: white;
          border: none; padding: 0.85rem 2rem;
          border-radius: 40px; font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(124,131,200,0.35);
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,131,200,0.45); }
        .btn-outline {
          background: transparent; color: var(--ink);
          border: 1.5px solid var(--border); padding: 0.85rem 2rem;
          border-radius: 40px; font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase;
          cursor: pointer; transition: all 0.25s; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
        .social-row {
          display: flex; gap: 1rem; margin-top: 3rem;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .social-link {
          display: flex; align-items: center; gap: 8px;
          color: var(--ink-light); text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500; letter-spacing: 0.3px;
          padding: 8px 16px; border: 1px solid var(--border);
          border-radius: 20px; transition: 0.2s;
        }
        .social-link:hover { color: var(--accent); border-color: var(--accent); background: rgba(124,131,200,0.06); }
        .hero-scroll {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: var(--ink-light); font-size: 0.75rem; letter-spacing: 1px;
          text-transform: uppercase; animation: bounce 2s infinite;
        }
        .scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, var(--accent), transparent);
        }

        /* SECTION HEADING */
        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; letter-spacing: 3.5px; text-transform: uppercase;
          color: var(--accent); font-weight: 600; margin-bottom: 0.5rem;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700; color: var(--ink);
          line-height: 1.1; margin-bottom: 3rem;
          letter-spacing: -0.5px;
        }
        .section-title .accent-word { color: var(--accent); font-style: normal; }

        /* JETBRAINS MONO — technical elements */
        .skill-name {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500; font-size: 0.82rem;
          color: var(--ink); transition: 0.2s; letter-spacing: -0.3px;
        }
        .skill-item:hover .skill-name { color: var(--accent); }
        .mono-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem; color: var(--accent);
          font-weight: 500; margin-bottom: 0.5rem; opacity: 0.8;
        }

        /* EDUCATION */
        .edu-timeline { display: flex; flex-direction: column; gap: 0; }
        .edu-item {
          display: grid; grid-template-columns: 140px 1fr;
          gap: 0 2rem; position: relative; padding-bottom: 2.5rem;
        }
        .edu-item::before {
          content: ''; position: absolute;
          left: 140px; top: 8px; bottom: 0;
          width: 1px; background: var(--border);
        }
        .edu-item:last-child::before { display: none; }
        .edu-year { font-family: 'DM Sans', sans-serif; font-size: 0.78rem; color: var(--ink-light); font-weight: 500; padding-top: 4px; text-align: right; letter-spacing: 0.3px; }
        .edu-dot {
          position: absolute; left: 136px; top: 4px;
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--accent); border: 2px solid var(--cream);
          box-shadow: 0 0 0 2px var(--accent);
        }
        .edu-content { padding-left: 2rem; }
        .edu-school {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 700;  color: var(--ink); margin-bottom: 4px;
        }
        .edu-degree { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: var(--ink-light); letter-spacing: 0.2px; }
        .edu-note {
          display: inline-block; margin-top: 6px;
          background: rgba(176,123,158,0.12); color: var(--accent2);
          font-size: 0.75rem; font-weight: 600; padding: 3px 10px;
          border-radius: 10px; letter-spacing: 0.5px;
        }

        /* EXPERIENCE */
        .exp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .exp-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 1.8rem;
          box-shadow: var(--shadow); transition: 0.25s;
          position: relative; overflow: hidden;
        }
        .exp-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7C83C8, #B07B9E);
        }
        .exp-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .exp-type {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: var(--accent); margin-bottom: 0.6rem;
        }
        .exp-role {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 700; color: var(--ink); margin-bottom: 4px;
        }
        .exp-org { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: var(--accent2); font-weight: 600; margin-bottom: 1rem; letter-spacing: 0.3px; }
        .exp-desc { font-family: 'Libre Baskerville', serif; font-size: 0.83rem; color: var(--ink-light); line-height: 1.8; }

        /* SKILLS */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.9rem; }
        .skill-item {
          background: var(--card); border: 1.5px solid var(--border);
          border-radius: 50px; padding: 0.75rem 1.4rem;
          box-shadow: var(--shadow); transition: 0.2s; cursor: default;
          text-align: center; width: 100%;
        }
        .skill-item:hover {
          border-color: var(--accent); transform: translateY(-2px);
          box-shadow: var(--shadow-lg); background: rgba(124,131,200,0.07);
        }
        .skill-name { font-weight: 600; font-size: 0.9rem; color: var(--ink); transition: 0.2s; }
        .skill-item:hover .skill-name { color: var(--accent); }

        /* CERTIFICATES */
        .cert-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .cert-card {
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem;
          box-shadow: var(--shadow); flex: 1; min-width: 220px;
          transition: 0.25s; text-align: center;
        }
        .cert-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--accent); }
        .cert-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .cert-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700;  color: var(--ink); margin-bottom: 6px; }
        .cert-issuer { font-family: 'DM Sans', sans-serif; font-size: 0.8rem; color: var(--ink-light); letter-spacing: 0.3px; }

        /* CONTINUATION — flowing section divider */
        .section-divider {
          display: flex; align-items: center; gap: 1rem;
          max-width: 1100px; margin: 0 auto;
          padding: 0 2rem;
        }
        .section-divider::before, .section-divider::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
        }
        .divider-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); opacity: 0.5;
          box-shadow: 0 0 8px rgba(124,131,200,0.4);
        }

        /* SYMMETRY — centered sections */
        .section-centered {
          text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .section-centered .section-label,
        .section-centered .section-title { text-align: center; }
        .hobbies-row {
          display: flex; gap: 1rem; flex-wrap: wrap;
          justify-content: center;
        }
        .hobby-pill {
          display: flex; align-items: center; gap: 10px;
          background: var(--card); border: 1px solid var(--border);
          border-radius: 50px; padding: 0.8rem 1.6rem;
          font-size: 1rem; font-weight: 500; color: var(--ink);
          box-shadow: var(--shadow); transition: 0.2s; cursor: default;
        }
        .hobby-pill:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
        .hobby-pill span:first-child { font-size: 1.4rem; }

        /* CONTACT centered */
        .contact-wrap { max-width: 680px; margin: 0 auto; width: 100%; }

        /* CONTACT */
        .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; }
        .contact-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 700;  margin-bottom: 1rem;
        }
        .contact-info p { font-family: 'Libre Baskerville', serif; font-size: 0.88rem; color: var(--ink-light); margin-bottom: 2rem; line-height: 1.9; }
        .contact-detail {
          display: flex; align-items: center; gap: 12px;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink-light); font-size: 0.85rem; margin-bottom: 0.8rem;
        }
        .contact-detail a { color: var(--ink-light); text-decoration: none; transition: 0.2s; }
        .contact-detail a:hover { color: var(--accent); }
        .contact-icon { font-size: 1.1rem; }
        form { display: flex; flex-direction: column; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-family: 'DM Sans', sans-serif; font-size: 0.72rem; font-weight: 700; color: var(--ink-light); letter-spacing: 1.5px; text-transform: uppercase; }
        .form-group input, .form-group textarea {
          font-family: 'Libre Baskerville', serif;
          font-size: 0.9rem; color: var(--ink);
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: 10px; padding: 0.8rem 1rem; outline: none;
          transition: 0.2s; resize: vertical;
        }
        .form-group input:focus, .form-group textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124,131,200,0.15); }
        .success-msg {
          background: rgba(129,178,154,0.15); border: 1px solid var(--sage);
          color: var(--sage); border-radius: 10px; padding: 1rem;
          text-align: center; font-weight: 500;
        }

        /* BUTTON MICRO-INTERACTIONS */
        .btn-primary, .btn-outline {
          position: relative; overflow: hidden;
        }
        .btn-primary::after, .btn-outline::after {
          content: ''; position: absolute;
          inset: 0; border-radius: inherit;
          background: rgba(255,255,255,0.15);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-primary:hover::after, .btn-outline:hover::after { transform: scaleX(1); }
        .btn-primary:active { transform: scale(0.97); }
        .btn-outline:active { transform: scale(0.97); }

        /* SCROLL ANIMATIONS */
        .reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }

        /* HERO VISUAL ELEMENT */
        .hero-visual {
          position: absolute; right: 5%; top: 50%;
          transform: translateY(-50%);
          width: min(380px, 38vw); height: min(380px, 38vw);
          pointer-events: none;
        }
        .hero-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(124,131,200,0.2);
          animation: rotateRing 18s linear infinite;
        }
        .hero-ring:nth-child(1) {
          inset: 0;
          border-color: rgba(124,131,200,0.25);
          animation-duration: 22s;
        }
        .hero-ring:nth-child(2) {
          inset: 12%;
          border-color: rgba(176,123,158,0.2);
          animation-direction: reverse;
          animation-duration: 16s;
        }
        .hero-ring:nth-child(3) {
          inset: 26%;
          border-color: rgba(124,131,200,0.3);
          animation-duration: 12s;
        }
        .hero-ring-dot {
          position: absolute; top: -14px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
        }
        .hero-ring-dot-circle {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px rgba(124,131,200,0.6);
        }
        .hero-ring:nth-child(2) .hero-ring-dot-circle {
          background: var(--accent2);
          box-shadow: 0 0 10px rgba(176,123,158,0.6);
        }
        .hero-ring-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(0.45rem, 1vw, 0.62rem);
          color: var(--accent); font-weight: 500;
          letter-spacing: 1px; white-space: nowrap;
          background: rgba(244,243,248,0.85);
          padding: 2px 6px; border-radius: 4px;
          border: 1px solid rgba(124,131,200,0.2);
        }
        .hero-ring:nth-child(2) .hero-ring-label { color: var(--accent2); border-color: rgba(176,123,158,0.25); }
        .hero-center {
          position: absolute; inset: 36%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,131,200,0.15), rgba(176,123,158,0.08));
          border: 1px solid rgba(124,131,200,0.2);
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(0.5rem, 1.5vw, 0.8rem);
          color: var(--accent); opacity: 0.7; letter-spacing: 1px;
        }

        /* CUSTOM CURSOR */
        * { cursor: none !important; }
        .cursor-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          position: fixed; transform: translate(-50%, -50%);
          transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
          z-index: 9999; pointer-events: none;
        }
        .cursor-ring {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1.5px solid var(--accent);
          position: fixed; transform: translate(-50%, -50%);
          transition: all 0.15s ease;
          opacity: 0.45; z-index: 9998; pointer-events: none;
        }
        .cursor-dot.hover { width: 12px; height: 12px; background: var(--accent2); }
        .cursor-ring.hover { width: 52px; height: 52px; opacity: 0.25; border-color: var(--accent2); }

        /* BACK TO TOP */
        .back-to-top {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 50;
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--accent); color: white;
          border: none;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(124,131,200,0.4);
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s ease;
          font-size: 1.1rem;
        }
        .back-to-top.visible { opacity: 1; transform: translateY(0); }
        .back-to-top:hover { background: var(--accent2); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(176,123,158,0.4); }

        /* BETTER FOOTER */
        footer { font-family: 'DM Sans', sans-serif; color: var(--ink-light); }
        .footer-quote {
          border-top: 1px solid var(--border);
          padding: 4rem 2rem 2.5rem; text-align: center;
        }
        .footer-quote blockquote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.55rem);
          font-weight: 600; color: var(--ink);
          max-width: 680px; margin: 0 auto 1rem;
          line-height: 1.55; letter-spacing: -0.2px;
        }
        .footer-quote blockquote::before { content: open-quote; color: var(--accent); font-size: 2rem; line-height: 0; vertical-align: -0.4rem; margin-right: 4px; }
        .footer-quote blockquote::after { content: close-quote; color: var(--accent); font-size: 2rem; line-height: 0; vertical-align: -0.4rem; margin-left: 4px; }
        .footer-quote cite {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem; color: var(--accent);
          font-style: normal; letter-spacing: 2px; text-transform: uppercase;
        }
        .footer-bottom {
          border-top: 1px solid var(--border);
          padding: 1.5rem 2rem;
        }
        .footer-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 0.5rem;
        }
        .footer-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 700; color: var(--ink);
        }
        .footer-tagline { font-size: 0.75rem; color: var(--ink-light); margin-top: 2px; }
        .footer-copy { font-size: 0.72rem; color: var(--ink-light); opacity: 0.45; }

        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* MODAL */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(26,9,13,0.7);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }
        .modal-box {
          background: var(--cream); border-radius: 20px;
          box-shadow: 0 24px 80px rgba(26,9,13,0.3);
          width: 100%; max-width: 780px;
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.2rem 1.6rem;
          border-bottom: 1px solid var(--border);
        }
        .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: var(--ink); }
        .modal-issuer { font-size: 0.82rem; color: var(--ink-light); margin-top: 2px; }
        .modal-close {
          background: none; border: none; cursor: pointer;
          font-size: 1.4rem; color: var(--ink-light);
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: 0.2s;
        }
        .modal-close:hover { background: rgba(124,131,200,0.1); color: var(--accent); }
        .modal-body iframe {
          width: 100%; height: 500px; border: none; display: block;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .hero { padding-top: 90px; padding-bottom: 60px; justify-content: flex-start; min-height: 100svh; }
          .hero h1 { font-size: clamp(3rem, 17vw, 5rem); line-height: 0.95; letter-spacing: -1px; }
          .hero-sub { max-width: 100%; font-size: 0.85rem; margin: 1.2rem 0 1.8rem; }
          .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
          .edu-item { grid-template-columns: 90px 1fr; }
          .edu-item::before { left: 90px; }
          .edu-dot { left: 86px; }
          .modal-body iframe { height: 360px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => scrollTo("Home")}>
          Kevalya<span>.</span>
        </div>
        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n}>
              <button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>
                {n}
              </button>
            </li>
          ))}
        </ul>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV.map((n) => (
          <button key={n} onClick={() => scrollTo(n)}>{n}</button>
        ))}
      </div>

      {/* HERO */}
      <section
        className="hero"
        data-section="Home"
        ref={(el) => (sectionRefs.current["Home"] = el)}
      >
        <div className="hero-visual">
          <div className="hero-ring">
            <div className="hero-ring-dot">
              <div className="hero-ring-dot-circle" />
              <div className="hero-ring-label">coding</div>
            </div>
          </div>
          <div className="hero-ring">
            <div className="hero-ring-dot">
              <div className="hero-ring-dot-circle" />
              <div className="hero-ring-label">design</div>
            </div>
          </div>
          <div className="hero-ring">
            <div className="hero-ring-dot">
              <div className="hero-ring-dot-circle" />
              <div className="hero-ring-label">management</div>
            </div>
          </div>
          <div className="hero-center">&lt;KK /&gt;</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "var(--accent)", opacity: 0.7, marginBottom: "1rem", letterSpacing: "0.3px" }}>
          &lt;developer /&gt;
        </div>
        <div className="hero-badge">✦ Open to Opportunities</div>
        <h1>
          <span className="line-one">Kevalya</span>
          <span className="accent">Khandelwal</span>
        </h1>
        <p className="hero-sub">{data.bio}</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("Contact")}>
            Get in Touch →
          </button>
          <button className="btn-outline" onClick={() => scrollTo("Experience")}>
            View Experience
          </button>
        </div>
        <div className="social-row">
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a href={data.github} target="_blank" rel="noreferrer" className="social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            GitHub
          </a>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          scroll
        </div>
      </section>

      {/* EDUCATION */}
      <section data-section="Education" ref={(el) => (sectionRefs.current["Education"] = el)}>
        <div className="section-label reveal">Background</div>
        <div className="section-title reveal reveal-delay-1">My <span className="accent-word">Education</span></div>
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

      <div className="section-divider"><div className="divider-dot" /></div>

      {/* EXPERIENCE */}
      <section data-section="Experience" ref={(el) => (sectionRefs.current["Experience"] = el)}>
        <div className="section-label reveal">Work & Volunteering</div>
        <div className="section-title reveal reveal-delay-1">My <span className="accent-word">Experience</span></div>
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

      <div className="section-divider"><div className="divider-dot" /></div>

      {/* SKILLS */}
      <section data-section="Skills" ref={(el) => (sectionRefs.current["Skills"] = el)}>
        <div className="mono-label reveal">// toolkit</div>
        <div className="section-title reveal reveal-delay-1">My <span className="accent-word">Skills</span></div>
        <div className="skills-grid reveal reveal-delay-2">
          {data.skills.map((s, i) => (
            <div className="skill-item" key={i}>
              <span className="skill-name">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-dot" /></div>

      {/* CERTIFICATES */}
      <section data-section="Certificates" ref={(el) => (sectionRefs.current["Certificates"] = el)}>
        <div className="section-label reveal">Achievements</div>
        <div className="section-title reveal reveal-delay-1">My <span className="accent-word">Certificates</span></div>
        <div className="cert-grid">
          {data.certificates.map((c, i) => (
            <a href={c.link} target="_blank" rel="noreferrer" className={`cert-card reveal reveal-delay-${i + 1}`} key={i} style={{ textDecoration: "none" }}>
              <div className="cert-icon">🏅</div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-issuer">{c.issuer}</div>
              <div style={{ marginTop: "1rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--accent)", fontWeight: 600 }}>
                VIEW CERTIFICATE →
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-dot" /></div>

      {/* HOBBIES — centered for symmetry */}
      <section data-section="Hobbies" ref={(el) => (sectionRefs.current["Hobbies"] = el)} className="section-centered">
        <div className="section-label">Beyond Code</div>
        <div className="section-title">My <span className="accent-word">Hobbies</span></div>
        <div className="hobbies-row">
          {data.hobbies.map((h, i) => (
            <div className="hobby-pill" key={i}>
              <span>{h.icon}</span>
              <span>{h.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-dot" /></div>

      {/* CONTACT — centered for symmetry */}
      <section data-section="Contact" ref={(el) => (sectionRefs.current["Contact"] = el)} className="section-centered">
        <div className="section-label">Say Hello</div>
        <div className="section-title">Get in <span className="accent-word">Touch</span></div>
        <div className="contact-wrap">
          <div style={{ marginBottom: "2rem" }}>
            <div className="contact-detail" style={{ justifyContent: "center" }}>
              <span className="contact-icon">✉️</span>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
            <div className="contact-detail" style={{ justifyContent: "center" }}>
              <span className="contact-icon">💼</span>
              <a href={data.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/kevalyakhandelwal</a>
            </div>
            <div className="contact-detail" style={{ justifyContent: "center" }}>
              <span className="contact-icon">🐙</span>
              <a href={data.github} target="_blank" rel="noreferrer">github.com/keva1ya</a>
            </div>
          </div>
          {sent ? (
            <div className="success-msg">✅ Message sent! I'll get back to you soon.</div>
          ) : (
            <form onSubmit={handleForm} style={{ textAlign: "left" }}>
              <div className="form-group">
                <label>YOUR NAME</label>
                <input type="text" required placeholder="John Doe" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>EMAIL</label>
                <input type="email" required placeholder="john@example.com" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>MESSAGE</label>
                <textarea rows="5" required placeholder="Tell me about your project or idea..." value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} />
              </div>
              <div style={{ textAlign: "center" }}>
                <button className="btn-primary" type="submit">Send Message →</button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CUSTOM CURSOR */}
      <div className={`cursor-dot ${cursorHover ? "hover" : ""}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className={`cursor-ring ${cursorHover ? "hover" : ""}`} style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* BACK TO TOP */}
      <button className={`back-to-top ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>

      <footer>
        <div className="footer-quote">
          <blockquote>One must still have chaos in oneself to give birth to a dancing star.</blockquote>
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
    </>
  );
}
