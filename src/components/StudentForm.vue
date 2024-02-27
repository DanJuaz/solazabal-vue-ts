<template>
  <form class="max-w-md mx-2 flex flex-col items-center">
    <img :src="student.img" :alt="`Imagen de ${student.name}`" class="mb-4" />
    <div class="w-full mb-4 flex flex-row sm:justify-center">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        DNI:
        <input
          type="text"
          class="w-auto bg-gray-100 mr-4 rounded-md border-2"
          :value="student.DNI"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Municipio:
        <select class="bg-gray-100 rounded-md border-2">
          <option v-for="town in towns" :key="town.id" :value="town.name">{{ town.name }}</option>
        </select>
      </label>
    </div>
    <!--Nombre y Apellido-->
    <div class="w-full mb-4 md:space-y-0 md:space-x-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Nombre y Apellidos: </label>
      <div class="flex flex-row md:space-x-1">
        <input
          type="text"
          class="w-1/2 mr-2  rounded-md border-2 bg-gray-100"
          :value="student.name"
          required
        />
        <input
          type="text"
          class="w-1/2 bg-gray-100 rounded-md border-2"
          :value="student.surname"
          required
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
          :value="student.email"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Teléfono:
        <input
          type="tel"
          class="w-auto bg-gray-100 rounded-md border-2"
          :value="student.telephone"
        />
      </label>
    </div>
    <div class="w-full mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Fecha Nacimiento:
        <input
          type="date"
          class="w-auto bg-gray-100 rounded-md border-2"
          :value="student.fecha_nacimiento"
          required
        />
      </label>
      <label>Fecha de Matriculacionn:
        <input
        type="date"
        :value="student.fecha_matriculacion"/>
      </label>
    </div>
    <div class="w-full mb-4">
      <label class="flex flex-col text-gray-700 text-sm font-bold mb-2">
        Fecha Última Examinación:
        <input
          type="text"
          class="w-auto bg-gray-100 rounded-md border-2"
          :value="student.examination?.date"
        />
        <span>Cantidad: {{ student.examination?.id }}</span>
      </label>
    </div>
    <div class="flex w-full space-x-4">
      <button
        type="submit"
        class="button bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <font-awesome-icon icon="refresh" class="mr-2 text-white" />
      </button>
      <button
        type="submit"
        class="button bg-red-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <font-awesome-icon icon="trash" class="mr-2 text-white" />
      </button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      studentDNI: '',
      student: {},

      towns: []
    }
  },
  mounted() {
    this.fetch_student(), this.fetch_towns() // Llama al método para cargar los datos del estudiante
  },
  methods: {
    async fetch_student() {
      try {
        // Get Router Param
        this.studentDNI = this.$route.params.id
        const response = await axios.get(`student/${this.studentDNI}/`)
        this.student = response.data
        console.log(this.student)
      } catch (error) {
        console.error('Error fetching student:', error)
      }
    },
    async fetch_towns() {
      try {
        const response = await axios.get(`town/`)
        this.towns = response.data
        //console.log(this.towns)
      } catch (error) {
        console.error('Error fetching student:', error)
      }
    }
  }
}
</script>
