// ---- Site-wide config: EDIT THESE TWO LINES for your business ----
const WHATSAPP_NUMBER = "923001234567"; // <-- replace with your real WhatsApp number, country code, no + or spaces
const STORE_NAME = "PetFood";
// --------------------------------------------------------------------

function whatsappOrderLink(productName) {
  const msg = `Hi ${STORE_NAME}, I'd like to order: ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Makes any <img data-fallback-base="path/to/name" data-fallback-exts="jpg,jpeg,png,webp">
// automatically try each extension in order until one actually loads — so it no longer
// matters whether your photo is a .jpg, .jpeg, .png, or .webp file.
// Call setupImageFallbacks(container) again after injecting new images dynamically
// (products.js already does this after rendering product cards).
function setupImageFallbacks(root = document) {
  root.querySelectorAll("img[data-fallback-base]:not([data-fallback-bound])").forEach(img => {
    img.setAttribute("data-fallback-bound", "1");
    const base = img.getAttribute("data-fallback-base");
    const exts = (img.getAttribute("data-fallback-exts") || "jpg,jpeg,png,webp")
      .split(",").map(e => e.trim()).filter(Boolean);
    let i = 0;
    function tryNext() {
      if (i >= exts.length) {
        img.parentElement.classList.add("img-fallback");
        return;
      }
      img.src = `${base}.${exts[i]}`;
      i++;
    }
    img.addEventListener("error", tryNext);
    tryNext();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Wire up every WhatsApp link on the page (footer, contact, reviews) so they
  // ALL update automatically from the single WHATSAPP_NUMBER value above —
  // you only ever have to change that one line.
  document.querySelectorAll("[data-wa]").forEach(a => {
    const msg = a.getAttribute("data-wa-msg");
    a.href = msg
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/${WHATSAPP_NUMBER}`;
    if (a.hasAttribute("data-wa-display")) {
      const formatted = "+" + WHATSAPP_NUMBER.replace(/(\d{2})(\d{3})(\d+)/, "$1 $2 $3");
      a.textContent = formatted;
    }
  });

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  // Highlight current page in nav
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Try every static branding image (hero, about, logo) against multiple extensions
  setupImageFallbacks();

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }
});
