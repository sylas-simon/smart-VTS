<template>
  <div class="home">
    <h1>Welcome to Smart VTS</h1>
    <p>Please use the navigation menu above to access different features:</p>
    <ul>
      <li>Track and Monitor vehicles</li>
      <li>Manage vehicle registrations</li>
      <li>View road signs</li>
      <li>Generate reports</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #357ABD;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}
</style> 