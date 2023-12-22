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
      <router-link to="/registration" class="text-blue-500 hover:underline"
        >Register</router-link
      >
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
      // Perform form validation
      if (!this.email || !this.password) {
        alert("Please fill in all fields");
        return;
      }

      // Prepare the login data to be sent to the server
      const loginData = {
        email: this.email,
        password: this.password,
      };

      // Send the login data to the server
      try {
        const response = await fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (response.ok) {
          // Login successful
          const token = data.data.token;
          localStorage.setItem("token", token); // Save the token to localStorage

          try {
            const response = await fetch(
              "http://localhost:3000/api/user/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
              }
            );

            const data = await response.json();

            if (response.ok) {
              // Login successful
              const token = data.data.token;
              const userRole = data.data.role;

              // Save the token to localStorage
              localStorage.setItem("token", token);

              // Redirect based on user role
              if (userRole === "admin") {
                this.$router.push("/admin/dashboard");
              } else {
                this.$router.push("/user/home");
              }
            } else {
              // Login failed, display error message to the user
              console.error("Failed to login:", data.error);
              alert(
                "Failed to login. Please check your credentials and try again."
              );
            }
          } catch (error) {
            // Handle network or server errors
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
          }
        } else {
          // Login failed, display error message to the user
          console.error("Failed to login:", data.error);
          alert(
            "Failed to login. Please check your credentials and try again."
          );
        }
      } catch (error) {
        // Handle network or server errors
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