<template>
  <header>
    <Navbar />
  </header>
  <main class="w-full h-screen flex justify-center items-center">
    <CreateFoulForm />
  </main>
</template>
<script setup>
import Navbar from '@components/Navbar.vue'
import CreateFoulForm from '@components/CreateFoulForm.vue'
</script>