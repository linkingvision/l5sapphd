import Vue from 'vue'
// import Router from 'vue-router'
import Flatlogin from '@/components/flatlogin'
import Onetoonevideo from '@/components/Onetoonevideo'
import Conference from '@/components/conference'
import { IonicVueRouter } from '@ionic/vue'
Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  routes: [
    {
      path: '/',
      redirect: 'Flatlogin',
      component: Flatlogin
    },
    {
      path: '/Flatlogin',
      name: 'Flatlogin',
      component: Flatlogin
    },
    {
      path: '/Onetoonevideo',
      name: 'Onetoonevideo',
      component: Onetoonevideo 
    },
    {
      path: '/Conference',
      name: 'Conference',
      component: Conference 
    },
  ]
})
