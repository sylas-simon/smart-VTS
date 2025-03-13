<template>
  <div class="tracking-dashboard">
    <!-- Vehicle Selection -->
    <div class="vehicle-selection">
      <div class="selection-container">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          v-model="selectedVehicleId" 
          placeholder="Enter vehicle plate number to track"
          @keyup.enter="trackVehicle"
        >
        <button @click="trackVehicle" class="track-button">
          <i class="fas fa-search"></i>
          Track Vehicle
        </button>
      </div>
    </div>

    <!-- Vehicle Tracking Section -->
    <div id="infoWindow" v-show="vehicleDetails.vehicleId" class="tracking-container">
      <div id="detailsLeft" class="vehicle-details">
        <div class="details-header">
          <h3>Vehicle Details</h3>
          <span class="status-badge" :class="vehicleDetails.vtsStatus.toLowerCase()">
            {{ vehicleDetails.vtsStatus }}
          </span>
        </div>
        
        <div class="details-grid">
          <div class="detail-item">
            <i class="fas fa-tachometer-alt"></i>
            <div class="detail-content">
              <label>Speed</label>
              <span class="value">{{ speed }} km/h</span>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-map-marker-alt"></i>
            <div class="detail-content">
              <label>Location</label>
              <span class="value">{{ vehicleDetails.location }}</span>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-id-card"></i>
            <div class="detail-content">
              <label>Vehicle ID</label>
              <span class="value">{{ vehicleDetails.vehicleId }}</span>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-chart-line"></i>
            <div class="detail-content">
              <label>Driving Performance</label>
              <span class="value">{{ vehicleDetails.drivingPerformance }}</span>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-user"></i>
            <div class="detail-content">
              <label>Driver Name</label>
              <span class="value">{{ vehicleDetails.driverName }}</span>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-id-badge"></i>
            <div class="detail-content">
              <label>License No.</label>
              <span class="value">{{ vehicleDetails.driverLicense }}</span>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-road"></i>
            <div class="detail-content">
              <label>Speed Limit</label>
              <span class="value">{{ speedLimitCV }} km/h</span>
            </div>
          </div>
        </div>
      </div>

      <div id="mapRight" class="map-container">
        <iframe
          id="googleMap"
          :src="mapUrl"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>

    <!-- No Vehicle Selected Message -->
    <div v-if="!vehicleDetails.vehicleId" class="no-vehicle-message">
      <i class="fas fa-car"></i>
      <h2>No Vehicle Selected</h2>
      <p>Enter a vehicle plate number above to start tracking.</p>
    </div>

  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'VtsDashboard',
  setup() {
    const store = useStore()
    const selectedVehicleId = ref('')

    const speed = computed(() => store.state.speed)
    const speedLimitCV = computed(() => store.state.speedLimitCV)
    const vehicleDetails = computed(() => store.state.vehicleDetails)
    const mapUrl = computed(() => 
'https://maps.google.com/maps?q=-6.7714281,39.2399597&t=m&z=16&output=embed'
    )

    const trackVehicle = () => {
      if (selectedVehicleId.value.trim()) {
        store.dispatch('trackVehicle', selectedVehicleId.value.trim())
      }
    }

    onMounted(() => {
      const updateInterval = setInterval(() => {
        store.dispatch('fetchData')
      }, 1000)

      return () => clearInterval(updateInterval)
    })

    return {
      speed,
      speedLimitCV,
      vehicleDetails,
      mapUrl,
      selectedVehicleId,
      trackVehicle
    }
  }
}
</script>

<style scoped>
.tracking-dashboard {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.vehicle-selection {
  margin-bottom: 24px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.selection-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.selection-container i {
  color: #64748b;
  font-size: 1.2em;
}

.selection-container input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.1em;
  color: #1e293b;
}

.selection-container input::placeholder {
  color: #94a3b8;
}

.track-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.track-button:hover {
  background: #2563eb;
}

.track-button i {
  color: white;
}

.tracking-container {
  display: flex;
  gap: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  min-height: 0;
  position: relative;
}

.vehicle-details {
  width: 400px;
  padding: 24px;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  flex-shrink: 0;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.details-header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #1e293b;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875em;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background: #fee2e2;
  color: #991b1b;
}

.details-grid {
  display: grid;
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.detail-item i {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #e0f2fe;
  color: #0369a1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
}

.detail-content {
  flex: 1;
}

.detail-content label {
  display: block;
  font-size: 0.875em;
  color: #64748b;
  margin-bottom: 4px;
}

.detail-content .value {
  font-size: 1.125em;
  font-weight: 500;
  color: #1e293b;
}

.map-container {
  flex: 1;
  min-width: 0;
  background: #f1f5f9;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 50%;
  margin-top: -200px; /* Moves it up */
}

.no-vehicle-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.no-vehicle-message i {
  font-size: 3em;
  color: #94a3b8;
  margin-bottom: 20px;
}

.no-vehicle-message h2 {
  color: #1e293b;
  margin-bottom: 12px;
}

.no-vehicle-message p {
  color: #64748b;
}

@media (max-width: 1024px) {
  .tracking-container {
    flex-direction: column;
    height: auto;
    min-height: 0;
  }

  .vehicle-details {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    max-height: 400px;
  }

  .map-container {
    height: 500px;
    min-height: 500px;
  }
}

@media (max-width: 640px) {
  .tracking-dashboard {
    padding: 16px;
  }

  .vehicle-details {
    padding: 16px;
    max-height: 300px;
  }

  .detail-item {
    padding: 12px;
  }

  .map-container {
    height: 300px;
    min-height: 300px;
  }

  .selection-container {
    flex-direction: column;
    padding: 12px;
  }

  .track-button {
    width: 100%;
    justify-content: center;
  }
}
</style> 