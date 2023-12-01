<template>
  <div>
    <h1>Hospital Details</h1>
    <div v-if="hospital">
      <h2>{{ hospital.name }}</h2>
      <p>Address: {{ hospital.address }}</p>
      <p>Phone: {{ hospital.phone }}</p>
      <router-link :to="{ name: 'CreateDepartment', params: { hospitalId: hospital._id } }" class="btn btn-primary">Create Department</router-link>
      <button @click="deleteHospital(hospital._id)" class="btn btn-danger text-white rounded">Delete Hospital</button>

      <div v-if="hospital.departments.length > 0">
        <h3>Departments</h3>
        <ul>
          <li v-for="department in hospital.departments" :key="department._id">
            {{ department.name }}
            <router-link :to="{ name: 'DepartmentDetails', params: { departmentId: department._id, hospitalId: hospital._id } }" class="btn btn-sm btn-info">View Details</router-link>
            <button @click="deleteDepartment(department._id, hospital._id)" class="btn btn-sm btn-danger">Delete</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No departments found</p>
      </div>
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
            this.$router.push({ name: 'ListHospital' });
          })
          .catch(error => {
            console.error('Error deleting hospital:', error);
          });
      }
    },
    deleteDepartment(departmentId, hospitalId) {
      if (confirm('Are you sure you want to delete this department?')) {
        fetch(`http://localhost:3000/api/hospitals/${hospitalId}/departments/${departmentId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
            this.fetchHospitalDetails();
          })
          .catch(error => {
            console.error('Error deleting department:', error);
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
      
      <router-link :to="{ name: 'CreateDepartment', params: { hospitalId: hospital._id } }" class="btn btn-primary">Create Department</router-link>
      
      <button @click="deleteHospital(hospital._id)" class="btn btn-danger text-white rounded">Delete Hospital</button>

      <div v-if="hospital.departments.length > 0">
        <h3>Departments</h3>
        <ul>
          <li v-for="department in hospital.departments" :key="department._id">
            {{ department.name }}
            <router-link :to="{ name: 'DepartmentDetails', params: { departmentId: department._id, hospitalId: hospital._id } }" class="btn btn-sm btn-info">View Details</router-link>
            <button @click="deleteDepartment(hospital._id, department._id)" class="btn btn-sm btn-danger">Delete</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No departments found</p>
      </div>
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
    deleteDepartment(hospitalId, departmentId) {
      if (confirm('Are you sure you want to delete this department?')) {
        fetch(`http://localhost:3000/api/hospitals/${hospitalId}/departments/${departmentId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
            }
            // Refresh the hospital details after department deletion
            this.fetchHospitalDetails();
          })
          .catch(error => {
            console.error('Error deleting department:', error);
            if (error.response) {
              console.error('Error response:', error.response);
            }
          });
      }
    },
  },
};
</script>

<style>
/* Your styles here */
</style> -->