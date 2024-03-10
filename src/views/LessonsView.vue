<script setup>
import Navbar from '@components/Navbar.vue'
import LessonsList from '@components/LessonsList.vue'
</script>
<template>
  <header>
    <Navbar activeElement="Clases" />
  </header>
  <main class="w-full h-screen flex justify-center items-center">
    <LessonsList />
  </main>
</template>
