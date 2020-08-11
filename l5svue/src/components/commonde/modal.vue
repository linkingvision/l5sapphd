<template>
   <div class="createdconference">
       <!-- 头部 -->
      <ion-header class="created-header">
          <ion-toolbar class="created-header-toolbar">
             <ion-title class="created-title">创建会议</ion-title>
          </ion-toolbar>
     </ion-header> 
      <!--身体 -->
      <ion-content class="created-content">
          <ion-item lines="none" class="created-item">
              <ion-label class="created-label">会议名称</ion-label>
              <ion-input class="created-input" :value='ocnferencename'  @ionChange="ocnferencename=$event.target.value"></ion-input>
          </ion-item>
          <ion-item lines="none" class="created-item">
              <ion-label class="created-label">开始时间</ion-label>
              <ion-datetime 
                  class="created-datetime"
                  display-format="YYYY-MMM-D H:mm" 
                  month-short-names="01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12"
                  done-text='确定'
                  cancel-text='返回'
                  min="2016" max="2030" :value='Startdate'></ion-datetime>
          </ion-item>
          <ion-item lines="none" class="created-item">
               <ion-label class="created-label">结束时间</ion-label>
               <ion-datetime 
                  class="created-datetime"
                  display-format="YYYY-MMM-D H:mm" 
                  month-short-names="01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12"
                  done-text='确定'
                  cancel-text='返回'
                  min="2016" max="2030" :value="Eendate" ></ion-datetime>
          </ion-item>
          <ion-grid class="moshigrid">
               <ion-row>
                   <ion-col class="created-col">
                       <ion-radio-group :value="patterns" class="radio-group"  @ionChange="patterns=$event.target.value">
                            <ion-radio class="cread-checkbox" slot="start"  value="apple"></ion-radio>
                            <ion-label class="moshi-one">1+N模式</ion-label>
                            
                            <ion-radio slot="start" class="cread-checkbox-two" value="grape"></ion-radio>
                            <ion-label class="moshi">等分模式</ion-label>
                       </ion-radio-group>
                   </ion-col>
               </ion-row>
          </ion-grid>
          <ion-item lines="none" class="created-item" v-if="patterns=='apple'" >
              <ion-label class="created-selectlabel">1+N模式</ion-label>
              <ion-input class="select-input" >
                    <ion-select interface="popover" class="created-select" slot="end" value="1p1">
                        <ion-select-option v-for="(item,index) in onenmode" :key="index" :value='item.value'>{{item.label}}</ion-select-option>
                    </ion-select>
              </ion-input>
           </ion-item>
           <ion-item lines="none" class="created-item" v-if="patterns=='grape'">
              <ion-label class="created-selectlabel">等分模式</ion-label>
              <ion-input class="select-input">
                    <ion-select interface="popover" class="created-select" slot="end" value="2x2">
                          <ion-select-option v-for="(item,index) in epmode" :key="index" :value='item.value'>{{item.label}}</ion-select-option>
                    </ion-select>
              </ion-input>
           </ion-item>
           <ion-grid class="moshigrid">
               <ion-row>
                    <ion-col class="created-col">
                       <ion-radio-group :value="pattern" class="radio-group" @ionChange="pattern=$event.target.value">
                            <ion-radio class="cread-checkbox" slot="start"  value="user" ></ion-radio>
                            <ion-label class="moshi-one">会议成员</ion-label>
                            
                            <ion-radio slot="start" class="cread-checkbox-two" value="device"></ion-radio>
                            <ion-label class="moshi">会议设备</ion-label>
                        </ion-radio-group>
                    </ion-col>
               </ion-row>
          </ion-grid>
          <!-- 成员 -->
          <ion-item lines="none" id="item-margin" class="created-item" v-if="pattern=='user'">
              <ion-label class="created-label">会议成员</ion-label>
              <ion-input class="select-input">
                  <ion-select 
                       class="created-select" 
                       cancel-text="取消" 
                       ok-text="确定" 
                       slot="end" 
                       multiple='true'  
                       placeholder="请选择"  
                       @ionChange="user=$event.target.value">
                        <ion-select-option v-for="(item,index) in createduserdata" :key="index" :value='item.value'>{{item.label}}</ion-select-option>
                  </ion-select>
               </ion-input> 
          </ion-item>
           <!-- 设备 -->
          <ion-item lines="none" id="item-margin" class="created-item" v-if="pattern=='device'">
              <ion-label class="created-label">会议设备</ion-label>
              <ion-input class="select-input">
                  <ion-select 
                      cancel-text="取消" 
                      ok-text="确定" 
                      class="created-select"  
                      placeholder="请选择" 
                      slot="end" 
                      multiple
                      @ionChange="token=$event.target.value">
                     <ion-select-option v-for="(item,index) in tokendata" :key="index" :value='item.value'>{{item.label}}</ion-select-option>
                  </ion-select>
               </ion-input> 
          </ion-item>
           <!-- 分辨率 -->
          <ion-item lines="none" class="created-item">
              <ion-label id="resolution" class="created-labelresolution">分辨率</ion-label>
              <ion-input class="select-input">
                    <ion-select interface="popover" class="created-select" slot="end" value='1080P'>
                        <ion-select-option v-for="(item,index) in resolution" :key="index" :value='item.value'>{{item.label}}</ion-select-option>
                    </ion-select>
               </ion-input>
          </ion-item>
          <ion-item lines="none" class="created-switchitem">
                <ion-label class="created-label">是否开启会议</ion-label>
                <ion-toggle class='created-togggle' :checked="toppings"  @ionChange="toppings=$event.target.checked">
                </ion-toggle>
          </ion-item>
          <ion-item lines="none" class="created-item">
              <ion-button slot="start" 	color='secondary'  shape="round" fill="outline" class="createdsubmit" @click="cancellcreated()">取消</ion-button>
              <ion-button slot="end"  shape="round" class="createdsubmit" @click="createdsubmit()">创建</ion-button>
          </ion-item>
      </ion-content>
   </div>
