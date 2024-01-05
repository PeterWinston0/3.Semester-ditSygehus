<template>
  <div>
    <div class="header">
      <button @click="goBack">Tilbage</button>
      <h2>{{ pageTitle }}</h2>
    </div>

    <main>
      <router-view @update-title="updateTitle" />
    </main>
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
  data() {
    return {
      pageTitle: '',
    };
  },
  watch: {
    '$route'(to) {
      this.pageTitle = to.meta.title || '';
    },
  },
  methods: {
    updateTitle(newTitle) {
      this.pageTitle = newTitle;
    },
    goBack() {
      this.$router.go(-1); // Navigate back to the previous page
    },
  },
  created() {
    this.pageTitle = this.$route.meta.title || '';
  },
};
</script>

<style>
@media (max-width: 767px) {
  * {
    padding: 0;
    margin: 0;
  }
  .header {
    background-color: #0092cf;
    box-sizing: border-box;
    padding: 15px;
    height: 15vh;

    h2 {
      color: white;
    }
  }
}
</style>
