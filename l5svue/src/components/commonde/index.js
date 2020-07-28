// 注册全局组件
import Vue from 'vue'
import Event from './index.vue'

const eventLists={
   install:function(vue){
    //注册并获取组件，然后在main.js中引用
      Vue.component('eventLists', Event)
   }
}
export default eventLists