<template>
  <div class="hospital-selection">
    <h1>Vælg Hospital</h1>
    <ul class="list-group">
      <li
        v-for="hospital in hospitals"
        :key="hospital._id"
        class="list-group-item">
        <div class="row align-items-center">
          <div class="col-sm-5">
            <router-link
              :to="{ name: 'department', params: { id: hospital._id } }"
              class="text-decoration-none hospital-link"
              >{{ hospital.name }}</router-link
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>




<!-- <template>
  <div>
    <h1>Vælg Hospital</h1>
    <ul class="list-group">
      <li
        v-for="hospital in hospitals"
        :key="hospital._id"
        class="list-group-item">
        <div class="row align-items-center">
          <div class="col-sm-5">
            <router-link
              :to="{ name: 'department', params: { id: hospital._id } }"
              class="text-decoration-none"
              >{{ hospital.name }}</router-link
            >
          </div>
        </div>
      </li>
    </ul>
  </div>
</template> -->

<script>
export default {
  data() {
    return {
      hospitals: [],
    };
  },
  mounted() {
    this.fetchHospitals();
  },
  methods: {
    fetchHospitals() {
      fetch("http://localhost:3000/api/hospitals")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.hospitals = data;
        })
        .catch((error) => {
          console.error("Error fetching hospitals:", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.hospital-selection {
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.list-group {
  list-style: none;
  padding: 0;
}

.list-group-item {
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.list-group-item:hover {
  background-color: #f0f0f0;
}

.row {
  display: flex;
  align-items: center;
}

.col-sm-5 {
  flex: 0 0 50%;
  max-width: 50%;
  text-align: left;
}

.hospital-link {
  color: #007BFF;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.hospital-link:hover {
  color: #0056b3;
}
</style>
