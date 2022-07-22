import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// Components
import DashboardVue from './components/Dashboard.vue'
import AuthVue from './components/Auth.vue'

const routes = [
    {
        path: '/',
        component: DashboardVue
    },
    {
        path: '/auth',
        component: AuthVue
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
