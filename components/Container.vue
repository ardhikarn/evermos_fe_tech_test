<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;

  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
}
</style>
