// Reads data/products.json — the ONLY file you need to edit to change
// price, discount, or availability (in_stock / out_of_stock).

function getDiscountPercent(price, originalPrice) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function formatPKR(n) {
  return "Rs. " + Number(n).toLocaleString("en-PK");
}

function productCardHTML(p) {
  const discount = getDiscountPercent(p.price, p.originalPrice);
  const inStock = p.availability === "in_stock";
  const stampHTML = discount >= 20
    ? `<div class="stamp"><b>-${discount}%</b><span>off</span></div>`
    : "";
  const stockHTML = `<div class="stock-pill ${inStock ? "in" : "out"}">${inStock ? "In stock" : "Out of stock"}</div>`;
  const priceHTML = p.originalPrice && p.originalPrice > p.price
    ? `<span class="price-now mono">${formatPKR(p.price)}</span><span class="price-was mono">${formatPKR(p.originalPrice)}</span>`
    : `<span class="price-now mono">${formatPKR(p.price)}</span>`;

  return `
  <div class="card">
    <div class="card-media">
      ${stampHTML}
      ${stockHTML}
      <img src="${p.image}" alt="${p.name}" loading="lazy"
        onerror="this.parentElement.classList.add('img-fallback')">
    </div>
    <div class="card-body">
      <div class="card-cat">${p.category}</div>
      <h3 class="card-title">${p.name}</h3>
      <div class="price-row">${priceHTML}</div>
      <div class="card-actions">
        <a class="btn btn-outline" href="product.html?id=${p.id}">View</a>
        <a class="btn btn-primary ${inStock ? "" : "disabled"}"
           href="${inStock ? whatsappOrderLink(p.name) : "#"}" target="_blank" rel="noopener">
           ${inStock ? "Order" : "Sold out"}
        </a>
      </div>
    </div>
  </div>`;
}

async function loadProducts() {
  const res = await fetch("data/products.json");
  if (!res.ok) throw new Error("Could not load products.json");
  return res.json();
}

// Renders into any container id. Options: { category: 'cat'|'dog'|null, featuredOnly: bool, limit: n }
async function renderProducts(containerId, options = {}) {
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    let products = await loadProducts();
    if (options.category) products = products.filter(p => p.category === options.category);
    if (options.featuredOnly) products = products.filter(p => p.tags && p.tags.includes("bestseller"));
    if (options.limit) products = products.slice(0, options.limit);
    el.innerHTML = products.map(productCardHTML).join("") ||
      `<p>No products in this category yet.</p>`;
  } catch (e) {
    el.innerHTML = `<p>Couldn't load products. If you're viewing this file directly on your computer,
      products.json won't load — run a local server (see README) or view it via GitHub Pages instead.</p>`;
    console.error(e);
  }
}

// Shop page: category filter buttons
function setupShopFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter === "all" ? null : btn.dataset.filter;
      renderProducts("product-grid", { category: cat });
    });
  });
}

// Product detail page
async function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;
  const id = new URLSearchParams(location.search).get("id");
  try {
    const products = await loadProducts();
    const p = products.find(x => x.id === id) || products[0];
    if (!p) { container.innerHTML = "<p>Product not found.</p>"; return; }

    const discount = getDiscountPercent(p.price, p.originalPrice);
    const inStock = p.availability === "in_stock";
    document.title = `${p.name} — PetFood`;

    let reviews = [];
    try {
      const rr = await fetch("data/reviews.json");
      reviews = (await rr.json()).filter(r => r.productId === p.id && !r.isPlaceholder);
    } catch (e) { /* reviews optional */ }
    const avg = reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : null;

    container.innerHTML = `
      <div class="detail-media">
        ${discount >= 20 ? `<div class="stamp"><b>-${discount}%</b><span>off</span></div>` : ""}
        <img src="${p.image}" alt="${p.name}"
          onerror="this.parentElement.classList.add('img-fallback')">
      </div>
      <div>
        <div class="card-cat">${p.category}</div>
        <h1>${p.name}</h1>
        <div class="detail-rating">
          ${avg ? `<span class="stars">${"★".repeat(Math.round(avg))}${"☆".repeat(5 - Math.round(avg))}</span> ${avg} · ` : ""}
          <a href="reviews.html?product=${p.id}">See ${reviews.length ? "verified reviews" : "reviews"} →</a>
        </div>
        <p>${p.description}</p>
        <div class="detail-price">
          <span class="price-now mono">${formatPKR(p.price)}</span>
          ${p.originalPrice && p.originalPrice > p.price ? `<span class="price-was mono">${formatPKR(p.originalPrice)}</span>` : ""}
          <span class="stock-pill ${inStock ? "in" : "out"}" style="position:static;">${inStock ? "In stock" : "Out of stock"}</span>
        </div>
        <div class="hero-actions">
          <a class="btn btn-primary ${inStock ? "" : "disabled"}" href="${inStock ? whatsappOrderLink(p.name) : "#"}" target="_blank" rel="noopener">
            ${inStock ? "Order via WhatsApp" : "Currently sold out"}
          </a>
          <a class="btn btn-outline" href="shop.html">← Back to shop</a>
        </div>
      </div>`;
  } catch (e) {
    container.innerHTML = "<p>Couldn't load this product. Try viewing the live GitHub Pages site instead of the local file.</p>";
    console.error(e);
  }
}
