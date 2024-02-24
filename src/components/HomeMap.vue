<template>
  <div class="flex flex-row w-full">
    <div id="mapContainer" class="w-[1000px] h-screen" />
    <div class="w-1/3 h-full bg-gray-500">
      <form
        @submit.prevent="startJourney"
        class="w-[100px] absolute top-4 left-20 z-[1000] flex flex-col sm:flex-col md:flex-col"
      >
        <div>
          <select
            v-for="student in students_by_teacher"
            :key="student.id"
            class="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>{{ student.name }}</option>
          </select>
        </div>
        <button
          type="submit"
          @click="startJourney"
          id="startJourney"
          class="w-10 h-10 rounded-md px-2 py-1 mx-1 my-1 bg-green font-semibold"
        >
          Iniciar
        </button>
        <div v-if="showPauseButton">
          <button @click="stopJourney">Detener</button>
          <button class="rounded-md px-2 py-1 mx-1 my-1 bg-orange-500 font-semibold">
            <font-awesome-icon icon="pause" />
          </button>
        </div>
      </form>
      <button
        class="rounded-md px-2 py-1 mx-1 my-1 bg-orange-500 font-semibold"
        @click="stopJourney"
      >
        Stop
      </button>
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
import { defineComponent, onMounted, onBeforeMount, ref } from 'vue';
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

      // Show pause button
      showPauseButton: false
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
    let route = []
    let routerLayer
    let showPauseButton = ref(false);
    let watchId

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
      }).setView([0, 0], 22);
      let userMarker;
      let userMarkerAround;

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
      L.control.layers(baseLayers).addTo(map);
      
      return { map, userMarker, userMarkerAround }
    }

    // Show pause botton
    const startJourney = ({ map, userMarker, userMarkerAround }) => {
      // Verificar si el navegador es compatible con la API Screen Wake Lock
      if ('wakeLock' in navigator) {
        // Solicitar el bloqueo de pantalla activo
        navigator.wakeLock
          .request('screen')
          .then((wakeLockObj) => {
            console.log('Bloqueo de pantalla activado')

            showPauseButton.value = true

            try {
              watchId = navigator.geolocation.watchPosition(
                (position) => {
                  const { latitude, longitude } = position.coords
                  route.push([latitude, longitude])

                  // Update the marker position
                  userMarker.setLatLng([latitude, longitude])
                  userMarketAround.setLatLng([latitude, longitude])

                  // Center the map on the marker
                  map.panTo([latitude, longitude])

                  drawRoute()
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
    }

    const stopJourney = () => {
      console.log('Detener')
      try {
        // Detener el seguimiento continuo
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
    return {
      startJourney,
      stopJourney
    }
  }
})
</script>