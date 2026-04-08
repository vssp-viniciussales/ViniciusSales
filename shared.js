/* ════════════════════════════════════════
   @vssp · SHARED SCRIPT · v3
   Cole este script em TODAS as páginas
════════════════════════════════════════ */

// ── NAV SCROLL
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── MOBILE MENU
const navMenu  = document.getElementById('navMenu');
const mobileMenu = document.getElementById('mobileMenu');
if (navMenu && mobileMenu) {
  navMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = navMenu.querySelectorAll('span');
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      spans[0].style.cssText = 'transform:rotate(45deg) translate(4px,5px)';
      spans[1].style.cssText = 'opacity:0';
      spans[2].style.cssText = 'transform:rotate(-45deg) translate(4px,-5px)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });
  // Fecha ao clicar em link
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navMenu.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });
}

// ── LANG TOGGLE
let currentLang = localStorage.getItem('vssp-lang') || 'pt';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('vssp-lang', lang);

  document.querySelectorAll('[data-pt]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val !== null) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

// Inicializa lang
document.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
});

// ── SCROLL REVEAL
const reveals = document.querySelectorAll('[data-reveal]');
if (reveals.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// ── ACTIVE NAV LINK (para páginas internas)
(function markActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
