import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Home from '@/views/Home.vue'
import Vehicles from '@/views/Vehicles.vue'
import RoadSigns from '@/views/RoadSigns.vue'
import Report from '@/views/Report.vue'
import Notifications from '@/views/Notifications.vue'
import SpeedViolationDetails from '@/views/SpeedViolationDetails.vue'
import RecklessDrivingDetails from '@/views/RecklessDrivingDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: Vehicles
  },
  {
    path: '/road-signs',
    name: 'RoadSigns',
    component: RoadSigns
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  },
  {
    path: '/violation/:id',
    name: 'SpeedViolationDetails',
    component: SpeedViolationDetails
  },
  {
    path: '/reckless-driving/:id',
    name: 'RecklessDrivingDetails',
    component: RecklessDrivingDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 