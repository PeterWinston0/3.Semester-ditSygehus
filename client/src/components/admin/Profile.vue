<template>
  <div class="user-profile">
    <h1 class="user-profile-title">User Profile</h1>
    <div v-if="userData">
      <div v-if="editing" class="profile-edit">
        <!-- Editable fields -->
        <input type="text" v-model="editedData.name" class="edit-input" />
        <input type="email" v-model="editedData.email" class="edit-input" />
        <!-- Add other input fields for editing -->
        <!-- <input type="file" @change="onFileChange" class="edit-input" /> -->
        <img :src="profilePictureUrl" alt="Profile Picture" class="profile-picture" />
        <input type="file" @change="onFileChange" class="edit-input" />
        <button @click="uploadProfilePicture" class="edit-button">Upload Profile Picture</button>
        <button @click="saveChanges" class="edit-button">Save Changes</button>
        <button @click="cancelEdit" class="edit-button cancel">Cancel</button>
      </div>
      <div v-else>
        <!-- Display user details -->
        <p><strong>Name:</strong> {{ userData.name }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
        <p><strong>Password:</strong> {{ userData.password }}</p>
        <p><strong>SSN:</strong> {{ userData.ssn }}</p>
        <p><strong>Job Title:</strong> {{ userData.jobTitle }}</p>
        <p><strong>Gender:</strong> {{ userData.gender }}</p>
        <!-- Display hospital and department (Fetch names based on IDs) -->
        <p><strong>Hospital:</strong> {{ userData.hospitalId?.name || 'Not specified' }}</p>
        <p><strong>Department:</strong> {{ userData.departmentId?.name || 'Not specified' }}</p>


        <!-- Display other user profile data -->
        <button @click="startEdit" class="edit-button">Edit</button>
      </div>
      <p v-if="updating" class="updating">Updating...</p>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      editing: false,
      updating: false,
      editedData: {
        name: '',
        email: '',
        // Add other fields as needed
      },
      hospitalName: null,
      departmentName: null,
      selectedFile: null,
    };
  },
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
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

    const userData = await response.json(); // Ensure userData is defined correctly
    this.userData = userData;
    this.editedData = { ...userData };
    this.hospitalName = userData.hospitalName;
    this.departmentName = userData.departmentName;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
},
    startEdit() {
      this.editing = true;
    },
    async saveChanges() {
      this.updating = true;
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
          body: JSON.stringify(this.editedData),
        });

        if (!response.ok) {
          throw new Error('Failed to update user data');
        }

        this.userData = { ...this.editedData };
        this.editing = false;
        this.updating = false;
      } catch (error) {
        console.error('Error updating user data:', error);
        this.updating = false;
      }
    },
    cancelEdit() {
      // Cancel editing and reset data
      this.editing = false;
      this.editedData = { ...this.userData };
    },
    async uploadProfilePicture() {
      const formData = new FormData();
      formData.append('profilePicture', this.selectedFile);

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('http://localhost:3000/api/user/profile-picture', {
          method: 'POST',
          headers: {
            'auth-token': token, // Send the token in 'auth-token' header
          },
          body: formData,
        });

        if (response.ok) {
          console.log('Profile picture uploaded successfully');

          // Automatically update the profile picture
          this.fetchUserData();
        } else {
          console.error('Failed to upload profile picture');
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
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
};
</script>

<style scoped>
.user-profile {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

.user-profile-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.profile-edit {
  margin-top: 20px;
}

.edit-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.edit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.edit-button.cancel {
  background-color: #ff6347;
}

.edit-button:hover {
  background-color: #0056b3;
}

.profile-picture {
  max-width: 200px;
  margin: 20px auto;
  display: block;
}

.updating {
  font-weight: bold;
  margin-top: 20px;
  font-size: 18px;
  color: #007bff;
}
</style>