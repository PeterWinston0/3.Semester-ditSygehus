<template>
  <div class="hospital-details">
    <h1>Sygehus Detaljer</h1>
    <div v-if="hospital">
      <div class="hospital-info">
        <h2>{{ hospital.name }}</h2>
        <p class="info-text">Address: {{ hospital.address }}</p>
        <p class="info-text">Phone: {{ hospital.phone }}</p>
      </div>

      <div v-if="hospital.departments.length > 0">
        <h3>Afdelinger</h3>
        <ul class="department-list">
          <li
            v-for="department in hospital.departments"
            :key="department._id"
            class="department-item"
          >
            <router-link
              :to="{
                name: 'sections',
                params: {
                  departmentId: department._id,
                  hospitalId: hospital._id,
                },
              }"
              class="department-link"
            >
              {{ department.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No departments found</p>
      </div>

      <div v-if="articles.length > 0">
        <h3>Related Articles</h3>
        <ul class="article-list">
          <li
            v-for="article in articles"
            :key="article._id"
            class="article-item"
          >
            <h4>{{ article.title }}</h4>
            <p>{{ article.content }}</p>
            <img
              v-if="article.imagePath"
              :src="article.imagePath"
              alt="Article Image"
              class="article-image"
            />
            <router-link
              :to="{
                name: 'ArticleDetails',
                params: { articleId: article._id },
              }"
            >
              Read More
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hospital: null,
      articles: [],
    };
  },
  created() {
    this.fetchHospitalDetails();
  },
  methods: {
    fetchHospitalDetails() {
      const hospitalId = this.$route.params.id;
      fetch(`http://localhost:3000/api/hospitals/${hospitalId}`)
        .then((response) => response.json())
        .then((data) => {
          this.hospital = data;
          this.$emit("update-title", data.name);
        })
        .catch((error) =>
          console.error("Error fetching hospital details:", error)
        );
    },
    fetchArticlesForHospital(hospitalId) {
      fetch(`http://localhost:3000/api/articles/hospital/${hospitalId}`)
        .then((response) => response.json())
        .then((data) => (this.articles = data))
        .catch((error) => console.error("Error fetching articles:", error));
    },
  },
};
</script>

<style scoped>
.hospital-details {
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.hospital-info {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
}

.hospital-info h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.info-text {
  margin: 5px 0;
}

.department-list {
  list-style: none;
  padding: 0;
}

.department-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.department-link {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.department-link:hover {
  background-color: #0056b3;
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

.article-item h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.article-image {
  max-width: 100%;
  margin-top: 10px;
}
</style>
