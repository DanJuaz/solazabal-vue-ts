import axios from 'axios';
<template>
  <form class="flex flex-col">
    <label class="flex flex-col text-gray-700 text-sm font-bold mb-2"
      >Nombre del Falta:
      <input
        v-model="form_foul.name"
        type="text"
        class="w-auto bg-gray-100 mr-4 font-medium rounded-md border-2"
      />
    </label>
    <label class="flex flex-row items-center text-gray-700 text-sm font-bold mb-2"
      >Tipo del Falta:
      <select
        v-model="form_foul.type_foul"
        class="w-auto bg-gray-100 mr-2 font-medium rounded-md border-2"
      >
        <option>Elegi un tipo de falta</option>
        <option v-for="type_foul in type_foul" :key="type_foul.id" :value="type_foul.id">
          {{ type_foul.name }}
        </option>
      </select>
      <router-link to="/create-type-foul">
        <font-awesome-icon icon="plus" class="ml-0 text-primary text-lg font-extrabold" />
      </router-link>
    </label>
    <button @click="create_foul()" class="bg-primary text-white p-2 rounded-md" type="submit">
      Crear Falta
    </button>
  </form>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      form_foul: {
        name: '',
        type_foul: ''
      },
      type_foul: []
    }
  },
  mounted() {
    this.fetch_type_foul()
  },
  methods: {
    create_foul() {
      console.log('Falta Creada')
    },
    async fetch_type_foul() {
      try {
        const response = await axios.get('type_foul/')
        this.type_foul = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
