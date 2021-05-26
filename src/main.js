import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from "axios";
import "@/assets/styles/reset.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/animate.css";
import Pagination from '@/components/Pagination';
import "swiper/swiper.less";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "@/font/font.less";

Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('Pagination', Pagination);

router.beforeEach((to, form, next) => {
  NProgress.start();
  // document.title = "徐圩新区环保治理攻坚大队";
  next();
  NProgress.done();
})

router.afterEach((to) => {
  NProgress.done();
  console.log(to, '---');
  if (to.path == '/protection/service/bearfruit' ||
    to.path == '/protection/service/disclosure' ||
    to.path == '/protection/news/great' ||
    to.path == '/protection/news/media' ||
    to.path == '/protection/news/policy' ||
    to.path == '/protection/resources/training' ||
    to.path == '/protection/party/index' ||
    to.path == '/protection/party/activities'
  ) {
    window.scrollTo(0, 530)
  } else if(to.path == '/protection/search') {
    window.scrollTo(0, 400)
  } else {
    window.scrollTo(0, 0)
  }


});

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')