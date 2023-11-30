import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: "/",
    redirect: "/login", // Redirect to login page initially
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("@/views/Registration.vue"),
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "dashboard", // Admin dashboard route
        component: () => import("@/views/DashboardAdmin.vue"),
      },
      {
        path: "settings",
        component: () => import("@/views/AdminSettings.vue"),
      },
      {
        path: "createhospital",
        //name: "CreateHospital",
        component: () => import("@/components/admin/CreateHospital.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "listhospital",
        //name: "ListHospital",
        component: () => import("@/components/admin/ListHospital.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "hospitals/:id", // Dynamic route to handle hospital details using ID
        name: "DetailsHospital",
        component: () => import("@/components/admin/DetailsHospital.vue"),
        props: true
      },
      {
        path: '/hospitals/:hospitalId/departments/create',
        name: 'CreateDepartment',
        component: () => import("@/components/admin/CreateDepartment.vue"),
      },  
    ],
  },
  {
    path: "/user",
    component: UserLayout,
    children: [
      {
        path: "home", // User home route
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "profile",
        component: () => import("@/views/UserProfile.vue"),
      },
      // Other user routes
    ],
  },
  // Other routes or a catch-all route if needed
]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
 });

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if attempting to access a protected route without authentication
    next('/login');
  } else {
    next();
  }
});

export default router;

// // router/index.js

// import { createRouter, createWebHistory } from 'vue-router';
// import Login from '../views/Login.vue';
// import DashboardAdmin from '../views/DashboardAdmin.vue';
// import DashboardUser from '../views/DashboardUser.vue';
// import Registration from '../views/Registration.vue';
// import CreateHospital from '../components/admin/CreateHospital.vue';
// import ListHospital from '../components/admin/ListHospital.vue';
// import DetailsHospital from '../components/admin/DetailsHospital.vue';

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       redirect: '/login' // Redirect the root URL to the login page
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/registration',
//       name: 'Registration',
//       component: Registration,
//     },
//     {
//       path: '/dashboardadmin',
//       name: 'DashboardAdmin',
//       component: DashboardAdmin,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/dashboarduser',
//       name: 'DashboardUser',
//       component: DashboardUser,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/createhospital',
//       name: 'CreateHospital',
//       component: CreateHospital,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/listhospital',
//       name: 'ListHospital',
//       component: ListHospital,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/detailshospital/:id', // Dynamic route to handle hospital details using ID
//       name: 'DetailsHospital', // Name for the route
//       component: DetailsHospital,
//     },
//   ]
// });

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token'); // Check if the token exists

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     // Redirect to login if attempting to access a protected route without authentication
//     next('/login');
//   } else {
//     next();
//   }
// });

// export default router;
