<template>
  <div id="infoWindow" v-show="vehicleDetails.vehicleId">
    <div id="detailsLeft" style="background-color: #6a88e8; padding: 20px;height: 500px;">
      <h3>Vehicle Details</h3>
      <p><strong>Speed:</strong> <span>{{ speed }}</span> km/h</p>
      <p><strong>Location:</strong> <span>{{ vehicleDetails.location }}</span></p>
      <p><strong>Vehicle ID:</strong> <span>{{ vehicleDetails.vehicleId }}</span></p>
      <p><strong>Status of VTS:</strong> <span>{{ vehicleDetails.vtsStatus }}</span></p>
      <p><strong>Driving Performance:</strong> <span>{{ vehicleDetails.drivingPerformance }}</span></p>
      <p><strong>Driver name:</strong> <span>{{ vehicleDetails.driverName }}</span></p>
      <p><strong>Drivering license No:</strong> <span>{{ vehicleDetails.driverLicense }}</span></p>
      <p><strong>speed Limit from camera</strong> <span>{{ speedLimitCV }}</span></p>
    </div>


    <div id="mapRight">
      <iframe
        id="googleMap"
        :src="mapUrl"
        width="600"
        height="500"
        frameborder="0"
        style="border:0;"
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'VtsDashboard',
  setup() {
    const store = useStore()

    const speed = computed(() => store.state.speed)
    const speedLimitCV = computed(() => store.state.speedLimitCV)
    const vehicleDetails = computed(() => store.state.vehicleDetails)
    const mapUrl = computed(() => 
      `https://maps.google.com/maps?q=0,0&z=12&output=embed`
    )

    onMounted(() => {
      // Start fetching data periodically
      const updateInterval = setInterval(() => {
        store.dispatch('fetchData')
      }, 1000)

      // Clean up interval on component unmount
      return () => clearInterval(updateInterval)
    })

    return {
      speed,
      speedLimitCV,
      vehicleDetails,
      mapUrl
    }
  }
}
</script>

<style scoped>
#detailsLeft {
  font-size: 16px;
  line-height: 1.5;
}

#detailsLeft h3 {
  font-size: 24px;
  margin-bottom: 25px;
  color: rgb(6, 5, 5);
}

#detailsLeft p {
  margin-bottom: 20px;
  color: rgb(7, 6, 6);
}

#detailsLeft strong {
  font-size: 18px;
  margin-right: 10px;
}

#detailsLeft span {
  font-size: 16px;
}
</style> 