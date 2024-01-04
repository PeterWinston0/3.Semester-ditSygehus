<template>
  <div class="section-details">
    <div v-if="section" class="section-info">
      <h2>{{ section.name }}</h2>
      <p>Section ID: {{ section._id }}</p>

      <div>
        <h3 v-if="isContactSection(section.name)">Contact Information</h3>
        <p>{{ section.contactName }}</p>
        <p>{{ section.description }}</p>
        <p>{{ section.phoneNumber }}</p>
      </div>

      <div v-if="section.numberOfEmployees">
        <h3>About the Section</h3>
        <p>Number of Employees: {{ section.numberOfEmployees }}</p>
      </div>

      <button @click="deleteSection(section._id)" class="btn btn-danger">
        Delete Section
      </button>
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

      fetch(
        `http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.departmentId}/sections/${this.sectionId}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.section = data;
        })
        .catch((error) => {
          console.error("Error fetching section details:", error);
        });
    },
    isContactSection(sectionName) {
      // Replace "Contact" with the specific name of the contact section
      return sectionName === "Contact";
    },
    deleteSection(sectionId) {
      // Confirm deletion
      if (confirm("Are you sure you want to delete this section?")) {
        // Make DELETE request to delete the section by ID
        fetch(
          `http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.departmentId}/sections/${sectionId}`,
          {
            method: "DELETE",
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // Optionally handle successful deletion (e.g., route navigation)
            this.$router.go(-1); // Go back to the previous page
          })
          .catch((error) => {
            console.error("Error deleting section:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
  .section-details {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }

  .section-info {
    background-color: #f5f5f5;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
    margin-top: 10px;
  }

  p {
    margin: 5px 0;
  }

  .loading {
    text-align: center;
    margin-top: 20px;
  }

  .btn {
    background-color: #d9534f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-danger {
    background-color: #d9534f;
  }

  .btn-danger:hover {
    background-color: #c9302c;
  }
</style>