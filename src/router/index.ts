import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@views/LoginView.vue'
import VueCookies from 'vue-cookies'
import { useCookies } from 'vue-cookies';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/home',
      name: 'home',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/HomeView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/students',
      name: 'students',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/StudentsView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/students/:id',
      name: 'student',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/StudentView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      name: 'create-student',
      path: '/create-student',
      component: () => import('@views/CreateStudentView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/lessons',
      name: 'lessons',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/LessonsView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/lessons/:id',
      name: 'lesson',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/LessonView.vue'),
      meta: {
        requiresAuth: true,
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth

  // Ahora puedes usar $cookies en tu guardia de navegación
  const isLoggedIn = true;

  // Check if the route requires authentication
  if (requiresAuth) {
    // If user is not logged in
    if (!isLoggedIn) {
        return next({ path: '/login' })
    }
    // If user is logged in
    else {
      return next()
    }
  }


  next()
})

export default router
