<template>
    <div>
      <header>
        <h1>User Header</h1>
        <router-link to="home">Home</router-link>
        <router-link to="profile">Profile</router-link>

        <Logout />
      </header>
  
      <main>
        <router-view />
      </main>
  
      <footer>
        <p>User Footer</p>
      </footer>

    </div>
  </template>
  
  <script>
   import Logout from "../components/Logout.vue";
  export default {
    name: 'UserLayout',

    components: {
            Logout,
        },
  };
  </script>