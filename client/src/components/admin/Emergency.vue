<template>
    <div>
      <h1>Admin Queue Management</h1>
      <select v-model="selectedHospital" @change="fetchQueue">
        <option disabled value="">Select a Hospital</option>
        <option v-for="hospital in hospitals" :value="hospital._id" :key="hospital._id">
          {{ hospital.name }}
        </option>
      </select>
  
      <div v-if="selectedHospital">
        <h2>Queue for {{ selectedHospitalName }}</h2>
        <ul>
          <li v-for="(item, index) in queueInfo" :key="index">
            Patient Name: {{ item.patientName }}, Queue Number: {{ item.queueNumber }},
            Estimated Wait Time: {{ item.estimatedWaitTime }} minutes
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hospitals: [],
        selectedHospital: '',
        queueInfo: []
      };
    },
    computed: {
      selectedHospitalName() {
        const hospital = this.hospitals.find(h => h._id === this.selectedHospital);
        return hospital ? hospital.name : '';
      }
    },
    methods: {
      async fetchHospitals() {
        try {
          const response = await fetch(`http://localhost:3000/api/waitingroom/hospitals`);
          if (response.ok) {
            this.hospitals = await response.json();
          } else {
            console.error("Error fetching hospitals.");
          }
        } catch (error) {
          console.error("Network error.");
        }
      },
      async fetchQueue() {
        if (!this.selectedHospital) return;
  
        try {
          const response = await fetch(`http://localhost:3000/api/waitingroom/queue-info/${this.selectedHospital}`);
          if (response.ok) {
            this.queueInfo = await response.json();
          } else {
            console.error("Error fetching queue info.");
          }
        } catch (error) {
          console.error("Network error.");
        }
      }
    },
    created() {
      this.fetchHospitals();
    }
  };
  </script>
  