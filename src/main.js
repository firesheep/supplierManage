import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import { Select, Option, DatePicker, Button, Table, tableColumn, Pagination, Upload, 
	Form, FormItem, Input, InputNumber, Cascader } from 'element-ui'

Vue.use(VueResource)

Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Table)
Vue.use(tableColumn)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Cascader)

Vue.http.options.emulateJSON = true;		//request payload => form data
/*Vue.http.options.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
};*/

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