</template> 
<script>
import uuid from '../../assets/js/uuid1'    
export default {
  name:'createdconference',
  data(){
      return{
         ocnferencename: 'Conference1',//名称
         Startdate: new Date(),//时间
         Eendate: new Date(),//时间
         pattern:'user',
         patterns:'apple',
         user:'',//成员
         token:'',//设备
         mettmodesize:1,//位置
         userdata:[],
         tokendata:[],
         createduserdata:[],
         toppings:false,
         metttype: 'regular',//会议类型
         meetdata:[],
         onenmode:[
                {
                    value: "1p1",
                    label: "1p1"
                },{
                    value: "1p2",
                    label: "1p2"
                },{
                    value: "1p2A",
                    label: "1p2A"
                },{
                    value: "1p3A",
                    label: "1p3A"
                },{
                    value: "1p4A",
                    label: "1p4A"
                },{
                    value: "1p5",
                    label: "1p5"
                },{
                    value: "1p6A",
                    label: "1p6A"
                },{
                    value: "1p7",
                    label: "1p7"
                },{
                    value: "3p4",
                    label: "3p4"
                },{
                    value: "PIP1",
                    label: "PIP1"
                },{
                    value: "PIP3",
                    label: "PIP3"
                },{
                    value: "1p2x2A",
                    label: "1p2x2A"
                },{
                    value: "1p12",
                    label: "1p12"
                },{
                    value: "1p16A",
                    label: "1p16A"
                },{
                    value: "4x5A",
                    label: "4x5A"
                },{
                    value: "1p1A",
                    label: "1p1A"
                },{
                    value: "1p2x6A",
                    label: "1p2x6A"
                },{
                    value: "1p1p2x4A ",
                    label: "1p1p2x4A "
                }
                ],//1+n模式
                epmode:[
                    {
                        value: "1x1",
                        label: "1x1"
                    },{
                        value: "2x2",
                        label: "2x2"
                    },{
                        value: "3x3",
                        label: "3x3"
                    },{
                        value: "4x4",
                        label: "4x4"
                    },{
                        value: "5x5",
                        label: "5x5"
                    }
                ],//等分模式
                 resolutiondafull:'1080P',
                 resolution:[{
                        value: "1080P",
                        label: "1080P"
                    },{
                        value: "720P",
                        label: "720P"
                    },{
                        value: "D1",
                        label: "D1"
                    },
                    {
                        value: "VGA",
                        label: "VGA"
                    }
                ]//分辨率
            
      }
   },
  mounted(){
   this.cretedstart()
  },
  methods:{
    // 初始创建会议的页面
    cretedstart(){
       var createdurl = this.$store.state.callport + "/api/v1/GetSrc?getonline=true&session="+ this.$store.state.token;
            this.$http.get(createdurl).then(result=>{
              if(result.status==200){
                    var data=result.data.src;
                    console.log("***",result);
                    for(var i=0;i<data.length;i++){
                        var Role={
                            value: data[i].strToken,
                            label: data[i].strName
                        }
                    this.tokendata.push(Role);
                  }
               }
            })
            this.conferenceuser()
        },
    // 会议成员
   conferenceuser(){
       var conferenceuserurl = this.$store.state.callport+ "/api/v1/GetUserList?session="+ this.$store.state.token;
            this.$http.get(conferenceuserurl).then(result=>{
                console.log("***",result);
                if(result.status==200){
                    var data=result.data.users;
                    for(var i=0;i<data.length;i++){
                        var Role={
                            value: data[i].strUser,
                            label: data[i].strUser
                        }
                    this.createduserdata.push(Role);
                   }
                }
           })
           console.log(this.createduserdata)
      },

    //  创建提交
    createdsubmit(){
       if(this.Startdate==''||this.Eendate==''){
        // this.$message('时间不能为空');
        const toast = document.createElement('ion-toast');
        toast.message = '时间不能为空';
        toast.position = 'top';
        toast.duration = 2000;
        document.body.appendChild(toast);
        return toast.present();
        return false
        }
        var starfs=new Date(this.Startdate).getTime();
        var endds=new Date(this.Eendate).getTime();
        var ks=new Date(starfs).toISOString()+"08:00";
        var jss=new Date(endds).toISOString()+"08:00";  
        // console.log(starfs,endds)
        if(starfs>endds){
            const toast = document.createElement('ion-toast');
            toast.message = '结束时间不能提前于开始时间';
            toast.position = 'top';
            toast.duration = 2000;
            document.body.appendChild(toast);
            return toast.present();
            this.Eendate=''
            return false
        }
        
        var token = uuid(4, 10);
        
        // return false
        var playmode=''
        if(this.patterns=='apple'){
            playmode='1p2'
        }else if(this.patterns=='grape'){
            playmode='2X2'
        }
        // return false
        var url = this.$store.state.callport + "/api/v1/CreateConference?name="+this.ocnferencename
        +"&token="+encodeURIComponent(token)
        +"&begintime="+encodeURIComponent(this.Startdate)
        +"&endtime="+encodeURIComponent(this.Eendate)
        +"&type="+encodeURIComponent(this.metttype)
        +"&layoutmode="+encodeURIComponent(this.patterns)
        +"&layout="+encodeURIComponent(playmode)
        +"&layoutsize="+encodeURIComponent(this.resolutiondafull)+"&session="+ this.$store.state.token;
        this.$http.get(url).then(result=>{
            if(result.status==200){
               if(this.token.length!=0||this.user.length!=0){
                        if(this.user.length>0){
                        this.Addparticipants(token,this.user,"user",this.mettmodesize)
                        }
                        if(this.token.length>0){
                        this.Addparticipants(token,this.token,"device",this.mettmodesize)
                        }
                }else if(this.token.length==0&&this.user.length==0){
                     if(this.toppings){
                        this.mettchang(token)
                     }else{
                        this.$emit('created');
                        this.$parent.hidden()
                        const toast = document.createElement('ion-toast');
                        toast.color="primary";
                        toast.message = '创建成功';
                        toast.position = 'top';
                        toast.duration = 2000;
                        document.body.appendChild(toast);
                        toast.present();
                     }
                 }
            }
         })
     },
    
    //添加参会者
    Addparticipants(token,usertoken,pattern,mettmodesize){
            // return false
            for(var i=0 ; i<usertoken.length ; i++){
                var url = this.$store.state.callport+ "/api/v1/CreateParticipant?token="+encodeURIComponent(token)+
                "&participanttoken="+encodeURIComponent(usertoken[i])+
                "&type="+pattern+
                "&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    if(this.toppings){
                      this.mettchang(token)
                      console.log(token)
                    }else{
                    //  更新
                     this.$emit('created');
                    //  隐藏
                     this.$parent.hidden()
                      const toast = document.createElement('ion-toast');
                     toast.color="primary";
                     toast.message = '创建成功';
                     toast.position = 'top';
                     toast.duration = 2000;
                     document.body.appendChild(toast);
                     toast.present();
                  }
              })
          }
      },

     //开启会议
    mettchang(token){
            console.log(token)
            var url = this.$store.state.callport + "/api/v1/StartConference?token="+encodeURIComponent(token)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                     this.$emit('created');
                     this.$parent.hidden()
                     const toast = document.createElement('ion-toast');
                     toast.color="success";
                     toast.message = '会议开始';
                     toast.position = 'top';
                     toast.duration = 2000;
                     document.body.appendChild(toast);
                     toast.present();
              }
          })
       },
    // 取消创建
    cancellcreated(){
       this.$parent.hidden()
    },
  }
}
</script>

