<template>
  <div>
    <h1>Add Hospital</h1>
    <form @submit.prevent="addHospital">
      <input type="text" v-model="name" placeholder="Hospital Name" required>
      <input type="text" v-model="address" placeholder="Hospital Address" required>
      <!-- Other fields -->
      <button type="submit">Add Hospital</button>
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
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error adding hospital:', error);
        });
    },
  },
};
</script>