import { createStore } from 'vuex'
import axios from 'axios'

// API configuration
const API_BASE_URL = 'http://localhost:5000' // Using localhost:5000 as the base URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('Making request to:', config.url)
    console.log('Request method:', config.method)
    console.log('Request headers:', config.headers)
    console.log('Request data:', config.data)
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response received:', response.status)
    console.log('Response data:', response.data)
    return response
  },
  error => {
    console.error('Response error:', error.response || error)
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default createStore({
  state: {
    speed: 0,
    speedLimit: 80,
    loginStatus: false,
    vehicleDetails: {
      location: '',
      vehicleId: '',
      vtsStatus: '',
      drivingPerformance: '',
      driverName: '',
      driverLicense: '',
      speedLimit: '',
      registrationNumber: '',
      vehicleType: '',
      contactNumber: '',
      roadName: '',
      coordinates: ''
    },
    loading: false,
    error: null,
    notifications: [],
    lastOverspeedTime: null,
    vehicleNotFound: false,
    pollingInterval: null
  },
  mutations: {
    SET_SPEED(state, speed) {
      state.speed = speed
    },
    SET_SPEED_LIMIT(state, limit) {
      state.speedLimit = limit
    },
    SET_LOGIN_STATUS(state, status) {
      state.loginStatus = status
    },
    SET_VEHICLE_DETAILS(state, details) {
      state.vehicleDetails = { ...state.vehicleDetails, ...details }
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    ADD_NOTIFICATION(state, notification) {
      // Check if a similar notification already exists
      const existingNotification = state.notifications.find(n => 
        n.type === notification.type && 
        n.message === notification.message &&
        (Date.now() - n.time) < 2* 1000 // Within 1 minutes
      )
      
      if (!existingNotification) {
        state.notifications.unshift(notification)
      }
    },
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications
    },
    MARK_NOTIFICATION_AS_READ(state, notificationId) {
      const notification = state.notifications.find(n => n.id === notificationId)
      if (notification) {
        notification.status = 'read'
      }
    },
    SET_LAST_OVERSPEED_TIME(state, time) {
      state.lastOverspeedTime = time
    },
    SET_VEHICLE_NOT_FOUND(state, status) {
      state.vehicleNotFound = status
    },
    CLEAR_VEHICLE_DETAILS(state) {
      state.vehicleDetails = {
        location: '',
        vehicleId: '',
        vtsStatus: '',
        drivingPerformance: '',
        driverName: '',
        driverLicense: '',
        speedLimit: '',
        registrationNumber: '',
        vehicleType: '',
        contactNumber: '',
        roadName: '',
        coordinates: ''
      }
    },
    SET_POLLING_INTERVAL(state, interval) {
      state.pollingInterval = interval
    }
  },
  actions: {
    startPolling({ commit, dispatch }) {
      // Clear any existing interval
      if (this.state.pollingInterval) {
        clearInterval(this.state.pollingInterval)
      }
      
      // Start polling every 1 second
      const interval = setInterval(() => {
        dispatch('fetchAllVehicleData')
      }, 1000)
      
      commit('SET_POLLING_INTERVAL', interval)
    },
    
    stopPolling({ commit }) {
      if (this.state.pollingInterval) {
        clearInterval(this.state.pollingInterval)
        commit('SET_POLLING_INTERVAL', null)
      }
    },

    async fetchAllVehicleData({ commit }) {
      try {
        const response = await api.get('/api/vehicle-data')
        console.log('Fetched all vehicle data:', response.data)
        
        const vehicles = Array.isArray(response.data) ? response.data : [response.data]
        
        // Process each vehicle's data
        vehicles.forEach(vehicle => {
          // Check for overspeed and add notification if needed
          if (vehicle.is_overspeed === true) {
            const currentTime = new Date()
            const lastOverspeedTime = this.state.lastOverspeedTime
            
            if (!lastOverspeedTime || (currentTime - lastOverspeedTime) > 5  * 1000) {
              const notification = {
                id: Date.now(),
                type: 'speed-violation',
                title: 'Speed Violation Detected',
                message: `Vehicle ${vehicle.vehicle_id} exceeded speed limit of ${vehicle.speed_limit} km/h (Current speed: ${vehicle.current_speed} km/h)`,
                time: currentTime,
                status: 'new',
                vehicleData: vehicle // Store the complete vehicle data
              }
              commit('ADD_NOTIFICATION', notification)
              commit('SET_LAST_OVERSPEED_TIME', currentTime)
            }
          }

          // Update vehicle details in store
          commit('SET_VEHICLE_DETAILS', {
            vehicleId: vehicle.vehicle_id,
            vtsStatus: vehicle.vts_status || 'Inactive',
            drivingPerformance: vehicle.driving_performance || 'unknown',
            driverName: vehicle.driver_name || 'unknown',
            driverLicense: vehicle.driver_license || 'unknown',
            speedLimit: vehicle.speed_limit || '80',
            isOverspeed: vehicle.is_overspeed || false,
            location: vehicle.location || 'Location not available',
            registrationNumber: vehicle.registration_number || '',
            vehicleType: vehicle.vehicle_type || '',
            contactNumber: vehicle.contact_number || '',
            roadName: vehicle.road_name || '',
            coordinates: vehicle.coordinates || '',
            currentSpeed: vehicle.current_speed || 0
          })
        })

        return vehicles
      } catch (error) {
        console.error('Error fetching vehicle data:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch vehicle data'
        
        // Add a system notification for the error
        const notification = {
          id: Date.now(),
          type: 'system',
          title: 'Data Fetch Error',
          message: `Unable to fetch vehicle data: ${errorMessage}`,
          time: new Date(),
          status: 'new'
        }
        commit('ADD_NOTIFICATION', notification)
        throw error
      }
    },

    async trackVehicle({ commit }, vehicleId) {
      try {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        commit('SET_VEHICLE_NOT_FOUND', false)
        
        console.log('Fetching vehicle data:', vehicleId)
        const response = await api.get('/api/vehicle-data')
        console.log('API response:', response.data)
        
        const vehicles = Array.isArray(response.data) ? response.data : [response.data]
        const data = vehicles.find(v => v.vehicle_id === vehicleId)
        
        // Check if the vehicle exists in the response
        if (!data) {
          console.log('Vehicle not found')
          commit('SET_VEHICLE_NOT_FOUND', true)
          commit('CLEAR_VEHICLE_DETAILS')
          return
        }
        
        // Update speed and speed limit from the API data
        const speedLimit = data.speed_limit || 80
        const speed = data.current_speed || 0
        
        commit('SET_SPEED_LIMIT', speedLimit)
        commit('SET_SPEED', speed)
        commit('SET_LOGIN_STATUS', true)

        // Update vehicle details using the API data
        commit('SET_VEHICLE_DETAILS', {
          vehicleId: data.vehicle_id,
          vtsStatus: data.vts_status || 'Inactive',
          drivingPerformance: data.driving_performance || 'unknown',
          driverName: data.driver_name || 'unknown',
          driverLicense: data.driver_license || 'unknown',
          speedLimit: data.speed_limit || '80',
          isOverspeed: data.is_overspeed || false,
          location: data.location || 'Location not available',
          registrationNumber: data.registration_number || '',
          vehicleType: data.vehicle_type || '',
          contactNumber: data.contact_number || '',
          roadName: data.road_name || '',
          coordinates: data.coordinates || '',
          currentSpeed: data.current_speed || 0
        })

      } catch (error) {
        console.error('Error tracking vehicle:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Failed to track vehicle'
        commit('SET_ERROR', errorMessage)
        
        // Add a system notification for the error
        const notification = {
          id: Date.now(),
          type: 'system',
          title: 'Tracking Error',
          message: `Unable to track vehicle: ${errorMessage}`,
          time: new Date(),
          status: 'new'
        }
        commit('ADD_NOTIFICATION', notification)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    isSpeedViolation: state => {
      return state.speed > state.speedLimit
    },
    isLoading: state => state.loading,
    hasError: state => state.error !== null,
    notifications: state => state.notifications,
    unreadNotifications: state => state.notifications.filter(n => n.status === 'new'),
    notificationCount: state => state.notifications.length,
    unreadNotificationCount: state => state.notifications.filter(n => n.status === 'new').length,
    isVehicleNotFound: state => state.vehicleNotFound
  }
}) 
