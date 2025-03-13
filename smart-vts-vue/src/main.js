import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import FontAwesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
