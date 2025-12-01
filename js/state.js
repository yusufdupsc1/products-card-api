let products = [];
const cart = [];

export const setProducts = (items = []) => {
  products = items.map((item, idx) => ({ ...item, __index: idx }));
};

export const getProducts = () => products;

export const getProduct = (index) => products.find((p) => p.__index === index);

export const addToCart = (product) => {
  if (!product) return;
  cart.push(product);
};

export const getCart = () => cart;

export const getCartTotals = () => {
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  return { count: cart.length, total };
};
