// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import axios from 'axios'
//配置axios
import requests from "./api2/new-axios";
Vue.prototype.rq=requests
//配置结束
Vue.prototype.rtt=Vue.$router


//开始版本1.0
Vue.config.productionTip = true

Vue.use(ElementUI, {
  size: 'small'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
