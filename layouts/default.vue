<template>
  <div class="page-wrapper">
    <header class="header">
      <Campaign />
      <Navbar />
    </header>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.page-wrapper {
  background: #f9f3f0;
}
</style>
