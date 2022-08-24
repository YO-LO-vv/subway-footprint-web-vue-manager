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
        component:()=>import(/*webpackChunckName:'Index*/ '@/page/index.vue'),
        redirect:'/toDo', //默认进入页面
        //二级路由
        children:[
            {   //代办事项
                path:'/toDo',
                name:'toDo',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/toDo.vue'),
            },
            {   //奖池管理
                path:'/poolManage',
                name:'poolManage',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/poolManage.vue'),
            },
            {   //信息查询
                path:'/searchInfo',
                name:'searchInfo',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/searchInfo.vue'),
            },
            {   //商户认证
                path:'/verifyMerc',
                name:'verifyMerc',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/verifyMerc.vue'),
            },
            {   //参数修改
                path:'/changePara',
                name:'changePara',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/changePara.vue'),
            },
        ]

    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
  })

export default router