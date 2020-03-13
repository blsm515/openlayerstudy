import Vue from 'vue'
import App from './Travel.vue'
// import 'ol/ol.css';
// import {Map, View} from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import store from './store'

 import router from '../router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
   router,
  // store
}).$mount('#app')
