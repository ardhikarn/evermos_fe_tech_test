<template>
  <div class="navbar-wrapper" :class="{ scrolled: isScrolled, fixed: isFixed }">
    <div class="navbar" :class="{ isFullWidth: props.isFullWidth }">
      <Container>
        <div class="navbar-container">
          <div class="logo">
            <NuxtLink to="/">
              <h1>Logo</h1>
            </NuxtLink>
          </div>
          <ul class="nav-links">
            <li v-for="(link, index) in navLinks" :key="index">
              <NuxtLink :to="link.href">
                <Icon :name="link.name" size="24" />
              </NuxtLink>
            </li>
          </ul>
          <div class="menu-toggle" @click="toggleMenu" :aria-expanded="isMenuOpen">
            <span :class="{ active: isMenuOpen }"></span>
            <span :class="{ active: isMenuOpen }"></span>
            <span :class="{ active: isMenuOpen }"></span>
          </div>
        </div>

        <!-- Overlay -->
        <transition name="fade">
          <div class="overlay" v-if="isMenuOpen" @click="toggleMenu"></div>
        </transition>

        <transition name="slide">
          <ul class="dropdown" v-if="isMenuOpen">
            <li v-for="(link, index) in navLinks" :key="index">
              <NuxtLink :to="link.href">
                <Icon :name="link.name" />
              </NuxtLink>
            </li>
          </ul>
        </transition>
      </Container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  isFullWidth: {
    type: Boolean,
    default: false,
  },
});

const navLinks = ref([
  { name: "lucide:search", href: "/search" },
  { name: "lucide:heart", href: "/wishlist" },
  { name: "lucide:shopping-cart", href: "/cart" },
  { name: "lucide:user", href: "/register" },
]);

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const isFixed = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
  isFixed.value = window.scrollY > 50;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.navbar-wrapper {
  padding-bottom: 30px;
  &.fixed {
    z-index: 1000;
    position: sticky;
    top: 20px;
    left: 0;
    transition: all 0.3s;
  }
}
.navbar {
  z-index: 1000;
  margin: 0 auto;
  max-width: 1200px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: background 0.3s, box-shadow 0.3s, position 0.3s, top 0.3s;
  padding: 1rem;

  &.isFullWidth {
    max-width: 100%;
    border-radius: 0;
  }
}

.navbar.scrolled {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  color: #333;
  margin: 0;
}

.nav-links {
  display: flex;
  list-style: none;
  height: 100%;
}

.nav-links li {
  margin: 0 1rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #d63384;
  scale: 1.1;
  transition: all 0.3s;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.menu-toggle span {
  height: 3px;
  width: 25px;
  background: #333;
  margin: 3px 0;
  transition: all 0.3s;
}

.menu-toggle span.active {
  background: #fff;
}

.dropdown {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
}

.dropdown li {
  margin: 1rem 0;
}

.dropdown a {
  text-decoration: none;
  color: #333;
}

@media (max-width: 768px) {
  .navbar {
    border-radius: 0;
  }

  .nav-links {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
