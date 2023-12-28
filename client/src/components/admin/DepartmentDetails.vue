<template>
  <div>
    <h1>Department Details</h1>
    <div v-if="department">
      <h2>{{ department.name }}</h2>
      <p>Department ID: {{ department._id }}</p>
      <button
        @click="deleteDepartment(department._id, hospitalId)"
        class="btn btn-danger text-white rounded"
      >
        Delete Department
      </button>
      <router-link
        :to="{
          name: 'CreateSection',
          params: { departmentId: department._id, hospitalId: hospitalId },
        }"
        class="btn btn-primary"
      >
        Create Section
      </router-link>
      <h3>Sections:</h3>
      <ul v-if="department.sections.length > 0">
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
/* Your styles here */
</style>









<!-- <template>
  <div>
    <h1>Department Details</h1>
    <div v-if="department">
      <h2>{{ department.name }}</h2>
      <p>Department ID: {{ department._id }}</p>
      <button
        @click="deleteDepartment(department._id, hospitalId)"
        class="btn btn-danger text-white rounded"
      >
        Delete Department
      </button>
      <router-link
        :to="{
          name: 'CreateSection',
          params: { departmentId: department._id, hospitalId: hospitalId },
        }"
        class="btn btn-primary"
        >Create Section</router-link
      >
      <h3>Sections:</h3>
      <ul v-if="department.sections.length > 0">
        <li v-for="section in department.sections" :key="section._id">
          <router-link
            :to="{
              name: 'SectionDetails',
              params: { hospitalId, departmentId, sectionId: section._id },
            }"
            >{{ section.name }}</router-link
          >
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
    };
  },
  created() {
    this.fetchDepartmentDetails();
  },
  methods: {
    fetchDepartmentDetails() {
      const departmentId = this.$route.params.departmentId;
      this.hospitalId = this.$route.params.hospitalId;

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
            // After successful deletion, redirect the user to the section details page
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
/* Your styles here */
</style> -->