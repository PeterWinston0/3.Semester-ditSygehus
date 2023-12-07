<template>
  <div>
    <header>
      <h1>Admin Header</h1>

      <Navigation />
      <Logout />
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>Admin Footer</p>
    </footer>
  </div>
</template>

<script>
import Navigation from "../components/admin/Navigation.vue";
import Logout from "../components/Logout.vue";

export default {
  name: "AdminLayout",

  components: {
    Navigation,
    Logout,
  },
};
</script>

<style></style>
