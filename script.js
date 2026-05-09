/* =========================================
   script.js — Premium Portfolio JS
   ========================================= */

// ── Custom Cursor ──────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

(function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .proj-card, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        follower.style.width = '52px';
        follower.style.height = '52px';
        follower.style.borderColor = 'rgba(201,168,76,0.7)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.width = '32px';
        follower.style.height = '32px';
        follower.style.borderColor = 'rgba(201,168,76,0.4)';
    });
});

// ── Navbar ─────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    // scroll-to-top
    const btn = document.getElementById('scrollTop');
    btn.classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Smooth Scroll ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Typing Effect ──────────────────────────
const roles = ['Laravel Developer', 'Backend Engineer', 'API Architect', 'PHP Specialist'];
let roleIdx = 0, charIdx = 0, deleting = false;
const roleEl = document.getElementById('typingRole');

function typeRole() {
    const current = roles[roleIdx];
    if (!deleting) {
        roleEl.textContent = current.substring(0, ++charIdx);
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(typeRole, 2200);
            return;
        }
    } else {
        roleEl.textContent = current.substring(0, --charIdx);
        if (charIdx === 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }
    setTimeout(typeRole, deleting ? 50 : 90);
}

window.addEventListener('load', () => setTimeout(typeRole, 800));

// ── Skill Bars (Intersection Observer) ─────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const w = fill.getAttribute('data-w');
            fill.style.width = w + '%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── Fade-in on Scroll ──────────────────────
const fadeEls = document.querySelectorAll(
    '.skill-item, .proj-card, .exp-card, .contact-link, .stat-item, .about-grid, .contact-layout, .exp-layout'
);

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i * 0.04) + 's';
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// ── Contact Form ───────────────────────────
function handleSend() {
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmessage').value.trim();
    const msgEl   = document.getElementById('formMsg');
    const btn     = document.getElementById('sendBtn');

    const inputs = [
        document.getElementById('fname'),
        document.getElementById('femail'),
        document.getElementById('fsubject'),
        document.getElementById('fmessage')
    ];

    inputs.forEach(inp => inp.style.borderColor = '');
    msgEl.className = 'form-message';

    if (!name || !email || !subject || !message) {
        inputs.forEach(inp => {
            if (!inp.value.trim()) inp.style.borderColor = '#f87171';
        });
        msgEl.textContent = 'Please fill in all fields.';
        msgEl.classList.add('error');
        return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        document.getElementById('femail').style.borderColor = '#f87171';
        msgEl.textContent = 'Please enter a valid email address.';
        msgEl.classList.add('error');
        return;
    }

    btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
        msgEl.textContent = "Thanks! I'll get back to you soon.";
        msgEl.classList.add('success');
        inputs.forEach(inp => inp.value = '');
        btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
    }, 1400);
}

// ── Active Nav Link on Scroll ──────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href').slice(1);
        link.style.color = href === current ? 'var(--gold)' : '';
    });
});
