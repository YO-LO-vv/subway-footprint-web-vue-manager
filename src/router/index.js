import {createRouter,createWebHashHistory} from "vue-router"

const routes=[
    {   //登陆界面
        path:'/',
        name:'login',
        component:()=>import(/*webpackChunckName:'Login*/ '@/page/login.vue')
    },

    {   //主界面
        path:'/index',
        name:'index',
        component:()=>import(/*webpackChunckName:'Index*/ '@/page/index.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
  })

export default router