<template>
  <header>
    <Navbar />
  </header>
  <main class="w-full h-screen flex justify-center items-center">
    <CreateTypeFoulFoulForm />
  </main>
</template>
<script setup>
import Navbar from '@components/Navbar.vue'
import CreateTypeFoulFoulForm from '@components/CreateTypeFoulForm.vue'
</script>