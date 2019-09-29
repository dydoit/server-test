import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import './routePermit'
import {
  Button,
  Select,
  Input,
  Form,
  FormItem,
} from 'element-ui';

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.prototype.$http = axios
/* eslint-disable no-new */
// router.addRoutes([
//   {
//     path: '/shop',
//     component: ()=>import('@/views/Shop.vue')
//   }
// ])
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
