<template>
    <div class="joinconferce">
        <ion-content class="joincontent">
            <div class="confercenumposithion">
                <ion-item lines="none" class="confercenum">
                    <ion-label>摄像头</ion-label>
                    <ion-input class="joininput">
                        <ion-select 
                        interface="popover" 
                        class="join-select" 
                        slot="end" 
                        :value='cameradata' 
                        @ionChange="cameradata=$event.target.value">
                            <ion-select-option class="remor" v-for="(item,index) in camera" :key="index" :value='item.value'>{{item.label}}</ion-select-option>
                        </ion-select>
                    </ion-input>
                </ion-item>
                <ion-item lines="none" class="confercenum">
                    <ion-button slot="start" 	color='#0B62FF'  shape="round" fill="outline" class="cancelbtn" @click="cancelbtn()">取消</ion-button>
                    <ion-button slot="end"  shape="round" class="dongbtn" @click="dongokey()">确定</ion-button>
                </ion-item>
            </div>
        </ion-content>
    </div>
</template>

<script>
import * as types from '@/vuex/types'
export default {
  data(){
      return{
          camera:[
                 {
                  value: "environment",
                  label: "environment"
                },{
                  value: "user",
                  label: "user"
                }
                ],
          cameradata:'user'
        }
   },
  mounted(){},
  methods:{
    // 确定加入会议
      dongokey(){
          console.log(this.cameradata)
          if(this.cameradata!=undefined){
            this.$root.bus.$emit('connection', this.cameradata);
        }
      },
    //   取消会议
      cancelbtn(){
          console.log(88)
          this.$parent.cancelluploadinfo()
      }
  }
}
</script>

<style scoped>
 .joinconferce{
    width: 100%;
    height:100%;
 }
 .joincontent{
    --background:#282828;
 }
 .confercenum{
    --background:transparent;
    --color:#FFFFFF ;
    font-size: 18px;
    /* margin-bottom:5px; */
 }
 .joininput{
    border: 1px solid #303030;
    --background:#282828;
    --color:#9A9A9A;
    margin-left: 15px;
    border-radius: 10px;
    height: 40px;
 }
 .confercenum:nth-child(1){
     margin-top: 20px;
 }
 .confercenum:nth-child(3){
     margin-top: 5px;
 }
 ion-select {
     color: #9A9A9A;
 }
 .join-select{
     width: 100%;
     color: #9A9A9A;
 }
 .cancelbtn{
     width: 80px;
     height: 30px;
}
 .dongbtn{
     width: 80px;
     height: 30px;
 }
.confercenumposithion{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
 }
</style>