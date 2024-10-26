<template>
  <div class="categories-wrapper">
    <Container>
      <h1>
        <span class="icon-tag">
          <Icon name="tabler:tags-filled" size="20" />
        </span>
        <span class="text-title">Categories</span>
      </h1>
      <h2 class="subtitle">Browse by Category</h2>
      <div class="categories">
        <div class="categories-container">
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Container from "@/components/Container.vue";
import CategoryCard from "./CategoryCard.vue"; // Pastikan komponen ini ada

const categories = [
  {
    id: 1,
    name: "Phones",
    image: "/images/category.png",
  },
  {
    id: 2,
    name: "Watches",
    image: "/images/category.png",
  },
  {
    id: 3,
    name: "PC",
    image: "/images/category.png",
  },
  {
    id: 4,
    name: "Mobiles",
    image: "/images/category.png",
  },
  {
    id: 5,
    name: "Monitors",
    image: "/images/category.png",
  },
  {
    id: 6,
    name: "Cameras",
    image: "/images/category.png",
  },
  {
    id: 7,
    name: "Gaming",
    image: "/images/category.png",
  },
];
</script>

<style lang="scss" scoped>
.categories-wrapper {
  background: #fff;
  padding: 60px 0;

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

  .categories {
    overflow: hidden;
    position: relative;
    width: 100%;

    .categories-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      gap: 20px;
      transition: transform 0.3s ease;

      @media (min-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(7, 1fr);
      }
    }
  }
}
</style>
