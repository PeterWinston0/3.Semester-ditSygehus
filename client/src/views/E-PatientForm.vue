<template>
  <div class="registration-form">
    <div v-if="step === 2">
      <h1>Select Hospital</h1>
      <ul class="hospital-list">
        <li v-for="hospital in hospitals" :key="hospital._id">
          <button @click="() => selectHospital(hospital._id)" class="btn hospital-btn">{{ hospital.name }}</button>
        </li>
      </ul>
    </div>

    <div v-else-if="step === 3">
      <h1>Enter Patient Information</h1>
      <input v-model="patientData.phoneNumber" type="text" placeholder="Phone Number" class="input-field" />
      <textarea v-model="patientData.description" placeholder="Description" class="textarea-field"></textarea>
      <button @click="submitPatientInfo" class="btn">Submit</button>
    </div>

    <div v-else-if="step === 4">
      <h1>Waiting Room</h1>
      <p>Your queue number is: {{ queueNumber }}</p>
      <p>Estimated wait time: {{ estimatedWaitTime }} minutes</p>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      step: 2,
      hospitals: [],
      queueNumber: '',
      estimatedWaitTime: 0,
      errorMessage: ''
    };
  },
  computed: {
    ...mapGetters(['patientData', 'loggedInUser']),
  },
  methods: {
    ...mapActions(['updatePatientData']),

    async nextStep() {
      if (this.step === 2) {
        this.step = 3;
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

      const submissionData = {
        ...this.patientData,
        ssn: this.loggedInUser.ssn
      };

      try {
        const response = await fetch(`http://localhost:3000/api/waitingroom/patients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
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

<style>
/* Add your CSS here */
</style>





<!-- <template>
  <div class="registration-form">
    <div v-if="step === 2">
      <h1>Select Hospital</h1>
      <ul class="hospital-list">
        <li v-for="hospital in hospitals" :key="hospital._id">
          <button @click="() => selectHospital(hospital._id)" class="btn hospital-btn">{{ hospital.name }}</button>
        </li>
      </ul>
    </div>

    <div v-else-if="step === 3">
      <h1>Enter Patient Information</h1>
      <input v-model="patientData.phoneNumber" type="text" placeholder="Phone Number" class="input-field" />
      <textarea v-model="patientData.description" placeholder="Description" class="textarea-field"></textarea>
      <button @click="submitPatientInfo" class="btn">Submit</button>
    </div>

    <div v-else-if="step === 4">
      <h1>Waiting Room</h1>
      <p>Your queue number is: {{ queueNumber }}</p>
      <p>Estimated wait time: {{ estimatedWaitTime }} minutes</p>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      step: 2, // Start from step 2 since SSN is auto-filled
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
      if (this.step === 2) {
        this.step = 3;
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
    // Assume the logged-in user's SSN is available in patientData
    if (!this.patientData.ssn) {
      // If SSN is not available, show an error or redirect
      this.errorMessage = "User SSN not found.";
    }

    this.fetchHospitals();
  }
};
</script> -->





<!-- <template>
  <div class="registration-form">
    <div v-if="step === 1">
      <h1>Enter Social Security Number</h1>
      <input v-model="patientData.ssn" type="text" placeholder="Social Security Number" />
      <button @click="nextStep" class="btn">Next</button>
    </div>

    <div v-else-if="step === 2">
      <h1>Select Hospital</h1>
      <ul class="hospital-list">
        <li v-for="hospital in hospitals" :key="hospital._id">
          <button @click="() => selectHospital(hospital._id)" class="btn hospital-btn">{{ hospital.name }}</button>
        </li>
      </ul>
    </div>

    <div v-else-if="step === 3">
      <h1>Enter Patient Information</h1>
      <input v-model="patientData.phoneNumber" type="text" placeholder="Phone Number" class="input-field" />
      <textarea v-model="patientData.description" placeholder="Description" class="textarea-field"></textarea>
      <button @click="submitPatientInfo" class="btn">Submit</button>
    </div>

    <div v-else-if="step === 4">
      <h1>Waiting Room</h1>
      <p>Your queue number is: {{ queueNumber }}</p>
      <p>Estimated wait time: {{ estimatedWaitTime }} minutes</p>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
</script> -->

<style scoped>
.registration-form {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 150px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}

.hospital-list {
  list-style: none;
  padding: 0;
}

.hospital-btn {
  display: block;
  margin: 10px auto;
}

.error-message {
  color: #e74c3c;
  font-weight: bold;
  margin-top: 20px;
}
</style>