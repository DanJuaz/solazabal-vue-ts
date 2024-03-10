import LoginForm from '@components/LoginForm.vue';
<template>
  <form class="max-w-sm mx-auto">
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Usuario
        <input
          v-model="loginForm.username"
          type="text"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Usuario"
          required
      /></label>
    </div>
    <div class="mb-5">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Contraseña
        <input
          v-model="loginForm.password"
          type="password"
          placeholder="****"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
      /></label>
    </div>
    <button
      type="submit"
      @click.prevent="login()"
      class="flex justify-center text-center text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Iniciar Sesión
    </button>
  </form>
</template>
<script>
import axios from 'axios'
import router from '../router/index'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      axios.post(`login/`, this.loginForm).then(
        (response) => {
          localStorage.removeItem('token')
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
          router.push({ name: 'home' })
          router.push({ name: 'home' })
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
}
</script>
