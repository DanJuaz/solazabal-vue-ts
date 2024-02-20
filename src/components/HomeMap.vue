<template>
  <div class="flex flex-row w-full">
    <div id="mapContainer" class="w-[1000px] h-screen" />
    <!-- <input type="radio" name="gender" value="male" /> Satelite
    <input type="radio" name="gender" value="female" /> Female -->
    <div class="w-1/3 h-full bg-gray-500">
      <form class="w-[100px] absolute top-4 left-20 z-[1000] flex flex-col sm:flex-col md:flex-col">
        <div>
          <select
            v-for="student in students_by_teacher"
            :key="student.id"
            class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>{{ student.name }}</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            @click="startJourney"
            class="rounded-md px-2 py-1 mx-1 my-1 bg-green font-semibold"
          >
            Iniciar
          </button>
          <button
            v-if="showPauseBotton"
            class="rounded-md px-2 py-1 mx-1 my-1 bg-orange-500 font-semibold"
          >
            <font-awesome-icon icon="pause" />
          </button>
        </div>
      </form>
      <details class="rounded-md shadow-md p-4" v-for="type_foul in type_fouls" :key="type_foul.id">
        <summary
          class="cursor-pointer bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md outline-none"
        >
          {{ type_foul.name }}
        </summary>
        <div
          v-for="foul in type_foul.fouls"
          :key="foul.id"
          class="flex flex-col justify-center items-center mt-2"
        >
          <p
            class="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded"
          >
            {{ foul.name }}
          </p>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeMount } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import router from '@/router'
import axios from 'axios'

export default defineComponent({
  data() {
    return {
      type_fouls: [],

      students_by_teacher: [],
      teacher: {
        id: 3,
        name: 'Ortzadar'
      },

      form_lesson: {
        start_hour: null,
        end_hour: null,
        jorney_json: null,
        teacher: null,
        student: null,
        faults: []
      },

      // Show pause botton
      showPauseBotton: false
    }
  },
  mounted() {
    this.fetch_type_foul()
    this.fetch_students_by_teacher()
  },
  methods: {
    // Fetch
    async fetch_type_foul() {
      axios
        .get('type_foul/?format=json')
        .then((response) => {
          this.type_fouls = response.data
          //console.log(this.type_fouls)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async fetch_students_by_teacher() {
      axios
        .get(`student/?format=json&teacher=${this.teacher.id}`)
        .then((response) => {
          this.students_by_teacher = response.data
          //console.log(this.students_by_teacher)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Post
    async post_lesson() {
      axios
        .post('practice/', this.form_lesson)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    // Show pause botton
    startJourney() {
      // 
      this.showPauseBotton = true

    }
  },
  name: 'LMap',
  props: {
    markers: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  setup(props) {
    let map = null

    onMounted(() => {
      createMapLayer()
    })

    onBeforeMount(() => {
      if (map) {
        map.remove()
      }
    })

    const createMapLayer = () => {
      map = L.map('mapContainer', {
        center: [0, 0],
        zoom: 13
      }).setView([0, 0], 22)

      try {
        // Create a marker for the user's current position
        const userMarker = L.circle([0, 0], 2.5).addTo(map)
        // Postion marker style
        userMarker.style = {
          color: 'blue',
          fillColor: 'blue',
          fillOpacity: 0.5,
          radius: 0.2
        }
        // Start tracking the user's position
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords

            // Update the marker's position
            userMarker.setLatLng([latitude, longitude])

            // Center the map on the marker
            map.panTo([latitude, longitude], { animate: true, duration: 1 })
          },
          (error) => {
            displayError(`Error during tracking: ${error.message}`)
          }
        )
      } catch (error) {
        console.log(`Error starting tracking: ${error.message}`)
      }

      const satelliteLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })

      const openTopoMap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> Danjuaz'
      }).addTo(map)

      const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })

      const baseLayers = {
        Satelite: satelliteLayer
      }
      const layerControl = L.control.layers(baseLayers).addTo(map)
      layerControl.addBaseLayer(openTopoMap, 'Relieve')
    }

    const setMarkers = () => {
      props.markers.map((marker) => {
        return L.marker([marker.latitude, marker.longitude]).addTo(map).bindPopup(marker.descricao)
      })
    }
    const drawRoute = () => {
      if (route.length > 1) {
        if (!routeLayer) {
          routeLayer = L.polyline(route, { width: '5px', color: '#E1DFFF' }).addTo(map)
        } else {
          routeLayer.setLatLngs(route)
        }
      }
      routerLayer.setStyle({
        color: 'blue',
        weight: 5,
        opacity: 0.8
      })
      const markerInitial = L.marker(route[0]).addTo(map).bindPopup('I am a marker.')
      const markerFinal = L.marker(route[route.length - 1])
        .addTo(map)
        .bindPopup('I am a marker.')
    }
  }
})
</script>
