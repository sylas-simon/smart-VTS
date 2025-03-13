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

export default {
  name: 'App',
  components: {
    VtsHeader,
    VtsNavigation
  }
}
</script>

<style>
@import './assets/style.css';
</style>
