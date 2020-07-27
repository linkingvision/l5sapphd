<template>
   <div class="Onetoonevideo">
       <ion-header>
          <ion-toobar>
            <ion-item class="flatheader">
                 <img src="../assets/imgs/l5slogo.png" alt="">
                 <ion-label style="--color:#FFFFFF">视频对讲</ion-label>
            
                 <ion-button slot="end" class="onlineuser" expand="block" id="ion-button" @click="handercall()"> 
                      <img src="../assets/imgs/yonghu-10@2x.png" alt="">
                      <!-- <ion-label>在线联系人</ion-label> -->
                      <el-dropdown>
                            <span class="el-dropdown-link">
                                在线联系人
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                   <img src="../assets/imgs/yonghu-10@2x.png" alt=""> 黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
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
                        <ion-item lines='none' class="item-left">
                            <ion-button class="leftbtn">
                               <img src="../assets/imgs/control.png" alt="">
                            </ion-button>
                        </ion-item>
                        <ion-item lines='none' class="item-left">
                            <ion-button class="leftbtn">
                               <img src="../assets/imgs/seting.png" alt="">
                            </ion-button>
                        </ion-item>
                        <ion-fab vertical="bottom" horizontal="start" slot="fixed" class="leftswitch">
                            <ion-button class="switchbutton">
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
                       <video id="h5sVideoRemote" src="" class="intercomvideoplay" autoplay webkit-playsinline playsinline style= "object-fit: fill;"></video>
                       <video id="h5sVideoLocal" muted src="" autoplay class="h5sLocal" webkit-playsinline playsinline></video>
                   </div>
                   <ion-fab class="footerbtn" vertical="bottom" horizontal="center" >
                        <ion-button class="fabbutton">
                            <img src="../assets/imgs/audio.png" alt="">
                        </ion-button>
                        <ion-button class="fabbutton">
                            <img src="../assets/imgs/gongxiamg.png" alt="">
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
   </div>
</template>

<script>
import { menuController } from '@ionic/core';
window.menuController = menuController;
export default {
    data(){
        return{
           currentPopover:null,
        }
    },
 created(){
         
   },
  mounted(){
     
   
  },
  methods:{
    handercall(){
       $('.list').css('display','block')
    }
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
 .flatvideo{
    height: 100%;
    width: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 999999;
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