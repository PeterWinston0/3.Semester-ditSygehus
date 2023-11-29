<template>
    <div>
      <h1>Hospital Details</h1>
      <div v-if="hospital">
        <h2>{{ hospital.name }}</h2>
        <p>Address: {{ hospital.address }}</p>
        <p>Phone: {{ hospital.phone }}</p>
        <!-- Add more details as needed -->
        <button @click="deleteHospital(hospital._id)" class="btn btn-danger text-white rounded">Delete Hospital</button>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hospital: null,
      };
    },
    created() {
      this.fetchHospitalDetails();
    },
    methods: {
      fetchHospitalDetails() {
        const hospitalId = this.$route.params.id;
        fetch(`http://localhost:3000/api/hospitals/${hospitalId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            this.hospital = data;
          })
          .catch(error => {
            console.error('Error fetching hospital details:', error);
          });
      },
      deleteHospital(id) {
        if (confirm('Are you sure you want to delete this hospital?')) {
          fetch(`http://localhost:3000/api/hospitals/${id}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(() => {
              // After successful deletion, redirect the user to the hospital list page
              this.$router.push({ name: 'ListHospital' });
            })
            .catch(error => {
              console.error('Error deleting hospital:', error);
            });
        }
      },
    },
  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
  



<!-- <template>
    <div>
      <h1>Hospital Details</h1>
      <div v-if="hospital">
        <h2>{{ hospital.name }}</h2>
        <p>Address: {{ hospital.address }}</p>
        <p>Phone: {{ hospital.phone }}</p>
        
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hospital: null,
      };
    },
    created() {
      this.fetchHospitalDetails();
    },
    methods: {
      fetchHospitalDetails() {
        const hospitalId = this.$route.params.id;
        fetch(`http://localhost:3000/api/hospitals/${hospitalId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            this.hospital = data;
          })
          .catch(error => {
            console.error('Error fetching hospital details:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
   -->