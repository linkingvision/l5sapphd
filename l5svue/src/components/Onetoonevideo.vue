<template>
   <div class="Onetoonevideo">
       <ion-header>
          <ion-toobar>
            <ion-item class="flatheader">
                 <img src="../assets/imgs/l5slogo.png" alt="">
                 <ion-label style="--color:#FFFFFF">视频对讲</ion-label>
            
                 <ion-button slot="end" class="onlineuser" expand="block" id="ion-button"> 
                      <img src="../assets/imgs/yonghu-10@2x.png" alt="">
                      <!-- <ion-label>在线联系人</ion-label> -->
                      <el-dropdown trigger="click"  @command="handleCommand">
                            <span class="el-dropdown-link">
                                在线联系人
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item, index) in userdata" :key="index" :command='item'>
                                    <img src="../assets/imgs/yonghu-10@2x.png" alt="">{{item.strName}}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                      </el-dropdown>
                 </ion-button>
               
            </ion-item>
          </ion-toobar>
       </ion-header>
       <ion-content class="flatcontent">
          <ion-grid class="leftrow">
             <ion-row class="leftrow">
               <ion-col size="1" class="leftmenu">
                  <ion-list class="leftlist">
                        <ion-item lines='none' class="item-left">
                            <ion-button class="leftbtn">
                               <img src="../assets/imgs/menu.png" alt="">
                            </ion-button>
                        </ion-item>
                        <ion-item lines='none' class="item-left">
                            <ion-button class="leftbtn">
                               <img src="../assets/imgs/onetoone.png" alt="">
                            </ion-button> 
                        </ion-item>
                        <!-- <ion-item lines='none' class="item-left">
                            <ion-button class="leftbtn">
                               <img src="../assets/imgs/control.png" alt="">
                            </ion-button>
                        </ion-item> -->
                        <ion-item lines='none' class="item-left">
                            <ion-button class="leftbtn">
                               <img src="../assets/imgs/seting.png" alt="">
                            </ion-button>
                        </ion-item>
                        <ion-fab vertical="bottom" horizontal="start" slot="fixed" class="leftswitch">
                            <ion-button class="switchbutton" @click="stop()">
                                <img src="../assets/imgs/switch.png" alt="">
                            </ion-button>
                        </ion-fab>
                   </ion-list>
               </ion-col>
               <ion-col size='15' class="leftmenu">
                   <div class="conference">
                       <div class="conferencebgc"></div>
                       <ion-label>暂无联系人</ion-label>
                   </div>
                   <div class="flatvideo">
                       <video id="h5sVideoRemote" src="" class="intercomvideoplay" autoplay webkit-playsinline playsinline style= "object-fit: fill;" poster="../assets/imgs/blank.png"></video>
                       <video id="h5sVideoLocal" muted src="" autoplay class="h5sLocal" webkit-playsinline playsinline></video>
                   </div>
                   <ion-fab class="footerbtn" vertical="bottom" horizontal="center" >
                        <ion-button class="fabbutton" @click="handercall()">
                            <img src="../assets/imgs/audio.png" alt="">
                        </ion-button>
                        <ion-button class="fabbutton" @click="connection()">
                            <img src="../assets/imgs/camera.png" alt="">
                        </ion-button>
                        <ion-button class="fabbutton">
                            <img src="../assets/imgs/gongxiamg.png" alt="">
                        </ion-button>
                   </ion-fab>
                </ion-col>
             </ion-row>
          </ion-grid> 
       </ion-content>
       <ion-footer></ion-footer>
       <eventLists></eventLists>
   </div>
</template>

