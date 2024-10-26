import { defineStore } from "pinia";

export const useProductsStore = defineStore({
  id: "products",
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      const response = await fetch(
        "https://my-json-server.typicode.com/ardhikarn-note/db_evermos/products"
      );
      this.products = await response.json();
    },
  },
});
