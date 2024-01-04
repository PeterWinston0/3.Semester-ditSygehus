<template>
  <div class="create-news-article-container">
    <h1>Create News Article</h1>

    <form @submit.prevent="submitArticle" class="article-form">
      <!-- Dropdown to select hospital -->
      <div class="form-group">
        <label for="hospital">Select Hospital:</label>
        <select v-model="selectedHospital" @change="loadDepartments" class="form-control">
          <option v-for="hospital in hospitals" :key="hospital._id" :value="hospital._id">
            {{ hospital.name }}
          </option>
        </select>
      </div>

      <!-- Dropdown to select department -->
      <div v-if="selectedHospital" class="form-group">
        <label for="department">Select Department:</label>
        <select v-model="selectedDepartment" class="form-control">
          <option v-for="department in departments" :key="department._id" :value="department._id">
            {{ department.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="article.title" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" v-model="article.content" class="form-control" required></textarea>
      </div>

      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" id="image" @change="handleImageUpload" class="form-control" />
        <img :src="imageUrl" alt="Article Image" v-if="imageUrl" class="uploaded-image" />
      </div>

      <button type="submit" class="btn btn-primary">Create Article</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedHospital: null,
      selectedDepartment: null,
      hospitals: [], // To be fetched from your API
      departments: [], // To be fetched dynamically based on the selected hospital
      article: {
        title: '',
        content: '',
        image: null,
        hospitalId: null,
        departmentId: null,
      },
      imageUrl: null,
    };
  },
  created() {
    this.fetchHospitals();
  },
  methods: {
    async fetchHospitals() {
      try {
        // Fetch hospitals from your backend API
        const response = await fetch('http://localhost:3000/api/hospitals');
        if (response.ok) {
          const data = await response.json();
          this.hospitals = data; // Update the hospitals array with fetched data
        } else {
          console.error('Failed to fetch hospitals');
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    },
    async loadDepartments() {
      // Fetch departments based on the selected hospital
      try {
        const response = await fetch(`http://localhost:3000/api/hospitals/${this.selectedHospital}/departments`);
        if (response.ok) {
          const data = await response.json();
          this.departments = data; // Update the departments array with fetched data
        } else {
          console.error('Failed to fetch departments');
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    },
    async submitArticle() {
      // Submit article to the server
      try {
        const formData = new FormData();
        formData.append('title', this.article.title);
        formData.append('content', this.article.content);
        formData.append('image', this.article.image); // Send the image file
        formData.append('hospitalId', this.selectedHospital);
        formData.append('departmentId', this.selectedDepartment);

        // Send the form data to your backend API endpoint to create the article
        const response = await fetch('http://localhost:3000/api/articles/create-article', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Article created successfully
          this.article.title = '';
          this.article.content = '';
          this.article.image = null;
          this.imageUrl = null;
        } else {
          console.error('Error creating article');
        }
      } catch (error) {
        console.error('Error creating article:', error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.article.image = file;
        this.imageUrl = URL.createObjectURL(file);
      }
    },
  },
};
</script>

<style scoped>
.create-news-article-container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.article-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.uploaded-image {
  max-width: 100%;
  margin-top: 10px;
}

.btn {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
}
</style>