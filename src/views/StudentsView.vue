<script setup>
import Navbar from '@components/Navbar.vue'
import StudentList from '@components/StudentList.vue'
</script>

<template>
  <header>
    <Navbar activeElement="Alumnos"/>
  </header>
  <main class="w-full h-screen flex justify-center items-center">
    <StudentList />
  </main>
</template>
