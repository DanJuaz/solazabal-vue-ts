<script setup>
const props = defineProps(['activeElement']);

const isActive = (element) => element === props.activeElement;
</script>

<template>
  <nav class="z-[10000] w-screen absolute bottom-0 left-0 right-0 flex flex-row justify-center bg-secondary">
    <a href="/home" class="flex flex-col justify-center items-center px-4 py-2 text-light hover:-translate-y-2 my-2 rounded-md">
      <font-awesome-icon icon="road" class="text-light" />Conducir
      <span class="" :class="{ 'w-6 border-2 rounded-lg bg-light text-light': isActive('Conducir') }"></span>
    </a>
    <a href="/students" class="flex flex-col justify-center items-center px-4 py-2 text-light hover:bg-resaltar my-2 rounded-md">
      <font-awesome-icon icon="user-group" class="text-light" />Alumnos
      <span class="" :class="{ 'w-6 border-2 rounded-lg bg-light text-light': isActive('Alumnos') }"></span>
    </a>
    <a href="/lessons" class="flex flex-col justify-center items-center px-4 py-2 text-light hover:bg-resaltar my-2 rounded-md">
      <font-awesome-icon icon="book-bookmark" class="text-light" />Clases
      <span class="" :class="{ 'w-6 border-2 rounded-lg bg-light text-light': isActive('Clases') }"></span>
    </a>
  </nav>
</template>
