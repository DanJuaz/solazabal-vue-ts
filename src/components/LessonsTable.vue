<template>
  <div ref="table" class="table"></div>
</template>

<script>
import { TabulatorFull as Tabulator } from 'tabulator-tables'

import axios from 'axios'

export default {
  data() {
    return {
      tabulator: null,
      tableData: []
    }
  },
  mounted() {
    this.fetchLessons()
  },
  methods: {
    fetchLessons() {
      axios
        .get('practice/?format=json')
        .then((response) => {
          this.tableData = response.data
          this.initializeTabulator()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    initializeTabulator() {
      this.tabulator = new Tabulator(this.$refs.table, {
        data: this.tableData,
        reactiveData: true,
        columns: [
          {
            title: 'Date',
            field: 'date',
            headerFilter: true,
            headerFilterPlaceholder: 'Filter Date',
            col: 'date',
            
          },
          {
            title: 'Teacher',
            field: 'teacher',
            headerFilter: true,
            headerFilterPlaceholder: 'Filter Teacher'
          },
          {
            title: 'Student',
            field: 'student',
            headerFilter: true,
            headerFilterPlaceholder: 'Filter Student'
          },
          {
            title: 'Faults',
            field: 'faults',
            sorter: 'number',
            headerFilter: true,
            headerFilterPlaceholder: 'Filter Faults'
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss">
@import 'node_modules/tabulator-tables/src/scss/tabulator.scss';

/* You can add additional styles or overrides here */
</style>
