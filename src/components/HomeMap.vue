<template>
  <span
    @click="findLocation"
    class="absolute top-20 left-4 z-[1000] px-2 py-1 border border-[#B3B2B2] bg-white hover:cursor-pointer"
  >
    <font-awesome-icon icon="location" />
  </span>
  <div class="flex flex-row w-full">
    <div id="mapContainer" class="w-screen h-screen" />
    <div class="z-[1000] absolute top-5 left-14">
      <select
        v-for="student in students_by_teacher"
        :key="student.id"
        class="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option>{{ student.name }}</option>
      </select>
    </div>
    <button
      type="submit"
      @click="startJourney"
      id="startJourney"
      class="z-[1000] absolute top-5 left-44  w-auto h-10 rounded-md px-6 py-2 mx-1 my-0 bg-green font-semibold"
    >
      <font-awesome-icon icon="location-arrow" class="mr-2 " />Iniciar
    </button>
    <div v-if="showPauseButton">
      <button @click="stopJourney">Detener</button>
      <button class="rounded-md px-2 py-1 mx-1 my-1 bg-orange-500 font-semibold">
        <font-awesome-icon icon="pause" />
      </button>
      <button
        class="rounded-md px-2 py-1 mx-1 my-1 bg-orange-500 font-semibold"
        @click="stopJourney"
      >
        Stop
      </button>
    </div>
    <!-- <TypeFoultList/> -->
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeMount, ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import router from '@/router'
import axios from 'axios'

import TypeFoultList from '@components/TypeFoultList.vue'

export default defineComponent({
  components: {
    TypeFoultList
  },
  data() {
    return {
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
      }
    }
  },
  mounted() {
    this.fetch_students_by_teacher()
  },
  methods: {
    // Fetch
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
  setup() {
    let map = null
    let route = []
    let routerLayer
    let showPauseButton = ref(false)
    let watchId
    let userMarker
    let userMarkerAround

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
        userMarker = L.circle([0, 0], 2.5, {
          color: 'white',
          fillColor: 'blue',
          fillOpacity: 1,
          opacity: 1
        }).addTo(map)

        userMarkerAround = L.circle([0, 0], 20, {
          weight: 0.5,
          color: '#8085FF',
          fillColor: '#8085FF',
          fillOpacity: 0.2,
          lineCap: 'round'
        }).addTo(map)
        // Start tracking the user's position
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            // Update the marker's position
            userMarker.setLatLng([latitude, longitude])
            userMarkerAround.setLatLng([latitude, longitude])

            // Center the map on the marker
            map.panTo([latitude, longitude], { animate: true, duration: 1 })
          },
          (error) => {
            console.log(`Error during tracking: ${error.message}`)
          }
        )
      } catch (error) {
        console.log(`Error starting tracking: ${error.message}`)
      }

      // Satellite layer
      const satelliteLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })
      // Add base layers to the map
      const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map) // Add streets layer by default

      const baseLayers = {
        Relieve: streets,
        Satellite: satelliteLayer
      }
      // Add layer control to the map
      L.control.layers(baseLayers).addTo(map)

      return { map, userMarker, userMarkerAround }
    }

    // Show pause botton
    const startJourney = () => {
      // API Screen Wake Lock
      if ('wakeLock' in navigator) {
        navigator.wakeLock
          .request('screen')
          .then((wakeLockObj) => {
            //console.log('Bloqueo de pantalla activado')
            showPauseButton.value = true
            try {
              watchId = navigator.geolocation.watchPosition(
                (position) => {
                  const date = new Date()
                  const { latitude, longitude } = position.coords
                  route.push([latitude, longitude], date)

                  // Update the marker position
                  userMarker.setLatLng([latitude, longitude])
                  userMarkerAround.setLatLng([latitude, longitude])

                  // Center the map on the marker
                  map.panTo([latitude, longitude])

                  drawRoute()
                  console.log(route)
                },
                (error) => {
                  console.log(`Error durante el seguimiento: ${error.message}`)
                }
              )
            } catch (error) {
              console.log(`Error al iniciar el seguimiento: ${error.message}`)
            }

            // Agregar un manejador de eventos para el caso de que el bloqueo se suelte por alguna razón
            wakeLockObj.addEventListener('release', () => {
              console.log('El bloqueo de pantalla se ha soltado')
            })
          })
          .catch((error) => {
            console.error('Error al solicitar el bloqueo de pantalla: ', error)
          })
      } else {
        console.warn('La API de bloqueo de pantalla no está disponible en este navegador.')
      }
    }

    const drawRoute = () => {
      if (route.length > 1) {
        if (!routerLayer) {
          let routerLayer = L.polyline(route, { width: '5px', color: '#E1DFFF' }).addTo(map)
        } else {
          routerLayer.setLatLngs(route)
        }
        // Corrected variable name from routerLayer to routeLayer
        if (routerLayer) {
          routerLayer.setStyle({
            color: 'blue',
            weight: 5,
            opacity: 0.8
          })
        }
      }
    }

    const stopJourney = () => {
      // Detener el seguimiento continuo
      try {
        navigator.geolocation.clearWatch(watchId)
        route = []
        if (routeLayer) {
          map.removeLayer(routeLayer)
          routeLayer = undefined
        }
      } catch (error) {
        console.log(`Error al detener el seguimiento: ${error.message}`)
      }
    }

    const findLocation = () => {
      map.setView([userMarker._latlng.lat, userMarker._latlng.lng], 20, {
        animate: true,
        duration: 0.1
      })
    }
    // Return the function to be used in the template
    return {
      startJourney,
      stopJourney,
      findLocation
    }
  }
})
</script>
