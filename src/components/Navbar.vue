<script setup>
const props = defineProps(["activeNavAdmin"]);

const isActive = (element) => element === props.activeNavAdmin;
</script>
<template>
    <nav class="w-[250px] h-screen flex flex-col justify-center bg-gray-700 text-white p-4 transition-transform ease-in-out duration-300"
        :class="{ ' -translate-x-44': !menuVisible }">
        <!-- Contenido del menú desplegable -->
        <div class="mt-2 w-full">
            <a href="/admin" class="flex justify-center px-4 py-2 hover:bg-resaltar my-2 rounded-md"
                :class="{ 'bg-resaltar': isActive('Home') }">Conducir <font-awesome-icon icon="road" /></a>
            <a href="/admin/usuarios" class="flex justify-center px-4 py-2 hover:bg-resaltar my-2 rounded-md"
                :class="{ 'bg-resaltar': isActive('Usuarios') }">Usuarios <font-awesome-icon icon="user-group" /></a>
            <a href="/admin/compras" class="flex justify-center px-4 py-2 hover:bg-resaltar my-2 rounded-md"
                :class="{ 'bg-resaltar': isActive('Compras') }">Clases <font-awesome-icon icon="book-bookmark" /></a>
            <button @click="handleLogout"
                class="flex justify-center items-center text-center text-pretty px-4 py-2 hover:bg-resaltar my-2 rounded-md w-full">
                Sign Out <font-awesome-icon icon="right-from-bracket" />
            </button>
        </div>
    </nav>
    <!-- Botón para mostrar/ocultar el menú -->
    <button @click="toggleMenu" class="absolute top-4 left-60 text-white focus:outline-none"
        :class="{ ' -translate-x-44 delay-150': !menuVisible }">
        <span class="flex justify-center text-center items-center rounded-full px-2 py-0 bg-gray-500">></span>
    </button>
</template>

<script>
// import { useRoute } from "vue-router";
// const route = useRoute();

export default {
    data() {
        return {
            menuVisible: true,
        };
    },
    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        },
        //SESSION MANAGEMENT
        handleLogout() {
            // Clear user data and authentication status from localStorage
            localStorage.removeItem("usuario");
            localStorage.removeItem("isLoggedIn");

            // Redirect to the home page
            this.$router.push("/adminLogin");
        },
    },
};
</script>