import {
	createRouter,
	createWebHashHistory
} from "vue-router"

const routes = [{ //登陆界面
		path: '/',
		name: 'login',
		component: () => import('@/page/login.vue')
	},

	{ //登陆界面
		path: '/QRcode',
		name: 'QRcode',
		component: () => import('@/page/QRcode.vue')
	},

	{ //主界面
		path: '/index',
		name: 'index',
		component: () => import('@/page/index.vue'),
		redirect: '/toDo', //默认进入页面
		//二级路由
		children: [{ //代办事项
				path: '/toDo',
				name: 'toDo',
				component: () => import('@/page/toDo.vue'),
			},
			{ //奖池管理
				path: '/poolManage',
				name: 'poolManage',
				component: () => import('@/page/poolManage.vue'),
			},
			{ //商户认证
				path: '/verifyMerc',
				name: 'verifyMerc',
				component: () => import('@/page/verifyMerc.vue'),
			},
			{ //参数修改
				path: '/changePara',
				name: 'changePara',
				component: () => import('@/page/changePara.vue'),
			},	
			{ //测试界面
				path: '/test',
				name: 'test',
				component: () => import('@/page/test.vue')
			},
		]

	},
]

const router = createRouter({

    history: createWebHashHistory(process.env.BASE_URL),
    routes, 
  })


export default router
