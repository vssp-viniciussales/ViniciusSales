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
