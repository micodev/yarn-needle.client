import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue'
import CourseView from '@/views/CourseView.vue'
import UpdatePasswordView from '@/views/UpdatePasswordView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RoutesList from '@/components/RoutesList.vue'
import CoursesView from '../views/CoursesView.vue'

const base = '/yarn-needle.client';

const router = createRouter({
  history: createWebHashHistory(base),
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
        },
        {
          path: '/update-password',
          name: 'UpdatePassword',
          component: UpdatePasswordView
        },
        {
          path: '/profile',
          name: 'Profile',
          component: ProfileView
        },
        {
          path: '/routes',
          name: 'RoutesList',
          component: RoutesList
        },
        {
          path: '/courses',
          name: 'courses',
          component: CoursesView
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
