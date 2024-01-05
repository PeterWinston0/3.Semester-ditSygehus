<template>
  <div class="department-details">
    <div v-if="department">
      <h2 class="department-title">{{ department.name }}</h2>

      <ul v-if="department.sections.length > 0" class="section-list">
        <li
          v-for="section in department.sections"
          :key="section._id"
          class="section-item"
        >
          <router-link
            :to="{
              name: 'sectioninfo',
              params: {
                hospitalId: $route.params.hospitalId,
                departmentId: $route.params.departmentId,
                sectionId: section._id,
              },
            }"
            class="section-link"
          >
            {{ section.name }}
          </router-link>
        </li>
      </ul>
      <p v-else>No sections available.</p>

      <div v-if="articles.length > 0">
        <h3 class="article-heading">Related Articles</h3>
        <ul class="article-list">
          <li
            v-for="article in articles"
            :key="article._id"
            class="article-item"
          >
            <h4 class="article-title">{{ article.title }}</h4>
            <p class="article-content">{{ article.content }}</p>
            <img
              v-if="article.imagePath"
              :src="article.imagePath"
              alt="Article Image"
              class="article-image"
            />
          </li>
        </ul>
      </div>
      <p v-else>No related articles found.</p>
    </div>
    <div v-else>
      <p>Loading department details...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: null,
      articles: [],
      hospitalId: null,
    };
  },
  created() {
    this.fetchDepartmentDetails();
  },
  methods: {
    fetchDepartmentDetails() {
      const departmentId = this.$route.params.departmentId;
      this.hospitalId = this.$route.params.hospitalId;

      fetch(
        `http://localhost:3000/api/hospitals/${this.hospitalId}/departments/${departmentId}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.department = data;
          this.$emit("update-title", data.name);
          this.fetchArticlesForDepartment(departmentId);
        })
        .catch((error) =>
          console.error("Error fetching department details:", error)
        );
    },
    fetchArticlesForDepartment(departmentId) {
      fetch(`http://localhost:3000/api/articles/departments/${departmentId}`)
        .then((response) => response.json())
        .then((data) => (this.articles = data))
        .catch((error) => console.error("Error fetching articles:", error));
    },
  },
};
</script>

<style scoped>
.department-details {
  padding: 20px;
  text-align: left;
  background-color: #f8f8f8;
}

.department-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.section-list {
  list-style: none;
  padding: 0;
}

.section-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px 0;
}

.section-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: bold;
}

.section-link:hover {
  color: #0056b3;
}

.article-heading {
  font-size: 20px;
  margin-top: 20px;
  color: #333;
}

.article-list {
  list-style: none;
  padding: 0;
}

.article-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
}

.article-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.article-content {
  font-size: 16px;
  color: #444;
}

.article-image {
  max-width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>