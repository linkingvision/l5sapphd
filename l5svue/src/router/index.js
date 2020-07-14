import Vue from 'vue'
// import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { IonicVueRouter } from '@ionic/vue'
Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
