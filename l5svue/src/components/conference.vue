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
                 <ion-item button detail='false' lines="none" class="urgencybgcitem" @click="mettevent(daterecent.strToken)">
                    <div class="urgencybgc">
                        <ion-label class="conference-itemlabel">
                            <h3>技术交流视频会议</h3>
                            <p class="conferencenum"><span>{{daterecent.beginTime}}</span> <span>会议号:{{daterecent.strToken}}</span></p>
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
                     <ion-button class="jioinbutton" @click='joinconferce()'>加入会议</ion-button>
                 </ion-item>
                 <ion-item lines="none" class="rightjioin">
                     <ion-button color='success' class="jioinbutton" @click="createdconfer()" expand="block">创建会议</ion-button>
                 </ion-item>
              </ion-col>
          </ion-row>
          <ion-row>
              <ion-col class="conference-title">
                  <ion-label>待办会议</ion-label>
              </ion-col>
          </ion-row>
        </ion-grid>
        <ion-content class="conferlist">
            <ion-grid>
                <ion-row>
                    <ion-col size='4' class="colbacklog" v-for="(item,index) in meetdata" :key="index">
                        <ion-item class="conference-action-item" button lines="none" detail='false'  @click="mettevent(item.strToken)">
                                <ion-label class="action-label">
                                        <h3 >L5S会议平台</h3>
                                        <p>{{item.strName}}</p>
                                        <h4>日期:{{item.beginTime}}<span>会议号：{{item.strToken}}</span></h4>
                                        <h4 class="jioninbuttons">
                                            <span class="inlineblock"></span><span>定期会议</span> 
                                        </h4>
                                </ion-label>
                                <ion-note slot="end" class="boting" color='success' v-if="item.bStartStatus">..进行中</ion-note>
                                <ion-note slot="end" class="boting" color='primary' v-if="!item.bStartStatus">筹备中</ion-note>
                                <ion-fab vertical="bottom" horizontal="end" class="actrion-button">
                                    <ion-button fill="outline" class="joinconference" v-if="!item.bStartStatus">等待会议</ion-button>
                                    <ion-button  class="joinconferencen" v-if="item.bStartStatus">加入会议</ion-button>
                                </ion-fab>
                        </ion-item>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </div>
