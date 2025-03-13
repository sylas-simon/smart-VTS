<template>
  <div class="dashboard-view">
    <!-- Statistics Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-car"></i>
        </div>
        <div class="stat-content">
          <h3>Active Vehicles</h3>
          <p class="stat-value">24</p>
          <p class="stat-change positive">+2 from last week</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="stat-content">
          <h3>Violations Today</h3>
          <p class="stat-value">5</p>
          <p class="stat-change negative">-3 from yesterday</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-tachometer-alt"></i>
        </div>
        <div class="stat-content">
          <h3>Average Speed</h3>
          <p class="stat-value">65 km/h</p>
          <p class="stat-change neutral">No change</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-route"></i>
        </div>
        <div class="stat-content">
          <h3>Total Distance</h3>
          <p class="stat-value">1,234 km</p>
          <p class="stat-change positive">+89 km today</p>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="recent-activities">
      <div class="section-header">
        <h2>Recent Activities</h2>
        <button class="view-all">View All</button>
      </div>
      <div class="activities-list">
        <div class="activity-item">
          <div class="activity-icon speed-violation">
            <i class="fas fa-tachometer-alt"></i>
          </div>
          <div class="activity-content">
            <h4>Speed Violation Detected</h4>
            <p>Vehicle V123 exceeded speed limit on Highway A1</p>
            <span class="activity-time">2 minutes ago</span>
          </div>
        </div>

        <div class="activity-item">
          <div class="activity-icon vehicle-registered">
            <i class="fas fa-car"></i>
          </div>
          <div class="activity-content">
            <h4>New Vehicle Registered</h4>
            <p>Vehicle V456 added to the system</p>
            <span class="activity-time">15 minutes ago</span>
          </div>
        </div>

        <div class="activity-item">
          <div class="activity-icon system-alert">
            <i class="fas fa-cogs"></i>
          </div>
          <div class="activity-content">
            <h4>System Update</h4>
            <p>VTS system updated to version 2.1</p>
            <span class="activity-time">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Vehicle Status -->
    <div class="vehicle-status">
      <div class="section-header">
        <h2>Vehicle Status Overview</h2>
        <button class="view-all">View All</button>
      </div>
      <div class="status-grid">
        <div class="status-card">
          <div class="status-header">
            <h3>Active Vehicles</h3>
            <span class="status-count">18</span>
          </div>
          <div class="status-progress">
            <div class="progress-bar">
              <div class="progress" style="width: 75%"></div>
            </div>
          </div>
        </div>

        <div class="status-card">
          <div class="status-header">
            <h3>Maintenance Required</h3>
            <span class="status-count">3</span>
          </div>
          <div class="status-progress">
            <div class="progress-bar">
              <div class="progress warning" style="width: 25%"></div>
            </div>
          </div>
        </div>

        <div class="status-card">
          <div class="status-header">
            <h3>Offline Vehicles</h3>
            <span class="status-count">2</span>
          </div>
          <div class="status-progress">
            <div class="progress-bar">
              <div class="progress error" style="width: 10%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView'
}
</script>

<style scoped>
.dashboard-view {
  padding: 24px;
  background: #f8fafc;
  min-height: 100vh;
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 24px;
  color: #0369a1;
}

.stat-content h3 {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.stat-value {
  margin: 4px 0;
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.stat-change {
  margin: 0;
  font-size: 12px;
}

.stat-change.positive {
  color: #059669;
}

.stat-change.negative {
  color: #dc2626;
}

.stat-change.neutral {
  color: #64748b;
}

/* Recent Activities */
.recent-activities {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h2 {
  margin: 0;
  font-size: 18px;
  color: #1e293b;
}

.view-all {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.view-all:hover {
  background: #f1f5f9;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: #f8fafc;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-icon i {
  font-size: 20px;
  color: white;
}

.activity-icon.speed-violation {
  background: #ef4444;
}

.activity-icon.vehicle-registered {
  background: #10b981;
}

.activity-icon.system-alert {
  background: #3b82f6;
}

.activity-content h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #1e293b;
}

.activity-content p {
  margin: 0;
  font-size: 12px;
  color: #64748b;
}

.activity-time {
  font-size: 12px;
  color: #94a3b8;
}

/* Vehicle Status */
.vehicle-status {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.status-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 16px;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.status-header h3 {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}

.status-count {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
}

.status-progress {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #e2e8f0;
  border-radius: 4px;
}

.progress {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress.warning {
  background: #f59e0b;
}

.progress.error {
  background: #ef4444;
}

@media (max-width: 768px) {
  .dashboard-view {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .status-grid {
    grid-template-columns: 1fr;
  }
}
</style> 