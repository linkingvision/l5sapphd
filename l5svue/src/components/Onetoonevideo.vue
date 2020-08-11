<template>
   <div class="Onetoonevideo">
       <ion-content class="flatcontent">
          <ion-grid class="leftrow">
             <ion-row class="leftrow">
                <ion-col size='16' class="leftmenu">
                     <!-- left top -->
                    <ion-fab vertical="top" horizontal="start" class="videodesc">
                          <ion-label class="videolabel">
                               <h3>视频对讲研讨会</h3>
                               <p>
                                   会议号：<span v-if="usertoken!=null">{{usertoken}}</span><span v-if="usertoken==null">暂无会议</span>
                                   参会人:<span>王经理</span>
                               </p>
                          </ion-label>
                    </ion-fab>
                     <!-- left top -->
                    <ion-fab vertical="top" horizontal="end" class="videoleave">
                          <ion-button class="videobutton" shape="round" @click="leave()">
                              <ion-label>离开</ion-label>
                          </ion-button>
                    </ion-fab>
                    
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
                        <ion-button class="fabbuttontwo" @click="connection()">
                            <img src="../assets/imgs/camera.png" alt="">
                        </ion-button>
                        <ion-button class="fabbuttonthree">
                            <img src="../assets/imgs/gongxiamg.png" alt="">
                        </ion-button>
                   </ion-fab>
                   <ion-fab vertical="bottom" horizontal="end" class="sendnativ">
                       <ion-item class="nativsend" lines='none'>
                           <ion-input class="sendinput" enterkeyhint='send' :value='chattext'  @ionChange="chattext=$event.target.value"></ion-input>
                           <ion-button class="sendbutton" @click="sendmessage()">
                               <ion-labe>
                                   <p>发</p>
                                   <p>送</p>
                               </ion-labe>
                           </ion-button>
                       </ion-item>
                   </ion-fab>
                </ion-col>
             </ion-row>
          </ion-grid> 
       </ion-content>
       <ion-footer></ion-footer>
       <!-- <eventLists></eventLists> -->
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
    props:["userdatatoken"],
    data(){
        return{
            v1:undefined,
            h5handler:undefined,
            userdata:[],
            usertoken:this.userdatatoken,
            audioout:'',
            VideoIn:'',
            Bitratess:'',
            Resolution:'',
            AudioIn:'',
            chattext:'',
        }
    }, 
 watch:{
    userdatatoken:{
        handler(val,oldval){
           this.usertoken=val
        },
        deep:true
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
      console.log(this.userdatatoken)
      let _this=this
      //  在本页面的拨打过来的值
     _this.$root.bus.$on('meettoken', function(token){
        console.log("播放",token)
        _this.usertoken=token   
        _this.l5svideplay()
     });
           
  },
  methods:{
    // 发送消息
    sendmessage(){
            console.log("消息内容",this.chattext);
            if (this.v1 != undefined)
            {
                if(this.chattext){
                    console.log('我有字了')
                    this.v1.send(this.usertoken,this.chattext)
                    this.chattext=""
                }else{
                    this.$message('消息不能为空');
                }
            }
        },
    // 播放 
    l5splay(){
        console.log(this.usertoken)
       if(this.userdatatoken!==null){
           this.l5svideplay()
       }
    },
     //播放视频
    l5svideplay(){
          console.log(this.usertoken)
         if (this.h5handler != undefined)
          {    
               this.h5handler.disconnect();
               delete this.h5handler;
               this.h5handler = undefined;
          }
        //   console.log(playid,token,streamprofile)
          let conftoken=this.usertoken
          let conf = {
               videoid:"h5sVideoRemote",
               protocol:this.$store.state.protocol, //http: or https:
               host: this.$store.state.Useport.ip+':'+this.$store.state.Useport.port, //localhost:8080
               streamprofile: "main", // {string} - stream profile, main/sub or other predefine transcoding profile
               rootpath: '/', // '/'
               token:conftoken,
               hlsver: 'v1', //v1 is for ts, v2 is for fmp4
               session: this.$store.state.token //session got from login
          };
            console.log("播放",conf);
            console.log(conftoken)
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
                    // facingmode:"environment", // {string} - user or environment; desktop remove this config
                    audio: audioout,
                    callback: this.PlaybackCB, //Callback for the event
                    userdata: null, // user data
                    session: this.$store.state.token, //session got from login
                    consolelog: 'true' // 'true' or 'false' enable/disable console.log
                };
                // return false
                console.log('******'+conf1)
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
            console.log(1)
            var msgevent = JSON.parse(event);
            console.log('发来的消息',msgevent)
            // var chatrecorddata={ 
            //     user:msgevent.user,
            //     msg:msgevent.msg
            // }
            // this.chatrecord.push(chatrecorddata)
            // this.$nextTick(() => {
            //     let ele = document.getElementById('chatrecord');
            //     ele.scrollTop = ele.scrollHeight;
            // })
            console.log("Playback callback ", event,msgevent);
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
        // 离开
       leave(){
            if (this.h5handler!= undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
                console.log('h5handler')
                this.$parent.oneToonevue()
                this.getuser()
                $("#l5sShadesktop").get(0).poster = '../assets/imgs/blank.png';
            }
            if (this.v1!= undefined)
            {
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
                this.$parent.oneToonevue()
             }
             this.$parent.conferencebtn()
        },
         // 停止 
       stop(){
            if (this.h5handler!= undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
                console.log('h5handler')
                this.$parent.oneToonevue()
                this.getuser()
                $("#l5sShadesktop").get(0).poster = '../assets/imgs/blank.png';
            }
            if (this.v1!= undefined)
            {
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
                this.$parent.oneToonevue()
             }
             console.log('停止')
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
    font-weight: 700;
}
/* 头部 */
.videodesc{
    left:20px;
    z-index: 1;
}
.videoleave{
    right: 20px;
    z-index: 1;
}
.videobutton{
    margin-top: 20px;
    height: 35px;
    font-size: 10px;
}
.videolabel{
    text-align: left;
    margin-left: 20px;
}
.videolabel h3{
    color: #FCF9FC;
    font-weight: 700;
    line-height: 25px;
    font-size: 13px;
}
.videolabel p{
    color:#C9C6C9;
    font-weight: 500;
    font-size: 8px;
}
.videolabel p span:nth-child(1){
    margin-right:10px;
}
/* 获取在线客户 */
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
     z-index: 1;
    }
  .fabbutton{
     --background:transparent;
     --box-shadow:0;
     margin: 0 15px;
  }
  .fabbutton img{
     display:block;
     width:18px;
     height: 22px;
  }
  .fabbuttontwo{
    --background:transparent;
     --box-shadow:0;
     margin: 0 10px;
  }
  .fabbuttontwo img{
     display:block;
     width:25px;
     height: 20px;
  }
  .fabbuttonthree{
    --background:transparent;
     --box-shadow:0;
     margin: 0 10px;
  }
  .fabbuttonthree img{
     display:block;
     width:25px;
     height: 22px;
  }
  /* 消息发送 */
  .sendnativ{
     bottom: 50px;
     z-index: 1;
  }
 .nativsend{
    --background: transparent;
    width:300px;
    --min-height:40px;
    --padding-bottom:0;
    --padding-top:0;
    --inner-padding-end:0;
    }
  .sendinput{
    --background:#1B181C;
    /* --padding-top:3px;
    --padding-bottom:3px; */    
    --padding-start:8px !important;
    border-radius:10px 0 0 10px;
     --color:#FFFFFF;
    }
  .sendbutton{
      margin: 0;
      height: 100%;
      --border-radius:0 10px 10px 0;
    }
   .sendbutton p{
      line-height: 0;
      
   }
</style>