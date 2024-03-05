<template>
  <div class="flex flex-col justify-center items-center">
    <ul v-for="town in towns" :key="town.id" class="flex items-start justify-items-start list-disc">
      <li>{{ town.name }}</li>
    </ul>
    <form class="flex flex-col w-auto">
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >Municipio:
        <input
          type="text"
          v-model="townForm.name"
          class="w-auto bg-gray-100 mr-4 font-medium rounded-md border-2"
        />
      </label>
      <button @click.prevent="insertTown()" type="submit" class="w-auto bg-primary rounded-md px-1 py-1">
        Create Town
      </button>
    </form>
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
