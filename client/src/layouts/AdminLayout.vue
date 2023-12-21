<template>
  <div class="layout">
    <div class="side-nav">
      <div class="logo">
          <h2>DitSygehus</h2>
      </div>
      <div class="akut">
        <p>Akut Modtagelse</p>
      </div>
      <Navigation />
    </div>
    <div class="body-container">
      <div class="header">
        <div class="profile-dropdown">
          <div class="user-header" @click="toggleDropdown">
            <img :src="profilePictureUrl" alt="Profile Picture" />
            <!-- <img src="../../uploads/1703072247903.png" alt="Profile"/> -->
            <p>{{ userName }}</p>
          </div>
          <div v-if="dropdownVisible" class="dropdown-style">
            <p><router-link to="/admin/profile" class="nav-link">My Profile</router-link></p>
            <p>Settings</p>
            <Logout />
          </div>
        </div>
      </div>
      <div class="content-area">
        <main>
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/admin/Navigation.vue";
import Logout from "../components/Logout.vue";

export default {
  name: "AdminLayout",
  data() {
    return {
      dropdownVisible: false,
      userData: null,
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
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    async fetchUserData() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/user/profile', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        this.userData = userData;
        // Copy the fetched data for editing
        this.editedData = { ...userData };
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
  },
  computed: {
    profilePictureUrl() {
      if (this.userData && this.userData.profilePicture) {
        // Update the URL based on your server configuration
        return `http://localhost:5173/${this.userData.profilePicture}`;
      }
      return ''; // Return a placeholder image or default image URL if no profile picture is available
    },
  },
  components: {
    Navigation,
    Logout,
  },
};
</script>

<style></style>