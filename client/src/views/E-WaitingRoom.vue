<template>
    <div>
      <h1>Waiting Room</h1>
      <p>Your queue number is: {{ queueNumber }}</p>
      <p>Estimated wait time: {{ estimatedWaitTime }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        queueNumber: "", // Fetch queue number from the server
        estimatedWaitTime: "", // Fetch estimated wait time from the server
      };
    },
  };
  </script>
  