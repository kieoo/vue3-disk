import { createWebHashHistory, createRouter } from "vue-router";
import Disk from '@/components/VueDisk'

const routes = [
    {
        path: '/',
        name: 'FileManager',
        component: Disk
    }
]

const router = new createRouter({
    history: createWebHashHistory(),
    base: process.env.BASE_URL,
    routes
})

export default router