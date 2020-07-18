import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'

// Styles
import 'element-ui/lib/theme-chalk/index.css';
import './styles/styles.scss'

Vue.use(ElementUI, { locale })
Vue.use(require('vue-moment'));
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
