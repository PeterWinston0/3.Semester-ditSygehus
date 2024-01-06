<template>
  <div class="registration-page">
    <h1>Create User</h1>
    <form @submit.prevent="register" class="registration-form">
      <!-- Name Field -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <!-- Password Field -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="form-group">
        <label for="ssn">Social Security Number:</label>
        <input type="text" id="ssn" v-model="ssn" required />
      </div>

      <!-- Job Title Field -->
      <div class="form-group">
        <label for="jobTitle">Job Title:</label>
        <input type="text" id="jobTitle" v-model="jobTitle" required />
      </div>

      <!-- Hospital Field -->
      <div class="form-group">
        <label for="hospital">Hospital:</label>
        <select
          id="hospital"
          v-model="selectedHospital"
          @change="fetchDepartments"
        >
          <option
            v-for="hospital in hospitals"
            :key="hospital._id"
            :value="hospital._id"
          >
            {{ hospital.name }}
          </option>
        </select>
      </div>

      <!-- Department Field -->
      <div class="form-group" v-if="departments.length > 0">
        <label for="department">Department:</label>
        <select id="department" v-model="selectedDepartment">
          <option
            v-for="department in departments"
            :key="department._id"
            :value="department._id"
          >
            {{ department.name }}
          </option>
        </select>
      </div>

      <!-- Gender Field -->
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Role Field -->
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn-register">Register</button>
    </form>

    <!-- Links and Messages -->
    <p class="text-center mt-4">
      Already have an account?
      <router-link to="/login" class="text-blue-500 hover:underline"
        >Login</router-link
      >
    </p>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      jobTitle: "",
      ssn: "",
      gender: "male",
      role: "user",
      errorMessage: "",
      successMessage: "",
      hospitals: [],
      departments: [],
      selectedHospital: "",
      selectedDepartment: "",
    };
  },
  async created() {
    await this.fetchHospitals();
  },
  methods: {
    async fetchHospitals() {
      try {
        const response = await fetch("http://localhost:3000/api/hospitals");
        if (response.ok) {
          this.hospitals = await response.json();
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    },
    async fetchDepartments() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/hospitals/${this.selectedHospital}/departments`
        );
        if (response.ok) {
          this.departments = await response.json();
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    },

    validateForm() {
      this.errorMessage = "";
      if (!this.name || this.name.length < 3) {
        this.errorMessage = "Name must be at least 3 characters long.";
        return false;
      }
      if (!this.email.includes("@")) {
        this.errorMessage = "Please enter a valid email address.";
        return false;
      }
      if (!this.password || this.password.length < 6) {
        this.errorMessage = "Password must be at least 6 characters long.";
        return false;
      }
      if (!this.jobTitle) {
        this.errorMessage = "Please enter a job title.";
        return false;
      }
      if (!this.selectedHospital) {
        this.errorMessage = "Please select a hospital.";
        return false;
      }
      if (!this.selectedDepartment) {
        this.errorMessage = "Please select a department.";
        return false;
      }
      if (!this.ssn || this.ssn.length < 9) {
        this.errorMessage = "Please enter a valid SSN (at least 9 characters).";
        return false;
      }
      return true;
    },

    async register() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              password: this.password,
              jobTitle: this.jobTitle,
              ssn: this.ssn,
              gender: this.gender,
              role: this.role,
              hospitalId: this.selectedHospital,
              departmentId: this.selectedDepartment,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          this.successMessage = "Registration successful";
          this.$router.push("/login");
        } else {
          this.errorMessage = data.error;
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = "An error occurred while registering";
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
