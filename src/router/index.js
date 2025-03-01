import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue'
import CourseView from '@/views/CourseView.vue'
import UpdatePasswordView from '@/views/UpdatePasswordView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RoutesList from '@/components/RoutesList.vue'
import CoursesView from '../views/CoursesView.vue'
import OrderHistoryView from '../views/OrderHistoryView.vue'
import MyCourseView from '../views/MyCourseView.vue'
import { useAuthStore } from '@/stores/auth';
import PaymentView from '@/views/PaymentView.vue'
import AdminView from '@/views/AdminView.vue'

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
          name: 'home',
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
          component: ProfileView,
          meta: {
            requiresAuth: true
          }
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
        },
        {
          path: '/order-history',
          name: 'OrderHistory',
          component: OrderHistoryView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/my-courses',
          name: 'my-courses',
          component: MyCourseView,
          meta: {
            requiresAuth: true,
            title: 'My Courses'
          }
        },
        {
          path: '/payment',
          name: 'Payment',
          component: PaymentView,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/admin',
          name: 'Admin',
          component: AdminView,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
            title: 'Admin Dashboard'
          }
        }
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  // Add admin authorization check
  if (to.meta.requiresAdmin) {
    if (!authStore.isAdmin) {
      return next('/');
    }
  }
  else if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next('/');
    }
  }



  next();
})

export default router
