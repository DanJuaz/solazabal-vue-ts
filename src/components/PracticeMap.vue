<template>
  <div class="flex flex-row w-full">
    <div id="mapContainer" class="w-screen h-screen" />
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'
import { useRoute } from 'vue-router'

export default defineComponent({
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
    let practice = {
      jorney_json: {}
      //jorney_json2: [],
      //jorney_json3: ''
      // Initialize with an empty JSON string
    }
    const router = useRoute()

    onMounted(() => {
      fetchPractice()
      createMapLayer()
    })
    // Clean up when the component is unmounted
    onBeforeUnmount(() => {
      if (map) {
        map.remove()
      }
    })

    const fetchPractice = async () => {
      try {
        const response = await axios.get(`practice/${router.params.id}/`)
        practice = response.data
      } catch (error) {
        console.error('Error fetching pratice on Map')
      }
    }

    const createMapLayer = () => {
      // Initialize an empty array to store coordinates

      // Iterate through the jorney_json array
      for (let i = 0; i < practice.jorney_json.length; i++) {
        // Access each journey object
        const journey = practice.jorney_json[i]
        // Push latitude and longitude of each journey object to the route array
        route.push([journey.latitude, journey.longitude])
      }

      // Calculate the bounds of the route
      const bounds = L.latLngBounds(route)

      if (!map) {
        map = L.map('mapContainer', {
          // Set the center of the map to the center of the route bounds
          center: bounds.getCenter(),
          zoom: 13
        }).fitBounds(bounds) // Fit the map to the bounds of the route

        // Satellite layer
        const satelliteLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
          maxZoom: 22,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        })

        // Add base layers to the map
        const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        const baseLayers = {
          Relieve: streets,
          Satellite: satelliteLayer
        }
        L.control.layers(baseLayers).addTo(map)
      }

      // Clear previous layers
      if (routerLayer) {
        routerLayer.removeFrom(map)
      }

      // Draw polyline
      routerLayer = L.polyline(route, { width: '5px', color: '#E1DFFF' }).addTo(map)
    }

    return { map }
  }
})
</script>
