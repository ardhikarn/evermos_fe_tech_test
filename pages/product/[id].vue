<template>
  <Menu :is-full-width="true" />
  <div class="product">
    <h1>Product</h1>
    <p>Ini adalah halaman product {{ route.params.id }}</p>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>

<style lang="scss" scoped></style>
