<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/about">
      About
    </router-link>
    <router-link to="/event">
      My Event
    </router-link>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
body {
  font-family: "Roboto", sans-serif;
}
h1 {
  font-size: 22px;
}

h2 {
  font-size: 20px;
}

h3 {
  font-size: 18px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
}
</style>
