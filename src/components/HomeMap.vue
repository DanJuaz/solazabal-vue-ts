<template>
  <span
    @click="findLocation"
    class="absolute top-20 left-4 z-[1000] px-2 py-1 border border-[#B3B2B2] bg-white hover:cursor-pointer"
  >
    <font-awesome-icon icon="location" />
  </span>
  <div class="flex flex-row w-full">
    <!--Map-->
    <div id="mapContainer" class="w-screen h-screen" />
    <div class="z-[1000] absolute top-5 left-14 flex flex-col md:flex-row space-y-2">
      <!--Students-->
      <select
        v-model="form_lesson.student"
        class="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled selected>Estudiante</option>
        <option v-for="student_l in students_by_teacher" :key="student_l.id" :value="student_l.DNI">
          {{ student_l.name }}
        </option>
      </select>
      <!--Type Practices-->
      <select
        v-model="form_lesson.type_practice"
        class="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled selected>Tipo de Practica</option>
        <option v-for="type_p in type_practices" :key="type_p.id" :value="type_p.id">
          {{ type_p.name }}
        </option>
      </select>
      <!--Start Button-->
      <button
        v-if="!showPauseButton"
        type="submit"
        @click="startJourney()"
        id="startJourney"
        class="z-[1000] w-auto h-10 rounded-md px-6 py-2 mx-1 my-0 bg-green font-semibold"
      >
        <font-awesome-icon icon="location-arrow" class="mr-2" />Iniciar
      </button>
      <!--Pause Button-->
      <div
        v-if="showPauseButton"
        class="flex justify-around space-x-1 space-y-1 text-black font-medium"
      >
        <button @click="pauseJourney()" class="rounded-md px-2 py-1 bg-orange-400">
          <font-awesome-icon icon="pause" />
        </button>
        <button class="rounded-md px-2 py-1 bg-red-500 uppercase" @click="stopJourney(form_lesson)">
          Stop
        </button>
      </div>
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
import { useNotification } from '@kyvg/vue3-notification'

import TypeFoultList from '@components/TypeFoultList.vue'

export default defineComponent({
  components: {
    TypeFoultList
  },
  data() {
    return {
      //Logic variables
      students_by_teacher: [],
      teacher: JSON.parse(localStorage.getItem('user')),
      form_lesson: {
        start_hour: null,
        end_hour: null,
        jorney_json: null,
        teacher: JSON.parse(localStorage.getItem('user')).id,
        student: '',
        faults: [],
        type_practice: 0
      },

      type_practices: []
    }
  },
  mounted() {
    this.fetch_students_by_teacher(), this.fetch_type_practices()
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
    async fetch_type_practices() {
      axios
        .get('type_practice/')
        .then((response) => {
          this.type_practices = response.data
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
    let watchId

    let route = []
    let routerLayer

    const { notify } = useNotification()

    //Markers
    let userMarker
    let userMarkerAround
    let initialMarker
    let finalMarker

    const showPauseButton = ref(false)

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
            try {
              showPauseButton.value = true
              watchId = navigator.geolocation.watchPosition(
                (position) => {
                  //const date = new Date()
                  const { latitude, longitude } = position.coords
                  route.push([latitude, longitude])
                  // Notify user the start
                  if (route.length === 1) {
                    notify({
                      title: 'Inicio de la práctica',
                      message: 'La práctica ha comenzado',
                      type: 'success'
                    })
                  }
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
        console.warn('Bloquear la pantalla.')
      }
    }

    const drawRoute = () => {
      if (route.length > 1) {
        if (!routerLayer) {
          routerLayer = L.polyline(route, { width: '5px', color: '#E1DFFF' }).addTo(map)
          routerLayer.setStyle({
            color: 'blue',
            weight: 5,
            opacity: 0.8
          })
        } else {
          routerLayer.setLatLngs(route)
        }
      }
    }

    const stopJourney = (formLesson) => {
      console.log('Stop Jouney', route)
      // Defined the initial and final marker
      initialMarker = L.marker(route[0]).addTo(map).addTo(map)
      finalMarker = L.marker(route[route.length - 1]).addTo(map)
      finalMarker.style = {
        color: 'red'
      }
      // Detener el seguimiento continuo
      try {
        navigator.geolocation.clearWatch(watchId)
        route = []
        if (routerLayer) {
          map.removeLayer(routerLayer)
          routerLayer = undefined
        }
        console.log(formLesson)
      } catch (error) {
        console.log(`Error al detener el seguimiento: ${error.message}`)
      }
    }
    const pauseJourney = () => {
      // Detener el seguimiento continuo
      try {
        navigator.geolocation.clearWatch(watchId)
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
      pauseJourney,
      findLocation,
      showPauseButton
    }
  }
})
</script>
