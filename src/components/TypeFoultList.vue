<template>
  <details class="rounded-md shadow-md p-4" v-for="type_foul in type_fouls" :key="type_foul.id">
    <summary class="cursor-pointer bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md outline-none">
      {{ type_foul.name }}
    </summary>
    <div
      v-for="foul in type_foul.fouls"
      :key="foul.id"
      class="flex flex-col justify-center items-center mt-2"
    >
      <p class="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded">
        {{ foul.name }}
      </p>
    </div>
  </details>
</template>

<script>
import axios from 'axios'

export default{
  data() {
    return {
      type_fouls: [],

      
    }
  },
  mounted() {
    this.fetch_type_foul()
    
  },
  methods: {
    // Fetch
    async fetch_type_foul() {
      axios
        .get('type_foul/')
        .then((response) => {
          this.type_fouls = response.data
          //console.log(this.type_fouls)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>