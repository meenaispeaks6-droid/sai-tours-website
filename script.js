// Sai Tours & Travels — interactions

// Nav state
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Hero parallax
const heroBg = document.querySelector("[data-parallax]");
let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    if (heroBg) {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroBg.style.transform = `translateY(${y * parseFloat(heroBg.dataset.parallax)}px)`;
      }
    }
    ticking = false;
  });
}, { passive: true });

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Counters
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const runCounter = (el) => {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  const dur = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const val = (target * easeOut(p)).toFixed(decimals);
    el.textContent = val + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      runCounter(e.target);
      counterIO.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

// Card cursor-follow glow position
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (ev) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
    card.style.setProperty("--my", `${ev.clientY - r.top}px`);
  });
});

// Cursor glow
const glow = document.querySelector(".cursor-glow");
if (glow && matchMedia("(pointer:fine)").matches) {
  let gx = 0, gy = 0, tx = 0, ty = 0;
  window.addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; });
  const follow = () => {
    gx += (tx - gx) * 0.08;
    gy += (ty - gy) * 0.08;
    glow.style.left = `${gx}px`;
    glow.style.top = `${gy}px`;
    requestAnimationFrame(follow);
  };
  follow();
}
