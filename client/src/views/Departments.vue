<template>
  <div class="hospital-details">
    <h1>Sygehus Detaljer</h1>
    <div v-if="hospital">
      <div class="hospital-info">
        <h2>{{ hospital.name }}</h2>
        <p>Address: {{ hospital.address }}</p>
        <p>Phone: {{ hospital.phone }}</p>
      </div>

      <div v-if="hospital.departments.length > 0">
        <h3>Afdelinger</h3>
        <ul class="department-list">
          <li
            v-for="department in hospital.departments"
            :key="department._id"
            class="department-item"
          >
            <router-link
              :to="{
                name: 'sections',
                params: {
                  departmentId: department._id,
                  hospitalId: hospital._id,
                },
              }"
              class="department-link"
              >{{ department.name }}</router-link
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

<style scoped>
/* .hospital-details */
.hospital-details {
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
}

/* h1 */
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* .hospital-info */
.hospital-info {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
}

/* .hospital-info h2 */
.hospital-info h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

/* .hospital-info p */
.hospital-info p {
  margin: 5px 0;
}

/* .department-list */
.department-list {
  list-style: none;
  padding: 0;
}

/* .department-item */
.department-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* .view-details-btn */
.department-item .view-details-btn {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

/* .view-details-btn:hover */
.department-item .view-details-btn:hover {
  background-color: #0056b3;
}

/* p */
p {
  margin: 10px 0;
}
</style>
