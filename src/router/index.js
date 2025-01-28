import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue'
import CourseView from '@/views/CourseView.vue'

const base = import.meta.env.MODE === 'production' ? '/yarn-needle.client/' : '/';

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: HomeView,
        },
        {
          path: '/course/:id',
          name: 'course',
          component: CourseView,
        }
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
