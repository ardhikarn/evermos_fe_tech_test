<template>
  <div class="products-wrapper">
    <Container>
      <div class="product-list">
        <h1>
          <span class="icon-tag">
            <Icon name="tabler:tags-filled" size="20" />
          </span>
          <span class="text-title">Our Products</span>
        </h1>
        <h2 class="subtitle">Explore our Products</h2>
        <div v-show="!_products.length">
          <Loading />
        </div>
        <div class="grid">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <ClientOnly>
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
            <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
          </div>
        </ClientOnly>
      </div>
    </Container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import ProductCard from "./ProductCard";

import { useProductsStore } from "@/stores/products";

const { fetchProducts, products } = useProductsStore();
await fetchProducts();

const _products = ref(products);
const currentPage = ref(1);
const productsPerPage = ref(4);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage.value;
  const end = start + productsPerPage.value;
  return _products.value.slice(start, end);
});
const totalPages = computed(() =>
  Math.ceil(_products.value.length / productsPerPage.value)
);

const updateProductsPerPage = () => {
  if (window.innerWidth < 600) {
    productsPerPage.value = 2;
  } else if (window.innerWidth < 900) {
    productsPerPage.value = 3;
  } else {
    productsPerPage.value = 4;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value += 1;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value -= 1;
};

onMounted(() => {
  updateProductsPerPage();
  window.addEventListener("resize", updateProductsPerPage);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateProductsPerPage);
});
</script>

<style scoped lang="scss">
.products-wrapper {
  background-color: #fff;
  padding: 4rem 0;
}

h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  margin-bottom: 10px;

  .icon-tag {
    background-color: #ff497c;
    color: white;
    padding: 0.2rem;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .text-title {
    color: #ff497c;
    font-weight: 600;
  }
}

h2 {
  text-align: left;
  font-size: 36px;
  margin-bottom: 30px;
}

.product-list {
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
  }
  .grid {
    display: grid;
    gap: 1rem;

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 600px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
    button {
      padding: 0.5rem 1rem;
      margin: 0 0.25rem;
      background-color: #f0f0f0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
}
</style>
