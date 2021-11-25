import Vue from 'vue'
import App from './App.vue'
import 'material-icons/iconfont/material-icons.css';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
