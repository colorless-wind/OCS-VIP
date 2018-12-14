// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//* vue库
import Vue from 'vue'
import FastClick from 'fastclick'
//* Vue路由
import VueRouter from 'vue-router'
//* promise 的 HTTP 库（用于发送请求）
import axios from 'axios'
//import Lockr from 'lockr'
//* md5加密
import md5 from 'js-md5';
//* 引用vue国际化插件
import VueI18n from 'vue-i18n'
//* 引用语言配置文件
import messages from './assets/i18n/i18n_multi'
//* 引用vux组件 -- toast
import {
    Toast
} from 'vux'
//* app
import App from './App'
//* 路由列表（数组型）
import routes from './router/index'
//* 自定义组件
import components from './components/'
//* 自定义配置常量
import CONST from './assets/js/const'
//* 引用公共样式
import './assets/css/common.css'
//* 引用图标库
import './assets/iconfont/iconfont.css'
//* 绑定配置常量至Vue全局
Vue.prototype.CONST = CONST;
//* 追加md5
Vue.prototype.$md5 = md5;
//* 注册vue国际化插件
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'zh', // set locale
    messages , // set locale messages
})
//* 注册vux组件 -- toast
Vue.component('toast', Toast)
//* 加载自定义模板并追加前缀 例：header组件 引用为 <v-header></v-header>
Object.keys(components).forEach((key) => {
    var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
    Vue.component(`v${name}`, components[key])
})
//* 关于服务端请求的相关设置
Vue.prototype.$axios = axios
Vue.prototype.$loading = false
axios.defaults.baseURL = 'http://localhost:3000/api'
//axios.defaults.baseURL = 'https://cnodejs.org/api/'
axios.defaults.timeout = 1000 * 15
//axios.defaults.headers.authKey = Lockr.get('authKey')
axios.defaults.headers.authKey = '123456abcdef'
//axios.defaults.headers.sessionId = Lockr.get('sessionId')
axios.defaults.headers['Content-Type'] = 'application/json'
axios.interceptors.request.use(function (config) { // 这里的config包含每次请求的内容
    //  if (store.state.authKey) {
    //    //config.headers.authKey = Lockr.get('authKey')
    //    config.headers.authKey = '12345678abcdefgh'
    //  }
    return config
}, function (err) {
    return Promise.reject(err)
})

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app-box')
