import { els } from "./dom.js";
import { formatPrice } from "./utils.js";

let toastTimer;

export const setStatus = (msg) => {
  if (els.status) els.status.textContent = msg;
};

export const showToast = (msg) => {
  if (!els.toast) return;
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200);
};

export const setLoading = (state) => {
  if (!els.loading) return;
  els.loading.classList.toggle("active", state);
  els.loading.setAttribute("aria-hidden", state ? "false" : "true");
};

const renderGrid = (items) => {
  if (!els.grid || !els.tpl) return;
  els.grid.innerHTML = "";
  items.forEach((item) => {
    const card = els.tpl.content.cloneNode(true);
    card.querySelector("img").src = item.image;
    card.querySelector("img").alt = item.title;
    card.querySelector(".card__chip").textContent = item.category;
    card.querySelector(".card__title").textContent = item.title;
    card.querySelector(".card__desc").textContent = item.description;
    const rating = item.rating?.rate ?? 4.5;
    const count = item.rating?.count ?? 120;
    card.querySelector(".rating").textContent = `${rating.toFixed(1)} (${count})`;
    card.querySelector(".price").textContent = formatPrice(item.price);
    const cardEl = card.querySelector(".card");
    cardEl.dataset.product = item.__index;
    cardEl.querySelector("[data-add]").dataset.index = item.__index;
    els.grid.appendChild(card);
  });
};

const renderList = (target, items) => {
  if (!target) return;
  target.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.dataset.product = item.__index;
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <p class="list-item__title">${item.title}</p>
        <p class="list-item__meta">${item.category}</p>
      </div>
      <div class="price-tag" data-index="${item.__index}">
        <strong>${formatPrice(item.price)}</strong>
        <small>${item.oldPrice ? formatPrice(item.oldPrice) : ""}</small>
      </div>
    `;
    target.appendChild(div);
  });
};

const renderMini = (target, items) => {
  if (!target) return;
  target.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "mini-item";
    row.dataset.product = item.__index;
    row.innerHTML = `
      <img class="mini-thumb" src="${item.image}" alt="${item.title}">
      <div class="mini-text">
        <strong>${item.title}</strong>
        <small>${formatPrice(item.price)}</small>
      </div>
    `;
    target.appendChild(row);
  });
};

export const renderDeal = (item) => {
  if (!els.dealCard || !item) return;
  els.dealCard.querySelector(".deal__title").textContent = item.title;
  els.dealCard.querySelector(".deal__desc").textContent = item.description;
  els.dealCard.querySelector(".deal__current").textContent = formatPrice(item.price);
  els.dealCard.querySelector(".deal__old").textContent = item.oldPrice ? formatPrice(item.oldPrice) : "";
  const img = els.dealCard.querySelector(".deal__image img");
  img.src = item.image;
  img.alt = item.title;
  els.dealCard.querySelector("[data-add]").dataset.index = item.__index;
  els.dealCard.dataset.product = item.__index;
};

export const renderCollections = (products = []) => {
  if (!products.length) return;

  const featured = products.slice(0, 6);
  const newArrivals = products.slice(6, 12);
  const trending = products.slice(12, 18);
  const topRated = [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)).slice(0, 6);
  const hotOffers = [...products].sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, 5);

  renderDeal(products[0]);
  renderList(els.newProducts, products.slice(1, 6));
  renderMini(els.newArrivals, newArrivals);
  renderMini(els.trending, trending);
  renderMini(els.topRated, topRated);
  renderMini(els.bestSellers, products.slice(3, 9));
  renderList(els.hotOffers, hotOffers);
  renderGrid(featured);
};

export const renderCart = (cart = [], totals = { total: 0, count: 0 }) => {
  if (!els.cartItems) return;
  els.cartItems.innerHTML = "";
  if (!cart.length) {
    els.cartItems.innerHTML = '<p class="cart-item__meta">Cart is empty. Add something you like.</p>';
  } else {
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div>
          <p class="cart-item__title">${item.title}</p>
          <p class="cart-item__meta">${item.category}</p>
        </div>
        <span class="cart-item__price">${formatPrice(item.price)}</span>
      `;
      els.cartItems.appendChild(row);
    });
  }

  if (els.cartTotal) els.cartTotal.textContent = formatPrice(totals.total);
  if (els.cartItemsCount) els.cartItemsCount.textContent = `${totals.count} item${totals.count === 1 ? "" : "s"}`;
  if (els.cartCount) els.cartCount.textContent = totals.count;
};

export const renderCartSummary = (cart = [], totals = { total: 0, count: 0 }) => {
  if (!els.cartSummaryItems) return;
  els.cartSummaryItems.innerHTML = "";
  if (!cart.length) {
    els.cartSummaryItems.innerHTML = '<p class="cart-item__meta">Your summary is empty.</p>';
  } else {
    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item cart-item--summary";
      row.innerHTML = `
        <div class="cart-item__thumb">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item__content">
          <p class="cart-item__title">${item.title}</p>
          <p class="cart-item__meta">${item.category}</p>
        </div>
        <div class="cart-item__price">${formatPrice(item.price)}</div>
      `;
      els.cartSummaryItems.appendChild(row);
    });
  }
  if (els.cartSummaryTotal) els.cartSummaryTotal.textContent = formatPrice(totals.total);
};

export const toggleCartSummary = (open) => {
  if (!els.cartSummary) return;
  const shouldOpen = open ?? !els.cartSummary.classList.contains("open");
  els.cartSummary.classList.toggle("open", shouldOpen);
  document.body.style.overflow = shouldOpen ? "hidden" : "";
};

export const openModal = (product) => {
  if (!product || !els.modal) return;
  els.modalImg.src = product.image;
  els.modalImg.alt = product.title;
  els.modalChip.textContent = product.category;
  els.modalTitle.textContent = product.title;
  els.modalDesc.textContent = product.description;
  const rating = product.rating?.rate ?? 4.5;
  const count = product.rating?.count ?? 120;
  els.modalRating.textContent = `${rating.toFixed(1)} (${count})`;
  els.modalPrice.textContent = formatPrice(product.price);
  els.modal.dataset.product = product.__index;
  els.modalAdd.dataset.index = product.__index;
  els.modal.classList.add("open");
  els.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

export const closeModal = () => {
  if (!els.modal) return;
  els.modal.classList.remove("open");
  els.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  window.location.hash = "#hero";
};
