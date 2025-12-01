import { CATALOG } from "./constants.js";

const BASE = "https://dummyjson.com/products?limit=24";

export const loadProducts = async () => {
  try {
    const res = await fetch(BASE);
    const body = await res.json();
    const list = Array.isArray(body.products) ? body.products : [];
    if (!res.ok || !list.length) throw new Error(`Request failed (${res.status})`);

    const mapped = list.map((item) => {
      const basePrice = Number(item.price) || 0;
      return {
        title: item.title || "Untitled product",
        price: basePrice,
        oldPrice: basePrice ? basePrice * 1.2 : null,
        category: item.category || "essentials",
        description: item.description || "No description provided.",
        image: item.thumbnail || item.images?.[0] || "https://dummyjson.com/image/400x400",
        rating: { rate: item.rating ?? 4.5, count: item.stock ?? 120 },
        discount: item.discountPercentage || 0,
      };
    });

    return { products: mapped, source: "live" };
  } catch (error) {
    console.error(error);
    return { products: CATALOG, source: "fallback" };
  }
};
