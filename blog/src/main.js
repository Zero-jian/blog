// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//Vuex
import createStroe from './store/index'
//Vue-Router
import createRouter from './router/index'
import VueLazyload from 'vue-lazyload'
import 'babel-polyfill'

//使用Vuex
const store = createStroe();
//使用Vue-Router
const router = createRouter();
Vue.config.productionTip = false

//设置图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/user.png',
  loading: '../static/logo.jpg',
  attempt: 1
})

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