</template>
<script>
import Modal from './commonde/modal.vue'
import { modalController } from '@ionic/core';
window.modalController = modalController;
export default {
name:'Conference',
props: { timeout: { type: Number, default: 2000 },},
data(){
    return{
       meetdata:[],
       daterecent:[],
       conference:'',
       joinusertoken:'',
       conferencename:''
    } 
},
mounted(){
    this.meetingdata()
    let _this=this
    _this.$root.bus.$on('joinmeettoken', function(jointoken){
        console.log(jointoken)
        _this.mettevent(jointoken)
        _this.$parent.joincancelhidden()
        _this.presentLoading(jointoken)
    })
    
},
 methods: {
   // 创建会议模态框 
   createdconfer(){
        this.$parent.createdModal();
     },
  // 加入会议模态框   
   joinconferce(){
         this.$parent.joinshowModal();
   },
   //会议开始播放
   mettevent(jointoken){
       console.log(jointoken)
     var url = this.$store.state.callport + "/api/v1/GetConference?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    console.log(result)
                    var data=result.data.conference
                    for(var i=0;i<data.length;i++){
                        if(jointoken==data[i].strToken){
                            if(data[i].bStartStatus){
                                console.log(data[i].bStartStatus)
                                this.conferencename=data[i].strName
                                $('.joinconference').hide()
                                let _this=this
                                _this.$nextTick(() => {
                                    _this.$emit('Videoconference',[jointoken,this.conferencename])
                                    _this.$parent.Videoconferenceintercom()
                                    // _this.$parent.joinshowModal()
                                })
                               
                            }else{
                                console.log(888)
                                const toast = document.createElement('ion-toast');
                                toast.color ='danger'
                                toast.message = '会议还未开始';
                                toast.position = 'top';
                                toast.duration = 2000;
                                document.body.appendChild(toast);
                                return toast.present();
                                console.log(888)
                            }
                        }
                    }
                } 
         })
      },
   // 懒加载
   presentLoading(jointoken) {
        return this.$ionic.loadingController
        .create({
          cssClass: 'my-custom-class',
          message: '进入会议号为：'+jointoken+'的房间',
          duration: this.timeout,
        })
        .then(loading => {
          setTimeout(function() {
            loading.dismiss()
          }, this.timeout)
          return loading.present()
        })
    },
    // 获取会议列表
    meetingdata(){
         var url = this.$store.state.callport + "/api/v1/GetConference?session="+ this.$store.state.token;
        this.$http.get(url).then(result=>{
            if(result.status==200){
                // this.meetdata=result.data.conference
                console.log(result)
                 this.meetdata=[];
                var data=result.data.conference
                if(data.length==0){
                    return false
                }
                for(var i=0;i<data.length;i++){
                    // console.log("1*",data[i].strType)
                    if(data[i].strType=="temporary"){
                        continue 
                    }
                    var beginTime=new Date(data[i].beginTime).getTime();
                    var begin=new Date(data[i].beginTime);  
                    var eng=new Date(data[i].endTime)
                    console.log(eng)

                    //年月日
                    var y = begin.getFullYear();
                    var m = this.addZero(begin.getMonth()+1);
                    var d = this.addZero(begin.getDate());
                    //时分秒
                    var h = this.addZero(begin.getHours());
                    var mm = this.addZero(begin.getMinutes());
                    var rq=y+'.'+m+'.'+d+" "+h+':'+mm;
                    var listdata={
                        bStartStatus: data[i].bStartStatus,
                        beginTime: rq,
                        beginTime1: beginTime,
                        endTime: data[i].endTime,
                        mosaicSize: data[i].mosaicSize,
                        mosaicType: data[i].mosaicType,
                        nId: data[i].nId,
                        strName: data[i].strName,
                        strToken: data[i].strToken,
                        strType: data[i].strType,
                    }
                    this.meetdata.push(listdata)
                    console.log("1*",this.meetdata)
                }
                if(this.meetdata.length!=0){
                    this.meetdata.sort(function(a,b){
                        return  b.beginTime1-a.beginTime1
                    })
                    var daterecent=Math.round(new Date().getTime())
                    var newArr = [];
                    this.meetdata.map(function(x){
                        // 对数组各个数值求差值
                        newArr.push(Math.abs(x.beginTime1 - daterecent));
                        // console.log(newArr,x.beginTime1 - daterecent,x.beginTime1,daterecent)
                    });
                    // 求最小值的索引
                    var index = newArr.indexOf(Math.min.apply(null, newArr))
                    this.daterecent=this.meetdata[index]
                    console.log(this.meetdata[index])
                    console.log(this.daterecent,"1")
                }
            }
        })
       },
    addZero(n){
            return n<10?"0"+n:n;
      }, 
    // 退出  
    onetonestop(){
         this.$router.push('/Flatlogin')
    },
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
      --border-radius:20px;
     --inner-padding-end:0;
     --color-activated:#1562FF !important;
     --background-activated:#020002;
    
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
    position: absolute;
    right:60px;
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
     --background:#282828;
     --color:#D3D3D3;
     --min-height:160px;
     --color-activated:#1562FF !important;
     --background-activated:#1562FF;
}
.action-label h3{
    font-size: 18px;
    color:#C9C6C9;
    text-align: left;
    font-weight: 600;
}
.action-label p{
    font-size: 15px !important;
    color:#F8F8F8;
}
.action-label h4{
    color:#999999;
    font-size: 10px;
    margin-top:4px;
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
    margin-top:15px !important;
}
.jioninbuttons .inlineblock{
    display: inline-block;
    width: 5px;
    height: 5px;
    border: 1px solid #1562FF;
    background-color: #1562FF;
    vertical-align: middle;
    border-radius: 50%;
    margin-right:12px;
} 
/* .actrion-button{
    
} */
.joinconference{
    width: 100px;
    height:35px;
    --border-width:1px;
}
.joinconferencen{
    width: 100px;
    height:35px;
}
.jioninbuttons span{
    color:#F8F8F8;
    font-size: 12px !important;
    font-weight: 600;
}
.conferlist{
    height:55%;
    --background:transparent;
}
</style>