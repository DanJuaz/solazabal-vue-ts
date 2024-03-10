<template>
  <div class="mt-40 flex flex-col">
    <h1 class="text-xl md:text-4xl font-bold text-center mb-4">Resultado de la práctica</h1>
    <div class="w-auto flex flex-row justify-between mx-2">
      <h2><font-awesome-icon icon="user" class="mx-2" />{{ practice.student.name }}</h2>
      <h2><font-awesome-icon icon="calendar" class="" />: {{ practice.date }}</h2>
      <h2>
        <font-awesome-icon icon="clock" class="" />: {{ practice.start_hour.substring(0, 5) }}-{{
          practice.end_hour.substring(0, 5)
        }}
      </h2>
    </div>
    <h3 class="flex mx-2">Tipo de practica: {{ practice.type_practice.name }}</h3>
    <h3 class="flex mx-2">Faltas acumuladas: {{ practice.faults.length ? practice.faults.length : 0 }}</h3>

    <PracticeMap />
  </div>
</template>
<script>
import axios from 'axios'

import PracticeMap from '@/components/PracticeMap.vue'

export default {
  components: {
    PracticeMap
  },
  data() {
    return {
      practice_id: this.$route.params.id,
      practice: {
        student: {},
        faults: [],
        type_practice: {
          name: ''
        },
        start_hour: '',
        end_hour: ''
      }
    }
  },
  methods: {
    async fetchPractice() {
      try {
        const response = await axios.get(`practice/${this.practice_id}/`)
        this.practice = response.data
      } catch (error) {
        console.error('Error fetching practice:', error)
      }
    }
  },
  mounted() {
    this.fetchPractice()
  }
}
</script>
