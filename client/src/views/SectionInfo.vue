<template>
  <div class="section-details">
    <div v-if="section" class="section-info">
      <h2>{{ section.name }}</h2>
      <p>Section ID: {{ section._id }}</p>

      <!-- Display additional section data -->
      <div class="additional-info">
        <h3 v-if="$route.name === 'Contact'" class="info-heading">Contact Information</h3>
        <p>{{ section.contactName }}</p>
        <p>{{ section.description }}</p>
        <p>{{ section.phoneNumber }}</p>
      </div>

      <!-- Add more sections for displaying other data, if needed -->
    </div>
    <div v-else class="loading">
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

<style scoped>
.section-details {
  padding: 20px;
}

.section-info {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  margin: 5px 0;
}

.additional-info {
  margin-top: 20px;
}

.info-heading {
  font-size: 20px;
  margin-bottom: 10px;
}

.loading {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
</style>