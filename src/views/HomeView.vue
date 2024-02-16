<script setup>
import Navbar from '@components/Navbar.vue'
import HomeMap from '@components/HomeMap.vue'
</script>
<template>
  <div class="w-full h-full flex flex-row">
    <header>
      <Navbar activeNavAdmin="Home" />
    </header>
    <main class="w-full h-screen flex flex-col justify-center items-center">
      <HomeMap />
    </main>
  </div>
</template>

