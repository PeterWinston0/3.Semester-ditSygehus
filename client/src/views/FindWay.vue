<template>
  <div>
    <!-- Create a div to display the map -->
    <div id="map" style="height: 400px; width: 100%"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // Load the Google Maps JavaScript API with the callback parameter
    this.loadGoogleMapsAPI();
  },
  methods: {
    loadGoogleMapsAPI() {
      // Check if the Google Maps API script is already loaded
      if (typeof google === "undefined" || typeof google.maps === "undefined") {
        // Create a script element to load the Google Maps API
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBzJcAyjqGjt4HB7cf9geWCNCeBUXpfACI&callback=initMap`;
        script.defer = true;
        script.async = true;
        script.onerror = () => {
          console.error("Error loading Google Maps API.");
        };

        // Append the script to the document
        document.head.appendChild(script);

        // Set up a callback function
        script.onload = () => {
          this.initMap();
        };
      } else {
        // Google Maps API is already loaded, directly call the callback function
        this.initMap();
      }
    },
    initMap() {
      // Callback function to initialize Google Maps
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 55.47389, lng: 8.45675 },
        zoom: 16,
      });

      // You can add markers, polygons, or other map features as needed
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
#map {
  height: 400px;
  width: 100%;
}
</style>