<template>
  <Menu :is-full-width="true" />
  <Container>
    <ClientOnly>
      <div class="product-detail-page" v-if="product">
        <!-- Image Gallery Section -->
        <div class="gallery">
          <div class="main-image">
            <img
              v-if="product && product.images.length"
              :src="selectedImage"
              :alt="product.title"
            />
          </div>
          <div class="thumbnails">
            <img
              v-for="(img, index) in product.images"
              :key="index"
              :src="img"
              :alt="`Thumbnail ${index + 1}`"
              @click="selectedImage = img"
            />
          </div>
        </div>

        <!-- Product Info Section -->
        <div class="product-info">
          <h1>{{ product.title }}</h1>
          <p class="price">{{ formatPrice(product.price) }}</p>

          <div class="rating">
            <span>⭐⭐⭐⭐⭐</span>
            <span class="reviews">({{ product.reviews }} customer reviews)</span>
          </div>

          <ul class="product-details">
            <li>✔ In stock</li>
            <li>✔ Free delivery available</li>
            <li>✔ Sales 30% OFF Use Code: <strong>MOTIVE30</strong></li>
          </ul>

          <!-- Color Options -->
          <div class="color-options">
            <p>Colors:</p>
            <div class="color-circles">
              <span
                v-for="(color, index) in product.colors"
                :key="index"
                :style="{ backgroundColor: color }"
                class="color-circle"
              ></span>
            </div>
          </div>

          <!-- Size Options -->
          <div class="size-options">
            <p>Size:</p>
            <div class="sizes">
              <button
                v-for="(size, index) in product.sizes"
                :key="index"
                @click="selectedSize = size"
                :class="{ selected: selectedSize === size }"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity Selector -->
          <div class="option-selector">
            <div class="quantity-selector">
              <button @click="decreaseQuantity">-</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQuantity">+</button>
            </div>
            <button class="add-to-cart">Add to Cart</button>
            <button class="wishlist">
              <Icon name="lucide:heart" size="16" />
            </button>
          </div>

          <!-- Description Section -->
          <div class="description">
            <h2>Description</h2>
            <p>{{ product.description }}</p>
          </div>

          <!-- Specifications Section -->
          <div class="specifications">
            <h2>Specifications</h2>
            <p>{{ product.specifications }}</p>
          </div>

          <!-- Benefits Section -->
          <div class="benefits">
            <div>🚚 Easy Returns</div>
            <div>💯 Quality Service</div>
            <div>🏆 Original Product</div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </Container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";

const route = useRoute();
interface Product {
  id: number;
  title: string;
  price: { min: number; max: number };
  reviews: number;
  discount: number;
  rating: number;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
  specifications: string;
}

const product = ref<Product | null>(null);

await fetch(
  `https://my-json-server.typicode.com/ardhikarn-note/db_evermos/products/${route.params.id}`
)
  .then((res) => res.json())
  .then((data) => {
    product.value = data;
  });

const quantity = ref(1);
const selectedImage = computed(() => product.value?.images[0] || "");
const selectedSize = ref("");

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const formatPrice = (price: { min: number; max: number }) => {
  return `$${price.min.toFixed(2)} - $${price.max.toFixed(2)}`;
};
</script>

<style lang="scss" scoped>
.product-detail-page {
  display: flex;
  gap: 40px;
  padding: 80px 0;

  .gallery {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 40%;

    .main-image img {
      width: 100%;
      border-radius: 8px;
    }

    .thumbnails {
      display: flex;
      gap: 8px;

      img {
        width: 100%;
        height: 60px; /* Tinggi tetap */
        cursor: pointer;
        border-radius: 8px;
        object-fit: cover;
      }
    }
  }

  .product-info {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 60%;

    h1 {
      font-size: 1.8em;
      margin-bottom: 10px;
    }

    .price {
      font-size: 1.2em;
      color: #666;
      margin-bottom: 10px;
    }

    .rating {
      color: #ffd700;
      margin-bottom: 10px;

      .reviews {
        color: #999;
        margin-left: 5px;
      }
    }

    .product-details {
      color: #333;
      margin-bottom: 20px;
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 5px;
      }
    }

    .color-options {
      margin-bottom: 15px;

      .color-circles {
        display: flex;
        gap: 10px;

        .color-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }

    .size-options {
      margin-bottom: 20px;

      .sizes button {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        background-color: #fff;
        font-size: 12px;
        margin-right: 10px;
        cursor: pointer;
        transition: background-color 0.3s;

        &.selected {
          background-color: #ff497c;
          color: #fff;
        }
      }
    }

    .option-selector {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .quantity-selector {
      display: flex;
      align-items: center;

      button {
        width: 30px;
        height: 30px;
        font-size: 18px;
        border: none;
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;
      }

      span {
        margin: 0 10px;
      }
    }

    .add-to-cart {
      background-color: #ff497c;
      color: #fff;
      padding: 10px 50px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
      border-radius: 5px;

      &:hover {
        background-color: #d63384;
      }
    }

    .wishlist {
      background-color: #fff;
      color: #ff497c;
      padding: 10px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f0f0f0;
      }
    }

    .description,
    .specifications {
      margin-top: 20px;

      h2 {
        font-size: 1.2em;
        margin-bottom: 10px;
      }
    }

    .benefits {
      display: flex;
      gap: 15px;
      margin-top: 20px;
      color: #666;

      div {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
