import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@src/App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faUser, faUserGroup, faRoad, faBookBookmark, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

//Cada icono debe ser añadido e importado
library.add(faUser, faUserGroup, faRoad, faBookBookmark, faRightFromBracket)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')

