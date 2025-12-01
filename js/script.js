// API endpoint and key DOM nodes we reference often
const API = "https://dummyjson.com/products?limit=12";
const els = {
  grid: document.getElementById("product-grid"),
  tpl: document.getElementById("card-template"),
  status: document.getElementById("status"),
  refresh: document.getElementById("refresh"),
  nav: document.querySelector(".nav"),
  toggle: document.querySelector(".nav__toggle"),
  toast: document.getElementById("toast"),
  loading: document.getElementById("loading"),
};

// Backup products shown if the live API fails
const FALLBACK = [
  {
    title: "Aurora Leather Backpack",
    price: 189,
    category: "bags",
    description: "Supple Italian leather with modular pockets and a breathable back panel.",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80",
    rating: { rate: 4.8, count: 314 },
  },
  {
    title: "Helio Noise-Canceling Headphones",
    price: 289,
    category: "audio",
    description: "Carbon fiber headband, adaptive ANC, and spatial audio tuned for clarity.",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    rating: { rate: 4.7, count: 742 },
  },
  {
    title: "Lumen Smart Lamp",
    price: 119,
    category: "home",
    description: "Gradient LED array with sunrise automation and Matter compatibility.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
    rating: { rate: 4.5, count: 268 },
  },
  {
    title: "Pulse Fitness Tracker",
    price: 129,
    category: "wearables",
    description: "Titanium shell, HRV insights, and 7-day battery on a single charge.",
    image:
      "https://images.unsplash.com/photo-1557438159-51eec7a6c9b9?auto=format&fit=crop&w=900&q=80",
    rating: { rate: 4.3, count: 509 },
  },
  {
    title: "Nimbus Mesh Sneakers",
    price: 159,
    category: "footwear",
    description: "Featherweight knit upper with algae-based cushioning and reflective piping.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    rating: { rate: 4.6, count: 410 },
  },
  {
    title: "Polar Ceramic Mug Set",
    price: 48,
    category: "kitchen",
    description: "Double-walled ceramic with a matte glaze and ergonomic thumb rest.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    rating: { rate: 4.4, count: 187 },
  },
];

// Update footer status text and tone
const setStatus = (msg, tone = "") => {
  els.status.textContent = msg;
  els.status.dataset.tone = tone;
};

// Price formatter
const price = (n) => `$${Number(n).toFixed(2)}`;

// Show and hide a central toast
let toastTimer;
const showToast = (msg) => {
  if (!els.toast) return;
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200);
};

// Toggle loading overlay visibility
const setLoading = (state) => {
  if (!els.loading) return;
  els.loading.classList.toggle("active", state);
  els.loading.setAttribute("aria-hidden", state ? "false" : "true");
};

// Light skeleton placeholders while data loads
const skeletons = (n = 6) => {
  els.grid.innerHTML = "";
  Array.from({ length: n }).forEach(() => {
    const card = els.tpl.content.cloneNode(true);
    card.querySelector(".chip").textContent = "loading";
    card.querySelector(".card__title").textContent = "Loading product...";
    card.querySelector(".card__desc").textContent = "Fetching fresh items.";
    card.querySelector(".price").textContent = "$—";
    card.querySelector(".rating").textContent = "…";
    card.querySelector("img").src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    els.grid.appendChild(card);
  });
};

// Render an array of products into cards
const render = (items) => {
  els.grid.innerHTML = "";
  items.forEach((item) => {
    const card = els.tpl.content.cloneNode(true);
    card.querySelector("img").src = item.image;
    card.querySelector("img").alt = item.title;
    card.querySelector(".chip").textContent = item.category;
    card.querySelector(".card__title").textContent = item.title;
    card.querySelector(".card__desc").textContent = item.description;
    const rating = item.rating?.rate ?? 4.5;
    const count = item.rating?.count ?? 120;
    card.querySelector(".rating").textContent = `${rating.toFixed(1)} (${count})`;
    card.querySelector(".price").textContent = price(item.price);
    els.grid.appendChild(card);
  });
};

// Fetch live data with graceful fallback
const load = async () => {
  setStatus("Loading live products…");
  setLoading(true);
  skeletons();
  try {
    const res = await fetch(API);
    const body = (await res.json()) || {};
    const data = Array.isArray(body.products) ? body.products : [];
    if (!res.ok || !data.length) throw new Error("API issue");
    render(
      data.map((item) => ({
        title: item.title || "Untitled product",
        price: item.price || 0,
        category: item.category || "essentials",
        description: item.description || "No description provided.",
        image: item.thumbnail || item.images?.[0],
        rating: { rate: item.rating ?? 4.5, count: item.stock ?? 120 },
      }))
    );
    setStatus("Live JSON feed • dummyjson.com", "ok");
  } catch (err) {
    console.error(err);
    render(FALLBACK);
    setStatus("Fallback data (offline/limit).", "warn");
    showToast("We switched to offline products.");
  }
  setLoading(false);
};

// Wire up buttons and nav toggle
els.refresh.addEventListener("click", load);
document.addEventListener("DOMContentLoaded", load);

els.toggle?.addEventListener("click", () => {
  const open = els.nav.classList.toggle("open");
  els.toggle.setAttribute("aria-expanded", open);
});

els.nav?.querySelectorAll(".nav__links a").forEach((link) => {
  link.addEventListener("click", () => {
    els.nav.classList.remove("open");
    els.toggle?.setAttribute("aria-expanded", "false");
  });
});
