import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/HomeView.vue')
    },
    {
      path: '/students',
      name: 'students',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/StudentsView.vue')
    },
    {
      path: '/students/:id',
      name: 'student',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/StudentView.vue')
    },
    {
      path: '/lessons',
      name: 'lessons',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/LessonsView.vue')
    },
    {
      path: '/lessons/:id',
      name: 'lesson',
      // which is lazy-loaded when the route is visited.
      component: () => import('@views/LessonView.vue')
    }
  ]
})

export default router
