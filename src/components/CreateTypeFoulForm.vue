<template>
  <form class="flex flex-col">
    <label class="flex flex-col text-gray-700 text-sm font-bold mb-2"
      >Nombre del Tipo Falta:
      <input
        v-model="form_type_foul.name"
        type="text"
        class="w-auto bg-gray-100 mr-4 font-medium rounded-md border-2"
      />
    </label>
    <button @click="create_type_foul()" class="bg-primary text-white p-2 rounded-md" type="submit">
      Crear Tipo Falta
    </button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      form_type_foul: {
        name: '',
      }
    }
  }
}
</script>
