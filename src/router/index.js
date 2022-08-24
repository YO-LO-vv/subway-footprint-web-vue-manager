import {createRouter,createWebHashHistory} from "vue-router"

const routes=[
    {
        path:'/',
        name:'login',
        component:()=>import(/*webpackChunckName:'Login*/ '@/page/login.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
  })

export default router