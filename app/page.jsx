"use client";
import { useState, useEffect, useRef } from "react";
import easterPoemsData from "./easter.json";
const data = {
  name: "Kevalya Khandelwal",
  tagline: "Full Stack Developer \u00B7 UI/UX Enthusiast \u00B7 Tech Manager",
  bio: "CSE student at UPES Dehradun, specializing in Graphics & Gaming. I build things, design experiences, and occasionally manage people.",
  email: "kevwal8192@gmail.com",
  linkedin: "https://www.linkedin.com/in/kevalyakhandelwal-3895253a9",
  github: "https://github.com/keva1ya",
  education: [
    { school: "UPES Dehradun", degree: "B.Tech CSE - Graphics & Gaming", year: "2024 - Present", note: "2nd Year" },
    { school: "Guru Siddharth International School, Beawar", degree: "Class XI & XII", year: "2022 - 2024", note: "" },
    { school: "St. Paul's Sr. Sec. School, Beawar", degree: "Up to Class X", year: "2010 - 2022", note: "" },
  ],
  experience: [
    { role: "Management Intern", org: "Kapil India Pharmaceuticals", desc: "Assisted in daily operations, inventory management and in coordination between departments for smooth and efficient workflow.", type: "Professional", year: "Summer 2023" },
    { role: "Management Intern", org: "Kapil Diagnostic Centre", desc: "Oversight in operational and administrative management, patient flow coordination, conflict resolution amongst the employees, and process optimization.", type: "Professional", year: "Summer 2024" },
    { role: "Social Intern", org: "Bharat Vikas Parishad (NGO)", desc: "Participated in community outreach programs, social welfare initiatives, and organizational events.", type: "Social", year: "Summer 2025" },
  ],
  skillGroups: [
    { label: "Languages", skills: ["C / C++", "Python", "Java", "SQL"] },
    { label: "Design", skills: ["UI / UX"] },
    { label: "Management", skills: ["HR Management", "Product Management"] },
  ],
  certificates: [
    { name: "Code with Moana", issuer: "Disney / Infinity Creative", link: "https://drive.google.com/file/d/18lFaB0zAYmjMzeS5XuQ3aZFOYvYPIDFw/view?usp=sharing", icon: "\uD83C\uDFC5" },
    { name: "Product Management", issuer: "Online Course", link: "https://drive.google.com/file/d/1wUTdVDdu7hq-Vq5a1bSdjKi4erWYuZ4O/view?usp=sharing", icon: "\uD83C\uDFC5" },
  ],
  hobbies: [
    { label: "Reading", icon: "\uD83D\uDCD6" }, { label: "Writing", icon: "\u270D\uFE0F" }, { label: "Gaming", icon: "\uD83C\uDFAE" },
    { label: "Basketball", icon: "\uD83C\uDFC0" }, { label: "Cinema", icon: "\uD83C\uDFAC" },
  ],
};
const NAV = ["Home", "Education", "Experience", "Skills", "Certificates", "Beyond Code", "Contact"];
const TYPEWRITER_WORDS = ["Full Stack Developer", "UI/UX Enthusiast", "Tech Manager", "Game Dev Enthusiast"];
const INTRO_MESSAGE = "Sorry it's dark I wasnt expecting any company";
const FALLBACK_EASTER_POEMS = [
  {
    tag: "\u0915\u095C\u0935\u093E \u0938\u091A",
    poem: "\u0927\u0942\u0932 \u091A\u0947\u0939\u0930\u0947 \u092A\u0930 \u091C\u092E\u0940 \u0939\u0941\u0908 \u0925\u0940",
    em: "\u0939\u092E \u0915\u092E\u092C\u0916\u094D\u0924 \u0936\u0940\u0936\u093E \u092A\u094B\u0902\u091B \u0930\u0939\u0947 \u0925\u0947",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [lightOn, setLightOn] = useState(false);
  const [cordPulled, setCordPulled] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [dark, setDark] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [easterEgg2, setEasterEgg2] = useState(false);
  const [currentPoem, setCurrentPoem] = useState(null);
  const easterPoemsRef = useRef([]);
  const [typeText, setTypeText] = useState("");
  const [typeWordIdx, setTypeWordIdx] = useState(0);
  const [typeCharIdx, setTypeCharIdx] = useState(0);
  const [typeDeleting, setTypeDeleting] = useState(false);
  const [introTypeText, setIntroTypeText] = useState("");
  const easterBuffer = useRef("");
  const footerTapCount = useRef(0);
  const footerTapTimer = useRef(null);
  const sectionRefs = useRef({});
  useEffect(() => {
    easterPoemsRef.current = Array.isArray(easterPoemsData) && easterPoemsData.length > 0
      ? easterPoemsData
      : FALLBACK_EASTER_POEMS;
  }, []);
  useEffect(() => { setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches); }, []);
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
    if (introTypeText.length >= INTRO_MESSAGE.length) return;
    const timeout = setTimeout(() => {
      setIntroTypeText(INTRO_MESSAGE.slice(0, introTypeText.length + 1));
    }, 55);
    return () => clearTimeout(timeout);
  }, [introTypeText]);
  useEffect(() => {
    const secret = "kadvasach";
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (!/^[a-z ]$/.test(key)) return;

      // Ignore spaces so both "kadva sach" and "kadvasach" trigger.
      if (key !== " ") {
        easterBuffer.current = (easterBuffer.current + key).slice(-secret.length);
      }
      if (easterBuffer.current === secret) {
        const poems = easterPoemsRef.current.length > 0 ? easterPoemsRef.current : FALLBACK_EASTER_POEMS;
        setCurrentPoem(poems[Math.floor(Math.random() * poems.length)]);
        setEasterEgg(true);
        easterBuffer.current = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 40); setShowTop(window.scrollY > 400); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!isTouchDevice) document.body.classList.add("custom-cursor");
    else document.body.classList.remove("custom-cursor");
  }, [isTouchDevice]);
  useEffect(() => {
    const onMove = (e) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top = e.clientY + "px";
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + "px";
        cursorRingRef.current.style.top = e.clientY + "px";
      }
    };
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
  const handlePullCord = () => {
    if (cordPulled) return;
    setCordPulled(true);
    setTimeout(() => setLightOn(true), 600);
  };
  const handleFooterTap = () => {
    footerTapCount.current += 1;
    clearTimeout(footerTapTimer.current);
    if (footerTapCount.current >= 5) {
      const poems = easterPoemsRef.current.length > 0 ? easterPoemsRef.current : FALLBACK_EASTER_POEMS;
      setCurrentPoem(poems[Math.floor(Math.random() * poems.length)]);
      setEasterEgg2(true);
      footerTapCount.current = 0;
    } else {
      footerTapTimer.current = setTimeout(() => { footerTapCount.current = 0; }, 2000);
    }
  };
  const handleForm = async (e) => {
    e.preventDefault();
    setSending(true);
    const res = await fetch("https://formspree.io/f/xaqdpope", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });
    if (res.ok) setSent(true);
    setSending(false);
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Cabinet+Grotesk:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500;700&family=Dancing+Script:wght@600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --cream: #F4F3F8; --white: #F4F3F8; --ink: #1E1B2E; --ink-light: #5C5470;
          --accent: #7C83C8; --accent2: #B07B9E; --sage: #C4A0B5; --border: #DDD9EC;
          --card: #FFFFFF; --shadow: 0 4px 24px rgba(30,27,46,0.08);
          --shadow-lg: 0 12px 48px rgba(30,27,46,0.14); --accent-soft: rgba(124,131,200,0.10); --nav-highlight: rgba(124,131,200,0.2);
        }
        html.dark {
          --cream: #13111E; --white: #1C1929; --ink: #E8E6F0; --ink-light: #9D97B8;
          --accent: #9099D8; --accent2: #C08FAE; --sage: #B090A5; --border: #2E2A42;
          --card: #1C1929; --shadow: 0 4px 24px rgba(0,0,0,0.25);
          --shadow-lg: 0 12px 48px rgba(0,0,0,0.4); --accent-soft: rgba(144,153,216,0.10); --nav-highlight: rgba(144,153,216,0.24);
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'Cabinet Grotesk', sans-serif; background: var(--cream); color: var(--ink); line-height: 1.75; overflow-x: hidden; transition: background 0.4s ease, color 0.4s ease; }
        body::before { content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(ellipse 60% 50% at 10% 20%, rgba(124,131,200,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(176,123,158,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 60% 10%, rgba(196,160,181,0.12) 0%, transparent 70%); }
        body::after { content: ''; position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.45; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"); background-repeat: repeat; background-size: 180px 180px; mix-blend-mode: multiply; }
        nav, section, footer, .mobile-menu { position: relative; z-index: 2; }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 3.8rem; display: flex; align-items: center; justify-content: space-between; height: 52px; transition: all 0.3s; background: transparent; }
        nav.scrolled { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: none; border: none; background: transparent; }
        html.dark nav.scrolled { background: transparent; }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 900; color: var(--ink); cursor: pointer; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px; }
        .nav-logo .dot { color: var(--accent); }
        .nav-logo-status { display: flex; align-items: center; gap: 5px; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--accent); letter-spacing: 1px; border: 1px solid rgba(124,131,200,0.3); padding: 2px 8px; border-radius: 20px; background: var(--accent-soft); }
        .nav-logo-status-dot { width: 5px; height: 5px; border-radius: 50%; background: #6dbd8a; box-shadow: 0 0 6px #6dbd8a; animation: pulse 2s ease-in-out infinite; }
        .nav-links { display: flex; gap: 1.05rem; list-style: none; }
        .nav-links button { background: none; border: none; outline: none; cursor: pointer; font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.8rem; font-weight: 500; color: var(--ink-light); padding: 0.46rem 1.2rem; transition: color 0.2s; position: relative; border-radius: 999px; z-index: 0; isolation: isolate; }
        .nav-links button:focus { outline: none; }
        .nav-links button::before { content: ''; position: absolute; inset: 0; border-radius: 999px; background: var(--nav-highlight); opacity: 0; transform: scale(0.92); transition: opacity 0.2s ease, transform 0.2s ease; z-index: -1; }
        .nav-links button:hover { color: var(--ink); }
        .nav-links button.active { color: var(--ink); }
        .nav-links button.active::before, .nav-links button:hover::before { opacity: 1; transform: scale(1); }
        .nav-right { display: flex; align-items: center; gap: 0.4rem; }
        .dark-toggle { background: none; border: none; outline: none; cursor: pointer; color: var(--ink-light); display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 50px; font-family: 'Cabinet Grotesk', sans-serif; font-size: 0.8rem; transition: all 0.2s; }
        .dark-toggle:focus { outline: none; }
        .dark-toggle:hover { color: var(--ink); background: var(--accent-soft); }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--ink); border-radius: 2px; transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu { position: fixed; top: 52px; left: 0; right: 0; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); flex-direction: column; padding: 0.5rem 1rem 1.5rem; box-shadow: var(--shadow-lg); z-index: 99; transform: translateY(-110%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease; opacity: 0; display: flex; }
        .mobile-menu.open { transform: translateY(0); opacity: 1; }
        .mobile-menu button { background: none; border: none; cursor: pointer; font-family: 'Cabinet Grotesk', sans-serif; font-size: 1rem; font-weight: 500; color: var(--ink); padding: 0.9rem 1rem; text-align: left; border-radius: 8px; transition: 0.2s; border-bottom: 1px solid var(--border); }
        .mobile-menu button:last-child { border-bottom: none; }
        .mobile-menu button:hover { background: var(--accent-soft); color: var(--accent); padding-left: 1.4rem; }
        section { min-height: 100vh; padding: 130px 2.5rem 80px; max-width: 1140px; margin: 0 auto; }
        .hero { display: flex; flex-direction: column; justify-content: center; min-height: 100vh; padding-top: 52px; position: relative; overflow: hidden; }
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
        .hero-visual { position: absolute; right: 4%; top: 50%; transform: translateY(-50%); width: min(340px, 34vw); height: min(340px, 34vw); pointer-events: none; z-index: 0; }
        .vinyl-wrap { width: 100%; height: 100%; position: relative; animation: vinylSpin 8s linear infinite; }
        .vinyl-wrap:hover { animation-play-state: paused; }
        .vinyl-svg { width: 100%; height: 100%; filter: drop-shadow(0 16px 48px rgba(30,27,46,0.25)); }
        .hero-tonearm-wrap { position: absolute; top: clamp(-8px,-1.8vw,-12px); right: clamp(-26px,-4.8vw,-34px); width: clamp(72px,10vw,96px); pointer-events: none; transform-origin: 90% 8%; transform: rotate(0deg); opacity: 0.92; filter: drop-shadow(0 10px 20px rgba(20,16,32,0.35)); }
        .hero-tonearm-wrap svg { width: 100%; height: auto; }
        .hero-intro-greeting { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; animation: fadeUp 0.5s ease both; }
        .hero-intro-line { font-family: 'Cabinet Grotesk', sans-serif; font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800; line-height: 1.25; color: var(--ink); animation: fadeUp 0.6s 0.1s ease both; max-width: 560px; letter-spacing: -0.5px; }
        .hero-intro-line strong { color: var(--accent); font-weight: 900; }
        .hero-aside { margin-top: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--ink-light); font-style: italic; animation: fadeUp 0.6s 0.15s ease both; opacity: 0.7; }
        .hero-aside span { color: var(--accent); font-style: normal; }
        .hero-name-small { margin-top: 1.8rem; font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--ink-light); animation: fadeUp 0.6s 0.2s ease both; display: flex; align-items: center; gap: 8px; }
        .hero-name-small::before { content: '-'; color: var(--accent); }
        .mobile-blobs { display: none; position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .mobile-blob { position: absolute; border-radius: 50%; filter: blur(60px); animation: blobPulse 6s ease-in-out infinite; }
        .mobile-blob:nth-child(1) { width: 280px; height: 280px; background: rgba(124,131,200,0.18); top: -60px; right: -80px; }
        .mobile-blob:nth-child(2) { width: 220px; height: 220px; background: rgba(176,123,158,0.15); bottom: 40px; left: -60px; animation-delay: 2s; }
        .mobile-blob:nth-child(3) { width: 160px; height: 160px; background: rgba(196,160,181,0.12); top: 40%; right: -40px; animation-delay: 4s; }
        @keyframes blobPulse { 0%,100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.15); opacity: 1; } }
        .section-overline { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 10px; }
        .section-overline::before { content: '-'; opacity: 0.5; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 900; color: var(--ink); line-height: 1.05; margin-bottom: 3.5rem; letter-spacing: -1.5px; }
        .section-title em { font-style: italic; color: var(--accent); }
        .section-divider { display: flex; align-items: center; gap: 1.5rem; max-width: 1140px; margin: 0 auto; padding: 0 2.5rem; }
        .section-divider::before, .section-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .divider-symbol { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--accent); opacity: 0.5; }
        .edu-timeline { display: flex; flex-direction: column; }
        .edu-item { --tl-col: 160px; display: grid; grid-template-columns: var(--tl-col) 1fr; gap: 0 2rem; position: relative; padding-bottom: 2rem; }
        .edu-item:last-child { padding-bottom: 0; }
        .edu-item::before { content: ''; position: absolute; left: var(--tl-col); top: 12px; bottom: 0; width: 1px; background: var(--border); }
        .edu-item:last-child::before { display: none; }
        .edu-year { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--ink-light); font-weight: 500; padding-top: 5px; }
        .edu-dot { position: absolute; left: calc(var(--tl-col) - 6px); top: 5px; width: 13px; height: 13px; border-radius: 50%; background: var(--cream); border: 2px solid var(--accent); transition: background 0.3s; }
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
        .exp-year { font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; color: var(--accent); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 0.4rem; }
        .skills-groups { display: flex; flex-direction: column; gap: 0; }
        .skill-group { display: grid; grid-template-columns: 140px 1fr; gap: 0 2.5rem; align-items: start; padding: 2rem 0; border-bottom: 1px solid var(--border); }
        .skill-group:first-child { border-top: 1px solid var(--border); }
        .skill-group:last-child { border-bottom: none; }
        .skill-group-label { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--ink-light); padding-top: 0.5rem; position: relative; }
        .skill-group-label::before { content: ''; display: block; width: 18px; height: 1.5px; background: var(--accent); margin-bottom: 0.5rem; opacity: 0.6; }
        .skill-pills { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .skill-pill { background: var(--card); border: 1.5px solid var(--border); border-radius: 50px; padding: 0.65rem 1.4rem; box-shadow: var(--shadow); transition: all 0.2s; cursor: default; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; font-weight: 500; color: var(--ink); }
        .skill-pill:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); box-shadow: var(--shadow-lg); background: var(--accent-soft); }
        .skill-group-languages .skill-pill { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
        .skill-group-languages { border-left: 2px solid var(--accent); padding-left: 1rem; }
        .skill-group-design .skill-pill { font-family: 'Dancing Script', cursive; font-size: 1.15rem; font-weight: 700; }
        .skill-group-design { border-left: 2px solid var(--accent2); padding-left: 1rem; }
        .skill-group-management .skill-pill { font-family: 'Playfair Display', serif; font-size: 0.88rem; font-weight: 700; }
        .skill-group-management { border-left: 2px solid var(--sage); padding-left: 1rem; }
        .cert-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .cert-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 2.2rem; box-shadow: var(--shadow); flex: 1; min-width: 240px; transition: all 0.25s; text-align: center; position: relative; overflow: hidden; text-decoration: none; display: block; }
        .cert-card::after { content: ''; position: absolute; inset: 0; background: var(--accent-soft); opacity: 0; transition: opacity 0.25s; }
        .cert-card:hover::after { opacity: 1; }
        .cert-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--accent); }
        .cert-icon { font-size: 2.5rem; margin-bottom: 1.2rem; position: relative; z-index: 1; }
        .cert-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--ink); margin-bottom: 6px; position: relative; z-index: 1; }
        .cert-issuer { font-size: 0.8rem; color: var(--ink-light); position: relative; z-index: 1; }
        .cert-link { margin-top: 1.2rem; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--accent); font-weight: 700; letter-spacing: 1px; position: relative; z-index: 1; display: block; }
        .cert-card-wip { position: relative; opacity: 0.6; cursor: pointer; border-style: dashed !important; }
        .cert-card-wip:hover { opacity: 0.85; }
        .cert-card-wip .cert-icon { filter: grayscale(1); }
        .wip-tooltip { position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(4px); background: var(--ink); color: var(--cream); font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; padding: 6px 12px; border-radius: 6px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s ease, transform 0.2s ease; z-index: 10; }
        .wip-tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 5px solid transparent; border-top-color: var(--ink); }
        .cert-card-wip:hover .wip-tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }
        .section-centered { text-align: center; display: flex; flex-direction: column; align-items: center; }
        .hobbies-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 1rem; width: 100%; max-width: 700px; }
        .hobby-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.7rem; background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 2rem 1rem; font-size: 0.88rem; font-weight: 600; color: var(--ink); box-shadow: var(--shadow); transition: all 0.25s; cursor: default; transform: rotate(var(--card-rotation, 0deg)); }
        .hobby-card:hover { transform: rotate(0deg) scale(1.08) !important; border-color: var(--accent) !important; color: var(--accent); box-shadow: 0 8px 32px rgba(124,131,200,0.25); background: var(--accent-soft); }
        .hobby-card:hover .hobby-card-icon { animation: iconPop 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes iconPop { 0% { transform: scale(1); } 50% { transform: scale(1.45) rotate(-8deg); } 100% { transform: scale(1.15) rotate(0deg); } }
        .hobby-card-icon { font-size: 2rem; line-height: 1; }
        .hobby-card-label { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
        .wip-comment-centered { display: flex; justify-content: center; margin-top: 2.2rem; }
        .wip-comment { display: inline-flex; align-items: center; gap: 0.4rem; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--ink-light); padding: 0.55rem 1rem; background: var(--accent-soft); border-left: 2px solid var(--accent); border-radius: 0 8px 8px 0; opacity: 0.85; margin-top: 2.2rem; }
        .wip-comment .wip-punct { color: var(--accent); font-weight: 700; }
        .currently-section { min-height: unset; padding-top: 80px; padding-bottom: 80px; }
        .currently-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 2.5rem; max-width: 780px; width: 100%; }
        .currently-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 1.2rem 1rem; display: flex; align-items: flex-start; gap: 0.7rem; box-shadow: var(--shadow); transition: all 0.2s; }
        .currently-card:hover { border-color: var(--accent); transform: translateY(-3px); box-shadow: var(--shadow-lg); }
        .currently-card-icon { font-size: 1.3rem; line-height: 1.4; flex-shrink: 0; }
        .currently-card-body { min-width: 0; }
        .currently-card-label { font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 4px; }
        .currently-card-value { font-size: 0.82rem; font-weight: 600; color: var(--ink); overflow: hidden; text-overflow: ellipsis; line-height: 1.4; }
        .footer-easter-hint { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 1.2rem; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--ink-light); opacity: 0.25; letter-spacing: 1.5px; user-select: none; transition: opacity 0.3s; }
        .footer-easter-hint:hover { opacity: 0.45; }
        .footer-hint-cursor { display: inline-block; width: 1.5px; height: 0.75em; background: var(--accent); vertical-align: text-bottom; animation: blink 1.2s step-end infinite; margin-left: 1px; }
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
        body.custom-cursor * { cursor: none !important; }
        .cursor-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); position: fixed; transform: translate(-50%,-50%); transition: width 0.15s, height 0.15s, background 0.15s; z-index: 9999; pointer-events: none; }
        .cursor-dot.hover { width: 10px; height: 10px; background: var(--accent2); }
        .cursor-ring { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--accent); position: fixed; transform: translate(-50%,-50%); transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease, border-color 0.2s ease; opacity: 0.5; z-index: 9998; pointer-events: none; }
        .cursor-ring.hover { width: 48px; height: 48px; opacity: 0.2; border-color: var(--accent2); }
        .back-to-top { position: fixed; bottom: 2rem; right: 2rem; z-index: 50; width: 44px; height: 44px; border-radius: 50%; background: var(--accent); color: white; border: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(124,131,200,0.4); opacity: 0; transform: translateY(16px); transition: opacity 0.3s, transform 0.3s; font-size: 1.1rem; cursor: pointer; }
        .back-to-top.visible { opacity: 1; transform: translateY(0); }
        .back-to-top:hover { background: var(--accent2); transform: translateY(-3px); }
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
        @keyframes vinylSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        /* Intro screen */
        .intro-screen { position: fixed; inset: 0; z-index: 200; background: #07060f; transition: opacity 1s ease, visibility 1s ease; padding: 0; }
        .intro-screen.leaving { opacity: 0; visibility: hidden; pointer-events: none; }
        .intro-stage { position: relative; width: min(1140px, 100%); height: 100%; margin: 0 auto; }
        .intro-glow { position: absolute; inset: 0; pointer-events: none; transition: background 1s ease; }
        .intro-glow.active { background: radial-gradient(ellipse 55% 65% at 42% 46%, rgba(144,153,216,0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 58% 62%, rgba(124,131,200,0.08) 0%, transparent 60%); }
        .intro-lamp-side { display: flex; flex-direction: column; align-items: center; position: absolute; top: 38%; left: 14%; right: auto; flex-shrink: 0; transform: translate(-8px, -50%); transform-origin: top center; z-index: 3; }
        .intro-lamp-svg-wrap { width: min(380px, 36vw); transform: scaleX(-1); transform-origin: center; }
        .intro-lamp-svg-wrap svg { width: 100%; height: auto; overflow: visible; }
        .lamp-bulb { transition: fill 0.6s ease; }
        .lamp-bulb.lit { fill: #fffbe8; filter: drop-shadow(0 0 12px rgba(255,240,180,0.9)) drop-shadow(0 0 30px rgba(200,190,255,0.6)); }
        .lamp-beam { opacity: 0; transition: opacity 0.8s ease; }
        .lamp-beam.active { opacity: 1; }
        .intro-cord-wrap { display: flex; flex-direction: column; align-items: center; cursor: pointer; user-select: none; margin-top: -6px; margin-left: 36px; animation: cordSway 3s ease-in-out infinite; transform-origin: top center; }
        .intro-cord-wrap.pulled { animation: cordPull 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes cordSway { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes cordPull { 0% { transform: translateY(0); } 45% { transform: translateY(32px); } 100% { transform: translateY(0); } }
        .intro-cord-line { width: 1.5px; height: 64px; background: linear-gradient(180deg, rgba(144,153,216,0.7), rgba(144,153,216,0.25)); }
        .intro-cord-knob { width: 14px; height: 20px; background: linear-gradient(180deg, #9099D8, #6b72b8); border-radius: 3px; box-shadow: 0 2px 10px rgba(124,131,200,0.5); transition: box-shadow 0.2s, transform 0.2s; }
        .intro-cord-wrap:hover .intro-cord-knob { box-shadow: 0 2px 22px rgba(144,153,216,0.85); transform: scale(1.1); }
        .intro-cord-hint { margin-top: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.55rem; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(144,153,216,0.4); animation: hintFade 2.5s ease-in-out infinite; }
        @keyframes hintFade { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        .intro-vinyl-side { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; position: absolute; right: 4%; top: 50%; transform: translateY(-50%); flex-shrink: 0; margin-top: 0; }
        .intro-vinyl-outer { position: relative; display: inline-block; }
        .intro-vinyl-wrap { width: min(340px, 34vw); height: min(340px, 34vw); animation: vinylSpin 6s linear infinite; animation-play-state: paused; transition: filter 0.8s ease; filter: brightness(0.3); }
        .intro-vinyl-wrap.spinning { animation-play-state: running; filter: brightness(1); }
        .intro-vinyl-wrap svg { width: 100%; height: 100%; }
        .intro-tonearm-wrap { position: absolute; top: clamp(-10px,-2vw,-14px); right: clamp(-28px,-5vw,-38px); width: clamp(70px,10vw,95px); pointer-events: none; transform-origin: 90% 8%; transform: rotate(-18deg); transition: transform 0.9s cubic-bezier(0.4,0,0.2,1), opacity 0.8s ease; opacity: 0.4; }
        .intro-tonearm-wrap.playing { transform: rotate(0deg); opacity: 1; }
        .intro-quote { font-family: 'Playfair Display', serif; font-size: clamp(0.85rem, 1.8vw, 1.05rem); font-style: italic; font-weight: 700; color: rgba(180,175,210,0.35); text-align: center; max-width: 300px; line-height: 1.65; transition: color 0.8s ease; animation: fadeUp 1s 0.5s ease both; }
        .intro-quote.lit { color: rgba(210,205,240,0.8); }
        .intro-quote-typewriter { display: inline-flex; align-items: center; min-height: 2.2em; }
        .intro-quote-caret { display: inline-block; width: 1.5px; height: 1.05em; margin-left: 5px; background: currentColor; animation: blink 1s step-end infinite; opacity: 0.85; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-logo-status { display: none; }
          .hamburger { display: flex; }
          section { padding: 90px 1.5rem 60px; }
          .hero-visual { display: none; }
          .mobile-blobs { display: block; }
          .currently-grid { grid-template-columns: 1fr 1fr; max-width: 100%; }
          .edu-item { --tl-col: 110px; grid-template-columns: var(--tl-col) 1fr; }
          .section-divider { padding: 0 1.5rem; }
          .footer-quote { padding: 3rem 1.5rem 2rem; }
          .footer-bottom { padding: 1.5rem; }
          .easter-box { padding: 2rem 1.5rem; }
          .intro-stage { display: flex; flex-direction: column; justify-content: flex-start; align-items: center; gap: 0.8rem; padding-top: 0.7rem; padding-right: 0; }
          .intro-lamp-side { position: static; top: auto; right: auto; transform: scale(0.85) translate(-8px, -14px); }
          .intro-vinyl-side { position: static; top: auto; right: auto; transform: none; margin-top: 18px; }
          .intro-vinyl-wrap { width: 200px; height: 200px; }
        }
      `}</style>

      {/* Intro screen */}
      <div className={`intro-screen${lightOn ? " leaving" : ""}`}>
        <div className={`intro-glow${cordPulled ? " active" : ""}`} />
        <div className="intro-stage">
          <div className="intro-lamp-side">
            <div className="intro-lamp-svg-wrap">
              <svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="lampShadeGrad" cx="50%" cy="0%" r="100%">
                    <stop offset="0%" stopColor="#3a3560" />
                    <stop offset="100%" stopColor="#1e1b30" />
                  </radialGradient>
                </defs>
                <ellipse cx="80" cy="208" rx="36" ry="7" fill="#1a1728" stroke="rgba(144,153,216,0.3)" strokeWidth="1" />
                <rect x="74" y="160" width="12" height="50" rx="4" fill="#2a2640" stroke="rgba(144,153,216,0.2)" strokeWidth="1" />
                <path d="M80 160 Q80 120 55 100" stroke="#2a2640" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M80 160 Q80 120 55 100" stroke="rgba(144,153,216,0.15)" strokeWidth="1" strokeLinecap="round" fill="none" />
                <path d="M55 100 Q48 92 50 82" stroke="#2a2640" strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M30 82 Q50 60 70 82 L62 100 Q50 108 38 100 Z" fill="url(#lampShadeGrad)" stroke="rgba(144,153,216,0.25)" strokeWidth="1" />
                <path className={`lamp-beam${cordPulled ? " active" : ""}`} d="M38 100 Q50 108 62 100 L80 160 Q50 175 20 160 Z" fill="rgba(200,195,255,0.07)" />
                <circle cx="50" cy="90" r="7" className={`lamp-bulb${cordPulled ? " lit" : ""}`} fill="#2a2640" />
              </svg>
            </div>
            <div className={`intro-cord-wrap${cordPulled ? " pulled" : ""}`} onClick={handlePullCord}>
              <div className="intro-cord-line" />
              <div className="intro-cord-knob" />
              <div className="intro-cord-hint">pull</div>
            </div>
          </div>

          <div className="intro-vinyl-side">
            <div className="intro-vinyl-outer">
              <div className={`intro-vinyl-wrap${cordPulled ? " spinning" : ""}`}>
                <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="ivGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2a2535" />
                      <stop offset="35%" stopColor="#1a1726" />
                      <stop offset="60%" stopColor="#201d2e" />
                      <stop offset="100%" stopColor="#111020" />
                    </radialGradient>
                    <radialGradient id="ilGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#9099D8" />
                      <stop offset="100%" stopColor="#7C83C8" />
                    </radialGradient>
                    <radialGradient id="iShine" cx="35%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                  </defs>
                  <circle cx="150" cy="150" r="148" fill="url(#ivGrad)" stroke="rgba(124,131,200,0.12)" strokeWidth="1" />
                  {[28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143].map((r, i) => (
                    <circle key={i} cx="150" cy="150" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  ))}
                  <circle cx="150" cy="150" r="46" fill="url(#ilGrad)" />
                  <circle cx="150" cy="150" r="44" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                  <text x="150" y="136" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="7.5" fontWeight="700" fill="white" opacity="0.95">In the Court of</text>
                  <text x="150" y="148" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="7.5" fontWeight="700" fill="white" opacity="0.95">the Crimson King</text>
                  <text x="150" y="162" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" fill="rgba(255,255,255,0.55)" letterSpacing="1">KING CRIMSON</text>
                  <text x="150" y="172" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="4.5" fill="rgba(255,255,255,0.3)" letterSpacing="0.5">1969</text>
                  <circle cx="150" cy="150" r="5" fill="#0d0b14" />
                  <circle cx="150" cy="150" r="148" fill="url(#iShine)" />
                </svg>
              </div>
              <div className={`intro-tonearm-wrap${cordPulled ? " playing" : ""}`}>
                <svg viewBox="0 0 80 160" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4a4568" />
                      <stop offset="100%" stopColor="#2a2640" />
                    </linearGradient>
                  </defs>
                  <circle cx="68" cy="10" r="9" fill="url(#armGrad)" stroke="rgba(144,153,216,0.4)" strokeWidth="1.5" />
                  <circle cx="68" cy="10" r="4" fill="#1a1728" stroke="rgba(144,153,216,0.3)" strokeWidth="1" />
                  <path d="M68 18 Q60 60 30 130" stroke="url(#armGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M24 126 L36 122 L34 138 L22 142 Z" fill="url(#armGrad)" stroke="rgba(144,153,216,0.3)" strokeWidth="1" />
                  <line x1="28" y1="142" x2="26" y2="150" stroke="rgba(200,195,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="26" cy="151" r="2" fill="#9099D8" opacity="0.9" />
                </svg>
              </div>
            </div>
            <div className={`intro-quote${cordPulled ? " lit" : ""}`}>
              <span className="intro-quote-typewriter">
                {introTypeText}
                {cordPulled && <span className="intro-quote-caret" />}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* â”€â”€ Nav â”€â”€ */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => scrollTo("Home")}>
          KK<span className="dot">.</span>
          <span className="nav-logo-status"><span className="nav-logo-status-dot" />open to work</span>
        </div>
        <ul className="nav-links">
          {NAV.map((n) => (
            <li key={n}><button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>{n}</button></li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="dark-toggle" onClick={() => setDark(!dark)}>{dark ? "\u2600\uFE0F" : "\uD83C\uDF19"} {dark ? "Light" : "Dark"}</button>
          <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV.map((n) => (<button key={n} onClick={() => scrollTo(n)}>{n}</button>))}
      </div>

      {/* â”€â”€ Hero â”€â”€ */}
      <section className="hero" data-section="Home" ref={(el) => (sectionRefs.current["Home"] = el)}>
        <div className="hero-visual">
          <div className="vinyl-wrap">
            <svg className="vinyl-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="vinylGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2a2535" />
                  <stop offset="35%" stopColor="#1a1726" />
                  <stop offset="60%" stopColor="#201d2e" />
                  <stop offset="100%" stopColor="#111020" />
                </radialGradient>
                <radialGradient id="labelGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#9099D8" />
                  <stop offset="100%" stopColor="#7C83C8" />
                </radialGradient>
                <radialGradient id="shineGrad" cx="35%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
              <circle cx="150" cy="150" r="148" fill="url(#vinylGrad)" stroke="rgba(124,131,200,0.15)" strokeWidth="1" />
              {[30,34,38,42,46,50,54,58,62,66,70,74,78,82,86,90,94,98,102,106,110,114,118,122,126,130,134,138].map((r, i) => (
                <circle key={i} cx="150" cy="150" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
              ))}
              <circle cx="150" cy="150" r="42" fill="url(#labelGrad)" />
              <circle cx="150" cy="150" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <text x="150" y="140" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="7" fontWeight="700" fill="white" opacity="0.9">In the Court of</text>
              <text x="150" y="150" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="7" fontWeight="700" fill="white" opacity="0.9">the Crimson King</text>
              <text x="150" y="162" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" fill="rgba(255,255,255,0.6)" letterSpacing="1">KING CRIMSON</text>
              <circle cx="150" cy="150" r="5" fill="#0d0b14" />
              <circle cx="150" cy="150" r="148" fill="url(#shineGrad)" />
            </svg>
          </div>
          <div className="hero-tonearm-wrap">
            <svg viewBox="0 0 80 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="heroArmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4a4568" />
                  <stop offset="100%" stopColor="#2a2640" />
                </linearGradient>
              </defs>
              <circle cx="68" cy="10" r="9" fill="url(#heroArmGrad)" stroke="rgba(144,153,216,0.4)" strokeWidth="1.5" />
              <circle cx="68" cy="10" r="4" fill="#1a1728" stroke="rgba(144,153,216,0.3)" strokeWidth="1" />
              <path d="M68 18 Q60 60 30 130" stroke="url(#heroArmGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M24 126 L36 122 L34 138 L22 142 Z" fill="url(#heroArmGrad)" stroke="rgba(144,153,216,0.3)" strokeWidth="1" />
              <line x1="28" y1="142" x2="26" y2="150" stroke="rgba(200,195,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="26" cy="151" r="2" fill="#9099D8" opacity="0.9" />
            </svg>
          </div>
        </div>
        <div className="hero-intro-greeting">-- hi, I'm Kevalya</div>
        <div className="hero-intro-line">
          I would've preferred to introduce myself<br />in person, but <strong>here we are.</strong>
        </div>
        <div className="hero-aside">
          <span>{'// veni, vidi, segfault.'}</span>&nbsp; then fixed it.
        </div>
        <div className="hero-name-small">Kevalya Khandelwal - CSE @ UPES Dehradun</div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("Contact")}>Get in Touch {"\u2192"}</button>
          <button className="btn-outline" onClick={() => scrollTo("Experience")}>View Experience</button>
        </div>
        <div className="social-row">
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
            LinkedIn
          </a>
          <a href={data.github} target="_blank" rel="noreferrer" className="social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
            GitHub
          </a>
        </div>
        <div className="hero-scroll"><div className="scroll-line" /> scroll</div>
        <div className="mobile-blobs">
          <div className="mobile-blob" /><div className="mobile-blob" /><div className="mobile-blob" />
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">&#10022;</div></div>

      {/* â”€â”€ Education â”€â”€ */}
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

      <div className="section-divider"><div className="divider-symbol">&#10022;</div></div>

      {/* â”€â”€ Experience â”€â”€ */}
      <section data-section="Experience" ref={(el) => (sectionRefs.current["Experience"] = el)}>
        <div className="section-overline reveal">Work & Volunteering</div>
        <div className="section-title reveal reveal-delay-1">My <em>Experience</em></div>
        <div className="exp-grid">
          {data.experience.map((ex, i) => (
            <div className={`exp-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="exp-year">{ex.year}</div>
              <div className="exp-type">{ex.type}</div>
              <div className="exp-role">{ex.role}</div>
              <div className="exp-org">{ex.org}</div>
              <div className="exp-desc">{ex.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">&#10022;</div></div>

      {/* â”€â”€ Skills â”€â”€ */}
      <section data-section="Skills" ref={(el) => (sectionRefs.current["Skills"] = el)}>
        <div className="section-overline reveal">{'// toolkit'}</div>
        <div className="section-title reveal reveal-delay-1">My <em>Skills</em></div>
        <div className="skills-groups reveal reveal-delay-2">
          {data.skillGroups.map((group, gi) => {
            const groupClass = group.label === "Languages" ? "skill-group-languages" : group.label === "Design" ? "skill-group-design" : "skill-group-management";
            return (
              <div className={`skill-group ${groupClass}`} key={gi}>
                <div className="skill-group-label">{group.label}</div>
                <div className="skill-pills">
                  {group.skills.map((s, si) => (
                    <div className="skill-pill" key={si}>{s}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="wip-comment-centered reveal reveal-delay-3">
          <span className="wip-comment"><span className="wip-punct">{'/*'}</span> {"\uD83D\uDEA7"} more skills loading... <span className="wip-punct">{'*/'}</span></span>
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">&#10022;</div></div>

      {/* â”€â”€ Certificates â”€â”€ */}
      <section data-section="Certificates" ref={(el) => (sectionRefs.current["Certificates"] = el)}>
        <div className="section-overline reveal">Achievements</div>
        <div className="section-title reveal reveal-delay-1">My <em>Certificates</em></div>
        <div className="cert-grid">
          {data.certificates.map((c, i) => (
            <a href={c.link} target="_blank" rel="noreferrer" className={`cert-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-name">{c.name}</div>
              <div className="cert-issuer">{c.issuer}</div>
              <div className="cert-link">VIEW CERTIFICATE {"\u2192"}</div>
            </a>
          ))}
          <div className={`cert-card cert-card-wip reveal reveal-delay-${data.certificates.length + 1}`}>
            <div className="wip-tooltip">// still earning these</div>
            <div className="cert-icon">{"\uD83D\uDEA7"}</div>
            <div className="cert-name">More Coming</div>
            <div className="cert-issuer">Work in Progress</div>
            <div className="cert-link">STAY TUNED {"\u2192"}</div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">&#10022;</div></div>

      {/* â”€â”€ Beyond Code â”€â”€ */}
      <section data-section="Beyond Code" ref={(el) => (sectionRefs.current["Beyond Code"] = el)} className="section-centered">
        <div className="section-overline" style={{ justifyContent: "center" }}>My Interests</div>
        <div className="section-title">Beyond <em>Code</em></div>
        <div className="hobbies-grid">
          {data.hobbies.map((h, i) => {
            const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8];
            return (
              <div className={`hobby-card reveal reveal-delay-${(i % 3) + 1}`} key={i} style={{ "--card-rotation": `${rotations[i % rotations.length]}deg` }}>
                <span className="hobby-card-icon">{h.icon}</span>
                <span className="hobby-card-label">{h.label}</span>
              </div>
            );
          })}
        </div>
        <div className="wip-comment-centered reveal reveal-delay-3">
          <span className="wip-comment"><span className="wip-punct">{'/*'}</span> {"\uD83D\uDEA7"} still exploring... <span className="wip-punct">{'*/'}</span></span>
        </div>
      </section>

      <div className="section-divider"><div className="divider-symbol">&#10022;</div></div>

      {/* â”€â”€ Contact â”€â”€ */}
      <section data-section="Contact" ref={(el) => (sectionRefs.current["Contact"] = el)} className="section-centered">
        <div className="section-overline" style={{ justifyContent: "center" }}>Say Hello</div>
        <div className="section-title">Get in <em>Touch</em></div>
        <div className="contact-wrap">
          <div className="contact-links">
            <div className="contact-detail">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
            <div className="contact-detail">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              <a href={data.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/kevalyakhandelwal</a>
            </div>
            <div className="contact-detail">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>
              <a href={data.github} target="_blank" rel="noreferrer">github.com/keva1ya</a>
            </div>
          </div>
          {sent ? (
            <div className="success-msg">{"\u2705"} Message sent! I will get back to you soon.</div>
          ) : (
            <form onSubmit={handleForm} style={{ textAlign: "left" }}>
              <div className="form-group"><label>Your Name</label><input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} /></div>
              <div className="form-group"><label>Email</label><input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} /></div>
              <div className="form-group"><label>Message</label><textarea rows="5" required placeholder="Tell me about your project or idea..." value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} /></div>
              <div style={{ textAlign: "center" }}><button className="btn-primary" type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message \u2192"}</button></div>
            </form>
          )}
        </div>
      </section>

      {!isTouchDevice && (
        <>
          <div ref={cursorDotRef} className={`cursor-dot ${cursorHover ? "hover" : ""}`} style={{ left: -100, top: -100 }} />
          <div ref={cursorRingRef} className={`cursor-ring ${cursorHover ? "hover" : ""}`} style={{ left: -100, top: -100 }} />
        </>
      )}

      <button className={`back-to-top ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">{"\u2191"}</button>

      <div className="section-divider"><div className="divider-symbol">&#10022;</div></div>

      {/* â”€â”€ Currently â”€â”€ */}
      <section data-section="Currently" className="section-centered currently-section">
        <div className="section-overline" style={{ justifyContent: "center" }}>right now</div>
        <div className="section-title">What I'm <em>Up To</em></div>
        <div className="currently-grid">
          <div className="currently-card reveal reveal-delay-1">
            <span className="currently-card-icon">{"\uD83D\uDCD6"}</span>
            <div className="currently-card-body">
              <div className="currently-card-label">Reading</div>
              <div className="currently-card-value">1984 & Crime & Punishment</div>
            </div>
          </div>
          <div className="currently-card reveal reveal-delay-2">
            <span className="currently-card-icon">{"\uD83C\uDFAE"}</span>
            <div className="currently-card-body">
              <div className="currently-card-label">Playing</div>
              <div className="currently-card-value">God of War Ragnarok</div>
            </div>
          </div>
          <div className="currently-card reveal reveal-delay-3">
            <span className="currently-card-icon">{"\uD83D\uDD27"}</span>
            <div className="currently-card-body">
              <div className="currently-card-label">Building</div>
              <div className="currently-card-value">A Commercial Software </div>
            </div>
          </div>
          <div className="currently-card reveal" style={{ transitionDelay: "0.4s" }}>
            <span className="currently-card-icon">{"\uD83C\uDFB5"}</span>
            <div className="currently-card-body">
              <div className="currently-card-label">Jamming to</div>
              <div className="currently-card-value">King Crimson</div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Footer â”€â”€ */}
      <footer>
        <div className="footer-quote">
          <blockquote onClick={handleFooterTap}>One must still have chaos in oneself to give birth to a dancing star.</blockquote>
          <cite>{"\u2014"} Friedrich Nietzsche</cite>
          <div className="footer-easter-hint">// there's more here<span className="footer-hint-cursor" /></div>
        </div>
        <div className="footer-bottom">
          <div className="footer-inner">
            <div>
              <div className="footer-name">Kevalya Khandelwal</div>
              <div className="footer-tagline">Full Stack {"\u00B7"} UI/UX {"\u00B7"} Management</div>
            </div>
            <div className="footer-copy">Designed & built with intention {"\u00B7"} {new Date().getFullYear()}</div>
          </div>
        </div>
      </footer>

      {(easterEgg || easterEgg2) && currentPoem && (
        <div className="easter-overlay" onClick={() => { setEasterEgg(false); setEasterEgg2(false); }}>
          <div className="easter-box" onClick={(e) => e.stopPropagation()}>
            <div className="easter-tag">{currentPoem.tag}</div>
            <div className="easter-poem">
              {currentPoem.poem}
              <em>{currentPoem.em}</em>
            </div>
            <button className="easter-close" onClick={() => { setEasterEgg(false); setEasterEgg2(false); }}>close</button>
          </div>
        </div>
      )}
    </>
  );
}










