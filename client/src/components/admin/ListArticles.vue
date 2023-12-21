<template>
  <div class="article-list">
    <h1>All Articles</h1>
    <div v-for="article in articles" :key="article._id" class="article-card">
      <h2>{{ article.title }}</h2>
      <p class="article-content">{{ article.content }}</p>
      <img
        :src="getArticleImageUrl(article)"
        alt="Article Image"
        class="article-image"
      />
      <router-link
        :to="{ name: 'ArticleView', params: { articleId: article._id } }"
        >View Article</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await fetch("http://localhost:3000/api/articles"); // Updated API endpoint
        if (response.ok) {
          const data = await response.json();
          this.articles = data;
        } else {
          console.error("Failed to fetch articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    },
    getArticleImageUrl(article) {
      if (article.imagePath) {
        return `http://localhost:3000${article.imagePath}`;
      }
      return "placeholder.jpg";
    },
    async deleteArticle(articleId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/articles/${articleId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          this.articles = this.articles.filter(
            (article) => article._id !== articleId
          );
        } else {
          console.error("Error deleting article");
        }
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    },
  },
};
</script>

<style scoped>
.article-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.article-card {
  position: relative;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  margin: 20px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 10px;
}

.article-image {
  max-width: 100px;
  height: auto;
  margin-right: 20px;
}

.article-content {
  flex-grow: 1;
  font-size: 16px;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-left: auto; /* Push the button to the right */
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>