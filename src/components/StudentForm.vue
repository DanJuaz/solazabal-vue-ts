<template>
  <div
    v-if="deleteConfirm"
    class="absolute top-1/5 left-1/5 md:left-[80vh] flex flex-col px-2 py-2 justify-center border-2 rounded-lg bg-gray-100"
  >
    <h3 class="text-sm md:text-base">¿Seguro que quieres eliminar a {{ update_form.name }}?</h3>
    <div class="flex flex-row justify-center my-2">
      <button
        @click.prevent="delete_student(student.DNI)"
        type="submit"
        class="button bg-primary hover:bg-secondary mx-1 text-white ocus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Confirmar
      </button>
      <button
        @click="deleteConfirm = false"
        type="submit"
        class="button bg-red-800 hover:bg-red-900 mx-1 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Cancelar
      </button>
    </div>
  </div>
  <form class="w-auto mx-4 flex flex-col md:flex-col items-center">
    <img
      :src="student.img"
      :alt="`Imagen de ${student.name}`"
      width="100"
      height="100"
      class="mb-4"
    />
    <div class="w-full mb-4 flex flex-row md:flex-col justify-center">
      <label class="block text-gray-700 text-sm font-bold mb-2">
        DNI:
        <input
          type="text"
          class="w-auto bg-gray-100 mr-4 font-medium rounded-md border-2"
          :value="student.DNI"
          @input="update_form.DNI = $event.target.value"
          required
        />
      </label>
      <label class="flex items-center text-gray-700 text-sm font-bold mb-2">
        Municipio:
        <select class="bg-gray-100 font-medium rounded-md border-2" v-model="update_form.town">
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
          :value="student.name"
          @input="update_form.name = $event.target.value"
          required
        />
        <input
          type="text"
          class="w-1/2 bg-gray-100 ml-1 rounded-md font-medium border-2"
          :value="student.surname"
          @input="update_form.surname = $event.target.value"
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
          :value="student.email"
          @input="update_form.email = $event.target.value"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm my-4 font-bold mb-2">
        Teléfono:
        <input
          type="tel"
          class="w-auto bg-gray-100 rounded-md font-medium border-2"
          :value="student.telephone"
          @input="update_form.telephone = $event.target.value"
          required
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
          :value="student.fecha_nacimiento"
          @input="update_form.fecha_nacimiento = $event.target.value"
          required
        />
      </label>
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >Fecha de Matriculación:
        <input
          class="w-auto bg-gray-100 rounded-md font-medium border-2"
          type="date"
          :value="student.fecha_matriculacion"
          @input="update_form.fecha_matriculacion = $event.target.value"
        />
      </label>
    </div>
    <!--Botonones-->
    <div class="flex justify-center w-full space-x-4">
      <button
        @click.prevent="update_student(student.DNI)"
        type="submit"
        class="button bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <font-awesome-icon icon="refresh" class="mr-2 text-white" />
      </button>
      <button
        @click.prevent="deleteConfirm = true"
        type="submit"
        class="button bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      deleteConfirm: false,
      update_form: {
        DNI: '',
        name: '',
        surname: '',
        img: '',
        email: '',
        telephone: '',
        fecha_nacimiento: '',
        fecha_matriculacion: '',
        town: '',
        teacher: parseInt(localStorage.getItem('id'))
      },
      studentDNI: '',
      student: {},

      towns: []
    }
  },
  mounted() {
    this.fetch_student(), this.fetch_towns() // Llama al método para cargar los datos del estudiante
  },
  watch: {
    student: {
      handler(newStudentData) {
        this.update_form = {
          DNI: newStudentData.DNI,
          name: newStudentData.name,
          surname: newStudentData.surname,
          email: newStudentData.email,
          telephone: newStudentData.telephone,
          fecha_nacimiento: newStudentData.fecha_nacimiento,
          fecha_matriculacion: newStudentData.fecha_matriculacion,
          town: newStudentData.town ? newStudentData.town.id : null,
          teacher: parseInt(localStorage.getItem('id'))
        }
      },
      deep: true
    }
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
    },
    async delete_student(DNI) {
      try {
        const response = await axios.delete(`student/${DNI}/`)
        this.$notify({
          title: 'Todo Ha salido bien!',
          text: `${response.data.name} ha sido eliminado`
        })
        this.$router.push({ name: 'students' })
      } catch (error) {
        console.error('Error deleting student:', error)
      }
    },
    async update_student(DNI) {
      try {
        const response = await axios.put(`student/${DNI}/`, this.update_form)
        this.$notify({
          title: 'Todo Ha salido bien!',
          text: `${response.data.name} ha sido actualizado`
        })
        this.$router.push({ name: 'students' })
      } catch (error) {
        console.error('Error updating student:', error)
      }
    }
  }
}
</script>
