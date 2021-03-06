// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store/store'
import './style/sass/app.scss'
import './style/less/app.less'
//饿了么ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
//bootstrap
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

//swiper
import Swiper from 'swiper';
import '../static/css/swiper.min.css';

//小分队UI
import xfdUI from './components/index';
//图片压缩
import lrz from 'lrz';  

// 引入echarts
import echarts from 'echarts'

import VueDragResize from 'vue-drag-resize'
Vue.component('vue-drag-resize', VueDragResize)

Vue.prototype.$echarts = echarts  



Vue.use(xfdUI)
Vue.use(MintUI)

Vue.config.productionTip = false
// console.log($)

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
