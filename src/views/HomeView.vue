<script setup>
import Navbar from '@components/Navbar.vue'
import HomeMap from '@components/HomeMap.vue'
</script>
<template>
  <div class="w-screen h-full flex flex-row">
    <header class="">
      <Navbar activeElement="Conducir"/>
    </header>
    <main class="w-screen flex flex-col justify-center items-center">
      <HomeMap />
    </main>
  </div>
</template>

