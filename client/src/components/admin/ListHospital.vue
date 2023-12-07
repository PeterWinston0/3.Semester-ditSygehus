<template>
    <div>
      <h1>Hospital List</h1>
      <ul class="list-group">
        <li v-for="hospital in hospitals" :key="hospital._id" class="list-group-item">
          <div class="row align-items-center">
            <div class="col-sm-5">
              <router-link :to="{ name: 'DetailsHospital', params: { id: hospital._id }}" class="text-decoration-none">{{ hospital.name }}</router-link>
            </div>
            <div class="col-sm-2 d-flex justify-content-end">
              <button @click="deleteHospital(hospital._id)" class="btn btn-danger text-white rounded">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hospitals: [],
      };
    },
    mounted() {
      this.fetchHospitals();
    },
    methods: {
      fetchHospitals() {
        fetch('http://localhost:3000/api/hospitals')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            this.hospitals = data;
          })
          .catch(error => {
            console.error('Error fetching hospitals:', error);
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
              // Remove the deleted hospital from the list
              this.hospitals = this.hospitals.filter(hospital => hospital._id !== id);
            })
            .catch(error => {
              console.error('Error deleting hospital:', error);
            });
        }
      },
    },
  };
  </script>
  
  <style lang="css" scoped>
  /* Your styles here */
  </style>