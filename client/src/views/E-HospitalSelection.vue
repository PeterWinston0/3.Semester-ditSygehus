<template>
  <div>
    <h1>Select Hospital</h1>
    <ul>
      <li v-for="hospital in hospitals" :key="hospital._id">
        <button @click="selectHospital(hospital._id)">
          {{ hospital.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hospitals: [], // Populate this array with hospital data from MongoDB
    };
  },
  methods: {
    async selectHospital(hospitalId) {
      try {
        const response = await this.sendRequest(
          `http://localhost:3000/api/waitingroom/save-hospital`,
          "POST",
          { hospitalId }
        );

        if (response.ok) {
          // Successfully saved the selected hospital's ID in the session
          await this.saveSelectedHospital(hospitalId);

          // Now navigate to the waiting room
          this.$router.push("/user/e-patientinfo");
        } else {
          const errorText = await response.text();
          console.error("Server Error:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async saveSelectedHospital(hospitalId) {
      try {
        const response = await this.sendRequest(
          `http://localhost:3000/api/waitingroom/save-hospital`,
          "POST",
          { hospitalId }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to save selected hospital:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async fetchHospitals() {
      try {
        const response = await this.sendRequest(
          `http://localhost:3000/api/hospitals`,
          "GET"
        );

        if (response.ok) {
          this.hospitals = await response.json();
        } else {
          const errorText = await response.text();
          console.error("Server Response:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async sendRequest(url, method, data = null) {
      const headers = {
        "Content-Type": "application/json",
      };

      const options = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
      };

      return await fetch(url, options);
    },
  },
  async created() {
    this.fetchHospitals();
  },
};
</script>












<!-- <template>
  <div>
    <h1>Select Hospital</h1>
    <ul>
      <li v-for="hospital in hospitals" :key="hospital._id">
        <button @click="selectHospital(hospital._id)">
          {{ hospital.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hospitals: [], // Populate this array with hospital data from MongoDB
    };
  },
  methods: {
    async selectHospital(hospitalId) {
      try {
        // Get the hospital data by its ID (you might want to fetch this first)
        const selectedHospital = this.hospitals.find(hospital => hospital._id === hospitalId);

        if (!selectedHospital) {
          console.error("Selected hospital not found");
          return;
        }

        const { name, address } = selectedHospital; // Extract the name and address

        const response = await this.sendRequest(
          `http://localhost:3000/api/hospitals`,
          "POST",
          { name, address } // Include the name and address in the request payload
        );

        if (response.ok) {
          // Successfully saved the selected hospital's ID in the session
          await this.saveSelectedHospital(hospitalId);

          // Now navigate to the waiting room
          this.$router.push("/e-waitingroom");
        } else {
          const errorText = await response.text();
          console.error("Server Error:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async saveSelectedHospital(hospitalId) {
      try {
        const response = await this.sendRequest(
          `http://localhost:3000/api/waitingroom/save-hospital`,
          "POST",
          { hospitalId }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to save selected hospital:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async fetchHospitals() {
      try {
        const response = await this.sendRequest(
          `http://localhost:3000/api/hospitals`,
          "GET"
        );

        if (response.ok) {
          this.hospitals = await response.json();
        } else {
          const errorText = await response.text();
          console.error("Server Response:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async sendRequest(url, method, data = null) {
      const headers = {
        "Content-Type": "application/json",
      };

      const options = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
      };

      return await fetch(url, options);
    },
  },
  async created() {
    this.fetchHospitals();
  },
};
</script> -->








<!-- <template>
  <div>
    <h1>Select Hospital</h1>
    <ul>
      <li v-for="hospital in hospitals" :key="hospital._id">
        <button @click="selectHospital(hospital._id)">
          {{ hospital.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hospitals: [], // Populate this array with hospital data from MongoDB
    };
  },
  methods: {
    async selectHospital(hospitalId) {
      try {
        const response = await this.sendRequest(
          `http://localhost:3000/api/hospitals`,
          "POST",
          { hospitalId }
        );

        if (response.ok) {
          // Successfully saved the selected hospital's ID in the session
          await this.saveSelectedHospital(hospitalId);

          // Now navigate to the waiting room
          this.$router.push("/e-waitingroom");
        } else {
          const errorText = await response.text();
          console.error("Server Error:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async saveSelectedHospital(hospitalId) {
      try {
        const response = await this.sendRequest(
          `http://localhost:3000/api/waitingroom/save-hospital`,
          "POST",
          { hospitalId }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to save selected hospital:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async fetchHospitals() {
      try {
        const response = await this.sendRequest(
          `http://localhost:3000/api/hospitals`,
          "GET"
        );

        if (response.ok) {
          this.hospitals = await response.json();
        } else {
          const errorText = await response.text();
          console.error("Server Response:", errorText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async sendRequest(url, method, data = null) {
      const headers = {
        "Content-Type": "application/json",
      };

      const options = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
      };

      return await fetch(url, options);
    },
  },
  async created() {
    this.fetchHospitals();
  },
};
</script> -->