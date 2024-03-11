import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@views/LoginView.vue'

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
      name: 'create-towns',
      path: '/create-towns',
      component: () => import('@views/CreateTownView.vue'),
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
      name: 'create-foul',
      path: '/create-foul',
      component: () => import('@views/CreateFoulView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      name: 'create-typefoul',
      path: '/create-type-foul',
      component: () => import('@views/CreateTypeFoulView.vue'), 
      meta: {
        requiresAuth: true,
      },
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
  const requiresAuth = to.meta.requiresAuth;

  // Obtén el token del almacenamiento local
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  // Verifica si el usuario está autenticado
  const isLoggedIn = token !== null && user !== null;

  // Verifica si la ruta requiere autenticación
  if (requiresAuth) {
    // Si el usuario no está autenticado, redirige al inicio de sesión
    if (!isLoggedIn) {
      return next({ path: '/' });
    }
  }

  // Si el usuario está autenticado y trata de acceder a la página de inicio de sesión, redirígelo a la página de inicio
  if (to.name === 'login' && isLoggedIn) {
    return next({ path: '/home' });
  }

  // Si el usuario intenta acceder a la página de inicio de sesión sin necesidad de autenticación y ya está autenticado, redirígelo a la página de inicio
  if (to.name !== 'login' && !requiresAuth && isLoggedIn) {
    return next({ path: '/home' });
  }

  // Continuar con la navegación normalmente
  next();
});


export default router
