import { loadProducts } from "./api.js";
import { HERO_IMAGE } from "./constants.js";
import { bindDom, els } from "./dom.js";
import { addToCart, getCart, getCartTotals, getProduct, getProducts, setProducts } from "./state.js";
import {
  closeModal,
  openModal,
  renderCart,
  renderCartSummary,
  renderCollections,
  setLoading,
  setStatus,
  showToast,
  toggleCartSummary,
} from "./ui.js";

const handleAddToCart = (index) => {
  const product = getProduct(Number(index));
  if (!product) return;
  addToCart(product);
  renderCart(getCart(), getCartTotals());
  renderCartSummary(getCart(), getCartTotals());
  showToast("Added to cart");
  window.location.hash = "#cart";
};

const buildShell = () => {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = `
    <div class="bg-texture" aria-hidden="true"></div>
    <div class="page">
      <div class="topline">
        <span>Free shipping and 30‑day return • Weekly offer order over $150</span>
        <button id="refresh" class="link">Refresh feed</button>
      </div>

      <nav class="nav">
        <div class="nav__brand">
          <span class="dot"></span>
          <span class="word">Velora</span>
        </div>
        <div class="nav__links">
          <a href="#hero">Home</a>
          <a href="#new-arrivals">New</a>
          <a href="#trending">Trending</a>
          <a href="#top-rated">Top Rated</a>
          <a href="#cart">Cart</a>
        </div>
        <div class="nav__search">
          <input type="search" placeholder="Enter your product name..." />
          <img src="assets/icon-search.svg" class="search__icon" alt="Search" />
        </div>
        <div class="nav__actions">
          <button class="pill">USD $</button>
          <button class="pill">English</button>
            <div class="nav__icons">
              <img src="assets/icon-heart.svg" class="icon" alt="Wishlist" />
              <img src="assets/icon-user.svg" class="icon" alt="Profile" />
              <img src="assets/icon-bell.svg" class="icon" alt="Notifications" />
              <button class="nav__cart" id="cart-summary-toggle" aria-label="Open cart summary">
                <img src="assets/icon-cart.svg" class="icon" alt="Cart" />
                <span id="cart-count">0</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div class="layout">
          <aside class="column column--left">
            <section class="panel deal" id="deal-card">
              <div class="deal__tag">Deal of the day</div>
              <div class="deal__body">
                <div class="deal__info">
                  <p class="deal__title">Loading...</p>
                  <p class="deal__desc">Please wait while we pick a hero product.</p>
                  <div class="deal__price">
                    <span class="deal__current">$0.00</span>
                    <span class="deal__old">$0.00</span>
                  </div>
                  <div class="deal__timer">
                    <div><strong>360</strong><small>Days</small></div>
                    <div><strong>24</strong><small>Hours</small></div>
                    <div><strong>60</strong><small>Mins</small></div>
                    <div><strong>30</strong><small>Sec</small></div>
                  </div>
                  <button class="btn primary" data-add="">Add to cart</button>
                </div>
                <div class="deal__image">
                  <img src="" alt="" />
                  <span class="badge" id="deal-badge">New</span>
                </div>
              </div>
            </section>

            <section class="panel list-panel">
              <div class="panel__head">
                <h3>New Products</h3>
                <a class="link" href="#new-arrivals">Show All</a>
              </div>
              <div class="list" id="new-products"></div>
            </section>
          </aside>

          <section class="column column--center">
            <section class="hero-card" id="hero">
              <div class="hero__content">
                <p class="eyebrow">Trending Accessories</p>
                <h1>Modern <span>Sunglasses</span></h1>
                <p class="subtitle">Starting at $15.00</p>
                <div class="hero__actions">
                  <button class="btn primary">Shop now</button>
                  <button class="btn ghost">Just for you</button>
                </div>
              </div>
              <div class="hero__image">
                <img src="${HERO_IMAGE}" alt="Two friends wearing modern sunglasses" />
              </div>
            </section>

            <div class="chip-row">
              <button class="chip">Dress &amp; Frock</button>
              <button class="chip">Winter Wear</button>
              <button class="chip">Glasses &amp; Lens</button>
              <button class="chip">Shorts &amp; Jeans</button>
            </div>

            <section class="board board--wide">
              <div class="board__col" id="category-list">
                <h4>Category</h4>
                <ul>
                  <li>Clothes</li>
                  <li>Footwear</li>
                  <li>Jewelry</li>
                  <li>Perfume</li>
                  <li>Cosmetics</li>
                  <li>Glasses</li>
                  <li>Bags</li>
                </ul>
              </div>
              <div class="board__col" id="new-arrivals">
                <h4>New Arrivals</h4>
                <div class="mini-list"></div>
              </div>
              <div class="board__col" id="trending">
                <h4>Trending</h4>
                <div class="mini-list"></div>
              </div>
              <div class="board__col" id="top-rated">
                <h4>Top Rated</h4>
                <div class="mini-list"></div>
              </div>
            </section>

            <section class="board board--grid">
              <div class="board__col" id="best-sellers">
                <h4>Best Sellers</h4>
                <div class="mini-list"></div>
              </div>
              <div class="board__col board__col--wide">
                <h4>Featured Picks</h4>
                <div class="grid" id="product-grid" aria-live="polite"></div>
              </div>
            </section>
          </section>

          <aside class="column column--right">
            <section class="panel list-panel">
              <div class="panel__head">
                <h3>Hot Offers</h3>
                <a class="link" href="#hero">More</a>
              </div>
              <div class="list" id="hot-offers"></div>
            </section>

            <section class="panel services">
              <div class="panel__head">
                <h3>Our Services</h3>
              </div>
              <ul>
                <li>Worldwide Delivery for Order Over $100</li>
                <li>Next Day Delivery for Order over $200</li>
                <li>Best Online Support Hours</li>
                <li>Return Policy Money Back</li>
                <li>30% Money Back For Order Over $1000</li>
              </ul>
            </section>
          </aside>
        </div>

        <section class="cart" id="cart">
          <div class="cart__header">
            <div>
              <p class="cart__eyebrow">Your cart</p>
              <h2>Review items before checkout</h2>
            </div>
            <div class="cart__summary">
              <span id="cart-total">$0.00</span>
              <small id="cart-items-count">0 items</small>
            </div>
          </div>
          <div id="cart-items" class="cart__items" aria-live="polite"></div>
        </section>
      </main>

      <template id="card-template">
        <article class="card" data-product="">
          <div class="card__image">
            <img alt="" />
            <div class="card__chip"></div>
          </div>
          <div class="card__body">
            <p class="card__title"></p>
            <p class="card__desc"></p>
            <div class="card__meta">
              <span class="price"></span>
              <span class="rating"></span>
            </div>
            <button class="btn tiny" data-add="">Add to cart</button>
          </div>
        </article>
      </template>
    </div>

    <div class="toast" id="toast" role="status" aria-live="polite"></div>

    <div class="loading" id="loading" aria-hidden="true">
      <div class="loading__card">
        <div class="loader" aria-hidden="true"></div>
        <p>Preparing products…</p>
      </div>
    </div>

    <div class="modal" id="modal" aria-hidden="true">
      <div class="modal__backdrop"></div>
      <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal__controls">
          <button class="modal__action modal__back" aria-label="Back to home">
            <img src="assets/icon-arrow-left.svg" class="icon" alt="" />
            Back
          </button>
          <button class="modal__action modal__close" aria-label="Close modal">×</button>
        </div>
        <div class="modal__content">
          <div class="modal__image">
            <img alt="" />
            <span class="modal__chip"></span>
          </div>
          <div class="modal__info">
            <p class="modal__title" id="modal-title"></p>
            <p class="modal__desc"></p>
            <div class="modal__meta">
              <span class="modal__price"></span>
              <span class="modal__rating"></span>
            </div>
            <button class="btn primary" data-add="">Add to cart</button>
          </div>
        </div>
      </div>
    </div>

    <section class="cart-summary" id="cart-summary" aria-hidden="true">
      <div class="cart-summary__dialog">
        <div class="cart-summary__head">
          <div>
            <p class="cart__eyebrow">Cart Summary</p>
            <h3>Your selected items</h3>
          </div>
          <button class="pill" id="cart-summary-close">Close</button>
        </div>
        <div id="cart-summary-items" class="cart__items"></div>
        <div class="cart-summary__footer">
          <span>Total:</span>
          <strong id="cart-summary-total">$0.00</strong>
        </div>
      </div>
    </section>

    <footer class="footer">
              <span>Built as a pixel-perfect Velora storefront demo.</span>
      <span id="status"></span>
    </footer>
  `;
};

