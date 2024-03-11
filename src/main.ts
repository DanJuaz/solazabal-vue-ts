import './assets/main.css'
import './axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'

import App from '@src/App.vue'
import router from './router'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faCar, faCalendar, faClock, faArrowUpRightFromSquare,faCaretUp, faPlus, faLocationArrow, faUser, faUserGroup, faRoad, faBookBookmark, faRightFromBracket, faPause, faLocation, faSearch, faRefresh, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'

//Cada icono debe ser añadido e importado
library.add( faCar, faCalendar, faClock, faArrowUpRightFromSquare, faCaretUp, faPlus, faLocationArrow, faUser, faUserGroup, faRoad, faBookBookmark, faRightFromBracket, faPause, faLocation, faSearch, faRefresh, faTrash, faCheck)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.use(Notifications)

app.mount('#app')

