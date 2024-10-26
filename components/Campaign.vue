<template>
  <div
    v-if="isVisible"
    class="header-top-campaign"
    :class="{ 'animate-hide': isHiding }"
    @animationend="handleAnimationEnd"
  >
    <Container>
      <div class="campaign-content">
        <p>Open Doors To A World Of Fashion <a href="#">Discover More</a></p>
      </div>
    </Container>
    <Icon
      size="16"
      name="material-symbols:close-rounded"
      class="remove-campaign"
      @click="startHideAnimation"
    />
  </div>
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
      color: #fff;
      font-size: 14px;
      margin: 0;
      a {
        font-weight: 700;
        text-decoration: underline;
        &:hover {
          color: #d63384;
          transition: all 0.5s;
        }
      }
    }
  }

  .remove-campaign {
    background-color: #f8f8f8;
    border: none;
    color: #000;
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    right: 20px;
    top: 10px;
    &:hover {
      background-color: #3577f0;
      transition: all 0.5s;
    }
  }
}
</style>
