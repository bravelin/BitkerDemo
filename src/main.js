import Vue from 'vue'
import App from './App.vue'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import 'vuescroll/dist/vuescroll.css'
import './registerServiceWorker'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(vuescroll)
Vue.prototype.$echarts = echarts

new Vue({
    render: h => h(App)
}).$mount('#app')
