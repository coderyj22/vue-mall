import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.prototype.bus = new Vue()

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
