// ── SHARED SITE JS ──
'use strict';

// NAV
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60), { passive: true });
}

// MOBILE MENU
const navMenu = document.getElementById('navMenu');
const mobileMenu = document.getElementById('mobileMenu');
if (navMenu && mobileMenu) {
  let open = false;
  navMenu.addEventListener('click', () => {
    open = !open;
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    const spans = navMenu.querySelectorAll('span');
    spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = open ? '0' : '';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => {
    open = false; mobileMenu.classList.remove('open'); document.body.style.overflow = '';
    navMenu.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

// LANG
let lang = localStorage.getItem('vssp-lang') || 'pt';
function setLang(l) {
  lang = l;
  localStorage.setItem('vssp-lang', l);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  document.querySelectorAll('[data-pt],[data-en]').forEach(el => {
    if (el.dataset[l] !== undefined) el.innerHTML = el.dataset[l];
  });
  document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
}
window.setLang = setLang;
document.addEventListener('DOMContentLoaded', () => setLang(lang));

// SCROLL REVEAL
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-reveal]').forEach(el => ro.observe(el));
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
  });
});

// WHATSAPP HELPER
window.openWhatsApp = (msg = '') => {
  const num = '5519953267086';
  const text = encodeURIComponent(msg || 'Olá Vinícius, vim pelo site e gostaria de conversar.');
  window.open(`https://wa.me/${num}?text=${text}`, '_blank');
};
