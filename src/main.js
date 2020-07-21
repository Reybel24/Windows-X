/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Font awesome icons
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, fab)

// For scrolling when new content is added
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);

// Event bus
// import EventBus from '@/util/event-bus.js'

// For font-awesome so I can use <i></i> icons
dom.watch()
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
