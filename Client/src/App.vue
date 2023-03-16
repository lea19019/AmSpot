<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <nav>
      <RouterLink :to="{ name: 'home'}">Home</RouterLink>
      <RouterLink :to="{ name: 'createRefugee'}">Post Refugee</RouterLink>
    </nav>
    <RouterView />
</template>

<style scoped>
</style>
