import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import "@/assets/style/style.css"
import '@/assets/style/h5-demo.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'swiper/swiper-bundle.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.use(ElementUI);
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
