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
            {   //地铁图更新
                path:'/updateSub',
                name:'updateSub',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/updateSub.vue'),
            },
            {   //宝箱概率修改
                path:'/changePro',
                name:'changePro',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/changePro.vue'),
            },
            {   //谈积分修改
                path:'/changeCre',
                name:'changeCre',
                component:()=>import(/*webpackChunckName:'Index*/ '@/page/changeCre.vue'),
            },
        ]

    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes, 
  })

export default router