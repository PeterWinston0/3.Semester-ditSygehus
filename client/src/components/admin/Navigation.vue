<template>
    <div>
      <nav>
        <router-link to="/admin/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/admin/settings" class="nav-link">Settings</router-link>
        <router-link to="/admin/createhospital" class="nav-link">Create Hospital</router-link>
        <router-link to="/admin/listhospital" class="nav-link">All Hospitals</router-link>
        <router-link to="/admin/listuser" class="nav-link">All Users</router-link>
        <!-- Add other admin links as needed -->
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminNavigation',
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>


<!-- <template>
    <div>
        <nav>
            <RouterLink to="dashboard" class="nav-link">Dashboard</RouterLink>
            <RouterLink to="settings" class="nav-link">Settings</RouterLink>
            <RouterLink to="createhospital" class="nav-link">Create Hospital</RouterLink>
            <RouterLink to="listhospital" class="nav-link">All Hospitals</RouterLink>
        </nav>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style> -->