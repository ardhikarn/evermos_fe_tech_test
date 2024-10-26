<template>
  <header
    v-if="isVisible"
    class="header-top-campaign"
    :class="{ 'animate-hide': isHiding }"
    @animationend="handleAnimationEnd"
  >
    <Container>
      <div class="campaign-content">
        <p>
          Open Doors To A World Of Fashion
          <a href="#" aria-label="Discover More about Fashion">Discover More</a>
        </p>
      </div>
    </Container>
    <Icon
      size="16"
      name="material-symbols:close-rounded"
      class="remove-campaign"
      @click="startHideAnimation"
      aria-label="Close Campaign"
    />
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isVisible = ref(true);
const isHiding = ref(false);

function startHideAnimation() {
  isHiding.value = true;
}

function handleAnimationEnd() {
  if (isHiding.value) {
    isVisible.value = false;
  }
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

.header-top-campaign {
  background-image: url("/images/campaign-bg.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 8px 0;
  position: relative;
  z-index: 999;
  transition: transform 0.5s ease, opacity 0.5s ease;

  &.animate-hide {
    animation: fadeUp 0.5s ease forwards;
  }

  .campaign-content {
    p {
      color: $text-color-light;
      font-size: $font-size-small;
      margin: 0;
      a {
        font-weight: $font-weight-bold;
        text-decoration: underline;
        transition: all 0.5s;

        &:hover {
          color: $primary-color;
        }
      }
    }
  }

  .remove-campaign {
    background-color: $text-color-light;
    border: none;
    cursor: pointer;
    font-size: $font-size-xl;
    position: absolute;
    right: 20px;
    top: 10px;

    &:hover {
      background-color: $primary-color;
      transition: all 0.5s;
    }
  }
}

@keyframes fadeUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}
</style>
