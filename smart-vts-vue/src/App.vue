<template>
  <div id="app">
    <VtsHeader />
    <VtsNavigation />
    <router-view></router-view>
  </div>
</template>

<script>
import VtsHeader from './components/Header.vue'
import VtsNavigation from './components/Navigation.vue'
import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {
    VtsHeader,
    VtsNavigation
  },
  setup() {
    const store = useStore()

    onMounted(() => {
      // Start polling for vehicle data when the app initializes
      store.dispatch('startPolling')
    })

    onUnmounted(() => {
      // Stop polling when the app is destroyed
      store.dispatch('stopPolling')
    })
  }
}
</script>

<style>
@import './assets/style.css';
</style>
