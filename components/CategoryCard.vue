<template>
  <div class="category-card">
    <div class="image-wrapper">
      <img :src="category.image" :alt="category.name" />
    </div>
    <h3 class="category-name">{{ category.name }}</h3>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  category: {
    id: number;
    name: string;
    image: string;
  };
}>();
</script>

<style lang="scss" scoped>
.category-card {
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .image-wrapper {
    overflow: hidden;

    img {
      width: 50%;
      height: auto;
      transition: transform 0.3s ease;
    }
  }

  .category-name {
    padding: 16px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  &:hover .image-wrapper img {
    transform: scale(1.1);
  }
}
</style>
