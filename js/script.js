// ============ Footer year ============
document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Screenshot / no-motion mode: ?shot reveals everything immediately
const shotMode = window.location.search.includes('shot');
if (shotMode) {
  document.documentElement.style.scrollBehavior = 'auto';
  document.documentElement.classList.add('shot');
}

// ============ Navbar scroll state + scroll progress ============
const navbar = document.getElementById('navbar');
const progress = document.getElementById('scrollProgress');

const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ============ Mobile menu toggle ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navbar.classList.toggle('menu-open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navbar.classList.remove('menu-open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ============ Scroll reveal (staggered) ============
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = Array.from(el.parentElement.children).filter((c) =>
        c.classList.contains('reveal')
      );
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = `${Math.min(idx * 90, 450)}ms`;
      el.classList.add('in-view');
      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
if (shotMode) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in-view'));
} else {
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
}

// ============ Active nav link highlighting ============
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      navAnchors.forEach((a) => a.classList.remove('active'));
      link.classList.add('active');
      if (window.location.hash !== `#${id}`) {
        history.replaceState(null, '', `#${id}`);
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);
sections.forEach((section) => sectionObserver.observe(section));

// ============ Count-up stat numbers ============
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (prefersReducedMotion || shotMode) {
    el.textContent = `${target}${suffix}`;
    return;
  }
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const statNums = document.querySelectorAll('.stat-num[data-count]');
if (shotMode) {
  statNums.forEach((el) => animateCount(el));
} else {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  statNums.forEach((el) => countObserver.observe(el));
}

// ============ Typed role effect ============
const typedEl = document.getElementById('roleTyped');
if (typedEl) {
  const words = ['JavaScript / TypeScript Developer', 'Full-Stack Web Developer', 'Next.js & Node.js'];
  if (prefersReducedMotion || shotMode) {
    typedEl.textContent = words[0];
    typedEl.classList.add('done');
  } else {
    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      const word = words[wordIdx];
      typedEl.textContent = word.slice(0, charIdx);
      typedEl.classList.remove('done');

      if (!deleting && charIdx < word.length) {
        charIdx++;
        setTimeout(tick, 55);
      } else if (!deleting && charIdx === word.length) {
        deleting = true;
        setTimeout(tick, 1900);
      } else if (deleting && charIdx > 0) {
        charIdx--;
        setTimeout(tick, 28);
      } else {
        deleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(tick, 350);
      }
    };
    tick();
  }
}

// ============ Hero photo tilt (pointer, desktop only) ============
const tilt = document.getElementById('photoTilt');
const heroPhoto = document.getElementById('heroPhoto');
if (tilt && heroPhoto && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  const maxDeg = 8;
  heroPhoto.addEventListener('pointermove', (e) => {
    const r = heroPhoto.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `rotateY(${px * maxDeg}deg) rotateX(${-py * maxDeg}deg)`;
  });
  heroPhoto.addEventListener('pointerleave', () => {
    tilt.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

// ============ Skill card spotlight ============
if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.skill-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}
