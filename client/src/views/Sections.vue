<template>
  <div class="department-details">
    <h1>Department Details</h1>
    <div v-if="department">
      <h2>{{ department.name }}</h2>
      <h3>Sections:</h3>
      <ul v-if="department.sections.length > 0" class="section-list">
        <li
          v-for="section in department.sections"
          :key="section._id"
          class="section-item"
        >
          <router-link
            :to="{
              name: 'sectioninfo',
              params: {
                hospitalId: $route.params.hospitalId,
                departmentId: $route.params.departmentId,
                sectionId: section._id,
              },
            }"
            class="section-link"
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

<style scoped>
.department-details {
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

h3 {
  font-size: 18px;
  margin-top: 20px;
}

.section-list {
  list-style: none;
  padding: 0;
}

.section-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px 0;
}

.section-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.section-link:hover {
  color: #0056b3;
}

p {
  margin: 10px 0;
}
</style>
