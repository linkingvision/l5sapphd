<template>
   <div class="Onetoonevideo">
        <eventLists @meettoken='meettokenchild'></eventLists>
       <ion-header>
          <ion-toobar>
            <ion-item class="flatheader">
                 <img src="../assets/imgs/l5slogo.png" alt="">
                 <ion-label style="--color:#FFFFFF" v-if="conferencevalue=='1'" @click="getuserlist()" >视频会议</ion-label>
                 <ion-label style="--color:#FFFFFF" v-if="conferencevalue=='2'">视频对讲</ion-label>
                 <ion-label style="--color:#FFFFFF" v-if="conferencevalue=='Videoconferenceintercom'">视频会议</ion-label>
                <ion-button slot="end" class="onlineuser" expand="block" id="ion-button" v-if="conferencevalue=='2'" @click="reloaduserlist()"> 
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

                <ion-button slot="end" class="onlineuser" expand="block" id="ion-button" v-if="conferencevalue=='Videoconferenceintercom'"> 
                        <img src="../assets/imgs/yonghu-10@2x.png" alt="">
                        <!-- <ion-label>在线联系人</ion-label> -->
                        <el-dropdown trigger="click"  @command="handleCommand">
                                <span class="el-dropdown-link">
                                    参会成员
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item, index) in userdataconfer" :key="index" :command='item'>
                                        <img src="../assets/imgs/yonghu-10@2x.png" alt="">{{item.strName}} 
                                        <span v-if="item.bOnline" class="online">.在线</span><span v-if="!item.bOnline" class="noonline">.离线</span>
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
                        <ion-item lines='none' class="item-left" >
                            <ion-button class="leftbtn" id="leftbtnone" @click="conferencebtn($event)">
                               <img src="../assets/imgs/menu.png" alt="">
                            </ion-button>
                        </ion-item>
                        <ion-item lines='none' class="item-left"  @click="oneToonevue()">
                            <ion-button class="leftbtn" id="leftbtntwo">
                               <img src="../assets/imgs/onetoone.png" alt="">
                            </ion-button> 
                        </ion-item>
                        <ion-item lines='none' class="item-left" value='3' @click="sendbutton()">
                            <ion-button class="leftbtn" id="leftbtnthree">
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
                  <Conference v-if="conferencevalue=='1'" @Videoconference='mettuserlist' ref="linkconference"></Conference>
                  <Videoconferenceintercom v-if="conferencevalue=='Videoconferenceintercom'" ref="linkVideoconference" :videotokeo='userdataconfertoken' :userdataconferpro='userdataconfer'></Videoconferenceintercom>
                  <Onetoone v-if="conferencevalue=='2'" ref="linkonetoone" :userdatatoken="usertokens" :playusername='playvideoprops' :struuiname='struuid'></Onetoone>
               </ion-col>
             </ion-row>
          </ion-grid> 
       </ion-content>
       <ion-footer></ion-footer>
       <!--创建会议弹框 -->
       <ion-backdrop stop-propagation="true" class="backdrop" ></ion-backdrop>
       
       <ion-fab vertical="start" horizontal="start" slot="fixed" class="createdModal">
                <Modal @created='createdlink'></Modal>
       </ion-fab>
       
       <!-- 加入会议弹窗 -->
        <ion-fab vertical="start" horizontal="start" slot="fixed" class="Joinconference">
             <Joinconference></Joinconference>
        </ion-fab>
        
        <!-- 上传视频的弹窗 -->
        <ion-fab vertical="start" horizontal="start" slot="fixed" class="camerinfo">
             <Connection></Connection>
        </ion-fab>
        
        <!--onetoone语音对讲弹窗 -->
        <ion-fab vertical="start" horizontal="start" slot="fixed" class="onetoonemoald">
            <ion-conten class="onetoonecontentmoadl">
                <div class="oneTooneposition">
                    <ion-item class="onetooneconfercenum" lines="none">
                        <ion-label>确定要呼叫<span style="color:#67C23A;">{{playVluename}}</span>吗？</ion-label>
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
import '../assets/js/adapter.js'
import '../assets/js/platform.js'
import '../assets/js/h5splayerhelper.js'
import '../assets/css/h5splayer.css'
import uuid from '../assets/js/uuid1'
import {H5siOS,H5sPlayerCreate} from '../assets/js/h5splayerhelper.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sRTCGetCapability,H5sPlayerAudBack,H5sConference,H5sRTCPush} from '../assets/js/h5splayer.js'
import * as types from '@/vuex/types'
import Conference from './conference'
import Videoconferenceintercom from './Videoconferenceintercom'
import Onetoone from './Onetoonevideo'
import Modal from './commonde/modal.vue'
import Joinconference from './commonde/joinconference.vue'
import Connection from './commonde/connection'
export default {
    name: 'Onetoonevideo',
    components: {
        Conference,
        Videoconferenceintercom,
        Onetoone,
        Modal,
        Joinconference,
        Connection,
    },
    data(){
        return{
            v1:undefined,
            h5handler:undefined,
            userdata:[],
            userdataconfer:[],
            userdataconfertoken:'',
            usertokens:'',
            conferencevalue:'1',
            playVluename:'',
            playvideoprops:'',
            struuid:''
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
     $("#leftbtnone").addClass('newClass') 
  },
  methods:{
    createdlink(){
      this.$refs.linkconference.meetingdata()
    },
     //  点击打开会议页面
    conferencebtn(e){
        this.conferencevalue='1'
        
        $("#leftbtnone").addClass('newClass')
        $("#leftbtntwo").removeClass('newClass')
        $("#leftbtnthree").removeClass('newClass')
     },
     //  点击打开一对一会议
    oneToonevue(){
        this.conferencevalue='2'
        
        $("#leftbtntwo").addClass('newClass')
        $("#leftbtnone").removeClass('newClass')
        $("#leftbtnthree").removeClass('newClass')
    },
     //  点击打开进入设置页面
     sendbutton(){
        this.conferencevalue='3' 
        $("#leftbtnthree").addClass('newClass')
        $("#leftbtntwo").removeClass('newClass')
        $("#leftbtnone").removeClass('newClass')
    },
     // 进入会议页面的显示
    Videoconferenceintercom(){
        this.conferencevalue='Videoconferenceintercom' 
    },
    // 显示模态框
    createdModal(){
         $('.backdrop').css('display','block')
         $('.createdModal').css('display','block')
    },
    //  隐藏模态框
    hidden(){
        $('.backdrop').css('display','none')
        $('.createdModal').css('display','none')
    },
     //加入会议显示模态框
     joinshowModal(){
         $('.backdrop').css('display','block')
         $('.Joinconference').css('display','block') 
     },
     // 取消会议模态框 、
    joincancelhidden(){
         $('.backdrop').css('display','none')
         $('.Joinconference').css('display','none')
    },

    // 显示上传信息
    uploadinfo(){
        $('.backdrop').css('display','block')
        $('.camerinfo').css('display','block') 
    },
       // 取消会议模态框 、
    cancelluploadinfo(){
         $('.backdrop').css('display','none')
         $('.camerinfo').css('display','none')
    },
    // onetoone模态框
    onetooneshow(){
        $('.backdrop').css('display','block')
        $('.onetoonemoald').css('display','block') 
    },
    onetoonecancell(){
         $('.backdrop').css('display','none')
         $('.onetoonemoald').css('display','none')
    },
    //  获取用户信息
    getuser(){
          let slideurl=this.$store.state.callport;
          let rooturl=slideurl+"/api/v1/GetOnlineUserList?session=" +this.$store.state.token;
          console.log(rooturl)
          this.$http.get(rooturl).then(res=>{
            console.log(res)
            this.userdata=[]
            let useritem=res.data.userList
            if(res.status==200){
                let obj={};
                for(let i=0;i<useritem.length;i++){
                   if(this.$store.state.Useport.user==useritem[i].strName){
                      continue
                   }
                  this.userdata.push(useritem[i])
                } 
            }
         }).catch(()=>console.log('promise catch err'))
      },
    //  重新获取在线联系人数据
    reloaduserlist(){
        this.getuser()
    },
    //  拨打视频
    handleCommand(command){
         console.log(command)
         let playVlue=command.strName
         this.playVluename=playVlue
         this.onetooneshow()
     },
    //  确定拨打
    onetoonedongokey(){
          this.onetoonecancell()
          let playparit=this.playVluename
          this.playvideoprops=playparit
          this.$refs.linkonetoone.anewuser()
          console.log(this.playvideoprops)
          this.videocall(this.playVluename)
    },
    // 打过来的数据
    meettokenchild(meettoken){
        for(var i=0; i<meettoken.length;i++){
            console.log(meettoken[0],meettoken[1])
            this.usertokens=meettoken[0]
            this.struuid=meettoken[1]
        }
    },
    //视频对讲
    videocall(playVlue){
          console.log(playVlue)
          var token = uuid(4, 10);
          this.usertokens=token
        //   this.$store.commit(types.USERTOKEN, playVlue)
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
               this.$refs.linkonetoone.l5splay();
           })
       } ,
       // 列表获取
    mettuserlist(jointoken){
         this.userdataconfertoken=jointoken
         console.log(this.userdataconfertoken)
         this.mettuselest()
    },
       //获取会议成员列表
    mettuselest(){
        var url = this.$store.state.callport + "/api/v1/GetParticiant?token="+this.userdataconfertoken+"&session="+ this.$store.state.token;
        this.$http.get(url).then(result=>{
            console.log(result)
            var data=result.data.particiants
            this.userdataconfer=[]
            if(data.length==0){
                return false
            }
            console.log(data)
            for(var i=0; i<data.length;i++){
                if(data[i].strToken==this.userdataconfertoken){
                    continue
                }
                var userdata={
                    mosaicId: data[i].mosaicId,
                    nSolt: data[i].nSolt,
                    partId: data[i].partId,
                    strName: data[i].strName,
                    strToken: data[i].strToken,
                    strType: data[i].strType,
                    bOnline: data[i].bOnline
                }
                // if(userdata["strType"]=="device"){
                //     userdata["icon"]="iconfont icon-shexiangji"
                // }
                this.userdataconfer.push(userdata)
                console.log(this.userdataconfer)
            }
        })
    },  
    // 停止 
    stop(){
        if(this.conferencevalue=='1'){
            this.$refs.linkconference.onetonestop()
        }
        if(this.conferencevalue=='2'){
            this.$refs.linkonetoone.onetonestop()
        }
        if(this.conferencevalue=='Videoconferenceintercom'){
            this.$refs.linkVideoconference.onetonestop()
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
    font-weight: 700;
}
/* 头部 */
.videodesc{
    left:20px;
}
.videoleave{
    right: 20px;
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
.online{
    color:#4dda31;
    margin-left:10px;
}
.noonline{
    color:#4a4d49;
    margin-left:10px;
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
.newClass{
    --background:#1562FF; 
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
  /* 消息发送 */
  .sendnativ{
     bottom: 50px;
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
 ion-backdrop {
      /* z-index:1; */
      opacity: 0.6;
}
.backdrop{
     display: none;
}
.createdModal{
      width:40%;
      height: 75%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 9999999999999999999999;
      display: none;
}
.Joinconference{
      width:30%;
      height: 30%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 9999999999999999999999;
      display:none;
}
.camerinfo{
      width:30%;
      height: 25%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index:10001 !important;
      display:none;
}
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
      display:none;
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
</style>