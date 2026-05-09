/* =========================================
   script.js — Premium Portfolio 2025
   ========================================= */

// ── Scroll Progress Bar ─────────────────────
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    progressBar.style.width = pct + '%';
});

// ── Custom Cursor ──────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .proj-card, .skill-row, .contact-row').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('expand');
        cursorRing.classList.add('expand');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expand');
        cursorRing.classList.remove('expand');
    });
});

// ── Particle Canvas ────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.7 ? '232,93,38' : '100,100,120';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animParticles);
}
animParticles();

// ── Navbar ─────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    const btn = document.getElementById('scrollTopBtn');
    btn.classList.toggle('visible', window.scrollY > 500);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ── Smooth scroll ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Active Nav Link ─────────────────────────
const sectionEls = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let active = '';
    sectionEls.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) active = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === active);
    });
});

// ── Typing Effect ──────────────────────────
const roles = ['Laravel Developer', 'Backend Engineer', 'API Architect', 'PHP Specialist', 'Full-Stack Builder'];
let rIdx = 0, cIdx = 0, deleting = false;
const roleEl = document.getElementById('typingRole');

function typeRole() {
    if (!roleEl) return;
    const current = roles[rIdx];
    if (!deleting) {
        roleEl.textContent = current.substring(0, ++cIdx);
        if (cIdx === current.length) {
            deleting = true;
            return setTimeout(typeRole, 2400);
        }
    } else {
        roleEl.textContent = current.substring(0, --cIdx);
        if (cIdx === 0) {
            deleting = false;
            rIdx = (rIdx + 1) % roles.length;
        }
    }
    setTimeout(typeRole, deleting ? 45 : 85);
}
setTimeout(typeRole, 1200);

// ── Reveal on Scroll ───────────────────────
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseFloat(el.getAttribute('data-delay') || 0) * 1000;
        setTimeout(() => el.classList.add('visible'), delay);
        revealObs.unobserve(el);
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-card').forEach(el => revealObs.observe(el));

// ── Skill Bar Animation ────────────────────
const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const fill = entry.target;
        const w = fill.getAttribute('data-w');
        setTimeout(() => fill.style.width = w + '%', 200);
        skillObs.unobserve(fill);
    });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-fill').forEach(el => skillObs.observe(el));

// ── Animated Stat Counters ─────────────────
function animCounter(el, target, duration = 1400) {
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const numEl = entry.target.querySelector('.stat-number');
        if (numEl) {
            const target = parseInt(numEl.getAttribute('data-target'));
            animCounter(numEl, target);
        }
        counterObs.unobserve(entry.target);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(el => counterObs.observe(el));

// ── Timeline delay set ─────────────────────
document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.setProperty('--delay', (i * 0.15) + 's');
});

// ── Contact Form ───────────────────────────
function handleSend() {
    const fields = {
        name: document.getElementById('fname'),
        email: document.getElementById('femail'),
        subject: document.getElementById('fsubject'),
        message: document.getElementById('fmessage')
    };
    const msgEl = document.getElementById('formMsg');
    const btn = document.getElementById('sendBtn');

    Object.values(fields).forEach(f => f.style.borderColor = '');
    msgEl.className = 'form-msg';

    let hasError = false;
    Object.values(fields).forEach(f => {
        if (!f.value.trim()) { f.style.borderColor = '#dc2626'; hasError = true; }
    });

    if (hasError) {
        msgEl.textContent = 'Please fill in all fields.';
        msgEl.classList.add('error');
        return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(fields.email.value.trim())) {
        fields.email.style.borderColor = '#dc2626';
        msgEl.textContent = 'Please enter a valid email.';
        msgEl.classList.add('error');
        return;
    }

    btn.querySelector('span').textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        msgEl.textContent = "Message sent! I'll get back to you soon.";
        msgEl.classList.add('success');
        Object.values(fields).forEach(f => f.value = '');
        btn.querySelector('span').textContent = 'Send Message';
        btn.disabled = false;
    }, 1600);
}

// ── Proj card mouse spotlight ──────────────
document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.querySelector('.proj-shine').style.background =
            `radial-gradient(circle at ${x}% ${y}%, rgba(232,93,38,0.1) 0%, transparent 60%)`;
    });
});
