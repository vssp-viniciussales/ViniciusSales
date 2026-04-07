// ════════════════════════════════════════
//   @vssp · SITE OFICIAL · SCRIPT
// ════════════════════════════════════════

'use strict';

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MOBILE MENU ──
const navMenu   = document.getElementById('navMenu');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

navMenu.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';

  const spans = navMenu.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    navMenu.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── LANGUAGE TOGGLE ──
let currentLang = 'pt';

function setLang(lang) {
  currentLang = lang;

  // Update buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update all elements with data-pt / data-en
  document.querySelectorAll('[data-pt], [data-en]').forEach(el => {
    const text = el.dataset[lang];
    if (text !== undefined) el.innerHTML = text;
  });

  // Update html lang
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

// Expose globally
window.setLang = setLang;

// ── SCROLL REVEAL (simple Intersection Observer) ──
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of timeline
      const delay = entry.target.closest('.timeline') ? (Array.from(
        entry.target.closest('.timeline').children
      ).indexOf(entry.target) * 120) : 0;

      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, delay);

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.style.color = href === current ? 'var(--ouro)' : '';
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ── HERO PARALLAX (subtle) ──
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
  if (!hero) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.25}px)`;
  }
}, { passive: true });

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  console.log('%c@vssp · Um homem em construção.', 'color: #C8A97E; font-size: 14px; font-weight: bold;');
});

/* ════════════════════════════════════════
   @vssp · SHARED STYLES · v2
════════════════════════════════════════ */
:root {
  --petroleo:  #0E1B2C;
  --petroleo2: #152438;
  --petroleo3: #1C2F45;
  --bege:      #F2EDD8;
  --taupe:     #C2B6AA;
  --ouro:      #C8A97E;
  --ouro-dark: #A8855A;
  --white:     #FAFAF5;
  --text:      #1C1C2E;
  --font-display: 'Cinzel', serif;
  --font-serif:   'Fraunces', serif;
  --font-sans:    'Syne', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body { background:var(--bege); color:var(--text); font-family:var(--font-sans); line-height:1.6; overflow-x:hidden; -webkit-font-smoothing:antialiased; }
a { text-decoration:none; color:inherit; }
img { display:block; max-width:100%; }

/* NAV */
.nav { position:fixed; top:0; left:0; right:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 48px; height:72px; transition:background .4s, border .4s; }
.nav.scrolled { background:rgba(14,27,44,.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(200,169,126,.15); }
.nav-logo { font-family:var(--font-display); font-size:20px; font-weight:900; color:var(--ouro); letter-spacing:4px; }
.nav-links { display:flex; gap:28px; align-items:center; }
.nav-link { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(242,237,216,.5); transition:color .2s; }
.nav-link:hover, .nav-link.active { color:var(--ouro); }
.nav-cta { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; text-transform:uppercase; background:var(--ouro); color:var(--petroleo); padding:8px 20px; border-radius:4px; font-weight:700; transition:background .2s; }
.nav-cta:hover { background:var(--ouro-dark); }
.nav-menu { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
.nav-menu span { display:block; width:24px; height:1.5px; background:var(--bege); transition:all .3s; }

/* MOBILE MENU */
.mobile-menu { position:fixed; inset:0; background:var(--petroleo); z-index:99; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:36px; opacity:0; pointer-events:none; transition:opacity .3s; }
.mobile-menu.open { opacity:1; pointer-events:all; }
.mobile-link { font-family:var(--font-display); font-size:28px; color:var(--bege); transition:color .2s; }
.mobile-link:hover { color:var(--ouro); }

/* LANG */
.lang-toggle { position:fixed; top:20px; right:24px; z-index:200; display:flex; align-items:center; gap:6px; background:rgba(14,27,44,.85); backdrop-filter:blur(12px); border:1px solid rgba(200,169,126,.25); border-radius:100px; padding:6px 14px; }
.lang-btn { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; color:rgba(242,237,216,.4); background:none; border:none; cursor:pointer; transition:color .2s; }
.lang-btn.active { color:var(--ouro); }
.lang-sep { color:rgba(200,169,126,.3); font-size:10px; }

/* PAGE HERO */
.page-hero { background:var(--petroleo); padding:160px 48px 100px; position:relative; overflow:hidden; }
.page-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 70% 60% at 20% 50%, rgba(27,58,107,.35) 0%, transparent 60%); }
.page-hero-frame { position:absolute; inset:20px; border:1px solid rgba(200,169,126,.15); pointer-events:none; }
.page-hero-inner { position:relative; z-index:1; max-width:900px; }
.page-kicker { font-family:var(--font-mono); font-size:10px; letter-spacing:5px; color:var(--ouro); text-transform:uppercase; margin-bottom:20px; opacity:.75; }
.page-title { font-family:var(--font-display); font-size:clamp(40px,7vw,80px); font-weight:900; color:var(--bege); line-height:1.1; margin-bottom:20px; }
.page-title span { color:var(--ouro); }
.page-subtitle { font-family:var(--font-serif); font-style:italic; font-size:clamp(16px,2.5vw,22px); color:rgba(242,237,216,.55); max-width:600px; line-height:1.7; }

/* CONTAINER */
.container { max-width:1200px; margin:0 auto; padding:0 48px; }
.section { padding:100px 0; }
.section-dark { background:var(--petroleo); }

/* SECTION HEADER */
.sec-label { font-family:var(--font-mono); font-size:10px; letter-spacing:4px; text-transform:uppercase; color:var(--ouro); margin-bottom:16px; display:flex; align-items:center; gap:12px; }
.sec-label::after { content:''; flex:1; height:1px; background:rgba(200,169,126,.2); }
.sec-title { font-family:var(--font-display); font-size:clamp(28px,4vw,48px); color:var(--text); margin-bottom:20px; line-height:1.15; }
.sec-title.light { color:var(--bege); }
.sec-body { font-size:16px; line-height:1.9; color:var(--taupe); max-width:640px; }
.sec-body.light { color:rgba(242,237,216,.6); }

/* BUTTONS */
.btn { display:inline-flex; align-items:center; gap:10px; font-family:var(--font-mono); font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:14px 28px; border-radius:4px; transition:all .2s; cursor:pointer; border:none; }
.btn-primary { background:var(--ouro); color:var(--petroleo); }
.btn-primary:hover { background:var(--ouro-dark); transform:translateY(-2px); }
.btn-outline { border:1px solid rgba(200,169,126,.4); color:var(--bege); background:none; }
.btn-outline:hover { border-color:var(--ouro); color:var(--ouro); transform:translateY(-2px); }
.btn-dark { background:var(--petroleo); color:var(--ouro); }
.btn-dark:hover { background:var(--petroleo2); transform:translateY(-2px); }

/* CARDS */
.card { background:var(--white); border:1px solid rgba(194,182,170,.25); border-radius:14px; padding:36px; transition:transform .2s var(--ease), box-shadow .2s; }
.card:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(14,27,44,.1); }
.card-dark { background:var(--petroleo2); border-color:rgba(200,169,126,.12); }
.card-dark:hover { border-color:rgba(200,169,126,.3); }

/* FORM */
.form-group { margin-bottom:20px; }
.form-label { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--taupe); margin-bottom:8px; display:block; }
.form-input, .form-textarea, .form-select {
  width:100%; background:rgba(14,27,44,.05); border:1px solid rgba(194,182,170,.35);
  border-radius:8px; padding:14px 18px; font-family:var(--font-sans); font-size:15px;
  color:var(--text); transition:border-color .2s, background .2s; outline:none;
}
.form-input:focus, .form-textarea:focus, .form-select:focus { border-color:var(--ouro); background:rgba(200,169,126,.04); }
.form-textarea { resize:vertical; min-height:120px; }
.form-dark .form-input, .form-dark .form-textarea, .form-dark .form-select { background:rgba(255,255,255,.05); border-color:rgba(200,169,126,.2); color:var(--bege); }
.form-dark .form-input::placeholder, .form-dark .form-textarea::placeholder { color:rgba(242,237,216,.25); }
.form-dark .form-input:focus, .form-dark .form-textarea:focus { border-color:var(--ouro); background:rgba(200,169,126,.06); }

/* FOOTER */
.footer { background:var(--petroleo2); border-top:1px solid rgba(200,169,126,.1); padding:60px 0 40px; }
.footer-grid { display:flex; justify-content:space-between; align-items:flex-start; gap:40px; margin-bottom:40px; flex-wrap:wrap; }
.footer-logo { font-family:var(--font-display); font-size:24px; font-weight:900; color:var(--ouro); letter-spacing:4px; margin-bottom:10px; }
.footer-tag { font-family:var(--font-serif); font-style:italic; font-size:14px; color:rgba(242,237,216,.4); }
.footer-nav { display:flex; flex-direction:column; gap:10px; }
.footer-nav a { font-family:var(--font-mono); font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(242,237,216,.3); transition:color .2s; }
.footer-nav a:hover { color:var(--ouro); }
.footer-bottom { display:flex; justify-content:space-between; padding-top:24px; border-top:1px solid rgba(200,169,126,.08); font-family:var(--font-mono); font-size:10px; color:rgba(242,237,216,.2); flex-wrap:wrap; gap:8px; }

/* ANIMATIONS */
@keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
@keyframes pulse { 0%,100% { box-shadow:0 0 0 4px rgba(200,169,126,.2); } 50% { box-shadow:0 0 0 8px rgba(200,169,126,.05); } }
.fade-up { animation:fadeUp .9s var(--ease) both; }
[data-reveal] { opacity:0; transform:translateY(24px); transition:opacity .7s var(--ease), transform .7s var(--ease); }
[data-reveal].visible { opacity:1; transform:translateY(0); }

/* RESPONSIVE */
@media(max-width:1024px) { .container { padding:0 32px; } .page-hero { padding:140px 32px 80px; } }
@media(max-width:768px) {
  .nav { padding:0 24px; } .nav-links { display:none; } .nav-menu { display:flex; }
  .section { padding:72px 0; } .container { padding:0 20px; }
  .page-hero { padding:120px 20px 64px; }
  .footer-grid { flex-direction:column; gap:28px; }
}
