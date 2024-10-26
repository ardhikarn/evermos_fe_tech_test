<template>
  <header class="header">
    <Container>
      <div class="header__content">
        <nav class="header__nav header__nav--left">
          <router-link to="/" class="header__link">Home</router-link>
        </nav>
        <nav class="header__nav header__nav--right">
          <router-link to="/help" class="header__link">Help</router-link>
          <router-link to="/register" class="header__link">Join Us</router-link>
          <router-link to="/login" class="header__link">Sign In</router-link>
        </nav>
      </div>
    </Container>
  </header>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as variables;

.header {
  background-color: #f9f3f0;
  padding: 8px 0;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__nav {
    display: flex;
    gap: 20px;
  }

  &__link {
    text-decoration: none;
    color: #777;
    font-size: 14px;

    &:hover {
      color: variables.$primary-color;
      transition: color 0.5s;
    }
  }
}
</style>
