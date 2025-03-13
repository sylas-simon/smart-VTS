<template>
  <div class="notifications">
    <h1>Notifications</h1>
    
    <div class="notifications-container">
      <div class="notification-filters">
        <button 
          v-for="filter in filters" 
          :key="filter.type"
          :class="['filter-btn', { active: currentFilter === filter.type }]"
          @click="currentFilter = filter.type"
        >
          {{ filter.label }}
          <span class="count" v-if="getNotificationCount(filter.type)">{{ getNotificationCount(filter.type) }}</span>
        </button>
      </div>

      <div class="notifications-list">
        <div v-if="filteredNotifications.length === 0" class="no-notifications">
          No notifications to display
        </div>
        
        <div 
          v-for="notification in filteredNotifications" 
          :key="notification.id" 
          class="notification-item"
          :class="notification.type"
        >
          <div class="notification-icon" :class="notification.type">
            <i :class="getIcon(notification.type)"></i>
          </div>
          <div class="notification-content">
            <router-link 
              v-if="notification.type === 'speed-violation'"
              :to="{ name: 'SpeedViolationDetails', params: { id: notification.id }}"
              class="notification-title"
            >
              {{ notification.title }}
            </router-link>
            <router-link 
              v-else-if="notification.type === 'reckless-driving'"
              :to="{ name: 'RecklessDrivingDetails', params: { id: notification.id }}"
              class="notification-title"
            >
              {{ notification.title }}
            </router-link>
            <div v-else class="notification-title">{{ notification.title }}</div>
            <div class="notification-message">{{ notification.message }}</div>
            <div class="notification-time">{{ formatTime(notification.time) }}</div>
          </div>
          <div class="notification-status" :class="notification.status">
            {{ notification.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'NotificationsView',
  setup() {
    const currentFilter = ref('all')
    
    const filters = [
      { type: 'all', label: 'All' },
      { type: 'speed-violation', label: 'Speed Violations' },
      { type: 'reckless-driving', label: 'Reckless Driving' },
      { type: 'system', label: 'System Alerts' }
    ]

    // Sample notifications data - replace with actual data from your store
    const notifications = ref([
      {
        id: 1,
        type: 'speed-violation',
        title: 'Speed Violation Detected',
        message: 'Vehicle ID: V123 exceeded speed limit of 60 km/h',
        time: new Date(),
        status: 'new'
      },
      {
        id: 2,
        type: 'reckless-driving',
        title: 'Reckless Driving Detected',
        message: 'Vehicle ID: V456 showing aggressive driving behavior',
        time: new Date(Date.now() - 1800000), // 30 minutes ago
        status: 'new'
      },
      {
        id: 3,
        type: 'system',
        title: 'System Update',
        message: 'VTS system has been updated to version 2.1',
        time: new Date(Date.now() - 3600000), // 1 hour ago
        status: 'read'
      }
    ])

    const filteredNotifications = computed(() => {
      if (currentFilter.value === 'all') {
        return notifications.value
      }
      return notifications.value.filter(n => n.type === currentFilter.value)
    })

    const getNotificationCount = (type) => {
      if (type === 'all') {
        return notifications.value.length
      }
      return notifications.value.filter(n => n.type === type).length
    }

    const getIcon = (type) => {
      const icons = {
        'speed-violation': 'fas fa-tachometer-alt',
        'reckless-driving': 'fas fa-car-crash',
        'system': 'fas fa-cogs'
      }
      return icons[type] || 'fas fa-bell'
    }

    const formatTime = (timestamp) => {
      if (!timestamp) return 'Unknown time'
      
      const now = new Date()
      const diff = now - new Date(timestamp)
      
      if (diff < 60000) return 'Just now'
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
      return new Date(timestamp).toLocaleDateString()
    }

    return {
      currentFilter,
      filters,
      filteredNotifications,
      getNotificationCount,
      getIcon,
      formatTime
    }
  }
}
</script>

<style scoped>
.notifications {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.notifications h1 {
  color: #357ABD;
  margin-bottom: 30px;
}

.notifications-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.notification-filters {
  display: flex;
  gap: 10px;
  padding: 15px;
  background: #f5f5f5;
  border-bottom: 1px solid #eee;
}

.filter-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-btn.active {
  background: #357ABD;
  color: white;
}

.count {
  background: #e0e0e0;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 12px;
}

.filter-btn.active .count {
  background: rgba(255,255,255,0.2);
}

.notifications-list {
  padding: 15px;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-bottom: 1px solid #eee;
  gap: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.notification-item:hover {
  background-color: #f8f9fa;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.notification-item.speed .notification-icon {
  background: #ffebee;
  color: #f44336;
}

.notification-item.reckless .notification-icon {
  background: #fff3e0;
  color: #ff9800;
}

.notification-item.system .notification-icon {
  background: #e3f2fd;
  color: #2196f3;
}

.notification-content {
  flex: 1;
}

.notification-content h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
}

.notification-link {
  color: #357ABD;
  text-decoration: none;
  transition: color 0.3s ease;
}

.notification-link:hover {
  color: #0a4aaa;
  text-decoration: underline;
}

.notification-content p {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
}

.timestamp {
  font-size: 12px;
  color: #999;
}

.notification-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
}

.notification-status.new {
  background: #e3f2fd;
  color: #2196f3;
}

.notification-status.read {
  background: #f5f5f5;
  color: #999;
}

.no-notifications {
  text-align: center;
  padding: 30px;
  color: #666;
  font-size: 16px;
}
</style> 