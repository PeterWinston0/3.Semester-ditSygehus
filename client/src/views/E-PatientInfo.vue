<template>
    <div>
      <h1>Enter Patient Information</h1>
      <input v-model="phoneNumber" type="text" placeholder="Phone Number" />
      <textarea v-model="description" placeholder="Description"></textarea>
      <button @click="submitInfo">Submit</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        phoneNumber: "",
        description: "",
      };
    },
    methods: {
      submitInfo() {
        // Add logic to send patient information to the server (Express REST API)
        // Upon successful submission, navigate to WaitingRoom.vue
        this.$router.push("/user/e-waitingroom");
      },
    },
  };
  </script>
  