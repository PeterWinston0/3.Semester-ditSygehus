<template>
    <div>
      <h1>Create Section</h1>
      <form @submit.prevent="createSection">
        <div class="form-group">
          <label for="sectionName">Section Name:</label>
          <input type="text" id="sectionName" v-model="sectionName" class="form-control" required />
        </div>
        <!-- Add more fields as needed -->
        <button type="submit" class="btn btn-primary">Create Section</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sectionName: '',
        // Add more section details here as needed
        departmentId: null, // Assign departmentId value when component is mounted
        hospitalId: null, // Assign hospitalId value when component is mounted
      };
    },
    mounted() {
      // Retrieve departmentId and hospitalId from route params
      this.departmentId = this.$route.params.departmentId;
      this.hospitalId = this.$route.params.hospitalId;
    },
    methods: {
      createSection() {
        const newSection = {
          name: this.sectionName,
          // Add more section details as needed
        };
  
        fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${this.departmentId}/sections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSection),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Redirect to department details page after successful creation
            this.$router.push({ name: 'DepartmentDetails', params: { hospitalId: this.hospitalId, departmentId: this.departmentId } });
          })
          .catch(error => {
            console.error('Error creating section:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  /* Your styles here */
  </style>
  