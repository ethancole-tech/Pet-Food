// ---- Site-wide config: EDIT THESE TWO LINES for your business ----
const WHATSAPP_NUMBER = "923001234567"; // <-- replace with your real WhatsApp number, country code, no + or spaces
const STORE_NAME = "Pet Food";
// --------------------------------------------------------------------

function whatsappOrderLink(productName) {
  const msg = `Hi ${STORE_NAME}, I'd like to order: ${productName}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
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
