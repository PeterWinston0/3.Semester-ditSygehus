<template>
  <div>
    <h1>Section Details</h1>
    <div v-if="section">
      <h2>{{ section.name }}</h2>
      <p>Section ID: {{ section._id }}</p>
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
      section: null,
      sectionId: null,
      departmentId: null,
      hospitalId: null,
    };
  },
  created() {
    this.fetchSectionDetails();
  },
  methods: {
    fetchSectionDetails() {
      // Fetch section details based on route parameters
      this.hospitalId = this.$route.params.hospitalId;
      this.departmentId = this.$route.params.departmentId;
      this.sectionId = this.$route.params.sectionId;

      fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.departmentId}/sections/${this.sectionId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.section = data;
        })
        .catch(error => {
          console.error('Error fetching section details:', error);
        });
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>

