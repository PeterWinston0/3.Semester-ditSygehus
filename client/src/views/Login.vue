<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn-login">Login</button>
    </form>
    <p class="text-center mt-4">
      Don't have an account?
      <router-link to="/registration" class="text-blue-500 hover:underline">Register</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert("Please fill in all fields");
        return;
      }

      const loginData = { email: this.email, password: this.password };

      try {
        const response = await fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to login:", data.error);
          alert("Failed to login. Please check your credentials and try again.");
          return;
        }

        const token = data.data.token;
        localStorage.setItem("token", token);

        // Fetch user details
        try {
          const userDetailsResponse = await fetch("http://localhost:3000/api/users", {
            headers: { "Authorization": `Bearer ${token}` },
          });

          const userDetails = await userDetailsResponse.json();

          if (!userDetailsResponse.ok) {
            throw new Error(userDetails.error);
          }

          // Dispatch action to update user data in Vuex store
          this.$store.dispatch('updateUserData', userDetails);

          // Redirect to appropriate page based on user role
          this.$router.push(data.data.role === "admin" ? "/admin/dashboard" : "/user/home");
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          alert("Failed to fetch user details. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #fff;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

h1 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button.btn-login {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.btn-login:hover {
  background-color: #0056b3;
}

.text-center {
  text-align: center;
}

.text-blue-500 {
  color: #007bff;
}

.hover\:underline:hover {
  text-decoration: underline;
}
</style>