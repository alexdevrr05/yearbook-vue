import { createRouter, createWebHashHistory } from 'vue-router';

import isAutheticatedGuard from './auth-guad';
import HomeLayout from '@/modules/main/layouts/HomeLayout';
import LoginPage from '@/modules/shared/pages/LoginPage';
import Alumnos from '@/modules/shared/pages/Alumnos.vue';
import Profile from '@/modules/shared/pages/Profile.vue';

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
    children: [
      {
        path: '/alumnos',
        name: 'alumnos',
        component: Alumnos,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
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
