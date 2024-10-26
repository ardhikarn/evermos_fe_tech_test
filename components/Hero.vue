<template>
  <section class="hero">
    <!-- Background Shapes -->
    <div class="hero-shapes">
      <div class="shape shape--circle"></div>
      <div class="shape shape--triangle"></div>
      <div class="shape shape--square"></div>
    </div>

    <Container>
      <div class="hero-content">
        <div class="text-container">
          <span class="subtitle">
            <span class="icon-fire">
              <Icon name="mdi:fire" size="16" />
            </span>
            <span class="text-subtitle">Hot Deal This Week</span>
          </span>
          <div :style="textStyle">
            <h1 class="hero-title">{{ currentSlide.title }}</h1>
          </div>
          <div>
            <button class="shop-now">
              <Icon name="lucide:shopping-cart" size="16" />
              <span>Shop Now</span>
            </button>
          </div>
        </div>
        <div class="image-container" :style="imageStyle">
          <img :src="currentSlide.image" alt="Hero Image" />
        </div>
      </div>
      <div class="slider-dots">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
        ></div>
      </div>
    </Container>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
const slides = ref([
  {
    title: "Smart Digital Watch",
    image: "/images/hero.png",
  },
  {
    title: "Rocco Wireless Headphone",
    image: "/images/hero.png",
  },
  {
    title: "Smart Digital Watch",
    image: "/images/hero.png",
  },
]);

const currentIndex = ref(0);
const textAnimation = ref(false);
const imageAnimation = ref(false);

const currentSlide = computed(() => slides.value[currentIndex.value]);

const textStyle = computed(() => ({
  transform: textAnimation.value ? "translateY(-20px)" : "translateY(0)",
  opacity: textAnimation.value ? "0" : "1",
  transition: "transform 0.5s ease, opacity 0.5s ease",
}));

const imageStyle = computed(() => ({
  transform: imageAnimation.value ? "translateX(100px)" : "translateX(0)",
  opacity: imageAnimation.value ? "0" : "1",
  transition: "transform 0.5s ease, opacity 0.5s ease",
}));

const nextSlide = () => {
  textAnimation.value = true;
  imageAnimation.value = true;
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
    textAnimation.value = false;
    imageAnimation.value = false;
  }, 500);
};

const goToSlide = (index: number) => {
  textAnimation.value = true;
  imageAnimation.value = true;
  setTimeout(() => {
    currentIndex.value = index;
    textAnimation.value = false;
    imageAnimation.value = false;
  }, 500);
};

let interval: ReturnType<typeof setInterval>;
onMounted(() => {
  interval = setInterval(nextSlide, 10000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: flex;
  padding: 90px 0;
  background: #f9f3f0;

  .hero-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;

    .shape {
      position: absolute;
      opacity: 0.1;

      &--circle {
        width: 200px;
        height: 200px;
        background-color: #d63384;
        border-radius: 50%;
        top: 20%;
        left: 10%;
      }

      &--triangle {
        width: 0;
        height: 0;
        border-left: 100px solid transparent;
        border-right: 100px solid transparent;
        border-bottom: 150px solid #ff497c;
        bottom: 10%;
        right: 15%;
        transform: rotate(-30deg);
      }

      &--square {
        width: 150px;
        height: 150px;
        background-color: #ffd700;
        bottom: 20%;
        left: 20%;
        transform: rotate(45deg);
      }
    }
  }

  .hero-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    z-index: 2;
    position: relative;
  }

  .text-container {
    flex: 1;
    text-align: left;
    transition: all 0.5s;
    width: 50%;

    .subtitle {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 1.5rem;
      margin-bottom: 3rem;

      .text-subtitle {
        font-size: 14px;
        color: #ff497c;
        font-weight: 600;
      }

      .icon-fire {
        background-color: #ff497c;
        color: white;
        padding: 0.2rem;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }

    .hero-title {
      font-size: 2.5rem;
    }
  }

  .image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    width: 50%;
    z-index: 2;
  }

  .slider-dots {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }

  .dot {
    width: 50px;
    height: 5px;
    margin: 0 5px;
    background: white;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;
    z-index: 2;
  }

  .dot.active {
    background: #ff497c;
  }

  .shop-now {
    background: #d63384;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
  }

  .shop-now:hover {
    background: #ff497c;
  }
}

@media screen and (max-width: 768px) {
  .hero {
    padding: 60px 0;
    flex-direction: column;
  }

  .hero-content {
    flex-direction: column;
    gap: 2rem;
    overflow: hidden;
  }

  .text-container,
  .image-container {
    width: 100% !important;
    text-align: center !important;
  }

  .image-container img {
    border-radius: 0;
  }

  .slider-dots {
    margin-top: 50px;
  }

  .subtitle {
    font-size: 1.25rem;
    justify-content: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .shop-now {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
}
</style>
