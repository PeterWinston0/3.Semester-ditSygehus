<template>
  <div class="article-page">
    <h1 v-if="!isEditing" class="article-title">{{ article.title }}</h1>
    <input v-else v-model="editedTitle" class="article-title-input" />
    <img
      :src="getArticleImageUrl(article)"
      alt="Article Image"
      class="article-image"
    />
    <div class="article-content">
      <p v-if="!isEditing">{{ article.content }}</p>
      <textarea
        v-else
        v-model="editedContent"
        class="article-content-textarea"
      ></textarea>
    </div>
    <button v-if="!isEditing" @click="toggleEditing" class="edit-button">
      Edit
    </button>
    <button v-else @click="saveChanges" class="save-button">Save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {},
      editedTitle: "",
      editedContent: "",
      isEditing: false,
    };
  },
  mounted() {
    // Fetch the specific article based on route parameter (articleId)
    const articleId = this.$route.params.articleId;
    this.fetchArticle(articleId);
  },
  methods: {
    async fetchArticle(articleId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/articles/${articleId}`
        );
        if (response.ok) {
          const data = await response.json();
          this.article = data;
          // Initialize editedTitle and editedContent with current values
          this.editedTitle = data.title;
          this.editedContent = data.content;
        } else {
          console.error("Failed to fetch article");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    },
    getArticleImageUrl(article) {
      if (article.imagePath) {
        return `http://localhost:3000${article.imagePath}`;
      }
      // return 'placeholder.jpg';
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    async saveChanges() {
      const articleId = this.$route.params.articleId;

      try {
        const response = await fetch(
          `http://localhost:3000/api/articles/${articleId}`,
          {
            method: "PUT", // You may need to adjust the HTTP method (PUT, PATCH, etc.) based on your API design
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: this.editedTitle,
              content: this.editedContent,
            }),
          }
        );

        if (response.ok) {
          // Successfully updated the article
          // You may want to provide feedback to the user, e.g., show a success message
          this.isEditing = false; // Exit edit mode
          this.fetchArticle(articleId); // Fetch the updated article data to refresh the view
        } else {
          console.error("Error updating article");
          // You can handle error cases and provide feedback to the user
        }
      } catch (error) {
        console.error("Error updating article:", error);
        // Handle network or other errors
      }
    },
  },
};
</script>

<style scoped>
.article-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.article-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.article-title-input {
  font-size: 24px;
  margin-bottom: 20px;
}

.article-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.article-content {
  font-size: 16px;
  line-height: 1.6;
}

.article-content-textarea {
  width: 100%;
  height: 150px;
  resize: vertical;
  font-size: 16px;
  line-height: 1.6;
}

.edit-button,
.save-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.save-button {
  background-color: #27ae60;
}

.edit-button:hover,
.save-button:hover {
  background-color: #2980b9;
}
</style>
