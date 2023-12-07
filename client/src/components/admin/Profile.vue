<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="userData">
      <div v-if="editing">
        <!-- Editable fields -->
        <input type="text" v-model="editedData.name" />
        <input type="email" v-model="editedData.email" />
        <!-- Add other input fields for editing -->
        <input type="file" @change="onFileChange" />
        <button @click="saveChanges">Save Changes</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
      <div v-else>
        <!-- Display user details -->
        <p><strong>Name:</strong> {{ userData.name }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
        <input type="file" @change="onFileChange" />
        <!-- Display other user profile data -->
        <button @click="startEdit">Edit</button>
        <button @click="uploadProfilePicture">Upload Profile Picture</button>
      </div>
      <p v-if="updating">Updating...</p>
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
        name: "",
        email: "",
        // Add other fields as needed
      },
      selectedFile: null,
    };
  },
  async mounted() {
    await this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/user/profile", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        this.userData = userData;
        // Copy the fetched data for editing
        this.editedData = { ...userData };
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    startEdit() {
      this.editing = true;
    },
    async saveChanges() {
      this.updating = true;
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(this.editedData),
        });

        if (!response.ok) {
          throw new Error("Failed to update user data");
        }

        this.userData = { ...this.editedData };
        this.editing = false;
        this.updating = false;
      } catch (error) {
        console.error("Error updating user data:", error);
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
      formData.append("profilePicture", this.selectedFile);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/user/profile-picture",
          {
            method: "POST",
            headers: {
              "auth-token": token, // Send the token in 'auth-token' header
            },
            body: formData,
          }
        );

        if (response.ok) {
          console.log("Profile picture uploaded successfully");
        } else {
          console.error("Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    },

    // async uploadProfilePicture() {
    //   const formData = new FormData();
    //   formData.append("profilePicture", this.selectedFile);

    //   try {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //       console.error("No token found");
    //       return;
    //     }

    //     const response = await fetch(
    //       "http://localhost:3000/api/user/profile-picture",
    //       {
    //         method: "POST",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //         body: formData,
    //       }
    //     );

    //     if (response.ok) {
    //       console.log("Profile picture uploaded successfully");
    //     } else {
    //       console.error("Failed to upload profile picture");
    //     }
    //   } catch (error) {
    //     console.error("Error uploading profile picture:", error);
    //   }
    // },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style>
/* Your CSS styles */
</style>
