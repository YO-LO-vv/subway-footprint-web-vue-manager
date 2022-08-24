import { createApp } from 'vue'
import App from './App.vue'
//element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//router
import router from './router/index.js'

//全局css
import '../style/headtap.css'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(router)
app.mount('#app')
