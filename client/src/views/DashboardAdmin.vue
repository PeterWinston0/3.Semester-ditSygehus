<template>
    <div>
        <h1>Dashboard Admin</h1>
        <h4 class="text-lg font-semibold mb-2">Welcome {{ userName }}</h4>
        <Logout />
    </div>
</template>

<script>
import Logout from "../components/Logout.vue";

export default {
  data() {
    return {
      userName: "", // Initialize the userName data property
    };
  },
  created() {
    // Retrieve the user's name from the token or your authentication mechanism
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.userName = payload.name;
    }
  },
  components: {
    Logout,
  },
};
</script>

<style lang="scss" scoped>

</style>