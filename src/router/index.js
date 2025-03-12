import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue'
import CourseView from '@/views/CourseView.vue'
import UpdatePasswordView from '@/views/UpdatePasswordView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CoursesView from '../views/CoursesView.vue'
import OrderHistoryView from '../views/OrderHistoryView.vue'
import MyCourseView from '../views/MyCourseView.vue'
import { useAuthStore } from '@/stores/auth';
import PaymentView from '@/views/PaymentView.vue'
import AdminView from '@/views/AdminView.vue'

// Import admin views
import UserManagement from '@/views/admin/UserManagement.vue'
import CourseManagement from '@/views/admin/CourseManagement.vue'
import LecturerManagement from '@/views/admin/LecturerManagement.vue'
import CommentManagement from '@/views/admin/CommentManagement.vue'
import OrderAdministrator from '@/views/admin/OrderAdministrator.vue'
import OrganizationManagement from '@/views/admin/OrganizationManagement.vue'

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
        },
        // Admin nested routes
        {
          path: '/admin/users',
          name: 'AdminUsers',
          component: UserManagement,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
            title: 'User Management'
          }
        },
        {
          path: '/admin/courses',
          name: 'AdminCourses',
          component: CourseManagement,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
            title: 'Course Management'
          }
        },
        {
          path: '/admin/lecturers',
          name: 'AdminLecturers',
          component: LecturerManagement,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
            title: 'Lecturer Management'
          }
        },
        {
          path: '/admin/comments',
          name: 'AdminComments',
          component: CommentManagement,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
            title: 'Comment Management'
          }
        },
        {
          path: '/admin/orders',
          name: 'AdminOrders',
          component: OrderAdministrator,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
            title: 'Order Management'
          }
        },
        // New organization route
        {
          path: '/admin/organization',
          name: 'AdminOrganization',
          component: OrganizationManagement,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
            title: 'Organization Management'
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
