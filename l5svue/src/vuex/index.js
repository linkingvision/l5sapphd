import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '@/vuex/types'
Vue.use(Vuex)
export default new Vuex.Store({
       state:localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")):{
       userList:[],
        //使用端口号
       callport:"",
        Useport:{
          ip:" ",
          port:" ",
          user:" ",
          psw:""
         },//查看端口号
         root:null,
         token:null,
         users:null,
         protocol:'',
         usertoken:''
    },
    mutations: {
        saveUserList(state,data){ 
         // data为index请求传过来的数据 赋给state里中的userList的
         console.log(data)
         state.userList = data; 
        },
        [types.USEPORT]: (state, data) => {
          //console.log("+++++++++++++",data);
          localStorage.h5appport= data
          state.callport=data
        },
        [types.LOGIN]:(state, data) => {
          console.log(data)
          localStorage.h5stoken = data
          state.token = data
        },
    
        [types.USEPORTIP]: (state, data) => {
          //console.log("+++++++++++++",data);
          localStorage.h5appportip= data
          state.Useport.ip=data
        },
        [types.USEPORTPORT]: (state, data) => {
          //console.log(data);
          localStorage.h5appportport= data
          state.Useport.port=data
        },
        [types.USEPORTUSER]: (state, data) => {
          //console.log(data);
          localStorage.h5appportuser= data
          state.Useport.user=data
        },
        [types.USEPORTPSW]: (state, data) => {
          //console.log(data);
          localStorage.h5appportpsw= data
          state.Useport.psw=data
        },
        [types.PROTOCOL]: (state, data) => {
          //console.log(data);
          localStorage.h5appprotocol= data
          state.protocol=data
        },
        [types.USERTOKEN]:(state, data) => {
          console.log(data)
          state.usertoken = data
        },
      },
         actions:{},
         getters:{}
  })