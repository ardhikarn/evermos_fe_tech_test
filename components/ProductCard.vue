<template>
  <div
    class="product-card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="this.$router.push(`/product/${product.id}`)"
  >
    <div class="image-container">
      <img :src="product.imageUrl" :alt="product.title" />
      <div v-if="product.discount" class="discount-badge">
        {{ product.discount }}% Off
      </div>
      <transition name="fade" mode="out-in">
        <div :class="{ 'hover-options': true, 'hover-options-visible': isHovered }">
          <div class="icon-container">
            <button class="icon">
              <Icon name="fa6-regular:eye" size="12" class="icon" />
            </button>
            <button class="add-to-cart" @click="addToCart">Add to Cart</button>
            <button class="icon">
              <Icon name="fa6-regular:heart" size="12" />
            </button>
          </div>
        </div>
      </transition>
    </div>
    <h3 class="product-title">{{ product.title }}</h3>
    <div class="rating">
      <i v-for="n in Math.floor(product.rating)" :key="n" class="star">★</i>
      <span class="review-count">({{ product.reviewCount }})</span>
    </div>
    <div class="price">
      ${{ product.price.toFixed(2) }}
      <span v-if="product.originalPrice" class="original-price">
        ${{ product.originalPrice.toFixed(2) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isHovered = ref(false);

const addToCart = () => {
  console.log(`Added to cart: ${props.product.title}`);
};

const addToWishlist = () => {
  console.log(`Added to wishlist: ${props.product.title}`);
};
</script>

<style scoped lang="scss">
.product-card {
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  .image-container {
    position: relative;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .discount-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #007bff;
      color: white;
      font-size: 0.75rem;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
    }

    .hover-options {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      border-radius: 8px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      visibility: hidden;

      button {
        background-color: #ff4081;
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        margin-bottom: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #e0356b;
        }
      }

      .icon-heart {
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  .product-title {
    margin-top: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
  }

  .rating {
    margin-top: 0.5rem;

    .star {
      color: #ffc107;
    }

    .review-count {
      margin-left: 0.25rem;
      font-size: 0.75rem;
      color: #666;
    }
  }

  .price {
    margin-top: 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;

    .original-price {
      font-size: 0.9rem;
      color: #999;
      text-decoration: line-through;
      margin-left: 0.5rem;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.product-card:hover {
  .hover-options {
    opacity: 1;
    visibility: visible;
  }

  cursor: pointer;
}

.icon-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button.icon {
  background: #fff !important;
  color: #ff4081;
  padding: 0.5rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;

  span {
    background-color: #ff4081;
  }

  &:hover {
    background-color: #e0356b;
  }
}
</style>
