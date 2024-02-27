<script>
import axios from 'axios'
export default {
  data() {
    return {
      towns: [],
      studentForm: {
        DNI: '',
        first_name: '',
        last_name: '',
        email: '',
        telephone: '',
        fecha_nacimiento: '',
        fecha_matriculacion: '',
        town: '',
        examination: ''
      }
    }
  },
  mounted() {
    this.fetchTowns()
  },
  methods: {
    async createStudent() {
      try {
        const response = await axios.post('student/', this.studentForm)
        console.log(response)
      } catch (error) {
        console.error('Error creating student:', error)
      }
    },
    async fetchTowns() {
      try {
        const response = await axios.get('town/')
        this.towns = response.data
      } catch (error) {
        console.error('Error fetching towns:', error)
      }
    }
  }
}
</script>

<template>
  <form class="max-w-md mx-2 flex flex-col items-center">
    <div class="w-full mb-4 flex flex-row sm:justify-center">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        DNI:
        <input
          type="text"
          class="w-auto bg-gray-100 mr-4 rounded-md border-2"
          v-model="studentForm.DNI"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Municipio:
        <select class="bg-gray-100 rounded-md border-2">
          <option v-for="town in towns" :key="town.id" :selected="studentForm.town">
            {{ town.name }}
          </option>
        </select>
      </label>
    </div>
    <!--Nombre y Apellido-->
    <div class="w-full mb-4 md:space-y-0 md:space-x-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Nombre y Apellidos: </label>
      <div class="flex flex-row md:space-x-1">
        <input
          type="text"
          class="w-1/2 mr-2 rounded-md border-2 bg-gray-100"
          required
          v-model="studentForm.first_name"
        />
        <input
          type="text"
          class="w-1/2 bg-gray-100 rounded-md border-2"
          required
          v-model="studentForm.last_name"
        />
      </div>
    </div>
    <!--Contacto-->
    <div class="w-full mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Email:
        <input
          type="email"
          class="w-full bg-gray-100 rounded-md py-1 border-2"
          v-model="studentForm.email"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Teléfono:
        <input
          type="tel"
          v-model="studentForm.telephone"
          class="w-auto bg-gray-100 rounded-md border-2"
        />
      </label>
    </div>
    <div class="w-full mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Fecha Nacimiento:
        <input
          type="date"
          class="w-auto bg-gray-100 rounded-md border-2"
          v-model="studentForm.fecha_nacimiento"
          required
        />
      </label>
      <label
        >Fecha de Matriculacionn:
        <input type="date" v-model="studentForm.fecha_matriculacion" />
      </label>
    </div>
    <div class="w-full mb-4">
      <label class="flex flex-col text-gray-700 text-sm font-bold mb-2">
        Fecha Última Examinación:
        <input
          type="text"
          class="w-auto bg-gray-100 rounded-md border-2"
          v-model="studentForm.examination"
        />
      </label>
    </div>

    <button
      type="submit"
      class="button bg-green-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <font-awesome-icon icon="check" class="mr-2 text-white" />
    </button>
  </form>
</template>
