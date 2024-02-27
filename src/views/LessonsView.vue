<script setup>
import Navbar from '@components/Navbar.vue'
import LessonsTable from '@components/LessonsTable.vue'
</script>
<template>
  <header>
    <Navbar activeElement="Clases" />
  </header>
  <main>
    <LessonsTable />
  </main>
</template>
