import Vue from 'vue'
import App from './App'
import * as api from '@/common/api.js'
import validate from '@/utils/graceChecker.js'

import store from './store'

import uniPopup from './components/uni-popup/uni-popup.vue';
Vue.component('uni-popup', uniPopup);
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
Vue.prototype.$api = api;
Vue.prototype.$validate = validate
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
