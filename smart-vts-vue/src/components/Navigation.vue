<template>
  <nav>
    <ul>
      <li><router-link to="/" :class="{ active: $route.path === '/' }">Home</router-link></li>
      <li><router-link to="/notifications" :class="{ active: $route.path === '/notifications' }">Notifications</router-link></li>
      <li class="dropdown">
        <button @click="toggleRegistrations" class="dropdown-button" :class="{ active: isRegistrationsActive }">
          Registrations ▼
        </button>
        <div class="dropdown-menu" v-if="showRegistrations">
          <router-link to="/vehicles" @click="closeDropdowns" :class="{ active: $route.path === '/vehicles' }">Vehicles</router-link>
          <router-link to="/road-signs" @click="closeDropdowns" :class="{ active: $route.path === '/road-signs' }">Road Signs</router-link>
        </div>
      </li>
      <li class="dropdown">
        <button @click="toggleTrackWindow" class="dropdown-button" :class="{ active: $route.path === '/dashboard' }">
          Track and Monitor ▼
        </button>
        <div class="track-window" v-if="showTrackWindow">
          <form @submit.prevent="handleTrack">
            <label for="vehicle-id">Vehicle ID:</label>
            <input type="text" id="vehicle-id" v-model="vehicleId" required>
            <button type="submit" class="track-button">Track</button>
          </form>
        </div>
      </li>
      <li><router-link to="/report" :class="{ active: $route.path === '/report' }">Report</router-link></li>
      <li class="user-profile">
        <img class="user-icon" src="@/assets/userprofile.png" alt="User Icon">
        <span class="username">Admin</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'VtsNavigation',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const showRegistrations = ref(false)
    const showTrackWindow = ref(false)
    const vehicleId = ref('')

    const isRegistrationsActive = computed(() => {
      return route.path === '/vehicles' || route.path === '/road-signs'
    })

    const closeDropdowns = () => {
      showRegistrations.value = false
      showTrackWindow.value = false
    }

    const toggleRegistrations = () => {
      showRegistrations.value = !showRegistrations.value
      showTrackWindow.value = false
    }

    const toggleTrackWindow = () => {
      showTrackWindow.value = !showTrackWindow.value
      showRegistrations.value = false
      // Reset form when opening
      if (showTrackWindow.value) {
        vehicleId.value = ''
      }
    }

    const handleTrack = () => {
      if (vehicleId.value) {
        store.dispatch('trackVehicle', vehicleId.value)
        closeDropdowns()
        router.push('/dashboard')
      }
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown') && !event.target.closest('.track-window')) {
        closeDropdowns()
      }
    }

    // Watch for route changes
    watch(() => router.currentRoute.value, () => {
      closeDropdowns()
    })

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showRegistrations,
      showTrackWindow,
      vehicleId,
      toggleRegistrations,
      toggleTrackWindow,
      handleTrack,
      closeDropdowns,
      isRegistrationsActive
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #357ABD;
  padding: 10px 0;
  width: 100%;
  position: relative;
  z-index: 9999;
}

nav ul {
  overflow: visible;
  list-style: none;
  margin: 0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
 
}

nav ul li:not(.user-profile) {
  margin-right: 20px;
  
}

nav ul li a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  display: flex;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav ul li a:hover {
  background-color: #0a4aaa;
}

nav ul li a.active {
  background-color: #0a4aaa;
  font-weight: bold;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  background: none;
  border: none;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  transition: background-color 0.3s ease;
}

.dropdown-button:hover {
  background-color: #0a4aaa;
}

.dropdown-button.active {
  background-color: #0a4aaa;
  font-weight: bold;
}

.dropdown-menu {
  position: absolute;
  display: block;
  top: 100%;
  left: 0;
  background-color: #357ABD;
  min-width: 150px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000;
  border-radius: 4px;
  margin-top: 5px;
}

.dropdown-menu a {
  padding: 10px 20px;
  display: block;
  color: white;
  text-decoration: none;
  white-space: nowrap;
}

.dropdown-menu a:hover {
  background-color: #0a4aaa;
}

.dropdown-menu a.active {
  background-color: #0a4aaa;
  font-weight: bold;
}

.track-window {
  position: absolute;
  display: block;
  top: 100%;
  left: 0;
  background-color: white;
  padding: 20px;
  min-width: 250px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000;
  border-radius: 4px;
  margin-top: 5px;
}

.track-window form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.track-window label {
  font-weight: bold;
  color: #333;
}

.track-window input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.track-button {
  padding: 8px 16px;
  background-color: #357ABD;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.track-button:hover {
  background-color: #0a4aaa;
}

.user-profile {
  margin-left: auto;
  display:none;
  flex-direction: row;
  align-items:center;
  gap: 8px;
  padding: 8px 16px;
  height: 100%;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.user-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit:contain;
  border: 2px solid white;
  background-color: #0a4aaa;
  
}

.username {
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
}
</style> 