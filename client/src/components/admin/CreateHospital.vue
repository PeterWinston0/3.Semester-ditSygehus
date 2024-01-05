<template>
  <div class="add-hospital-container">
    <h1>Add Hospital</h1>
    <form @submit.prevent="addHospital" class="hospital-form">
      <div class="form-group">
        <label for="name">Hospital Name:</label>
        <input type="text" id="name" v-model="name" class="form-control" placeholder="Hospital Name" required>
      </div>
      <div class="form-group">
        <label for="address">Hospital Address:</label>
        <input type="text" id="address" v-model="address" class="form-control" placeholder="Hospital Address" required>
      </div>
      <!-- Add more fields with labels if needed -->
      <button type="submit" class="btn btn-primary">Add Hospital</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      address: '',
      // Other fields
    };
  },
  methods: {
    addHospital() {
      const newHospital = {
        name: this.name,
        address: this.address,
        // Other fields
      };

      fetch('http://localhost:3000/api/hospitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHospital),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Redirect or handle success as needed
          // For example, redirect to hospital list
          this.$router.push('/admin/listhospital');
        })
        .catch(error => {
          console.error('Error adding hospital:', error);
        });
    },
  },
};
</script>

<style scoped>
.add-hospital-container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.hospital-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>