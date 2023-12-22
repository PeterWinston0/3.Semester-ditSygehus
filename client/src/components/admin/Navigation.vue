<template>
  <div>
    <nav>
      <ul>
        <!-- Dashboard -->
        <li>
          <router-link to="/admin/dashboard" class="nav-link"><p>Dashboard</p></router-link>
        </li>

        <!-- Category 1 -->
        <li @click="toggleCategory(1)" :class="{ active: showCategory[1] }">
          <p>Users</p>
          <ul class="sub-menu" :class="{ show: showCategory[1] }">
            <li>
              <router-link to="/admin/listuser" class="nav-link"
                >All Users</router-link
              >
            </li>
            <li>
              <router-link to="/admin/createuser" class="nav-link"
                >Create User</router-link
              >
            </li>
          </ul>
        </li>

        <!-- Category 2 -->
        <li @click="toggleCategory(2)" :class="{ active: showCategory[2] }">
          <p>Hospital</p>
          <ul class="sub-menu" :class="{ show: showCategory[2] }">
            <li>
              <router-link to="/admin/listhospital" class="nav-link"
                >All Hospitals</router-link
              >
            </li>
            <li>
              <router-link to="/admin/createhospital" class="nav-link"
                >Create Hospital</router-link
              >
            </li>
          </ul>
        </li>

        <!-- Category 3 -->
        <li @click="toggleCategory(3)" :class="{ active: showCategory[3] }">
          <p>Article</p>
          <ul class="sub-menu" :class="{ show: showCategory[3] }">
            <li>
              <router-link to="/admin/listarticle" class="nav-link"
                >All Articles</router-link
              >
            </li>
            <li>
              <router-link to="/admin/createarticle" class="nav-link"
                >Create Article</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AdminNavigation",
  data() {
    return {
      showCategory: {
        1: false,
        2: false,
        3: false,
      },
    };
  },
  methods: {
    toggleCategory(category) {
      this.showCategory[category] = !this.showCategory[category];
    },
  },
};
</script>

<style scoped>
nav {
  margin-top: 30px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;

  ul {
    li {

      padding: 10px;
      p {

        padding: 10px;
      }

      ul {

        li {

        }
      }
    }
  }
}

.sub-menu {
  display: none;
  list-style: none;
  padding-left: 20px;
}

.sub-menu.show {
  display: block;
}

.nav-link {
  text-decoration: none;
  color: #000; /* Change the color as needed */
}

li.active .sub-menu {
  display: block;
}
</style>
