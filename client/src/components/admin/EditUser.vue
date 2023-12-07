<template>
    <div>
      <h1>Edit User</h1>
      <form @submit.prevent="editUser">
        <div class="form-group">
          <label for="editName">Name:</label>
          <input type="text" id="editName" v-model="editedUser.name" required />
        </div>
        <div class="form-group">
          <label for="editEmail">Email:</label>
          <input type="email" id="editEmail" v-model="editedUser.email" required />
        </div>
        <!-- Include other fields as needed -->
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editedUser: {
          name: '',
          email: '',
          // Add other fields from the user object
        }
      };
    },
    async mounted() {
      // Fetch the user details when the component is mounted
      await this.fetchUserDetails();
    },
    methods: {
      async fetchUserDetails() {
        try {
          const userId = this.$route.params.userId;
          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${this.authToken}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
  
          const userData = await response.json();
          this.editedUser = userData; // Set the fetched user data to the form fields
        } catch (error) {
          console.error('Error fetching user details:', error);
          alert('Error fetching user details. Please try again.');
        }
      },
      async editUser() {
        try {
          const userId = this.$route.params.userId;
          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.authToken}`
            },
            body: JSON.stringify(this.editedUser)
          });
  
          if (!response.ok) {
            throw new Error('Failed to edit user');
          }
  
          alert('User updated successfully!');
          this.$router.push('/listusers');
        } catch (error) {
          console.error('Error editing user:', error);
          alert('Failed to edit user. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style>
  /* Your CSS styles */
  </style>
  




<!-- <template>
    <div>
      <h1>Edit User</h1>
      <form @submit.prevent="editUser">
        <div class="form-group">
          <label for="editName">Name:</label>
          <input type="text" id="editName" v-model="editedUser.name" required />
        </div>
        <div class="form-group">
          <label for="editEmail">Email:</label>
          <input type="email" id="editEmail" v-model="editedUser.email" required />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editedUser: {
          name: '',
          email: '',
          // Add other fields from the user object
        }
      };
    },
    methods: {
      async editUser() {
        try {
          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.authToken}`
            },
            body: JSON.stringify(this.editedUser)
          });
  
          if (!response.ok) {
            throw new Error('Failed to edit user');
          }
  
          alert('User updated successfully!');
          // Redirect to user list page after editing
          this.$router.push('/listusers');
        } catch (error) {
          console.error('Error editing user:', error);
          // Handle error while editing user
          alert('Failed to edit user. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style>
  /* Your CSS styles */
  </style> -->
  