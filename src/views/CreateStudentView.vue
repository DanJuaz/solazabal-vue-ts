<script setup>
import CreateFormStudent from '@components/CreateFormStudent.vue'
import Navbar from '@components/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="w-full h-screen flex justify-center items-center">
    <CreateFormStudent />
  </main>
</template>
