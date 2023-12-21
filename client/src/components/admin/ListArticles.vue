<template>
    <div>
      <h1>All Articles</h1>
      <div v-for="article in articles" :key="article._id">
        <h2>{{ article.title }}</h2>
        <p>{{ article.content }}</p>
        <img :src="getArticleImageUrl(article)" alt="Article Image" />
        <button @click="deleteArticle(article._id)">Delete</button>
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
          const response = await fetch('http://localhost:3000/api/articles'); // Updated API endpoint
          if (response.ok) {
            const data = await response.json();
            this.articles = data;
          } else {
            console.error('Failed to fetch articles');
          }
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      },
      getArticleImageUrl(article) {
        if (article.imagePath) {
          return `http://localhost:3000${article.imagePath}`;
        }
        return 'placeholder.jpg';
      },
      async deleteArticle(articleId) {
        try {
          const response = await fetch(`http://localhost:3000/api/articles/${articleId}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            this.articles = this.articles.filter((article) => article._id !== articleId);
          } else {
            console.error('Error deleting article');
          }
        } catch (error) {
          console.error('Error deleting article:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>