<template>
  <div class="admin-queue-management-container">
    <h1>Admin Queue Management</h1>
    <div class="select-hospital">
      <select v-model="selectedHospital" @change="fetchQueue" class="hospital-select">
        <option disabled value="">Select a Hospital</option>
        <option
          v-for="hospital in hospitals"
          :value="hospital._id"
          :key="hospital._id"
        >
          {{ hospital.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedHospital" class="queue-info">
      <h2>Queue for {{ selectedHospitalName }}</h2>
      <ul>
        <li v-for="item in queueInfo" :key="item.queueNumber" class="queue-item">
          <div class="patient-info">
            <span>Patient SSN: {{ item.patientSSN }}</span>
            <span>Queue Number: {{ item.queueNumber }}</span>
            <span>Estimated Wait Time: {{ item.estimatedWaitTime }} minutes</span>
          </div>
          <button @click="removePatientFromQueue(item.queueNumber)" class="remove-button">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>






<!-- <template>
  <div>
    <h1>Admin Queue Management</h1>
    <select v-model="selectedHospital" @change="fetchQueue">
      <option disabled value="">Select a Hospital</option>
      <option
        v-for="hospital in hospitals"
        :value="hospital._id"
        :key="hospital._id"
      >
        {{ hospital.name }}
      </option>
    </select>

    <div v-if="selectedHospital">
      <h2>Queue for {{ selectedHospitalName }}</h2>
      <ul>
        <li v-for="item in queueInfo" :key="item.queueNumber">
          Patient SSN: {{ item.patientSSN }}, Queue Number:
          {{ item.queueNumber }}, Estimated Wait Time:
          {{ item.estimatedWaitTime }} minutes
          <button @click="removePatientFromQueue(item.queueNumber)">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template> -->

<script>
export default {
  data() {
    return {
      hospitals: [],
      selectedHospital: "",
      queueInfo: [],
    };
  },
  computed: {
    selectedHospitalName() {
      const hospital = this.hospitals.find(
        (h) => h._id === this.selectedHospital
      );
      return hospital ? hospital.name : "";
    },
  },
  methods: {
    async fetchHospitals() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/waitingroom/hospitals`
        );
        if (response.ok) {
          this.hospitals = await response.json();
        } else {
          console.error("Error fetching hospitals.");
        }
      } catch (error) {
        console.error("Network error.", error);
      }
    },
    async fetchQueue() {
      if (!this.selectedHospital) return;

      try {
        const response = await fetch(
          `http://localhost:3000/api/waitingroom/queue-info/${this.selectedHospital}`
        );
        if (response.ok) {
          this.queueInfo = await response.json();
        } else {
          console.error("Error fetching queue info.");
        }
      } catch (error) {
        console.error("Network error.", error);
      }
    },
    async removePatientFromQueue(queueNumber) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/waitingroom/queue/${queueNumber}`,
          { method: "DELETE" }
        );
        if (response.ok) {
          // Refresh the queue list
          await this.fetchQueue();
        } else {
          const errorResponse = await response.json();
          console.error("Error removing patient from queue:", errorResponse);
        }
      } catch (error) {
        console.error("Network error.", error);
      }
    },
  },
  created() {
    this.fetchHospitals();
  },
};
</script>

<style scoped>
.admin-queue-management-container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.select-hospital {
  margin-bottom: 20px;
}

.hospital-select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.queue-info {
  text-align: left;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.queue-item {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.patient-info {
  flex: 1;
}

.remove-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #d9534f;
}
</style>