import { createRouter, createWebHashHistory } from 'vue-router';

import isAutheticatedGuard from './auth-guad';
import HomeLayout from '@/modules/main/layouts/HomeLayout';
import LoginPage from '@/modules/shared/pages/LoginPage';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    beforeEnter: [isAutheticatedGuard],
    component: HomeLayout,
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
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
