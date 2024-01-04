<template>
  <div class="hospital-details">
    <h1>Hospital Detaljer</h1>
    <div v-if="hospital" class="hospital-info">
      <h2>{{ hospital.name }}</h2>
      <p class="hospital-address">Address: {{ hospital.address }}</p>
      <p class="hospital-phone">Phone: {{ hospital.phone }}</p>
      <router-link :to="{ name: 'CreateDepartment', params: { hospitalId: hospital._id } }" class="btn btn-primary create-department">Create Department</router-link>
      <button @click="deleteHospital(hospital._id)" class="btn btn-danger delete-hospital">Delete Hospital</button>

      <div v-if="hospital.departments.length > 0" class="departments">
        <h3>Afdelinger</h3>
        <ul>
          <!-- Use router-link to make department names clickable links -->
          <li v-for="department in hospital.departments" :key="department._id">
            <div class="department-item">
              <router-link :to="{ name: 'DepartmentDetails', params: { departmentId: department._id, hospitalId: hospital._id } }" class="department-link">
                {{ department.name }}
              </router-link>
              <button @click="deleteDepartment(department._id, hospital._id)" class="btn btn-sm btn-danger delete-department">Delete</button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="no-departments">
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
.department-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

/* Hospital Details Container */
.hospital-details {
  margin: 20px;
}

/* Hospital Info Section */
.hospital-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
}

/* Hospital Address and Phone */
.hospital-address,
.hospital-phone {
  margin: 5px 0;
}

/* Create Department Button */
.create-department {
  margin-right: 10px;
}

/* Departments Section */
.departments {
  margin-top: 20px;
}

/* Department Item */
.department-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

/* Department Link */
.department-link {
  flex-grow: 1;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

/* Delete Department Button */
.delete-department {
  margin-left: 10px;
  background-color: #ff6961; /* Red color for delete button */
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-department:hover {
  background-color: #d9534f; /* Darker red color on hover */
}

/* No Departments Message */
.no-departments {
  margin-top: 20px;
  font-style: italic;
  color: #888;
}
</style>