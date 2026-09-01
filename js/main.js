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

// Contact form: submit via fetch so Netlify Forms doesn't navigate the
// visitor away to its own default success page — stay on this page instead.
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formStatus) formStatus.textContent = 'Sending...';

    const body = new URLSearchParams(new FormData(contactForm)).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Form submission failed');
        if (formStatus) {
          formStatus.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
        }
        contactForm.reset();
      })
      .catch(() => {
        if (formStatus) {
          const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
          formStatus.textContent = isLocal
            ? 'Form submissions only work once this site is deployed on Netlify.'
            : 'Sorry, something went wrong sending your message. Please call us instead.';
        }
      });
  });
}
