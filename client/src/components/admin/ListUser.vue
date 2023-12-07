<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        <div>Name: {{ user.name }}</div>
        <div>Email: {{ user.email }}</div>
        <!-- Other user details -->
        <router-link :to="{ name: 'EditUser', params: { userId: user._id } }">Edit</router-link>
        <!-- ^ This link will navigate to the EditUser route for the specific user -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      authToken: localStorage.getItem('token') || ''
    };
  },
  async mounted() {
    if (this.authToken) {
      await this.fetchUsers();
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const userResponse = await fetch('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch users');
        }

        const userData = await userResponse.json();
        this.users = userData;
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error fetching users. Please try again.');
      }
    }
  }
};
</script>

<style>
/* Your CSS styles */
</style>