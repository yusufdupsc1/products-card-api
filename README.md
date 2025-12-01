# Products Card • 2025 Aesthetic

A modern, gradient-glass product card gallery that pulls live JSON data (powered by [DummyJSON Products](https://dummyjson.com/products)). Built as a single-page showcase for storefront previews or inspiration boards.

## Features
- 2025-inspired visual language: layered gradients, glassmorphism, bold type pairing (Space Grotesk + Manrope).
- Live product feed from `https://dummyjson.com/products?limit=12` with graceful fallback data.
- Responsive grid with hover depth, focus states, and micro-interactions.
- Lightweight, vanilla stack (HTML/CSS/JS) ready to drop into any static host.

## Getting Started
1) Open `index.html` in your browser (double-click or serve via any static server).  
2) Click **Refresh feed** to re-fetch the latest JSON products.  
3) Optional: replace `API` in `js/script.js` with your own endpoint that returns an array of products (adjust mapping if fields differ).

## Project Structure
- `index.html` — markup and template for cards.
- `css/style.css` — visual system (colors, spacing, animations, responsive grid).
- `js/script.js` — data fetching, fallback dataset, and rendering logic.

## Customization Tips
- Colors & glow: adjust CSS variables at the top of `css/style.css`.
- Card content: extend the template in `index.html` and map more fields inside `renderProducts` in `js/script.js`.
- Data source: point `API` to your own JSON link; keep `title`, `price`, `category`, `description`, `image`, and `rating` fields or adapt the mapper.

## Notes
- The fallback dataset ensures the layout still looks great if the live API rate-limits or you develop offline.
- No build step required; everything runs in the browser.
