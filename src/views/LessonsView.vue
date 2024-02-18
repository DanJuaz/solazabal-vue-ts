<template>Lista clases</template>
<script lang="ts">
import Navbar from '@components/Navbar.vue'
import axios from 'axios'
export default {
  data() {
    lessons: []
  },
  mounted() {
    this.getLessons()
  },
  methods: {
    async getLessons() {
      axios.get('practice/?format=json').then(response => {
        this.lessons = response.data
        console.log(this.lessons);
        }).catch(error => {
          console.log(error)
      })
    }
  }
}
</script>
