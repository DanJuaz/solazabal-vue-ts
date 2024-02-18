<template>
  <div class="flex flex-row w-full">
    <div id="mapContainer" class="w-[1000px] h-screen" />
    <div class="w-1/3 h-full bg-gray-500">
      <details class="rounded-md shadow-md p-4">
        <summary
          class="cursor-pointer bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md outline-none"
        >
          Tipo de Falta
        </summary>
        <div class="flex flex-col justify-center items-center mt-2">
          <!-- Using utilities: -->
          <button
            class="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded"
          >
            Falta
          </button>
          <!-- Using utilities: -->
          <button
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <font-awesome-icon icon="user" />
          </button>
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
      // console.log(props.markers)
      createMapLayer()
    })

    onBeforeMount(() => {
      if (map) {
        map.remove()
      }
    })

    const createMapLayer = () => {
      map = L.map('mapContainer').setView([0, 0], 15)

      try {
        // Create a marker for the user's current position
        const userMarker = L.circle([0, 0], 10).addTo(map)

        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords

            // Update the marker's position
            userMarker.setLatLng([latitude, longitude])

            // Center the map on the marker
            map.panTo([latitude, longitude])
          },
          (error) => {
            displayError(`Error during tracking: ${error.message}`)
          }
        )
      } catch (error) {
        console.log(`Error starting tracking: ${error.message}`)
      }

      // L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      //     attribution:
      //         '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> Danjuaz'
      // }).addTo(map);
      L.tileLayer(
        'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> | Danjuaz',
          maxZoom: 18
        }
      ).addTo(map)

      if (props.markers.length) {
        setMarkers()
      }

      // circle = L.circle([0, 0], {
      //     color: 'blue',
      //     fillColor: '#f03',
      //     fillOpacity: 0.5,
      //     radius: 500
      // }).addTo(map);
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
        weight: 7,
        opacity: 0.8
      })
      const markerInitial = L.marker(route[0]).addTo(map).bindPopup('I am a marker.')
      const markerFinal = L.marker(route[route.length - 1])
        .addTo(map)
        .bindPopup('I am a marker.')
    }
  },
  mounted() {
    this.fetch_type_fol()
  },
  data() {
    return {
      type_foul: []
    }
  },
  methods: {
    async fetch_type_fol() {
      axios
        .get('type_foul/?format=json')
        .then((response) => {
          this.type_foul = response.data
          console.log(this.type_foul)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
</script>
