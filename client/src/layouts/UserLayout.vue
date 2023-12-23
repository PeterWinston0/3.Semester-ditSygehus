<template>
  <div>
    <div class="header">
      <button @click="goBack">Tilbage</button>
      <h2>Velkommen</h2>

      <!-- <Logout /> -->
    </div>

    <main>
      <router-view />
    </main>

    <footer></footer>
  </div>
</template>

<script>
import Logout from "../components/Logout.vue";
export default {
  name: "UserLayout",

  components: {
    Logout,
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Navigate back to the previous page
    },
  },
};
</script>

<style>
@media (max-width: 767px) {
  * {
    padding: 0;
    margin: 0;
  }
  .header {
    background-color: #0092cf;
    box-sizing: border-box;
    padding: 15px;
    height: 15vh;
    /* border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px; */

    h2 {
      color: white;
    }
  }
}
</style>
