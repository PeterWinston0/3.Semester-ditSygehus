import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";
import UserLayout from "@/layouts/UserLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/landing", 
    },
    {
      path: "/landing",
      component: () => import("@/views/Landing.vue"),
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
          path: "dashboard",
          component: () => import("@/views/DashboardAdmin.vue"),
        },
        {
          path: "emergency",
          component: () => import("@/components/admin/Emergency.vue"),
        },
        {
          path: "listuser",
          component: () => import("@/components/admin/ListUser.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "createuser",
          component: () => import("@/components/admin/CreateUser.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "profile",
          component: () => import("@/components/admin/Profile.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "createarticle",
          component: () => import("@/components/admin/CreateArticle.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/edituser/:userId",
          name: "EditUser",
          component: () => import("@/components/admin/EditUser.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "createhospital",
          component: () => import("@/components/admin/CreateHospital.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "listhospital",
          component: () => import("@/components/admin/ListHospital.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "listarticle",
          component: () => import("@/components/admin/ListArticles.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/articleview/:articleId",
          name: "ArticleView",
          component: () => import("@/components/admin/ArticleView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "hospitals/:id",
          name: "DetailsHospital",
          component: () => import("@/components/admin/DetailsHospital.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "/hospitals/:hospitalId/departments/create",
          name: "CreateDepartment",
          component: () => import("@/components/admin/CreateDepartment.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "/hospitals/:hospitalId/department/:departmentId",
          name: "DepartmentDetails",
          component: () => import("@/components/admin/DepartmentDetails.vue"),
          props: true,
        },
        {
          path: "/hospitals/:hospitalId/department/:departmentId/sections/create",
          name: "CreateSection",
          component: () => import("@/components/admin/CreateSection.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "/hospitals/:hospitalId/department/:departmentId/sections/:sectionId",
          name: "SectionDetails",
          component: () => import("@/components/admin/SectionDetails.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/user",
      component: UserLayout,
      children: [
        {
          path: "home",
          component: () => import("@/views/Home.vue"),
          meta: { requiresAuth: true, title: 'Velkommen' },
        },
        {
          path: "patienthospitals",
          component: () => import("@/views/PatientHospitals.vue"),
          meta: { requiresAuth: true, title: 'Vælg Hospital' },
        },
        {
          path: "support",
          component: () => import("@/views/Support.vue"),
          meta: { requiresAuth: true, title: 'Borgersupport' },
        },
        {
          path: "findway",
          component: () => import("@/views/FindWay.vue"),
          meta: { requiresAuth: true, title: 'Find Vej' },
        },
        {
          path: '/:articleId',
          name: 'ArticleDetails',
          component: () => import("@/views/ArticleDetails.vue"),
        },
        {
          path: 'pdf-viewer',
          name: 'pdf-viewer',
          component: () => import("@/views/Pdf-viewer.vue"),
        },
        {
          path: "hospitals/:id",
          name: "department",
          component: () => import("@/views/Departments.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "/user/hospitals/:hospitalId/department/:departmentId",
          name: "sections",
          component: () => import("@/views/Sections.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "/user/hospitals/:hospitalId/department/:departmentId/sections/:sectionId",
          name: "sectioninfo",
          component: () => import("@/views/SectionInfo.vue"),
          props: true,
          meta: { requiresAuth: true },
        },
        {
          path: "e-patientform",
          name: "e-patientform",
          props: true,
          component: () => import("@/views/E-PatientForm.vue"),
          meta: { requiresAuth: true, title: 'Akutmodtagelse' },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    
    next("/landing");
  } else {
    next();
  }
});

export default router;
