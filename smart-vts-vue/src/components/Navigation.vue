<template>
  <nav>
    <ul>
      <li><router-link to="/" :class="{ active: $route.path === '/' }">Home</router-link></li>
      <li><router-link to="/dashboard" :class="{ active: $route.path === '/dashboard' }">Dashboard</router-link></li>
      <li><router-link to="/track" :class="{ active: $route.path === '/track' }">Track & Monitor</router-link></li>
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
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'VtsNavigation',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const showRegistrations = ref(false)

    const isRegistrationsActive = computed(() => {
      return route.path === '/vehicles' || route.path === '/road-signs'
    })

    const closeDropdowns = () => {
      showRegistrations.value = false
    }

    const toggleRegistrations = () => {
      showRegistrations.value = !showRegistrations.value
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
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
      toggleRegistrations,
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

.user-profile {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.username {
  color: white;
  font-weight: 500;
}
</style> 