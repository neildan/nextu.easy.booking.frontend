import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
// Components
import DashboardVue from './components/Dashboard.vue'
import AuthVue from './components/Auth.vue'
import ScheduleEventVue from './components/ScheduleEvent.vue'
import AdminVue from './components/Admin.vue'

const routes = [
    {
        path: '/',
        component: DashboardVue,
        name: 'dashboard'
    },
    {
        path: '/:message',
        component: DashboardVue,
        props: true,
        name: 'notificationDashboard'
    },
    {
        path: '/function/:id/:eventId',
        component: ScheduleEventVue,
        props: true,
        name: 'schedule'
    },
    {
        path: '/auth',
        component: AuthVue
    },
    {
        path: '/admin',
        component: AdminVue,
        name: 'admin'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')

