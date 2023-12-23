<template>
  <div>
    <h1>Hospital Details</h1>
    <div v-if="hospital">
      <h2>{{ hospital.name }}</h2>
      <p>Address: {{ hospital.address }}</p>
      <p>Phone: {{ hospital.phone }}</p>

      <div v-if="hospital.departments.length > 0">
        <h3>Departments</h3>
        <ul>
          <li v-for="department in hospital.departments" :key="department._id">
            {{ department.name }}
            <router-link
              :to="{
                name: 'sections',
                params: {
                  departmentId: department._id,
                  hospitalId: hospital._id,
                },
              }"
              class="btn btn-sm btn-info"
              >View Details</router-link
            >
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No departments found</p>
      </div>
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
      hospital: null,
    };
  },
  created() {
    this.fetchHospitalDetails();
  },
  methods: {
    fetchHospitalDetails() {
      const hospitalId = this.$route.params.id;
      fetch(`http://localhost:3000/api/hospitals/${hospitalId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.hospital = data;
        })
        .catch((error) => {
          console.error("Error fetching hospital details:", error);
        });
    },
  },
};
</script>

<style>
/* Your styles here */
</style>