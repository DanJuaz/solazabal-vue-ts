<script setup>
import Navbar from '@components/Navbar.vue'
import LessonsList from '@components/LessonsList.vue'
</script>
<template>
  <header>
    <Navbar activeElement="Clases" />
  </header>
  <main>
    <LessonsList />
  </main>
</template>
