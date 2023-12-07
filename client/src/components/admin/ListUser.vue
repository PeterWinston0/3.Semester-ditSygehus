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






<!-- <template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        <div>Name: {{ user.name }}</div>
        <div>Email: {{ user.email }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      authToken: localStorage.getItem('token') || '' // Retrieve the token from localStorage
    };
  },
  async mounted() {
    if (this.authToken) {
      // Token exists, fetch users
      await this.fetchUsers();
    } else {
      // Redirect to login if token doesn't exist
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
        // Handle error while fetching users
      }
    }
  }
};
</script> -->

<!-- <script>
export default {
  data() {
    return {
      users: [],
      authToken: '' // Initialize the authToken property
    };
  },
  async mounted() {
    // Authenticate and retrieve token
    await this.authenticate();
  },
  methods: {
    async authenticate() {
      try {
        const userData = { email: 'user_email@example.com', password: 'user_password' };
        const loginResponse = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if (!loginResponse.ok) {
          throw new Error('Authentication failed');
        }

        const { token } = await loginResponse.json();
        this.authToken = token;

        // Fetch users once authenticated
        await this.fetchUsers();
      } catch (error) {
        console.error('Authentication error:', error);
        // Handle authentication error
      }
    },
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
        // Handle error while fetching users
      }
    }
  }
};
</script> -->

<style>
/* Your CSS styles */
</style>


<!-- <template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        <div>Name: {{ user.name }}</div>
        <div>Email: {{ user.email }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      authToken: '' // Initialize the authToken property
    };
  },
  async mounted() {
    // Simulate authentication and retrieve token (replace this with your actual authentication process)
    await this.authenticate();
  },
  methods: {
    async authenticate() {
      try {
        // Simulated authentication logic (replace this with your actual authentication process)
        const response = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ email: 'your_email@example.com', password: 'your_password' }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        this.authToken = data.token;

        // Fetch users once authenticated
        await this.fetchUsers();
      } catch (error) {
        console.error('Authentication error:', error);
        // Handle authentication error
      }
    },
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error while fetching users
      }
    }
  }
};
</script>

<style>
/* Your CSS styles */
</style> -->





<!-- <template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user._id">
        <div>Name: {{ user.name }}</div>
        <div>Email: {{ user.email }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      authToken: '' // Initialize the authToken property
    };
  },
  async mounted() {
    // Simulate authentication and retrieve token (replace this with your actual authentication process)
    await this.authenticate();
  },
  methods: {
    async authenticate() {
      try {
        // Simulated authentication logic (replace this with your actual authentication process)
        const response = await fetch('http://your-authentication-endpoint', {
          method: 'POST',
          body: JSON.stringify({ email: 'your_email@example.com', password: 'your_password' }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        this.authToken = data.token;

        // Fetch users once authenticated
        await this.fetchUsers();
      } catch (error) {
        console.error('Authentication error:', error);
        // Handle authentication error
      }
    },
    async fetchUsers() {
      try {
        const response = await fetch('http://your-api-url/users', {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error while fetching users
      }
    }
  }
};
</script>

<style>
/* Your CSS styles */
</style> -->
