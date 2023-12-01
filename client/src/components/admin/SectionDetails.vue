<template>
  <div>
    <h1>Section Details</h1>
    <div v-if="section">
      <h2>{{ section.name }}</h2>
      <p>Section ID: {{ section._id }}</p>

      <!-- Button to edit section -->
      <!-- <router-link :to="{ name: 'EditSection', params: { hospitalId, departmentId, sectionId: section._id } }" class="btn btn-primary">Edit Section</router-link> -->
      <!-- Button to delete section -->
      <button @click="deleteSection(section._id)" class="btn btn-danger">Delete Section</button>
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
    deleteSection(sectionId) {
      // Confirm deletion
      if (confirm('Are you sure you want to delete this section?')) {
        // Make DELETE request to delete the section by ID
        fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.departmentId}/sections/${sectionId}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Optionally handle successful deletion (e.g., route navigation)
          })
          .catch(error => {
            console.error('Error deleting section:', error);
          });
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>

