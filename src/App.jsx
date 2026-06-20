import { useState, useEffect, useRef } from "react";

const COLORS = {
  primary: "#1a6fa3",
  primaryDark: "#0d4f78",
  accent: "#f97316",
  accentLight: "#fed7aa",
  sky: "#e0f2fe",
  teal: "#0d9488",
  darkBg: "#0f172a",
  darkCard: "#1e293b",
  darkBorder: "#334155",
};

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Causes", href: "#causes" },
  { label: "Impact", href: "#impact" },
  { label: "Volunteer", href: "#volunteer" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const CAUSES = [
  { icon: "🍱", title: "Food Distribution", desc: "Providing nutritious meals to thousands of underprivileged families and stray animals across Kanpur & Ghaziabad.", color: "#f97316" },
  { icon: "📚", title: "Education Drive", desc: "Educating underprivileged children and youth to break the cycle of poverty through knowledge and skill building.", color: "#1a6fa3" },
  { icon: "🩺", title: "Health & Hygiene", desc: "Distributing sanitary napkins & creating awareness campaigns on personal hygiene, especially for women.", color: "#0d9488" },
  { icon: "👕", title: "Clothing Support", desc: "Providing warm clothes to poor families during winters, restoring dignity to those facing hardship.", color: "#7c3aed" },
  { icon: "🐾", title: "Animal Welfare", desc: "Extending our compassion to stray animals by ensuring they are fed and cared for alongside the community.", color: "#dc2626" },
  { icon: "💼", title: "Internship Program", desc: "Empowering 30,000+ students with real-world skills through purpose-driven internships that make a difference.", color: "#d97706" },
];

const STATS = [
  { number: "2,00,000+", label: "Lives Impacted" },
  { number: "30,000+", label: "Interns Trained" },
  { number: "5+", label: "Cities Active" },
  { number: "12A & 80G", label: "Tax Certified NGO" },
];

const TEAM = [
  { name: "Founder Team", role: "Youth Leaders", initials: "YL", color: "#1a6fa3" },
  { name: "Volunteer Network", role: "Community Changemakers", initials: "VC", color: "#f97316" },
  { name: "Intern Corps", role: "Student Leaders", initials: "SL", color: "#0d9488" },
];

const GALLERY_ITEMS = [
  { emoji: "🍛", label: "Food Distribution Drive", bg: "#fef3c7" },
  { emoji: "📖", label: "Education Camp", bg: "#dbeafe" },
  { emoji: "🧣", label: "Winter Clothing Drive", bg: "#ede9fe" },
  { emoji: "🩹", label: "Health Awareness Camp", bg: "#d1fae5" },
  { emoji: "🐕", label: "Animal Feeding", bg: "#fee2e2" },
  { emoji: "🎓", label: "Internship Program", bg: "#fce7f3" },
];

const TESTIMONIALS = [
  { quote: "Working with NayePankh gave me purpose. I served food to families in need and realized how much joy small acts of kindness can bring.", name: "Vidisha Saxena", role: "Intern, NayePankh" },
  { quote: "This internship transformed my perspective. The foundation truly lives its values — every student feels like a change-maker.", name: "Rahul Gupta", role: "Volunteer" },
  { quote: "NayePankh is proof that youth-led change is real. Thousands of lives touched, and they're just getting started.", name: "Priya Sharma", role: "Community Member" },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function AnimatedSection({ children, className = "", style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.7s ease, transform 0.7s ease", ...style }}>
      {children}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [volunteerData, setVolunteerData] = useState({ name: "", email: "", city: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);
  const [volSubmitted, setVolSubmitted] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (let id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveNav(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const bg = dark ? COLORS.darkBg : "#f8fafc";
  const cardBg = dark ? COLORS.darkCard : "#ffffff";
  const text = dark ? "#f1f5f9" : "#1e293b";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const border = dark ? COLORS.darkBorder : "#e2e8f0";
  const navBg = dark ? "rgba(15,23,42,0.97)" : "rgba(255,255,255,0.97)";

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: bg, color: text, minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: ${bg}; } ::-webkit-scrollbar-thumb { background: ${COLORS.primary}; border-radius: 3px; }
        .nav-link { cursor: pointer; padding: 8px 14px; border-radius: 8px; font-size: 15px; font-weight: 500; transition: all 0.2s; color: ${text}; text-decoration: none; }
        .nav-link:hover { background: ${dark ? "#1e3a5f" : COLORS.sky}; color: ${COLORS.primary}; }
        .nav-link.active { background: ${COLORS.primary}; color: white; }
        .btn-primary { background: ${COLORS.accent}; color: white; border: none; padding: 13px 28px; border-radius: 50px; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 4px 18px rgba(249,115,22,0.35); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.45); }
        .btn-outline { background: transparent; color: white; border: 2.5px solid white; padding: 12px 28px; border-radius: 50px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: white; color: ${COLORS.primary}; }
        .cause-card { background: ${cardBg}; border: 1px solid ${border}; border-radius: 18px; padding: 28px 24px; transition: transform 0.25s, box-shadow 0.25s; cursor: default; }
        .cause-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(26,111,163,0.14); }
        .input-field { width: 100%; padding: 13px 16px; border-radius: 10px; border: 1.5px solid ${border}; background: ${dark ? "#0f172a" : "#f8fafc"}; color: ${text}; font-size: 15px; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: ${COLORS.primary}; }
        .stat-card { background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.teal}); border-radius: 20px; padding: 30px 20px; text-align: center; color: white; }
        .gallery-card { border-radius: 16px; padding: 36px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; font-size: 48px; cursor: default; transition: transform 0.2s; }
        .gallery-card:hover { transform: scale(1.04); }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } .mobile-nav { display: none !important; } }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); border-radius: 50px; padding: 8px 18px; font-size: 14px; color: white; font-weight: 500; backdrop-filter: blur(6px); }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        .float { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .section-tag { display: inline-block; background: ${dark ? "#1e3a5f" : COLORS.sky}; color: ${COLORS.primary}; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 50px; margin-bottom: 14px; }
        .testimonial-card { background: ${cardBg}; border: 1px solid ${border}; border-radius: 20px; padding: 32px; max-width: 620px; margin: 0 auto; }
        .progress-bar { height: 8px; border-radius: 4px; background: ${dark ? "#334155" : "#e2e8f0"}; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent}); transition: width 1.5s ease; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: navBg, borderBottom: `1px solid ${border}`, backdropFilter: "blur(12px)", padding: "0 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🕊️</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: COLORS.primary, lineHeight: 1.1 }}>NayePankh</div>
              <div style={{ fontSize: 11, color: textMuted, fontWeight: 500 }}>Foundation</div>
            </div>
          </div>
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} className={`nav-link${activeNav === l.href.replace("#","") ? " active" : ""}`} onClick={() => scrollTo(l.href.replace("#",""))}>{l.label}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setDark(d => !d)} style={{ background: dark ? "#1e3a5f" : COLORS.sky, border: "none", borderRadius: "50%", width: 38, height: 38, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }} title="Toggle dark mode">{dark ? "☀️" : "🌙"}</button>
            <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }} onClick={() => scrollTo("contact")}>Donate Now</button>
            <button className="mobile-menu-btn" onClick={() => setMenuOpen(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: text, display: "none" }}>☰</button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-nav" style={{ background: navBg, padding: "12px 20px 20px", borderTop: `1px solid ${border}`, display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} className={`nav-link${activeNav === l.href.replace("#","") ? " active" : ""}`} onClick={() => scrollTo(l.href.replace("#",""))} style={{ display: "block" }}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.teal} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 40%)" }} />
        {["🕊️","❤️","🌟","✨","🙏"].map((e,i) => (
          <div key={i} className="float" style={{ position: "absolute", fontSize: 28, opacity: 0.25, top: `${[15,70,20,60,40][i]}%`, left: `${[8,85,92,5,50][i]}%`, animationDelay: `${i*0.6}s` }}>{e}</div>
        ))}
        <div style={{ maxWidth: 820, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <span className="hero-badge">🏛️ UP Govt. Registered • 80G & 12A Certified NGO</span>
          </div>
          <div className="pulse" style={{ fontSize: 72, marginBottom: 20 }}>🕊️</div>
          <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20, textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
            Giving Wings to the <span style={{ color: COLORS.accentLight }}>Underprivileged</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "rgba(255,255,255,0.87)", maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
            NayePankh Foundation — one of India's largest student-led NGOs — has uplifted <strong style={{ color: "white" }}>2 lakh+ lives</strong> through food, education, hygiene, and compassion.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("causes")}>Explore Our Causes</button>
            <button className="btn-outline" onClick={() => scrollTo("volunteer")}>Join as Volunteer</button>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 52, flexWrap: "wrap" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "white" }}>{s.number}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to bottom, transparent, ${bg})` }} />
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <AnimatedSection>
            <span className="section-tag">About Us</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>Born During COVID. <span style={{ color: COLORS.primary }}>Built for a Nation.</span></h2>
            <p style={{ fontSize: 16, color: textMuted, lineHeight: 1.8, marginBottom: 16 }}>
              NayePankh Foundation was initiated during the hardest days of COVID-19 to help people survive the crisis. What began as emergency relief soon evolved into a mission — giving "new wings" (Naye Pankh) to the underprivileged across India.
            </p>
            <p style={{ fontSize: 16, color: textMuted, lineHeight: 1.8, marginBottom: 28 }}>
              Registered under the Indian Society Act, 1860, affiliated with NITI Aayog, and featured in The Pioneer, Dainik Jagran & Hindustan — we operate in Kanpur, Ghaziabad and beyond. We are completely youth-led, with many members still in school or college.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["🏛️ Society Act 1860", "🇮🇳 NITI Aayog Affiliated", "💼 80G & 12A Certified", "📰 Media Featured"].map(t => (
                <span key={t} style={{ background: dark ? "#1e3a5f" : COLORS.sky, color: COLORS.primary, padding: "6px 14px", borderRadius: 50, fontSize: 13, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection style={{ transitionDelay: "0.15s" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🎯", title: "Our Mission", desc: "Uplift underprivileged communities through food, education, health & dignity.", color: COLORS.primary },
                { icon: "👁️", title: "Our Vision", desc: "A society where no one goes hungry, uneducated, or uncared for.", color: COLORS.teal },
                { icon: "💡", title: "Youth-Led", desc: "Entirely run by students & youth — the changemakers of tomorrow.", color: COLORS.accent },
                { icon: "🤝", title: "Community First", desc: "We work with communities, not just for them — building real partnerships.", color: "#7c3aed" },
              ].map(c => (
                <div key={c.title} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 16, padding: 22, borderLeft: `4px solid ${c.color}` }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: textMuted, lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CAUSES */}
      <section id="causes" style={{ padding: "80px 24px", background: dark ? "#0d1b2e" : "#f0f9ff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-tag">Our Causes</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}>What We Fight For</h2>
            <p style={{ color: textMuted, marginTop: 14, maxWidth: 560, margin: "14px auto 0", fontSize: 16 }}>Six pillars of compassion that guide every action we take in communities across India.</p>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {CAUSES.map((c, i) => (
              <AnimatedSection key={c.title} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="cause-card">
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{c.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10, color: c.color }}>{c.title}</h3>
                  <p style={{ color: textMuted, fontSize: 14.5, lineHeight: 1.7 }}>{c.desc}</p>
                  <div style={{ marginTop: 18, height: 3, background: `linear-gradient(90deg, ${c.color}, transparent)`, borderRadius: 2 }} />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" style={{ padding: "90px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-tag">Our Impact</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}>Numbers That Tell a Story</h2>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 60 }}>
          {STATS.map((s, i) => (
            <AnimatedSection key={s.label} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="stat-card">
                <div style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, marginBottom: 8 }}>{s.number}</div>
                <div style={{ fontSize: 15, opacity: 0.9 }}>{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          <AnimatedSection>
            <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Program Reach</h3>
            {[
              { label: "Food Distribution", pct: 92 },
              { label: "Education Programs", pct: 78 },
              { label: "Hygiene Awareness", pct: 85 },
              { label: "Clothing Drives", pct: 70 },
            ].map(p => (
              <div key={p.label} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, fontWeight: 600 }}>
                  <span>{p.label}</span><span style={{ color: COLORS.primary }}>{p.pct}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.pct}%` }} /></div>
              </div>
            ))}
          </AnimatedSection>
          <AnimatedSection style={{ transitionDelay: "0.2s" }}>
            <div className="testimonial-card">
              <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: textMuted, fontStyle: "italic", marginBottom: 20 }}>"{TESTIMONIALS[testimonialIdx].quote}"</p>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{TESTIMONIALS[testimonialIdx].name}</div>
              <div style={{ fontSize: 13, color: textMuted }}>{TESTIMONIALS[testimonialIdx].role}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                {TESTIMONIALS.map((_, i) => (
                  <div key={i} onClick={() => setTestimonialIdx(i)} style={{ width: i === testimonialIdx ? 28 : 10, height: 10, borderRadius: 5, background: i === testimonialIdx ? COLORS.primary : border, cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section id="volunteer" style={{ padding: "90px 24px", background: dark ? "#0d1b2e" : "#fff7ed" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <AnimatedSection style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">Get Involved</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}>Join the Movement 🚀</h2>
            <p style={{ color: textMuted, marginTop: 14, fontSize: 16 }}>Whether you're a student, professional, or simply a human who cares — there's a place for you at NayePankh.</p>
          </AnimatedSection>
          {volSubmitted ? (
            <AnimatedSection>
              <div style={{ background: cardBg, border: `2px solid ${COLORS.teal}`, borderRadius: 20, padding: 48, textAlign: "center" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <h3 style={{ fontWeight: 800, fontSize: 22, color: COLORS.teal, marginBottom: 12 }}>Welcome to the Family!</h3>
                <p style={{ color: textMuted, fontSize: 16 }}>We've received your volunteer registration. Our team will reach out to you soon. Together, let's change the world.</p>
              </div>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 24, padding: "40px 36px", boxShadow: "0 8px 40px rgba(26,111,163,0.08)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: textMuted }}>Full Name *</label>
                    <input className="input-field" placeholder="Your full name" value={volunteerData.name} onChange={e => setVolunteerData(d => ({ ...d, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: textMuted }}>Email Address *</label>
                    <input className="input-field" type="email" placeholder="your@email.com" value={volunteerData.email} onChange={e => setVolunteerData(d => ({ ...d, email: e.target.value }))} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: textMuted }}>City</label>
                    <input className="input-field" placeholder="Kanpur / Ghaziabad / Other" value={volunteerData.city} onChange={e => setVolunteerData(d => ({ ...d, city: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: textMuted }}>Area of Interest</label>
                    <select className="input-field" value={volunteerData.interest} onChange={e => setVolunteerData(d => ({ ...d, interest: e.target.value }))}>
                      <option value="">Select a cause</option>
                      <option>Food Distribution</option>
                      <option>Education</option>
                      <option>Health & Hygiene</option>
                      <option>Clothing Drives</option>
                      <option>Internship Program</option>
                      <option>Animal Welfare</option>
                    </select>
                  </div>
                </div>
                <button className="btn-primary" style={{ width: "100%", borderRadius: 12, padding: "15px" }} onClick={() => { if (volunteerData.name && volunteerData.email) setVolSubmitted(true); }}>
                  Register as Volunteer 🕊️
                </button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: "90px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <AnimatedSection style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-tag">Gallery</span>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}>Moments of Change</h2>
          <p style={{ color: textMuted, marginTop: 14, fontSize: 16 }}>Every moment captured is a life touched, a smile earned, a difference made.</p>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
          {GALLERY_ITEMS.map((g, i) => (
            <AnimatedSection key={g.label} style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="gallery-card" style={{ background: dark ? COLORS.darkCard : g.bg, border: `1px solid ${border}` }}>
                <span>{g.emoji}</span>
                <div style={{ fontSize: 14, fontWeight: 600, textAlign: "center", color: textMuted }}>{g.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "60px 24px 90px", background: dark ? "#0d1b2e" : "#f0f9ff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <span className="section-tag">Our Team</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, marginBottom: 48 }}>Youth. Heart. Action.</h2>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              {TEAM.map(t => (
                <div key={t.name} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: "32px 28px", minWidth: 200, textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 20, fontWeight: 800, color: "white" }}>{t.initials}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: textMuted }}>{t.role}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT / DONATE */}
      <section id="contact" style={{ padding: "90px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <AnimatedSection>
            <span className="section-tag">Contact & Donate</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, marginBottom: 16 }}>Help Us Reach Further</h2>
            <p style={{ color: textMuted, fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>Your donation (tax-deductible under 80G) can feed a family, educate a child, or give warmth on a cold winter night. Every rupee counts.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
              {[
                { icon: "📞", label: "Phone", val: "+91 83185 00748", href: "tel:+918318500748" },
                { icon: "🌐", label: "Website", val: "nayepankh.com", href: "https://nayepankh.com" },
                { icon: "📘", label: "Facebook", val: "NayePankh Foundation", href: "https://www.facebook.com/nayepankhfoundation/" },
                { icon: "📸", label: "Instagram", val: "@nayepankhfoundation", href: "https://www.instagram.com/nayepankhfoundation/" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: dark ? "#1e3a5f" : COLORS.sky, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: textMuted, fontWeight: 600 }}>{c.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.primary }}>{c.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection style={{ transitionDelay: "0.15s" }}>
            {submitted ? (
              <div style={{ background: cardBg, border: `2px solid ${COLORS.primary}`, borderRadius: 20, padding: 40, textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>🙏</div>
                <h3 style={{ fontWeight: 800, fontSize: 20, color: COLORS.primary, marginBottom: 10 }}>Thank you for reaching out!</h3>
                <p style={{ color: textMuted }}>We'll respond as soon as possible. Your support means the world to us and those we serve.</p>
              </div>
            ) : (
              <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 24, padding: "36px 32px" }}>
                <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Send a Message</h3>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: textMuted }}>Name</label>
                  <input className="input-field" placeholder="Your name" value={formData.name} onChange={e => setFormData(d => ({ ...d, name: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: textMuted }}>Email</label>
                  <input className="input-field" type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData(d => ({ ...d, email: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 8, color: textMuted }}>Message</label>
                  <textarea className="input-field" rows={4} placeholder="How would you like to contribute or support?" value={formData.message} onChange={e => setFormData(d => ({ ...d, message: e.target.value }))} style={{ resize: "vertical" }} />
                </div>
                <button className="btn-primary" style={{ width: "100%", borderRadius: 12, padding: 15 }} onClick={() => { if (formData.name && formData.email) setSubmitted(true); }}>
                  Send Message 🚀
                </button>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* DONATE BANNER */}
      <section style={{ margin: "0 24px 60px", borderRadius: 28, background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.teal})`, padding: "52px 40px", textAlign: "center", maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>
        <AnimatedSection>
          <div style={{ fontSize: 40, marginBottom: 12 }}>❤️</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 900, color: "white", marginBottom: 14 }}>Your Donation Gets 50% Tax Relief</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, maxWidth: 500, margin: "0 auto 28px" }}>As an 80G & 12A certified NGO, donations to NayePankh qualify for 50% income tax exemption under the IT Act.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://nayepankh.com/donate" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary" style={{ background: "white", color: COLORS.primary, boxShadow: "0 4px 18px rgba(0,0,0,0.2)" }}>Donate Now 💙</button>
            </a>
            <a href="https://nayepankh.com" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline">Visit Official Site</button>
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* FOOTER */}
      <footer style={{ background: dark ? "#020617" : "#0f172a", color: "#94a3b8", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>🕊️</span>
                <span style={{ fontWeight: 800, color: "white", fontSize: 18 }}>NayePankh Foundation</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>Giving wings to the underprivileged. UP Govt. Registered NGO · 80G & 12A Certified.</p>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "white", marginBottom: 16 }}>Quick Links</div>
              {NAV_LINKS.map(l => (
                <div key={l.label} onClick={() => scrollTo(l.href.replace("#",""))} style={{ marginBottom: 10, cursor: "pointer", fontSize: 14 }} onMouseOver={e => e.target.style.color = "white"} onMouseOut={e => e.target.style.color = "#94a3b8"}>{l.label}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "white", marginBottom: 16 }}>Causes</div>
              {CAUSES.map(c => (
                <div key={c.title} style={{ marginBottom: 10, fontSize: 14 }}>{c.icon} {c.title}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "white", marginBottom: 16 }}>Connect With Us</div>
              {[
                { label: "🌐 nayepankh.com", href: "https://nayepankh.com" },
                { label: "📘 Facebook", href: "https://www.facebook.com/nayepankhfoundation/" },
                { label: "📸 Instagram", href: "https://www.instagram.com/nayepankhfoundation/" },
                { label: "💼 LinkedIn", href: "https://www.linkedin.com/company/nayepankh" },
                { label: "📞 +91 83185 00748", href: "tel:+918318500748" },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginBottom: 10, fontSize: 14, color: "#94a3b8", textDecoration: "none" }} onMouseOver={e => e.target.style.color = "white"} onMouseOut={e => e.target.style.color = "#94a3b8"}>{l.label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 14 }}>© 2024 NayePankh Foundation. All rights reserved.</div>
            <div style={{ fontSize: 13 }}>Made with ❤️ by Youth, for the World</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
