<template>
    <div>
      <h1>Enter Social Security Number</h1>
      <input v-model="ssn" type="text" placeholder="Social Security Number" />
      <button @click="selectHospital">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ssn: "",
      };
    },
    methods: {
      selectHospital() {
        // Add logic to fetch hospital list from MongoDB and navigate to HospitalSelection.vue
        this.$router.push("/user/e-hospitalselection");
      },
    },
  };
  </script>
  