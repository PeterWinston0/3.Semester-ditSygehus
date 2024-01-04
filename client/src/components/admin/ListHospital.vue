<template>
  <div class="hospital-list-container">
    <h1>Hospital List</h1>
    <ul class="list-group">
      <li v-for="hospital in hospitals" :key="hospital._id" class="list-group-item">
        <div class="row align-items-center">
          <div class="col-sm-8">
            <router-link :to="{ name: 'DetailsHospital', params: { id: hospital._id }}" class="hospital-link">{{ hospital.name }}</router-link>
          </div>
          <div class="col-sm-4 d-flex justify-content-end">
            <button @click="deleteHospital(hospital._id)" class="btn btn-danger delete-btn">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>



<!-- <template>
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
  </template> -->
  
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
  
  <style scoped>
  .hospital-list-container {
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .list-group {
    list-style-type: none;
    padding: 0;
  }
  
  .list-group-item {
    background-color: #f5f5f5;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  .row {
    align-items: center;
  }
  
  .col-sm-8 {
    font-size: 18px;
  }
  
  .hospital-link {
    text-decoration: none;
    color: #3498db;
    transition: color 0.3s ease;
  }
  
  .hospital-link:hover {
    color: #2980b9;
  }
  
  .col-sm-4 {
    text-align: right;
  }
  
  .delete-btn {
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  .delete-btn:hover {
    background-color: #d9534f;
  }
  </style>