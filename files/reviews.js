// Reads data/reviews.json. Reviews are only ever real customer reviews you add
// yourself — see README for the recommended collection process.

function reviewCardHTML(r) {
  const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
  return `
  <div class="review-card">
    <div class="review-head">
      <span class="review-name">${r.customerName}</span>
      ${r.verified ? '<span class="verified-badge">Verified buyer</span>' : ""}
    </div>
    <div class="stars">${stars}</div>
    <p>${r.text}</p>
    <div class="review-date">${r.date}</div>
  </div>`;
}

async function renderReviews() {
  const el = document.getElementById("reviews-list");
  const heading = document.getElementById("reviews-heading");
  if (!el) return;

  const productId = new URLSearchParams(location.search).get("product");

  try {
    const [reviews, products] = await Promise.all([
      fetch("data/reviews.json").then(r => r.json()),
      fetch("data/products.json").then(r => r.json())
    ]);

    let list = reviews.filter(r => !r.isPlaceholder);
    if (productId) {
      list = list.filter(r => r.productId === productId);
      const p = products.find(x => x.id === productId);
      if (heading && p) heading.textContent = `Reviews for ${p.name}`;
    }

    if (!list.length) {
      el.innerHTML = `<p>No reviews yet for this ${productId ? "product" : "store"} — be the first to share one below.</p>`;
    } else {
      el.innerHTML = list.map(reviewCardHTML).join("");
    }
  } catch (e) {
    el.innerHTML = "<p>Couldn't load reviews right now.</p>";
    console.error(e);
  }
}
