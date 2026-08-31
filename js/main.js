// Mobile nav toggle
const header = document.querySelector('.site-header');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form: friendly inline confirmation for Netlify Forms
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '') {
      // Netlify Forms only works once deployed; avoid a confusing failed
      // fetch during local preview.
      event.preventDefault();
      if (formStatus) {
        formStatus.textContent = 'Form submissions work once this site is deployed on Netlify.';
      }
      return;
    }
    if (formStatus) formStatus.textContent = 'Sending...';
  });
}