<script>
import '../assets/js/adapter.js'
import '../assets/js/platform.js'
import '../assets/js/h5splayerhelper.js'
import '../assets/css/h5splayer.css'
import uuid from '../assets/js/uuid1'
import {H5siOS,H5sPlayerCreate} from '../assets/js/h5splayerhelper.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sRTCGetCapability,H5sPlayerAudBack,H5sConference,H5sRTCPush} from '../assets/js/h5splayer.js'
import * as types from '@/vuex/types'
export default {
    name: 'Onetoonevideo',
    data(){
        return{
            v1:undefined,
            h5handler:undefined,
            userdata:[],
            usertoken:this.$route.params.token,
            audioout:'',
            VideoIn:'',
            Bitratess:'',
            Resolution:'',
            AudioIn:''
        }
    },  
 beforeDestroy() {
        if (this.h5handler != undefined)
        {
            this.h5handler.disconnect();
            delete this.h5handler;
            this.h5handler = undefined;
        }
        if (this.v1 != undefined)
        {
            this.v1.disconnect();
            delete this.v1;
            this.v1 = undefined;
        }
  },
 created(){
      H5sRTCGetCapability(this.UpdateCapability)  
   },
  mounted(){
      this.getuser()
      let _this=this
      //  在其他的页面的值
      if(_this.usertoken!=undefined){
        console.log("播放",this.usertoken)
        _this.l5svideplay()
     }
      //  在本页面传过来拨打的值
     _this.$root.bus.$on('meettoken', function(token){
        console.log("播放",token)
        _this.usertoken=token
        _this.l5svideplay()
     });
           
  },
  methods:{
     // 获取用户信息
    getuser(){
          let slideurl=this.$store.state.callport;
          let rooturl=slideurl+"/api/v1/GetOnlineUserList?session=" +this.$store.state.token;
          console.log(rooturl)
          this.$http.get(rooturl).then(res=>{
            console.log(res)
            let useritem=res.data.userList
            if(res.status==200){
                for(let i=0;i<useritem.length;i++){
                if(this.$store.state.Useport.user==useritem[i].strName){
                    continue
                }
                this.userdata.push(useritem[i])
                } 
            }
            }).catch(()=>console.log('promise catch err'))
      },
    //  拨打视频
    handleCommand(command){
         console.log(command)
         let playVlue=command.strName
         this.videocall(playVlue)
     },
     //视频对讲
    videocall(playVlue){
          console.log(playVlue)
          var token = uuid(4, 10);
          this.usertoken=token
          this.$store.commit(types.USERTOKEN, token)
          var starfs=new Date().getTime();
          var endds=new Date().getTime();
          var ks=new Date(starfs).toISOString()+"08:00";
          var jss=new Date(endds).toISOString()+"08:00";

          var url = this.$store.state.callport + "/api/v1/OnetoOneConference?name="
          +this.$store.state.Useport.user+"&token="
          +token+"&begintime="
          +ks+"&endtime="
          +jss+"&user="
          +playVlue+"&session="+ this.$store.state.token;
          this.$http.get(url).then(res=>{
               console.log(res)
               this.l5svideplay();
          })
       } ,
     //播放视频
    l5svideplay(){
          if (this.h5handler != undefined)
          {    
               this.h5handler.disconnect();
               delete this.h5handler;
               this.h5handler = undefined;
          }
        //   console.log(playid,token,streamprofile)
          let conf = {
               videoid:"h5sVideoRemote",
               protocol:this.$store.state.protocol, //http: or https:
               host: this.$store.state.Useport.ip+':'+this.$store.state.Useport.port, //localhost:8080
               streamprofile: "main", // {string} - stream profile, main/sub or other predefine transcoding profile
               rootpath: '/', // '/'
               token: this.usertoken,
               hlsver: 'v1', //v1 is for ts, v2 is for fmp4
               session: this.$store.state.token //session got from login
          };
            console.log("播放",conf);
            
            this.h5handler = new H5sPlayerWS(conf);
            this.h5handler.connect( );
            
            // this.connection()
      },
      //开启视频
      connection(){
            if (this.v1 != undefined)
                {
                    this.v1.disconnect();
                    delete this.v1;
                    this.v1 = undefined;
                }
                var audioout=this.audioout
                var conf1 = {
                    localvideoid:'h5sVideoLocal', //{string} - id of the local video element tag
                    //localvideodom: h5svideodomlocal, //{object} - local video dom. if there has videoid, just use the videoid
                    protocol: this.$store.state.protocol, //http: or https:
                    host:this.$store.state.Useport.ip+':'+this.$store.state.Useport.port, //localhost:8080
                    rootpath:'/', // {string} - path of the app running
                    user:this.$store.state.Useport.user, // {string} - user name
                    type:'media', // {string} - media or sharing
                    audio: audioout,
                    callback: this.PlaybackCB, //Callback for the event
                    userdata: null, // user data
                    session: this.$store.state.token, //session got from login
                    consolelog: 'true' // 'true' or 'false' enable/disable console.log
                };
                // return false
                this.v1 = new H5sRTCPush(conf1);
                console.log(conf1)
                console.log("*******",this.VideoCodec,"1*",
                    this.VideoIn,"2*",
                    this.Bitratess,"5*",
                    this.Resolution,"3*",
                    this.AudioIn,
                    this.v1,
                    true
                )
                // return false
                this.v1.connect(
                    this.VideoIn,
                    this.VideoCodec,
                    this.Bitratess,
                    this.Resolution,
                    this.AudioIn,
                    false
                );
         },
        // 消息
        PlaybackCB(event, userdata){
            
            var msgevent = JSON.parse(event);
            // var chatrecorddata={
            //     user:msgevent.user,
            //     msg:msgevent.msg
            // }
            // this.chatrecord.push(chatrecorddata)
            // this.$nextTick(() => {
            //     let ele = document.getElementById('chatrecord');
            //     ele.scrollTop = ele.scrollHeight;
            // })
            console.log("Playback callback ", event,msgevent,this.chatrecord,chatrecorddata);
        },
        //参数
       UpdateCapability(capability){
            console.log(capability);
            if(capability){
                console.log(capability)
                for (let i = 0; i !== capability['videocodec'].length; ++i) {
                    const data = capability['videocodec'][i];
                     console.log(data)
                    /* Default use H264 */
                    this.VideoCodec=data
                    
                }		
                for (let i = 0; i !== capability['videoin'].length; ++i) {
                    const data = capability['videoin'][i];
                    console.log(data)
                    this.VideoIn=data.id
                   
                }	

                for (let i = 0; i !== capability['audioin'].length; ++i) {
                    const data = capability['audioin'][0];
                    this.AudioIn=data.id
                    
                }
                
                for (let i = 0; i !== capability['audioout'].length; ++i) {
                    const data = capability['audioout'][0];
                    this. AudioOut=data.id
                    
                }
                
                var resolution = ['QVGA', 'VGA', 'D1', '720P', '1080P', '4K', '8K']
                for (let i = 0; i !== resolution.length; ++i) {
                    const data = resolution[i];
                    /* Default use 720P */
                    if (data == '720P')
                    {
                        this.Resolution=data
                    }
                    
                }
                
                var bitrate = ['32', '64', '128', '256', '512', '1024', '2048', '4096']
                for (let i = 0; i !== bitrate.length; ++i) {
                    const data = bitrate[i];
                  
                    /* Default use 720P */
                    if (data == '1024')
                    {
                        this.Bitratess=data
                    }
                }
            }
        }, 
         // 停止 
       stop(){
            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
            }
            if (this.v1 != undefined)
            {
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
            }
        
        }, 
    }
}
</script>

