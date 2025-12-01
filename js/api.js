import { CATALOG } from "./constants.js";

export const loadProducts = async () => {
  return { products: CATALOG, source: "local" };
};
