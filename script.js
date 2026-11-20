/* =====================================================
   ORGANIC / FLUID — Portfolio Script
   Kaushal Bhuju · 2026
   ===================================================== */

'use strict';

/* ===== CUSTOM CURSOR ===== */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (window.innerWidth > 768 && cursor && cursorRing) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left    = mx + 'px';
    cursor.style.top     = my + 'px';
  });

  // Smooth ring follow
  (function ringFollow() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(ringFollow);
  })();

  document.querySelectorAll('a, button, .pf-btn, .tech-tag, .proj-card, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      cursorRing.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      cursorRing.classList.remove('hovered');
    });
  });
}

/* ===== NAVBAR ===== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.style.getPropertyValue('--delay') || '0s';
      el.style.transitionDelay = delay;
      el.classList.add('visible');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    let current  = 0;
    const step   = Math.max(1, Math.floor(target / 50));
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 35);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(n => counterObserver.observe(n));

/* ===== SKILL BAR ANIMATION ===== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill = entry.target;
    fill.style.width = fill.dataset.w + '%';
    skillObserver.unobserve(fill);
  });
}, { threshold: 0.4 });

skillFills.forEach(f => skillObserver.observe(f));

/* ===== PROJECT FILTER ===== */
const pfBtns   = document.querySelectorAll('.pf-btn');
const projCards = document.querySelectorAll('.proj-card');

pfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity .35s, transform .35s';
      if (match) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
      } else {
        card.style.opacity  = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => { card.style.display = 'none'; }, 360);
      }
    });
  });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('.btn-submit');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = '<span>Sending…</span><i class="fas fa-circle-notch fa-spin"></i>';
  btn.disabled  = true;

  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg,#059669,#065f46)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.disabled  = false;
      contactForm.reset();
    }, 2800);
  }, 1600);
});

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== HERO PARALLAX (subtle) ===== */
const blobs = document.querySelectorAll('.blob');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const y = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = (i % 2 === 0) ? 0.08 : -0.06;
        blob.style.transform = `translateY(${y * speed}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ===== ACTIVE NAV LINK (scroll spy) ===== */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => spyObserver.observe(s));
