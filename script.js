// ===== Tab switching =====
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach(tab => tab.addEventListener('click', () => {
  const id = tab.dataset.tab;
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  panels.forEach(p => p.classList.toggle('active', p.id === id));
  const panel = document.getElementById(id);
  runReveal(panel);
  if (id === 'about') runSkills();
  panel.scrollIntoView({behavior:'smooth', block:'nearest'});
}));

// ===== Portfolio filters =====
const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.pf-item');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.f;
  items.forEach((it, i) => {
    const cats = it.dataset.cat.split(' ');
    const show = (f === 'all' || cats.includes(f));
    it.classList.toggle('hide', !show);
    if (show){
      it.style.animation = 'none';
      void it.offsetWidth;
      it.style.animation = `panelIn .45s var(--ease) ${i*0.04}s both`;
    }
  });
}));

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:0.12});
function runReveal(scope){
  (scope || document).querySelectorAll('.reveal:not(.in)').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.05) + 's';
    io.observe(el);
  });
}

// ===== Skill bars + AIXL agent progress =====
function runSkills(){
  document.querySelectorAll('#about .bar').forEach(b => b.classList.add('run'));
  document.querySelectorAll('#about .ap-track').forEach(t => t.classList.add('run'));
}

// ===== Theme toggle =====
const themeBtn = document.getElementById('themeToggle');
const icon = themeBtn.querySelector('i');
themeBtn.addEventListener('click', () => {
  const light = document.documentElement.getAttribute('data-theme') === 'light';
  if (light){ document.documentElement.removeAttribute('data-theme'); icon.className = 'fa-solid fa-sun'; }
  else { document.documentElement.setAttribute('data-theme','light'); icon.className = 'fa-solid fa-moon'; }
});

// ===== Mobile contacts toggle =====
const sbToggle = document.getElementById('sbToggle');
if (sbToggle){
  sbToggle.addEventListener('click', () => {
    const open = document.getElementById('sidebar').classList.toggle('open');
    sbToggle.querySelector('span').textContent = open ? 'Hide Contacts' : 'Show Contacts';
    sbToggle.querySelector('i').className = open ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
  });
}

// ===== Contact form (mailto compose) =====
const send = document.getElementById('cfSend');
if (send){
  send.addEventListener('click', () => {
    const n = document.getElementById('cfName').value.trim();
    const e = document.getElementById('cfEmail').value.trim();
    const m = document.getElementById('cfMsg').value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${n || 'someone'}`);
    const body = encodeURIComponent(`${m}\n\n— ${n}\n${e}`);
    window.location.href = `mailto:hassanfullstackdev0@gmail.com?subject=${subject}&body=${body}`;
  });
}

// ===== Typing animation (sidebar role) =====
(function(){
  const el = document.getElementById('typedRole');
  if(!el) return;
  const roles = ["Full Stack Developer","Flutter App Developer","FastAPI Backend Dev","AI Agent Builder","SaaS Engineer @ Fineasi Ltd"];
  let ri = 0, ci = 0, deleting = false;
  function tick(){
    const word = roles[ri];
    el.textContent = word.slice(0, ci);
    if(!deleting){
      if(ci < word.length){ ci++; setTimeout(tick, 70); }
      else { deleting = true; setTimeout(tick, 1600); }
    } else {
      if(ci > 0){ ci--; setTimeout(tick, 35); }
      else { deleting = false; ri = (ri+1) % roles.length; setTimeout(tick, 350); }
    }
  }
  tick();
})();

// ===== Init =====
runReveal(document);
setTimeout(runSkills, 400);
