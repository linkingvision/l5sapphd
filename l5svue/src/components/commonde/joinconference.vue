<template>
    <div class="joinconferce">
        <ion-content class="joincontent">
            <div class="confercenumposithion">
                <ion-item lines="none" class="confercenum">
                    <ion-label>会议号</ion-label>
                    <ion-input class="joininput" placeholder="请输入会议号" :value='joinconferencename'  @ionChange="joinconferencename=$event.target.value"></ion-input>
                </ion-item>
                <ion-item lines="none" class="confercenum">
                    <ion-button slot="start" color='#0B62FF'  shape="round" fill="outline" class="cancelbtn" @click="cancelbtn()">取消</ion-button>
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
          joinconferencename:'',
          cameradata:'user',
          camera:[
                {
                value: "environment",
                label: "environment"
           },{
                value: "user",
                label: "user"
           }
         ],
        }
   },
  mounted(){},
  methods:{
    // 确定加入会议
      dongokey(){
          if(this.joinconferencename!=undefined){
        //   this.$store.commit(types.CAMERA, this.cameradata)
          this.$root.bus.$emit('joinmeettoken', this.joinconferencename);
        }
      },
    //   取消会议
      cancelbtn(){
          console.log(88)
        this.$parent.joincancelhidden()
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
     margin-top: 10px;
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
     height: 3  0px;
 }
 .confercenumposithion{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
 }
</style>