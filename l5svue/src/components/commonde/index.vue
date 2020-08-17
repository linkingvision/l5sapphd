<template>
    <div class="showevent" v-show="showevetlist=='show'">
       <ion-fab vertical="start" horizontal="start" slot="fixed" class="onetoonemoald">
            <ion-conten class="onetoonecontentmoadl">
                <div class="oneTooneposition">
                     <ion-item class="onetooneconfercenum" lines="none">
                           <ion-label>是否加入视频会议？</ion-label>
                     </ion-item>
                     <ion-item lines="none" class="camer-switchitem">
                           <ion-label class="camer-label">{{camerlabelname}}</ion-label>
                           <ion-toggle class='camer-togggle' :checked="answercamercheck"  @ionChange="answercamercheck=$event.target.checked">
                           </ion-toggle>
                     </ion-item>
                     <ion-item lines="none" class="onetooneconfercenum">
                           <ion-button slot="start" color='secondary'  shape="round" fill="outline" class="onecancelbtn" @click="onetoonecancell()">取消</ion-button>
                           <ion-button slot="end"  shape="round" class="onecancelbtn" @click="onetoonedongokey()">确定</ion-button>
                     </ion-item>
               </div>
            </ion-conten>
      </ion-fab>
   </div>
</template>

<script>
import '../../assets/js/adapter.js'
import {H5sEvent} from '../../assets/js/h5sevent.js'
export default {
   name:"event",
   data(){
       return{
          meettoken:undefined,
		    sharedstart:undefined,
		    sharedstop:undefined, 
          el:undefined,
          struuid:undefined,
          answercamercheck:false,
          showevetlist:'0',
          createdconferencename:'',
          camercheck:false,
          camerlabelname:'user',
       }
   },
  watch:{
     	 answercamercheck(val){
              this.camercheck=val
			  if(this.camercheck==true){
                 this.camerlabelname='environment'
             }else{
                this.camerlabelname='user'
            }
      }
   },
  beforeDestroy() {
      if (this.e1 != undefined)
         {
         this.e1.disconnect();
         delete this.e1;
         this.e1 = undefined;
      }
   },
  created(){
        //  this.EventCB
   },
   mounted(){
      this.videoConferen()  
  }, 
  methods:{
     // 视频播放
     l5svideplay(){
        if(this.meettoken!=undefined){
           if(this.$parent.conferencevalue=='2'){
              this.$root.bus.$emit('meettoken', this.meettoken,this.struuid,this.camerlabelname);
              console.log(this.struuid)
           }else{
              this.$emit('meettoken',[this.meettoken,this.struuid,this.camerlabelname])
              console.log(this.struuid)
              this.$parent.oneToonevue()
           }
           
        }
     },
     // 显示事件
    showevent(){
        this.$parent.eventbgc()
        this.showevetlist='show'
    },
     // 取消事件
    onetoonecancell(){
        this.$parent.cancelleventbgc()
        this.showevetlist='0'
     },
     // 确定事件
     onetoonedongokey(){
        this.l5svideplay()
        this.$parent.cancelleventbgc()
        this.showevetlist='0'
     },
    
    videoConferen(){
        var root = process.env.API_ROOT;
        var wsroot = process.env.WS_HOST_ROOT;
        if (root == undefined){
            root = this.$store.state.protocol + '//' +this.$store.state.Useport.ip+":"+this.$store.state.Useport.port + window.location.pathname;
        }
        if (wsroot == undefined)
        {
            wsroot =this.$store.state.Useport.ip+":"+this.$store.state.Useport.port;
        }
         let conf1 = {
         protocol:this.$store.state.protocol, //http: or https:
         host:wsroot, //localhost:8080
         rootpath:'/', // '/'
         callback:this.EventCB, 
         userdata: null, // user data
         session: this.$store.state.token //session got from login	
         };
         console.log(conf1)
         this.e1 = new H5sEvent(conf1);
         this.e1.connect();
     },
       
      EventCB(event, userdata){
            console.log("Event callback ", event);
            var msgevent = JSON.parse(event);
            console.log("****",msgevent)
			if(msgevent.type=="H5S_EVENT_SEND_CONFERENCE"){
                this.meettoken=msgevent.sendConference.token;
                this.struuid=msgevent.strUUID
                console.log("****",msgevent)
                this.showevent()
         }else if(msgevent.type=="H5S_EVENT_START_SHARE_DESKTOP"){
				        // this.sharedstart=msgevent.shareDesktop.token;
				        // console.log("****",msgevent)
			}else if(msgevent.type=="H5S_EVENT_STOP_SHARE_DESKTOP"){
				        // this.sharedstop=msgevent.stopShareDesktop.token;
			        	// console.log("****",msgevent)
		}	
     },
  
  }
}
</script>

<style scoped>
.onetoonecontentmoadl{
      --background:#282828;
}
.oneTooneposition{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
}
.onetoonemoald{
      width:30%;
      height: 25%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background-color: #282828;
      z-index:10001 !important;
      /* display:none; */
}
.onetooneconfercenum{
    --background:transparent;
    --color:#FFFFFF ;
    font-size: 18px;
    /* margin-bottom:5px; */
    text-align: center;
 }
.onecancelbtn{
     width: 80px;
     height: 30px;
}
.camer-switchitem{
    --background:transparent;
    --color:#FFFFFF;
    --min-height:20px;
    font-size: 18px;
    width: 190px;
    --padding-start:18px;
    margin: 0 auto;
}
</style>
