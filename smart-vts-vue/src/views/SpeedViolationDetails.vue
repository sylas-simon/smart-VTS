<template>
  <div class="violation-details">
    <div class="header">
      <h1>Speed Violation Details</h1>
      <div class="status-badge" :class="{ 'active-violation': isActiveViolation }">
        {{ isActiveViolation ? 'Active Violation' : 'Resolved' }}
      </div>
    </div>

    <div class="details-container">
      <div class="section">
        <h2>Vehicle Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <label>Vehicle ID</label>
            <span>{{ violation.vehicleId }}</span>
          </div>
          <div class="info-item">
            <label>Registration Number</label>
            <span>{{ violation.registrationNumber }}</span>
          </div>
          <div class="info-item">
            <label>Vehicle Type</label>
            <span>{{ violation.vehicleType }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Driver Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <label>Driver Name</label>
            <span>{{ violation.driverName }}</span>
          </div>
          <div class="info-item">
            <label>License Number</label>
            <span>{{ violation.licenseNumber }}</span>
          </div>
          <div class="info-item">
            <label>Contact Number</label>
            <span>{{ violation.contactNumber }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Violation Details</h2>
        <div class="info-grid">
          <div class="info-item">
            <label>Current Speed</label>
            <span class="speed">{{ violation.currentSpeed }} km/h</span>
          </div>
          <div class="info-item">
            <label>Speed Limit</label>
            <span>{{ violation.speedLimit }} km/h</span>
          </div>
          <div class="info-item">
            <label>Excess Speed</label>
            <span class="excess">{{ violation.excessSpeed }} km/h</span>
          </div>
          <div class="info-item">
            <label>Violation Start Time</label>
            <span>{{ formatDateTime(violation.startTime) }}</span>
          </div>
          <div class="info-item">
            <label>Duration</label>
            <span>{{ formatDuration(violation.duration) }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Location Information</h2>
        <div class="info-grid">
          <div class="info-item">
            <label>Location</label>
            <span>{{ violation.location }}</span>
          </div>
          <div class="info-item">
            <label>Road Name</label>
            <span>{{ violation.roadName }}</span>
          </div>
          <div class="info-item">
            <label>Coordinates</label>
            <span>{{ violation.coordinates }}</span>
          </div>
        </div>
        <div class="map-container">
          <!-- Map will be implemented here -->
          <div class="map-placeholder">Map View</div>
        </div>
      </div>

      <div class="section">
        <h2>Actions</h2>
        <div class="actions">
          <button class="action-btn contact" @click="contactDriver">
            <i class="fas fa-phone"></i> Contact Driver
          </button>
          <button class="action-btn alert" @click="sendAlert">
            <i class="fas fa-exclamation-triangle"></i> Send Alert
          </button>
          <button class="action-btn report" @click="generateReport">
            <i class="fas fa-file-alt"></i> Generate Report
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SpeedViolationDetails',
  setup() {
    const route = useRoute()
    
    // Sample data - replace with actual data from your store/API
    const violation = ref({
      vehicleId: 'V123',
      registrationNumber: 'ABC123',
      vehicleType: 'Heavy Truck',
      driverName: 'John Doe',
      licenseNumber: 'DL123456',
      contactNumber: '+1234567890',
      currentSpeed: 85,
      speedLimit: 60,
      excessSpeed: 25,
      startTime: new Date(),
      duration: 1800000, // 30 minutes in milliseconds
      location: 'Highway A1, Kilometer 45',
      roadName: 'Highway A1',
      coordinates: '12.3456, 78.9012',
      isActive: true
    })

    const isActiveViolation = computed(() => violation.value.isActive)

    const formatDateTime = (date) => {
      return new Date(date).toLocaleString()
    }

    const formatDuration = (duration) => {
      const minutes = Math.floor(duration / 60000)
      return `${minutes} minutes`
    }

    const contactDriver = () => {
      // Implement driver contact functionality
      console.log('Contacting driver:', violation.value.contactNumber)
    }

    const sendAlert = () => {
      // Implement alert sending functionality
      console.log('Sending alert to driver')
    }

    const generateReport = () => {
      // Implement report generation functionality
      console.log('Generating violation report')
    }

    // Fetch violation data when component mounts
    onMounted(() => {
      const violationId = route.params.id
      console.log('Fetching violation data for ID:', violationId)
      // Here you would typically make an API call to fetch the violation data
      // For now, we're using the sample data
    })

    return {
      violation,
      isActiveViolation,
      formatDateTime,
      formatDuration,
      contactDriver,
      sendAlert,
      generateReport
    }
  }
}
</script>

<style scoped>
.violation-details {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #357ABD;
  margin: 0;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  background: #e0e0e0;
  color: #666;
}

.status-badge.active-violation {
  background: #ffebee;
  color: #f44336;
}

.details-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.section {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.section:last-child {
  border-bottom: none;
}

.section h2 {
  color: #333;
  margin: 0 0 20px 0;
  font-size: 18px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item label {
  color: #666;
  font-size: 14px;
}

.info-item span {
  color: #333;
  font-size: 16px;
}

.speed {
  color: #f44336;
  font-weight: bold;
}

.excess {
  color: #f44336;
  font-weight: bold;
}

.map-container {
  margin-top: 20px;
  height: 300px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
}

.action-btn.contact {
  background: #357ABD;
  color: white;
}

.action-btn.alert {
  background: #ff9800;
  color: white;
}

.action-btn.report {
  background: #4caf50;
  color: white;
}

.action-btn:hover {
  opacity: 0.9;
}
</style> 