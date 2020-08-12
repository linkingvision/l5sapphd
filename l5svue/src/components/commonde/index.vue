<template>
   <div>

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
          struuid:undefined
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
          //  this.$root.bus.$emit('meettoken', this.meettoken);
           this.$emit('meettoken',[this.meettoken,this.struuid])
           console.log(this.struuid)
           this.$parent.oneToonevue()
        }
     },
       //会议通知弹窗    
     presentAlertConfirm() {
      return this.$ionic.alertController
          .create({
          cssClass: 'my-custom-class',
          header: '视频会议',
          message: '是否加入视频会议？',
          buttons: [{
              text: '否',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
              console.log('Confirm Cancel:', blah)
              },},
              {
              text: '是',
              handler: () => {
                 console.log(this.meettoken)
                 this.l5svideplay()
              },
            },
          ],
        })
        .then(a => a.present())
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
                this.presentAlertConfirm()
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
.alert-wrapper {
  background: #191919;
}
.my-custom-class .alert-wrapper {
  background: #191919;
}
.my-custom-class {
  --background: #191919;
} 
</style>
<style>
.alert-wrapper {
  background: #191919;
}
.my-custom-class .alert-wrapper {
  background: #191919;
} 
</style>