<style scoped>
ul li{
    list-style: none;
}
.Onetoonevideo{
    width:100%;
    height: 100%;
  }
.flatheader{
    --background:#282828;
    font-size: 18px;
    font-weight: 500;
}
.onlineuser{
    font-size: 18px;
    height: 100%;
    font-weight: 500;
    --background:transparent;
}
.flatcontent{
    --background:#020002;
}
.flatheader img{
    display: block;
    width:32px;
    height: 32px;
    margin-right:8px;
}
.flatheader .onlineuser img{
    width:22px;
    height:24px;
}
/* 左菜单 */
.leftmenu{
    --background:#282828;
    margin: 0;
    padding: 0;
    --ion-grid-columns:16;
}   
.leftrow{
    height: 100%;
    width:100%;
    margin: 0;
    padding: 0;
}
.leftlist{
    width:100%;
    height: 100%;
    background-color:#282828;  
}
.item-left{
   background-color:#282828;  
   --background:#282828;
   --inner-padding-start:0;
   --inner-padding-end:10px;
   --padding-start:15px; 
   /* --padding-start:0; */
}
.item-left img{
    display: block;
    width:18px;
    height: 17px;
}
.leftbtn{
    height: 37px; 
    --padding-bottom:5px;
    --padding-top:5px;
    --background:transparent;
    margin: 0 auto;
    --box-shadow:0;
}
.leftswitch{
    width: 100%;
    bottom:60px;
    left:0px;
}
.leftswitch img{
    display: block;
    width:100%;
    height:100%;
}
.switchbutton{
    width:40px;
    height: 40px;
    --padding-bottom:0px;
    --padding-top:0px;
    --padding-start:0px;
    --padding-end:0px;
    --background:transparent;
    --box-shadow:0;
    margin: 0 auto;
}
/* 右边的col */
.conference{
    font-size: 18px;
    color: #29262A;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.conference img{
    width:85px;
    height: 99px;
}
.conferencebgc{
    width:85px;
    height: 99px;
    background: url('../assets/imgs/icon2@2x.png') no-repeat;
    background-size:100% 100%;
    margin: 0 auto;
    margin-bottom: 5px;
 }
 .intercomvideoplay{
    width:100%;
    height:100%;
    margin:0;
    padding: 0;
 }
 .h5sLocal{
    display:none;
 }
 .flatvideo{
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
    left: 0;
    /* z-index: 999999; */
 }
  .el-dropdown-link {
    cursor: pointer;
  }
 .el-dropdown-menu{
     text-align:left;
     width:200px;
     background-color: #1A171A;
     padding-left: 10px;
     /* position: absolute !important;
     right: 1000px !important;
     top:44px !important; */
    
 }
 .el-dropdown-menu li{
     color: #FFFFFF;
     text-align: left;
     line-height: 40px;
     font-weight: 500;
 }
 .el-dropdown-menu li img{
     display: inline-block;
     width:15px;
     height: 18px;
     vertical-align: middle;
 }
 .el-dropdown-menu_item{
    color: #FFFFFF !important;
  }
  /* 底部悬浮按钮 */
  .footerbtn{
     width:291px;
     height:50px;
     background-color:#1B181C;
     bottom: 50px;
     left:53%;
     transform: translateX(-50%);
    }
  .fabbutton{
     --background:transparent;
     --box-shadow:0;
     margin: 0 15px;
  }
  .fabbutton img{
     display:block;
     width:20px;
     height: 22px;
  }
</style>