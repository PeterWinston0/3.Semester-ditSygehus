<template>
    <div class="article-details" v-if="article">
      <h1 class="article-title">{{ article.title }}</h1>
      <img
        v-if="article.imagePath"
        :src="article.imagePath"
        alt="Article Image"
        class="article-image"
      />
      <div class="article-content" v-html="article.content"></div>
    </div>
    <div v-else>
      <p>Loading article...</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      article: null,
    };
  },
  created() {
    this.fetchArticleDetails();
  },
  methods: {
    fetchArticleDetails() {
      const articleId = this.$route.params.articleId;
      fetch(`http://localhost:3000/api/articles/${articleId}`)
        .then((response) => response.json())
        .then((data) => (this.article = data))
        .catch((error) =>
          console.error("Error fetching article details:", error)
        );
    },
  },
};
</script>

<style scoped>
.article-details {
  padding: 20px;
  text-align: center;
}

.article-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.article-image {
  max-width: 100%;
  margin: 20px auto;
  display: block;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.article-content {
  text-align: left;
  line-height: 1.5;
  font-size: 16px;
}

/* Loading message */
div[v-else] {
  text-align: center;
  padding: 20px;
}

div[v-else] p {
  font-size: 18px;
  color: #888;
}
</style>
