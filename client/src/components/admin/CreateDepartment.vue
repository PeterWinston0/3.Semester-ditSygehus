<template>
  <div>
    <h1>Create Department</h1>
    <form @submit.prevent="createDepartment">
      <div>
        <label for="departmentName">Department Name:</label>
        <input type="text" id="departmentName" v-model="newDepartment.name" required />
      </div>

      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDepartment: {
        name: '',
      },
      hospitalId: this.$route.params.hospitalId, // Ensure the hospitalId is available in the route
    };
  },
  methods: {
    async createDepartment() {
      try {
        const response = await fetch(`http://localhost:3000/api/hospitals/${this.hospitalId}/departments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newDepartment),
        });

        if (!response.ok) {
          throw new Error('Error creating department');
        }

        // Redirect to hospital details page after successful department creation
        this.$router.push({ name: 'DetailsHospital', params: { id: this.hospitalId } });
      } catch (error) {
        console.error('Error creating department:', error);
      }
    },
  },
};
</script>

<style>
/* Your styles here */
</style>