<style scoped>
.createdconference{
    width:100%;
    height: 100%;
    background-color: rgb(32, 31, 31);
}
.created-header-toolbar{
    --background:#282828;
    text-align: left;
    font-size: 20px;
    --min-height:50px;
}
.header-md:after{
    height: 0;
}
.created-title{
    --color:#9A9A9A;
    font-weight:600;
    font-size: 20px;
  }
.created-content{
    --background:#282828;
    --padding-start:25px;
    --padding-end:25px;
}
.created-item{
    --background:#282828;
    --color:#FFFFFF;
    --min-height:50px;
}
.created-switchitem{
   --background:#282828;
    --color:#FFFFFF;
    width: 280px;
    margin-bottom: 5px;
} 
.created-item#item-margin{
    margin-bottom: 10px;
}
.created-input{
    --background:#303030;
    border-radius: 8px;
    margin-left: 30px;
    --color:#9A9A9A;
    font-size: 16px;
}
.created-label{
    font-size:18px;
    font-weight: 500;
}
.created-labelresolution{
    font-size:18px;
    font-weight: 500;
    /* margin-left: 35px;; */
}
.created-selectlabel{
    font-size:18px;
    font-weight: 500;
    /* width: 100px;; */
}
.created-datetime{
    color:#9A9A9A ;
    font-size: 16px;
}
.moshi-one{
    color:#FFFFFF;
    font-size:18px;
    font-weight: 500;
    margin-right: 50px;
}
.moshi{
    color:#FFFFFF;
    font-size:18px;
    font-weight: 500;
}
.moshi:nth-child(1){
    margin-right:50px;
}
.moshigrid{
    margin:0;
}
.cread-checkbox{
    vertical-align: middle;
   --color:#818181;
   --color-checked:#0B62FF;
}
.cread-checkbox-two{
    vertical-align: middle;
   --color:#818181;
   --color-checked:#0B62FF;
   margin-left: 50px;
}
.created-select{
    width:100%;
    border-radius:0px 10px 10px 0;
    --background:#303030;
    background-color:#303030;
    margin: 0;
    margin-left:20px;
    padding: 0;
    padding-top:15px;
    height: 50px;
}
.select-input{
    --background:#303030;
    border-radius:10px;
    margin-left: 30px;
    height: 50px;
    width: 100%;
    --color:#9A9A9A;
    font-size: 16px;
    justify-content: right;
}

ion-toggle {
  --background: #FFFFFF;
  --background-checked: #32C88C;

  --handle-background: #FFFFFF;
  --handle-background-checked: #FFFFFF;
}
.createdsubmit{
   width: 150px;
   height: 50px;
}
.ion-toast{
    --background:#0B62FF;
}
</style>
