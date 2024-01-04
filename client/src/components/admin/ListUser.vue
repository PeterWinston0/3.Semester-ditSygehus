<template>
  <div class="user-list">
    <h1>User List</h1>
    <ul class="user-items">
      <li v-for="user in users" :key="user._id" class="user-item">
        <div class="user-info">
          <div class="user-detail">
            <span class="detail-label">Name:</span>
            <span class="detail-value">{{ user.name }}</span>
          </div>
          <div class="user-detail">
            <span class="detail-label">Email:</span>
            <span class="detail-value">{{ user.email }}</span>
          </div>
          <!-- Add more user details here if needed -->
        </div>
        <router-link :to="{ name: 'EditUser', params: { userId: user._id } }" class="edit-link">Edit</router-link>
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

<style scoped>
.user-list {
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.user-items {
  list-style-type: none;
  padding: 0;
}

.user-item {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-bottom: 10px;
}

.detail-label {
  font-weight: bold;
  margin-right: 5px;
}

.detail-value {
  font-size: 16px;
}

.edit-link {
  display: inline-block;
  padding: 5px 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-link:hover {
  background-color: #2980b9;
}
</style>