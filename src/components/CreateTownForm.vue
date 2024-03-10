<template>
  <div class="flex flex-col">
    <form class="flex flex-col w-auto  justify-center items-center">
      <label class="flex flex-col text-center text-gray-700 text-sm font-bold"
        >Municipio:
        <input
          type="text"
          v-model="townForm.name"
          class="w-auto bg-gray-100 my-2 mr-4 px-2 py-1 font-medium rounded-md border-2"
        />
      </label>
      <button
        @click.prevent="insertTown()"
        type="submit"
        class="w-auto bg-primary font-semibold rounded-md px-3 py-1"
      >
        Crear
      </button>
    </form>
    <span class="h-[1px] w-full  bg-dark rounded-md my-4"></span>
    <ul class=" max-w-md h-14 space-y-1 text-gray-500 list-inside dark:text-gray-400">
      <li v-for="town in towns" :key="town.id" class="flex flex-row items-center">
        <svg
          class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
        {{ town.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      towns: [],
      townForm: {
        name: ''
      }
    }
  },
  mounted() {
    this.fetchTowns()
  },
  methods: {
    async fetchTowns() {
      try {
        const response = await axios.get('town/')
        this.towns = response.data
      } catch (error) {
        console.error('Error fetching towns:', error)
      }
    },
    async insertTown() {
      try {
        const response = await axios.post('town/', this.townForm)
        this.$notify({
          title: 'Todo Ha salido bien!',
          text: `${response.data.name} ha sido creado`
        })
        this.$router.push({ name: 'students' })
      } catch (error) {
        console.error('Error creating town:', error)
      }
    }
  }
}
</script>
