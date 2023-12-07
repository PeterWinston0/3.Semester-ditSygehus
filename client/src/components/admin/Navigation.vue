<template>
    <div>
      <nav>
        <router-link to="/admin/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/admin/settings" class="nav-link">Settings</router-link>
        <router-link to="/admin/createhospital" class="nav-link">Create Hospital</router-link>
        <router-link to="/admin/listhospital" class="nav-link">All Hospitals</router-link>
        <router-link to="/admin/listuser" class="nav-link">All Users</router-link>
        <router-link to="/admin/profile" class="nav-link">My Profile</router-link>
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