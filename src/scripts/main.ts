// Lightweight, dependency-free interactions. Everything respects prefers-reduced-motion.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Header: shadow on scroll + mobile menu */
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const nav = document.querySelector<HTMLElement>('[data-nav]');
const setMenu = (open: boolean) => {
  toggle?.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('is-open', open);
};
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav?.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* Scroll reveal */
const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window && !reduce) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}

/* Pop-able hero bubbles: pop, then a new one floats back in */
document.querySelectorAll<HTMLElement>('.pop').forEach((b) => {
  b.addEventListener('click', () => {
    if (b.classList.contains('popped')) return;
    b.classList.add('popped');
    setTimeout(() => b.classList.remove('popped'), 2200);
  });
});

/* Open / closed badge: reads days/hours/time zone from data attributes (set in src/data/site.ts) */
const badges = document.querySelectorAll<HTMLElement>('[data-open-badge]');
if (badges.length) {
  const cfg = badges[0].dataset;
  const openDays = (cfg.days ?? '1,2,3,4,5').split(',').map(Number);
  const openHour = Number(cfg.openHour ?? 9);
  const closeHour = Number(cfg.closeHour ?? 17);
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fmt = (h: number) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`;
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: cfg.tz || 'America/Chicago', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date());
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.find((p) => p.type === 'weekday')!.value);
  const hour = parseInt(parts.find((p) => p.type === 'hour')!.value, 10) % 24;
  const todayOpen = openDays.includes(day);
  const open = todayOpen && hour >= openHour && hour < closeHour;
  let text = `Open now · until ${fmt(closeHour)}`;
  if (!open) {
    if (todayOpen && hour < openHour) text = `Closed · opens at ${fmt(openHour)}`;
    else {
      let next = 1;
      while (next < 7 && !openDays.includes((day + next) % 7)) next++;
      const label = next === 1 ? 'tomorrow' : names[(day + next) % 7];
      text = `Closed · opens ${label} ${fmt(openHour)}`;
    }
  }
  badges.forEach((b) => { b.textContent = text; b.dataset.open = String(open); });
}

/* Photo stack: iMessage-style overlapping, rotated cards */
document.querySelectorAll<HTMLElement>('[data-stack]').forEach((root) => {
  const cards = [...root.querySelectorAll<HTMLElement>('.stack-card')];
  const wrap = root.parentElement;
  const caption = wrap?.querySelector<HTMLElement>('[data-stack-caption]');
  const n = cards.length;
  let active = 0;
  let timer: number | undefined;

  const render = () => {
    cards.forEach((c, i) => {
      let o = i - active;
      if (o > n / 2) o -= n;
      if (o < -n / 2) o += n;
      c.style.setProperty('--o', String(o));
      c.style.setProperty('--abs', String(Math.abs(o)));
      c.classList.toggle('is-active', o === 0);
      c.classList.toggle('is-hidden', Math.abs(o) > 3);
      c.setAttribute('aria-hidden', String(o !== 0));
    });
    if (caption) caption.textContent = cards[active].dataset.caption ?? '';
  };
  const go = (d: number) => { active = (active + d + n) % n; render(); };
  const stop = () => { if (timer) window.clearInterval(timer); timer = undefined; };
  const play = () => { stop(); if (!reduce) timer = window.setInterval(() => go(1), 4200); };

  cards.forEach((c, i) => c.addEventListener('click', () => {
    if (i !== active) { active = i; render(); play(); }
  }));
  wrap?.querySelector('[data-prev]')?.addEventListener('click', () => { go(-1); play(); });
  wrap?.querySelector('[data-next]')?.addEventListener('click', () => { go(1); play(); });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { go(-1); play(); }
    if (e.key === 'ArrowRight') { go(1); play(); }
  });

  // swipe / drag
  let sx = 0;
  let dragging = false;
  root.addEventListener('pointerdown', (e) => { sx = e.clientX; dragging = true; stop(); });
  root.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    play();
  });
  root.addEventListener('pointercancel', () => { dragging = false; play(); });

  // only auto-advance while visible
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => (en.isIntersecting ? play() : stop())).observe(root);
  }
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', play);
  render();
});

/* Gallery lightbox */
const lb = document.querySelector<HTMLDialogElement>('dialog.lightbox');
if (lb) {
  const img = lb.querySelector('img')!;
  const cap = lb.querySelector('p')!;
  document.querySelectorAll<HTMLElement>('[data-full]').forEach((btn) => btn.addEventListener('click', () => {
    img.src = btn.dataset.full!;
    img.alt = btn.dataset.alt ?? '';
    cap.textContent = btn.dataset.caption ?? '';
    lb.showModal();
  }));
  lb.addEventListener('click', (e) => {
    if (e.target === lb || (e.target as HTMLElement).closest('[data-close]')) lb.close();
  });
}

/* Appointment request form: opens a pre-filled email (placeholder until online booking exists) */
const form = document.querySelector<HTMLFormElement>('form.request');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
  const body = [
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Pup name & breed: ${d.pet}`,
    `Service: ${d.service}`,
    `Preferred day: ${d.day || 'Flexible'}`,
    '',
    d.notes || '',
  ].join('\n');
  window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent('Appointment request - ' + d.name)}&body=${encodeURIComponent(body)}`;
});
