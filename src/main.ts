import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './global/register-icons' // 注册全部图标

// 针对ElMessage和ElLoading等组件引入样式
import 'element-plus/theme-chalk/el-message.css'






// 1.全局注册element-plus：方便简洁
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// 2.按需引入：
// import { ElButton } from 'element-plus'

// createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)
// app.use(ElementPlus)
app.mount('#app')
