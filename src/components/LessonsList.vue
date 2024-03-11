<template>
  <!-- component -->
  <div class="container mx-auto px-4 sm:px-8">
    <div class="py-8">
      <div>
        <h2 class="text-2xl font-semibold leading-tight">Clases</h2>
      </div>
      <div class="my-2 flex sm:flex-row justify-between flex-col">
        <div class="flex flex-row items-center">
          <font-awesome-icon icon="search" class="mx-2" />
          <input
            v-model="searchQuery"
            placeholder="Buscar ..."
            class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-atuo bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
        <router-link
          :to="{ name: 'create-foul' }"
          class="flex justify-self-end w-[fit-content] rounded-md px-4 py-2 my-2 bg-primary font-bold"
          >+ Falta</router-link
        >
      </div>
      <div class="w-auto -mx-2  px-4  py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Alumno
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Hora
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Tipo de Practica
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="practice in paginatedPractices"
                :key="practice.id"
                v-on:click="showPractice(practice.id)"
              >
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ practice.student.name }}
                      </p>
                      <p class="hidden md:block text-gray-900 whitespace-no-wrap">
                        {{ practice.student.surname }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{{ practice.date }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ practice.start_hour.substring(0, 5) }}-{{ practice.end_hour.substring(0, 5) }}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {{ practice.type_practice.name }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination controls -->
          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
          >
            <!-- Pagination buttons -->
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                id="prevBtn"
                @click="prevPage"
                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
              >
                <
              </button>
              <!-- Pagination info -->
              <span
                class="text-md font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 mx-1 rounded-l"
              >
                {{ parseInt(startIndex) + 1 }}
              </span>
              <button
                id="nextBtn"
                @click="nextPage"
                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
              >
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
//import Navbar from '@components/Navbar.vue'
import axios from 'axios'
import router from '@/router'

export default {
  data() {
    return {
      teacher: JSON.parse(localStorage.getItem('user')),
      // Pagination
      pageSize: 5,
      currentPage: 0,
      searchQuery: '',
      practices: []
    }
  },
  computed: {
    // Filtrar estudiantes basados en la consulta de búsqueda
    filteredPractices() {
      return this.practices.filter((practice) => {
        return practice.student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    },
    // Estudiantes paginados basados en la página actual y el tamaño de la página
    paginatedPractices() {
      const startIndex = this.currentPage * this.pageSize
      const endIndex = startIndex + this.pageSize - 1
      return this.filteredPractices.slice(startIndex, endIndex + 1)
    },
    // Índice de inicio de los estudiantes mostrados actualmente
    startIndex() {
      return this.currentPage * this.pageSize
    },
    // Índice final de los estudiantes mostrados actualmente
    endIndex() {
      return Math.min((this.currentPage + 1) * this.pageSize - 1, this.filteredPractices.length - 1)
    }
  },
  methods: {
    async fetchPractices() {
      try {
        const response = await axios.get(`practice/?teacher=${this.teacher.id}`)
        this.practices = response.data
      } catch (error) {
        console.error('Error fetching practices:', error)
      }
    },
    nextPage() {
      if (this.currentPage < this.filteredPractices.length / this.pageSize - 1) {
        const prevBtn = document.getElementById('prevBtn')
        prevBtn.disabled = false
        prevBtn.style = 'opacity: 1'
        this.currentPage++
      } else {
        const nextBtn = document.getElementById('nextBtn')
        nextBtn.disabled = true
        nextBtn.style = 'opacity: 0.5'
      }
    },
    prevPage() {
      if (this.currentPage >= 1) {
        this.currentPage--
      } else {
        const prevBtn = document.getElementById('prevBtn')
        prevBtn.disabled = true
        prevBtn.style = 'opacity: 0.5'
      }
    },
    //
    showPractice(id) {
      router.push({ name: 'lesson', params: { id: id } })
      router.push({ name: 'lesson', params: { id: id } })
    }
  },
  mounted() {
    this.fetchPractices()
  }
}
</script>