const hydrate = async () => {
  setStatus("Loading curated products…");
  setLoading(true);
  const { products, source } = await loadProducts();
  setProducts(products);
  renderCollections(getProducts());
  renderCart(getCart(), getCartTotals());
  renderCartSummary(getCart(), getCartTotals());
  setStatus(source === "live" ? "Live JSON feed" : "Local handcrafted catalog.");
  setLoading(false);
};

const wireEvents = () => {
  els.refresh?.addEventListener("click", hydrate);

  document.addEventListener("click", (event) => {
    const addBtn = event.target.closest("[data-add]");
    if (addBtn?.dataset.index !== undefined) {
      handleAddToCart(addBtn.dataset.index);
      event.stopPropagation();
      return;
    }

    if (
      event.target.classList.contains("modal__backdrop") ||
      event.target.closest(".modal__close") ||
      event.target.closest(".modal__back")
    ) {
      closeModal();
      return;
    }

    if (event.target === els.cartSummaryClose) {
      toggleCartSummary(false);
      return;
    }

    const card = event.target.closest("[data-product]");
    if (card && !event.target.closest(".nav")) {
      const idx = Number(card.dataset.product);
      const product = getProduct(idx);
      openModal(product);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.modal?.classList.contains("open")) {
      closeModal();
    }
    if (event.key === "Escape" && els.cartSummary?.classList.contains("open")) {
      toggleCartSummary(false);
    }
  });

  els.cartSummaryToggle?.addEventListener("click", () => {
    toggleCartSummary(true);
    renderCartSummary(getCart(), getCartTotals());
  });

  els.cartSummaryClose?.addEventListener("click", () => toggleCartSummary(false));
};

document.addEventListener("DOMContentLoaded", () => {
  buildShell();
  bindDom();
  wireEvents();
  hydrate();
});
