import {createRouter,createWebHashHistory} from "vue-router"

const routes=[
    {
        path:'/',
        name:'test',
        component:()=>import(/*webpackChunckName:'Login*/ '@/components/test.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
  })

export default router