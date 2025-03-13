<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <div class="dashboard-sidebar">
      <div class="sidebar-header">
        <h2>Smart VTS</h2>
      </div>
      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
          <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fas fa-car"></i>
          <span>Vehicles</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Violations</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fas fa-map-marked-alt"></i>
          <span>Tracking</span>
        </a>
        <a href="#" class="nav-item">
          <i class="fas fa-file-alt"></i>
          <span>Reports</span>
        </a>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="dashboard-main">
      <h1>Dashboard Overview</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView'
}
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

/* Sidebar Styles */
.dashboard-sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #e2e8f0;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  margin-bottom: 40px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5em;
  font-weight: 700;
  color: #1e293b;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item i {
  font-size: 1.2em;
  width: 24px;
  text-align: center;
}

.nav-item:hover {
  background: #f1f5f9;
  color: #3b82f6;
}

.nav-item.active {
  background: #3b82f6;
  color: white;
}

/* Main Content Styles */
.dashboard-main {
  flex: 1;
  padding: 30px;
}

.dashboard-main h1 {
  margin: 0;
  font-size: 2em;
  font-weight: 700;
  color: #1e293b;
}

@media (max-width: 768px) {
  .dashboard-sidebar {
    width: 80px;
    padding: 16px;
  }

  .nav-item span {
    display: none;
  }

  .nav-item {
    justify-content: center;
    padding: 12px;
  }

  .nav-item i {
    font-size: 1.4em;
  }
}
</style> 