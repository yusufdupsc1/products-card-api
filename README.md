# Products Card • 2025 Aesthetic

A pixel-perfect storefront mock with a bright gradient backdrop, glass cards, and fully offline assets. Everything (markup shell, data, and imagery) ships locally for zero external requests.

## Features
- Curated local catalog (12 items) with hero, deal-of-the-day, arrivals, trending, top-rated, hot offers, and cart summary.
- Modular vanilla JS: `api` (local catalog), `state` (products/cart), `ui` (rendering), `dom` (bindings), `utils`, and `main` orchestrator.
- Minimal HTML shell (`index.html` only mounts `#app` and scripts); layout is generated dynamically.
- All imagery and favicon live in `assets/`; no external fonts or CDN hits.

## Getting Started
1) Serve or open `index.html` in a browser.  
2) Hit **Refresh feed** to re-seed the layout from the local catalog.  
3) Add to cart and open modals to verify interactions.

## Project Structure
- `index.html` — minimal mount point + stylesheet/script.
- `css/style.css` — visual system (colors, spacing, responsive grid).
- `js/main.js` — builds the layout and wires events.
- `js/ui.js` — rendering for lists, grids, hero blocks, modal, and cart.
- `js/state.js` — catalog state and cart storage.
- `js/api.js` — supplies the local product catalog.
- `assets/` — hero, product shots, and favicon.
