import { defineStore } from "pinia";

export const useCategoriesStore = defineStore({
  id: "categories",
  state: () => ({
    categories: [],
  }),
  actions: {
    async fetchCategories() {
      const response = await fetch(
        "https://my-json-server.typicode.com/ardhikarn-note/db_evermos/categories"
      );
      this.categories = await response.json();
    },
  },
});
