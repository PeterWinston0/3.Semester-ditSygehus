<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Dashboard Admin</h1>
    <h4 class="dashboard-subtitle">Welcome {{ userName }}</h4>

    <div class="box-wrapper">
      <div class="box-1"></div>
      <div class="box-2">
        <div class="user-counts">
          <div class="male">
            <p class="user-count">Male Users: {{ maleUserCount }}</p>
          </div>
          <div class="female">
            <p class="user-count">Female Users: {{ femaleUserCount }}</p>
          </div>
        </div>
      </div>
      <div class="box-2"></div>
      <div class="box-2">
        <h3 class="users-title">Users</h3>
        <ul class="users-list">
          <li v-for="user in users" :key="user._id" class="user-item">
            {{ user.name }} - {{ user.email }}
          </li>
        </ul>
      </div>
      <div class="box-3">
        <div
          class="article-views"
          v-if="articleViews && articleViews.length > 0"
        >
          <h3 class="article-views-title">Article Views</h3>
          <ul class="article-views-list">
            <li
              v-for="view in articleViews"
              :key="view._id"
              class="article-view-item"
            >
              {{ view.title }}: {{ view.views }} views
            </li>
          </ul>
        </div>
      </div>
      <div class="box-2"></div>
      <div class="box-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      maleUserCount: 0,
      femaleUserCount: 0,
      articleViews: [],
      users: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.userName = payload.name;
      }

      await this.fetchUserCounts();
      await this.fetchArticleViews();
    } catch (error) {
      console.error("Error in created hook:", error);
    }

    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      this.users = users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
    async fetchUserCounts() {
      try {
        const response = await fetch("http://localhost:3000/api/users/count");
        const data = await response.json();
        this.maleUserCount = data.maleCount || 0;
        this.femaleUserCount = data.femaleCount || 0;
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    },
    async fetchArticleViews() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/articles/views"
        );
        const data = await response.json();
        this.articleViews = data;
      } catch (error) {
        console.error("Error fetching article views:", error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  width: 100%;
}

.dashboard-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.dashboard-subtitle {
  font-size: 18px;
  margin-bottom: 20px;
}

.user-counts {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.user-count {
  font-size: 16px;
  margin: 0;
}

.article-views-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.article-views-list {
  list-style: none;
  padding: 0;
}

.article-view-item {
  font-size: 16px;
  margin: 5px 0;
}

.box-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.box-wrapper div:nth-child(3) {
  background-color: #91d4bc !important;
}
.box-wrapper div:nth-child(4) {
  background-color: #4882ad !important;
}

.box-1 {
  background-color: white;
  width: 62%;
  height: 300px;
  margin: 10px;
  border-radius: 10px;
}

.box-2 {
  background-color: white;
  width: 30%;
  height: 300px;
  margin: 10px;
  position: relative;
  border-radius: 10px;
}

.box-3 {
  width: 30%;
  height: 300px;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
}

.users-list {
  list-style-type: none;
  padding: 0;
}
.user-item {
  margin-bottom: 10px;
  font-size: 16px;
}
</style>
