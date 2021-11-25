import Vue from 'vue'
import App from './App.vue'
import 'material-icons/iconfont/material-icons.css';
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

Vue.config.productionTip = false
// eslint-disable-next-line no-unused-vars
var vm = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
