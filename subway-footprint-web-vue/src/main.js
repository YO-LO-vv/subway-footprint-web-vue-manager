import { createApp } from 'vue'
import App from './App.vue'
//导入element plus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app =createApp(App)


app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')

