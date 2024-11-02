import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/src/index.scss';  // 确保引入的是 SCSS 文件而不是 CSS
import './styles/index.scss';  // 引入自定义样式
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/global.scss';
import '@/styles/NextContainer.css';

const app = createApp(App)

// 配置 axios
axios.defaults.baseURL = 'https://ds.sccdc.cn'; 
// axios.defaults.baseURL = 'http://43.138.213.54:8080'; 

app.config.globalProperties.$http = axios;

// 路由挂载
app.use(router)
app.use(createPinia());

// 只需调用一次 ElementPlus
app.use(ElementPlus, {
  locale: zhCn,  
})

// 导入 element-plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 挂载 Vue 应用
app.mount('#app')
