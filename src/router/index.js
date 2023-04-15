import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () =>
      import(
        /* webpackChunkName: "HomeLayout" */
        '@/modules/main/layouts/HomeLayout'
      ),
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(
        /* webpackChunkName: "LoginPage" */
        '@/modules/shared/pages/LoginPage'
      ),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(
        /* webpackChunkName: "LoginPage" */
        '@/modules/shared/pages/LoginPage'
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
