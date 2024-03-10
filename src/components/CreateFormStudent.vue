<script>
import axios from 'axios'
import router from '@/router'
export default {
  data() {
    return {
      towns: [],
      studentForm: {
        img: '',
        DNI: '12345678D',
        name: 'dwqdwq',
        surname: 'dwqdwq',
        email: 'ddwqdw@dwqdq.com',
        telephone: '123654789',
        fecha_nacimiento: '2023-01-01',
        fecha_matriculacion: '2023-01-01',
        town: 0,
        teacher: localStorage.getItem('id')
      }
    }
  },
  mounted() {
    this.fetchTowns()
  },
  methods: {
    handleFileUpload(event) {
      const fileInput = event.target
      const file = fileInput.files[0]
      const filePath = fileInput.value // Obtener la ruta del archivo seleccionado desde el campo de entrada
      this.studentForm.img = {
        file: file,
        path: filePath
      }
    },
    async fetchTowns() {
      try {
        const response = await axios.get('town/')
        this.towns = response.data
      } catch (error) {
        console.error('Error fetching towns:', error)
      }
    },
    async insert_student() {
      try {

        console.log(this.studentForm)
        const response = await axios.post('student/', this.studentForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.$notify({
          title: 'Todo Ha salido bien!',
          text: `${response.data.name} ha sido creado`
        })
        this.$router.push({ name: 'students' })

      } catch (error) {
        console.error('Error creating student:', error)
        console.log(error.request)
      }
    }
  }
}
</script>

<template>
  <form class="w-auto mx-4 flex flex-col md:flex-col items-center">
    <h2 class="w-auto mr-4 font-medium">Nuevo Alumno: {{ studentForm.name }}</h2>
    <input
      type="file"
      class="w-auto bg-gray-100 mr-4 font-medium rounded-md border-2"
      @change="handleFileUpload"
      accept="image/*"
      required
    />
    <div class="w-full mb-4 flex flex-row md:flex-col justify-center">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        DNI:
        <input
          type="text"
          class="w-auto bg-gray-100 mr-4 font-medium rounded-md border-2"
          v-model="studentForm.DNI"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Municipio:
        <select v-model="studentForm.town" class="bg-gray-100 font-medium rounded-md border-2">
          <option value="">Select Town</option>
          <option v-for="town in towns" :key="town.id" :value="town.id">{{ town.name }}</option>
        </select>
        <router-link to="/create-towns">
          <font-awesome-icon icon="plus" class="ml-2 text-primary text-lg font-extrabold" />
        </router-link>
      </label>
    </div>
    <!--Nombre y Apellido-->
    <div class="w-full mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Nombre y Apellidos: </label>
      <div class="w-full flex flex-row justify-between">
        <input
          type="text"
          class="w-1/2 mr-1 rounded-md border-2 font-medium bg-gray-100"
          v-model="studentForm.name"
          required
        />
        <input
          type="text"
          class="w-1/2 bg-gray-100 ml-1 rounded-md font-medium border-2"
          v-model="studentForm.surname"
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
          class="w-full bg-gray-100 rounded-md py-1 font-medium border-2"
          v-model="studentForm.email"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm my-4 font-bold mb-2">
        Teléfono:
        <input
          type="tel"
          class="w-auto bg-gray-100 rounded-md font-medium border-2"
          v-model="studentForm.telephone"
        />
      </label>
    </div>
    <!--Fechas-->
    <div class="w-full mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        Fecha Nacimiento:
        <input
          type="date"
          class="w-auto bg-gray-100 rounded-md font-medium border-2"
          v-model="studentForm.fecha_nacimiento"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >Fecha de Matriculación:
        <input
          class="w-auto bg-gray-100 rounded-md font-medium border-2"
          type="date"
          v-model="studentForm.fecha_matriculacion"
        />
      </label>
    </div>
    <!--Botonones-->

    <button
      @click.prevent="insert_student()"
      type="submit"
      class="button bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <font-awesome-icon icon="check" class="mr-2 text-white" />
    </button>
  </form>
</template>
