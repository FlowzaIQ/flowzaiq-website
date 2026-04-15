// =============================================
// FLOWZA IQ — Main Script
// =============================================

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Nav scroll shadow
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav-wrapper');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// Scroll reveal animation
const revealEls = document.querySelectorAll(
  '.service-card, .stat-card, .testimonial, .pricing-card, .step'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.1}s, transform 0.5s ease ${(i % 4) * 0.1}s`;
  revealObserver.observe(el);
});

// Form submission handler
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Request Received! We\'ll be in touch soon.';
  btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
  btn.style.boxShadow = '0 0 24px rgba(16,185,129,0.4)';
  btn.disabled = true;
  e.target.reset();
}

// Mobile nav toggle (simple)
const hamburger = document.querySelector('.nav-hamburger');
hamburger.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const cta = document.querySelector('.nav-cta');
  const isOpen = links.style.display === 'flex';
  if (isOpen) {
    links.style.display = '';
    cta.style.display = '';
    hamburger.innerHTML = '&#9776;';
  } else {
    links.style.cssText = 'display:flex; flex-direction:column; position:fixed; top:68px; left:0; right:0; background:rgba(5,10,20,0.97); padding:24px; gap:20px; border-bottom:1px solid rgba(99,179,237,0.12); z-index:99;';
    cta.style.cssText = 'display:flex; flex-direction:column; position:fixed; top:300px; left:0; right:0; background:rgba(5,10,20,0.97); padding:0 24px 24px; z-index:99; gap:10px;';
    hamburger.innerHTML = '&times;';
  }
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    const cta = document.querySelector('.nav-cta');
    links.style.cssText = '';
    cta.style.cssText = '';
    hamburger.innerHTML = '&#9776;';
  });
});
