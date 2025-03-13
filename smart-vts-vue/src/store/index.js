import { createStore } from 'vuex'

export default createStore({
  state: {
    speed: 0,
    speedLimit: 80,
    speedLimitCV: 80,
    loginStatus: false,
    vehicleDetails: {
      location: '',
      vehicleId: '',
      vtsStatus: '',
      drivingPerformance: '',
      driverName: '',
      driverLicense: '',
      speedLimit: ''
    }
  },
  mutations: {
    SET_SPEED(state, speed) {
      state.speed = speed
    },
    SET_SPEED_LIMIT(state, limit) {
      state.speedLimit = limit
      state.speedLimitCV = limit
    },
    SET_LOGIN_STATUS(state, status) {
      state.loginStatus = status
    },
    SET_VEHICLE_DETAILS(state, details) {
      state.vehicleDetails = { ...state.vehicleDetails, ...details }
    }
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await fetch('http://localhost:5000/data')
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        
        const speedLimit = data.speed_limit || 80
        const speed = parseInt(data.sensor_data.find(item => item.name === 'analogoutput')?.value || 0) * 7.5
        
        commit('SET_SPEED_LIMIT', speedLimit)
        commit('SET_SPEED', speed)
        commit('SET_LOGIN_STATUS', true)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    trackVehicle({ commit }, vehicleId) {
      // Simulated vehicle details
      commit('SET_VEHICLE_DETAILS', {
        vehicleId,
        location: 'Updated City, Country',
        vtsStatus: 'Active',
        drivingPerformance: 'Excellent',
        driverName: 'Silas sosola silas',
        driverLicense: '23232-32243-3232'
      })
    }
  },
  getters: {
    isSpeedViolation: state => {
      return state.speed > state.speedLimit
    }
  }
}) 