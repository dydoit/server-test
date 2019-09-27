import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
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
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
