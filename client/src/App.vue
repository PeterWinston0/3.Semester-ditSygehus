<script>
import { RouterLink, RouterView } from 'vue-router'

import UserLayout from './layouts/UserLayout.vue';

export default {
  name: 'App',
  components: {
    UserLayout,
  },
  data() {
    return {
      // Define a global reactive property for the title
      globalTitle: 'Default Title',
    };
  },
  provide() {
    // Provide it to all child components
    return {
      globalTitle: this.globalTitle,
    };
  },
};
</script>

<template>
  <header>
    
  </header>

  <RouterView />
</template>

<style scoped>

</style>
