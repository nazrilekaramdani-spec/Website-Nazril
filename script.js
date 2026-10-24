// Navbar: efek saat scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// Menu mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Efek mengetik
const words = ["Program Studi Sistem Informasi", "Fakultas Teknik & Informatika", "Universitas Bina Sarana Informatika",];
const typedEl = document.getElementById("typed");
let w = 0, c = 0, deleting = false;

function type() {
  const word = words[w];
  typedEl.textContent = word.slice(0, c);
  if (!deleting && c < word.length) {
    c++;
    setTimeout(type, 110);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (c > 0) {
    c--;
    setTimeout(type, 55);
  } else {
    deleting = false;
    w = (w + 1) % words.length;
    setTimeout(type, 300);
  }
}
type();

// Animasi muncul saat scroll + bar skill + counter
function animateCount(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = Math.max(1, Math.round(target / 30));
  const timer = setInterval(() => {
    n = Math.min(n + step, target);
    el.textContent = n;
    if (n >= target) clearInterval(timer);
  }, 40);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("show");
      el.querySelectorAll(".fill").forEach((f) => (f.style.width = f.dataset.width + "%"));
      el.querySelectorAll("[data-count]").forEach(animateCount);
      observer.unobserve(el);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Form kontak (demo: tampilkan pesan sukses)
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  note.textContent = "Terima kasih! Pesanmu sudah terkirim (mode demo).";
  form.reset();
});

// Tahun di footer
document.getElementById("year").textContent = new Date().getFullYear();
