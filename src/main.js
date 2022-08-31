import { createApp } from 'vue'
import App from './App.vue'
//element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//router
import router from './router/index.js'
//api
import axios from 'axios'
import qs from 'qs'

//全局css
import '../style/headtap.css'

//jq
import jquery from "jquery";

// import $ from "jquery";
// import "./lib/svg-pan-zoom.js";
// import "./lib/hammer.min.js";
// import "./lib/jquery.js";
// import "./lib/limitTextNum.js";
// import svgPanZoom from "svg-pan-zoom";


const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(router,jquery)
app.config.globalProperties.$axios=axios
app.config.globalProperties.$qs=qs
app.mount('#app')