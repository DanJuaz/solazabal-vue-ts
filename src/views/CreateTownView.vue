<script setup>
import CreateTownForm from '@components/CreateTownForm.vue'
import Navbar from '@components/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="w-full h-screen flex justify-center items-center">
    <CreateTownForm />
  </main>
</template>
