<template>
  <div>
    <h1>Department Details</h1>
    <div v-if="department">
      <h2>{{ department.name }}</h2>
      <h3>Sections:</h3>
      <ul v-if="department.sections.length > 0">
        <li v-for="section in department.sections" :key="section._id">
          <router-link
            :to="{
              name: 'SectionInfo',
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
  },
};
</script>

<style>
/* Your styles here */
</style>