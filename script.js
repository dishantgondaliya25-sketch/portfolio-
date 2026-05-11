// ─── PROGRESS BAR ───
const pb = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  pb.style.width = (window.scrollY / h * 100) + '%';
});
 
// ─── CURSOR ───
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
 
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function raf() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(raf);
})();
 
document.querySelectorAll('a,button,.proj-card,.skill-row').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});
 
// ─── NAV SCROLL ───
const nav = document.getElementById('nav');
const stopBtn = document.getElementById('stop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  stopBtn.classList.toggle('vis', window.scrollY > 500);
  updateActiveNav();
});
 
// ─── HAMBURGER ───
const hbg = document.getElementById('hbg');
const nLinks = document.getElementById('navLinks');
hbg.addEventListener('click', () => {
  hbg.classList.toggle('open');
  nLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-a').forEach(a => a.addEventListener('click', () => {
  hbg.classList.remove('open');
  nLinks.classList.remove('open');
}));
 
// ─── ACTIVE NAV ───
function updateActiveNav() {
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) cur = s.id;
  });
  document.querySelectorAll('.nav-a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
}
 
// ─── TYPING ───
const roles = ['Laravel Developer','Backend Engineer','API Architect','PHP Specialist'];
let ri = 0, ci = 0, del = false;
const tEl = document.getElementById('typed');
function type() {
  const w = roles[ri];
  if (!del) {
    tEl.textContent = w.slice(0, ++ci);
    if (ci === w.length) { del = true; setTimeout(type, 2400); return; }
  } else {
    tEl.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 48 : 88);
}
setTimeout(type, 900);
 
// ─── SKILL BARS ───
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const f = e.target;
      f.style.width = f.dataset.w + '%';
      obs.unobserve(f);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sk-fill').forEach(f => obs.observe(f));
 
// ─── REVEAL ───
const revObs = new IntersectionObserver((entries, o) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.06) + 's';
      e.target.classList.add('in');
      o.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-scale').forEach(el => revObs.observe(el));
 
// ─── CONTACT FORM ───
function sendMsg() {
  const n = document.getElementById('fname').value.trim();
  const em = document.getElementById('femail').value.trim();
  const s = document.getElementById('fsubj').value.trim();
  const m = document.getElementById('fmsg-ta').value.trim();
  const msg = document.getElementById('fmsg');
  const btn = document.getElementById('send-btn');
 
  msg.className = ''; msg.textContent = '';
  const inputs = [document.getElementById('fname'), document.getElementById('femail'), document.getElementById('fsubj'), document.getElementById('fmsg-ta')];
  inputs.forEach(i => i.style.borderColor = '');
 
  if (!n || !em || !s || !m) {
    inputs.forEach(i => { if (!i.value.trim()) i.style.borderColor = 'rgba(139,58,42,0.5)'; });
    msg.textContent = 'Please fill in all fields.'; msg.className = 'err'; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
    document.getElementById('femail').style.borderColor = 'rgba(139,58,42,0.5)';
    msg.textContent = 'Please enter a valid email.'; msg.className = 'err'; return;
  }
 
  btn.innerHTML = '<span>Sending…</span> <i class="fas fa-spinner fa-spin" style="font-size:0.8rem"></i>';
  btn.disabled = true;
 
  setTimeout(() => {
    msg.textContent = "Thanks! I'll get back to you soon."; msg.className = 'ok';
    inputs.forEach(i => i.value = '');
    btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane" style="font-size:0.8rem"></i>';
    btn.disabled = false;
  }, 1400);
}
