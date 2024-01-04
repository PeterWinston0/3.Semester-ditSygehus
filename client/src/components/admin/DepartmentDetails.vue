<template>
  <div class="department-details">
    <h1>Department Details</h1>
    <div v-if="department" class="department-info">
      <h2>{{ department.name }}</h2>
      <p>Department ID: {{ department._id }}</p>
      <div class="button-container">
        <router-link
          :to="{
            name: 'CreateSection',
            params: { departmentId: department._id, hospitalId: hospitalId },
          }"
          class="btn btn-primary"
        >
          Tilføj Modul
        </router-link>
        <button
          @click="deleteDepartment(department._id, hospitalId)"
          class="btn btn-danger rounded"
        >
          Slet Afdeling
        </button>
      </div>
      <h3>Moduler:</h3>
      <ul v-if="department.sections.length > 0" class="section-list">
        <li v-for="section in department.sections" :key="section._id">
          <router-link
            :to="{
              name: 'SectionDetails',
              params: {
                hospitalId,
                departmentId: department._id,
                sectionId: section._id,
              },
            }"
          >
            {{ section.name }}
          </router-link>
        </li>
      </ul>
      <p v-else>No sections available.</p>
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
      department: null,
      hospitalId: null,
      departmentId: null,
    };
  },
  created() {
    this.fetchDepartmentDetails();
  },
  methods: {
    fetchDepartmentDetails() {
      const departmentId = this.$route.params.departmentId;
      this.hospitalId = this.$route.params.hospitalId;
      this.departmentId = departmentId;

      fetch(
        `http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${departmentId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.department = data;
        })
        .catch((error) => {
          console.error("Error fetching department details:", error);
        });
    },
    deleteDepartment(departmentId, hospitalId) {
      if (confirm("Are you sure you want to delete this department?")) {
        fetch(
          `http://localhost:3000/api/hospitals/${hospitalId}/departments/${departmentId}`,
          {
            method: "DELETE",
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            this.$router
              .push({ name: "DetailsHospital", params: { id: hospitalId } })
              .catch((err) => {
                console.error("Error redirecting:", err);
              });
          })
          .catch((error) => {
            console.error("Error deleting department:", error);
          });
      }
    },
  },
};
</script>

<style>
.department-details {
  padding: 20px;
}

.department-info {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-danger {
  background-color: #e74c3c;
  color: #fff;
}

.btn-primary {
  background-color: #3498db;
  color: #fff;
}

.btn:hover {
  background-color: #d9534f;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.section-list {
  list-style-type: none;
  padding-left: 0;
}

.section-list li {
  margin-bottom: 10px;
}
</style>
