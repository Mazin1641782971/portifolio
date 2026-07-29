  // ---- Mobile menu ----
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const setActive = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();

  // ---- Role cycling text ----
  const roles = ['HTML Enthusiast', 'CSS Explorer', 'JavaScript', 'Front-End Dev'];
  const roleEl = document.getElementById('roleLine');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeRole(){
    const current = roles[roleIndex];
    if (!deleting){
      charIndex++;
      if (charIndex > current.length){ deleting = true; setTimeout(typeRole, 1400); return; }
    } else {
      charIndex--;
      if (charIndex < 0){ deleting = false; roleIndex = (roleIndex + 1) % roles.length; charIndex = 0; }
    }
    roleEl.innerHTML = current.slice(0, charIndex) + '<span class="cursor"></span>';
    setTimeout(typeRole, deleting ? 40 : 80);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    typeRole();
  } else {
    roleEl.textContent = roles[0];
  }

  // ---- Copy email on click ----
  const emailLink = document.getElementById('emailLink');
  const copyMsg = document.getElementById('copyMsg');
  emailLink.addEventListener('click', (e) => {
    const email = 'mazinabdalh0.0@gmail.com';
    if (navigator.clipboard){
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        copyMsg.textContent = '✓ Email copied to clipboard';
        setTimeout(() => copyMsg.textContent = '', 2200);
      });
    }
  });

  // ---- Reveal on scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ---- Footer year ----
  document.getElementById('year').textContent = new Date().getFullYear();
