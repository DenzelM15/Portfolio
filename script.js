// script.js
const root = document.documentElement;

/* Theme toggle with localStorage */
const themeBtn = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeBtn?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
  updateThemeIcon();
});
function updateThemeIcon() {
  const t = document.documentElement.getAttribute('data-theme');
  themeBtn?.setAttribute('aria-label', t === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
}

/* Mobile nav */
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');
toggle?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
menu?.querySelectorAll('.nav__link').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

/* Hero glow follow */
const glow = document.querySelector('.glow');
document.addEventListener('pointermove', (e) => {
  if (!glow) return;
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  glow.style.setProperty('--x', `${x}%`);
  glow.style.setProperty('--y', `${y}%`);
});

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* Animate counters */
function animateCount(el) {
  const end = Number(el.dataset.count || 0);
  const dur = 1100;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(p * end);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('.stat__num').forEach(animateCount);

/* Filter projects */
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const f = chip.dataset.filter;
  cards.forEach(card => {
    const show = f === 'all' || card.dataset.cat === f;
    card.style.display = show ? '' : 'none';
  });
}));

/* Modals */
function openModal(sel) {
  const dialog = document.querySelector(sel);
  if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
}
function closeModal(d) { d.close(); }
document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modal));
});
document.querySelectorAll('.modal').forEach(d => {
  d.addEventListener('click', (e) => { if (e.target === d) closeModal(d); });
  d.querySelector('.modal__close')?.addEventListener('click', () => closeModal(d));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && d.open) closeModal(d); });
});

/* Form validation */
const form = document.querySelector('.form');
const note = document.querySelector('.form__note');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = form.name;
  const email = form.email;
  const message = form.message;

  clearError(name); clearError(email); clearError(message);

  if (!name.value.trim()) { setError(name, 'Please enter your name.'); valid = false; }
  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError(email, 'Please enter a valid email.'); valid = false; }
  if (message.value.trim().length < 10) { setError(message, 'Message should be at least 10 characters.'); valid = false; }

  if (!valid) {
    note.textContent = 'Please fix the errors above.';
    return;
  }

  note.textContent = 'Thanks! Your message was validated locally.';
  form.reset();
});
function setError(input, msg) {
  const wrap = input.closest('.field');
  wrap.querySelector('.error').textContent = msg;
  input.setAttribute('aria-invalid', 'true');
}
function clearError(input) {
  const wrap = input.closest('.field');
  wrap.querySelector('.error').textContent = '';
  input.removeAttribute('aria-invalid');
}

/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Back to top show/hide */
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  toTop.style.opacity = window.scrollY > 600 ? '1' : '.6';
});
