<template>
  <div>
    <div v-if="step === 1">
      <h1>Enter Social Security Number</h1>
      <input v-model="patientData.ssn" type="text" placeholder="Social Security Number" />
      <button @click="nextStep">Next</button>
    </div>

    <div v-else-if="step === 2">
      <h1>Select Hospital</h1>
      <ul>
        <li v-for="hospital in hospitals" :key="hospital._id">
          <button @click="() => selectHospital(hospital._id)">{{ hospital.name }}</button>
        </li>
      </ul>
    </div>

    <div v-else-if="step === 3">
      <h1>Enter Patient Information</h1>
      <input v-model="patientData.phoneNumber" type="text" placeholder="Phone Number" />
      <textarea v-model="patientData.description" placeholder="Description"></textarea>
      <button @click="submitPatientInfo">Submit</button>
    </div>

    <div v-else-if="step === 4">
      <h1>Waiting Room</h1>
      <p>Your queue number is: {{ queueNumber }}</p>
      <p>Estimated wait time: {{ estimatedWaitTime }} minutes</p>
    </div>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      step: 1,
      hospitals: [],
      queueNumber: '',
      estimatedWaitTime: 0,
      errorMessage: ''
    };
  },
  computed: {
    ...mapGetters(['patientData']),
  },
  methods: {
    ...mapActions(['updatePatientData']),

    async nextStep() {
      if (this.step === 1 && this.patientData.ssn) {
        await this.fetchHospitals();
        this.step = 2;
      } else if (this.step === 3) {
        await this.submitPatientInfo();
      }
    },

    async fetchHospitals() {
      try {
        const response = await fetch(`http://localhost:3000/api/waitingroom/hospitals`);
        if (response.ok) {
          this.hospitals = await response.json();
        } else {
          this.errorMessage = "Error fetching hospitals.";
        }
      } catch (error) {
        this.errorMessage = "Network error.";
      }
    },

    selectHospital(hospitalId) {
      this.updatePatientData({ hospitalId });
      this.step = 3;
    },

    async submitPatientInfo() {
      if (!this.patientData.hospitalId) {
        this.errorMessage = "Please select a hospital.";
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/waitingroom/patients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.patientData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          this.errorMessage = `Error submitting patient info: ${errorText}`;
        } else {
          const result = await response.json();
          this.queueNumber = result.queueNumber;
          this.estimatedWaitTime = result.estimatedWaitTime;
          this.step = 4;
        }
      } catch (error) {
        this.errorMessage = `Network error: ${error.message}`;
      }
    }
  },
  created() {
    this.fetchHospitals();
  }
};
</script>