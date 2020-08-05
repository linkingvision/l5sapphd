<template>
   <div class="conference">
      <ion-grid>
         <ion-row>
              <ion-col class="conference-title">
                  <ion-label>紧急会议</ion-label>
              </ion-col>
          </ion-row>
          <ion-row>
              <ion-col size='11'>
                 <ion-item button detail='false' lines="none" class="urgencybgcitem" @click="urgency()">
                    <div class="urgencybgc">
                        <ion-label class="conference-itemlabel">
                            <h3>技术交流视频会议</h3>
                            <p class="conferencenum"><span>2020.09.27 8:00</span> <span>会议号:8585</span></p>
                            <p class="conferencestart">距离开始 <strong>00:45:30</strong> 现可以一键加入会议</p>
                        </ion-label> 
                        <ion-thumbnail slot="end" class="thumbnail">
                            <img src="../assets/imgs/urgencybgc1.png" alt="">
                        </ion-thumbnail>
                    </div>
                  </ion-item>
              </ion-col>
              <ion-col size='5'>
                 <ion-item lines="none" class="rightjioin">
                     <ion-button class="jioinbutton">加入会议</ion-button>
                 </ion-item>
                 <ion-item lines="none" class="rightjioin">
                     <ion-button color='success' class="jioinbutton">创建会议</ion-button>
                 </ion-item>
              </ion-col>
          </ion-row>
          <ion-row>
              <ion-col class="conference-title">
                  <ion-label>待办会议</ion-label>
              </ion-col>
          </ion-row>
          <ion-row>
              <ion-col size='4' class="colbacklog">
                   <ion-item class="conference-action-item" button lines="none" detail='false'>
                          <ion-label class="action-label">
                                <h3 >L5S会议平台 <span>..进行中</span> </h3>
                                <p>视频技术交流会议</p>
                                <h4>日期：2020.0604.08.07 <span>会议号：5858</span></h4>
                                <h4 class="jioninbuttons">
                                    <span>.</span><span>定期会议</span> 
                                </h4>
                         </ion-label>
                        <ion-note slot="end" class="boting" color='primary'>..进行中</ion-note>
                        <ion-fab vertical="bottom" horizontal="end" class="actrion-button">
                            <ion-button fill="outline" class="joinconference" >进入会议</ion-button>
                        </ion-fab>
                  </ion-item>
              </ion-col>
          </ion-row>
      </ion-grid>
   </div>
</template>

<script>
export default {
data(){
    return{

    } 
},
 methods: {
    // 最近会议
    urgency(){

    }
 }
}
</script>

<style scoped>
.conference{
    width:100%;
    height:100%;
    margin: 0;
    padding: 0;
}
.conference-title{
    text-align: left;
    font-size: 20px;
    color: #9A9A9A;
    font-weight: 600;
}
.urgencybgcitem{
     --background:transparent;
     --color:#D3D3D3;
     --min-height:200px;
     --padding-start:0;
      --border-radius:15px;
     --inner-padding-end:0;
     --color-activated:#1562FF !important;
     --background-activated:#1562FF;
    
}
.urgencybgc{
     width:100%;
     height:100%;
     background: url('../assets/imgs/urgencybgc2.png') no-repeat;
     background-size:100% 100%;
     text-indent: 1em;
     display: flex;
     align-items: center;
}
.urgencybgc h3{
     font-size: 20px;
     font-weight: 600;
     color: #FEFEFE;
}
.conferencenum{
     font-size: 15px;
     color: #9A9A9A;
     margin-bottom: 15px;
}
.conferencestart{
     font-size: 15px;
     color: #D3D3D3;
}
.conferencestart strong{
    font-size: 22px;
    color: #1562FF;
}
.thumbnail{
    --size:130px;
    margin-left:25px;
}
.rightjioin{
    --background:transparent;
    --padding-top:0;
    --padding-bottom:0;
    --min-height:0px;
    margin-bottom: 15px;
}
.jioinbutton{
    width:130px;
}
/* 待办会议 */
.colbacklog{
    --ion-grid-columns:12;
}
.conference-action-item{
     --background:#121212;
     --color:#D3D3D3;
     --color-activated:#1562FF !important;
     --background-activated:#1562FF;
}
.action-label h3{
    font-size: 18px;
    color:#F8F8F8;
    text-align: left;
    font-weight: 600;
}
.action-label p{
    font-size: 5px !important;
    color:#F8F8F8;
}
.action-label h4{
    color:#999999;
    font-size: 10px;
}
.boting{
    /* margin-top: 0; */
    padding-top: 20px;
    margin-left: 0;
    padding-left: 0;
    height: 0;
    z-index: 100;
}
.jioninbuttons{
   line-height: 32px;
   font-size: 10px !important;
   --color:#F8F8F8;
}
.actrion-button{
    
}
.joinconference{
    width: 100px;
    height:30px;
    
}
</style>