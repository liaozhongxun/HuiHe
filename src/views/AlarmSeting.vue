<template>
  <div id="AlarmSeting">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="swiper_center">
            <div v-show='Auth_Data.status == 401' class="notpower top">
                <img :src="$store.state.notpowe_url" />
            </div>
            <div class="notdata_div" v-show='!Auth_Data.length&&Auth_Data.status== 0'>
              <img :src='$store.state.notdata_url' />
              <span class='massfont'>还没有绑定设备</span>
            </div>
            <ul class="A_S_Ul" v-show='Auth_Data.length&&Scan_Data.status== 0'>
              <li v-for='item in Auth_Data.list'>
                <div class="left" :style="{'background': 'url('+item.icon+') center center no-repeat','background-size':'contain'}">
                </div>
                <div class="right">
                  <div class="name">
                    <span>{{item.name}}</span>
                    <span style='color:#5EEA62' v-show='item.connstate=="在线"' class="state">{{item.connstate}}</span>
                    <span style='color:#858585' v-show='item.connstate=="离线"' class="state">{{item.connstate}}</span>
                    <span style='color:#E83352' v-show='item.connstate=="告警"' class="state">{{item.connstate}}</span>
                    <span style='color:#EAA25C' v-show='item.connstate=="异常"' class="state">{{item.connstate}}</span>
                  </div>
                  <div class="ReceWarn_fa clearfix" >
                      <span v-show="item.eeid==0" class="js">接 收</span>
                      <span v-show="!item.eeid==0" class="bjs">不接收</span>
                      <xfd-switch v-model="item.eeid==0" @change='change_rece(item)'></xfd-switch>
                  </div>
                  <span class="time">{{item.lastcheck | filt_createtime}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper_center">
            <div v-show='Scan_Data.status == 401' class="notpower top">
                <img :src="$store.state.notpowe_url" />
            </div>
            <div class="notdata_div" v-show='!Scan_Data.length&&Scan_Data.status== 0'>
              <img :src='$store.state.notdata_url' />
              <span class='massfont'>还没有绑定设备</span>
            </div>
            <ul class="A_S_Ul" v-show='Scan_Data.length&&Scan_Data.status==0'>
              <li v-for='item in Scan_Data.list'>
                <div class="left" :style="{'background': 'url('+item.icon+') center center no-repeat','background-size':'contain'}">
                </div>
                <div class="right">
                  <div class="name">
                    <span>{{item.name}}</span>
                    <span style='color:#5EEA62' v-show='item.connstate=="在线"' class="state">{{item.connstate}}</span>
                    <span style='color:#858585' v-show='item.connstate=="离线"' class="state">{{item.connstate}}</span>
                    <span style='color:#E83352' v-show='item.connstate=="告警"' class="state">{{item.connstate}}</span>
                    <span style='color:#EAA25C' v-show='item.connstate=="异常"' class="state">{{item.connstate}}</span>
                  </div>
                  <div class="time">{{item.lastcheck | filt_createtime}}</div>
                </div>
                <div class="unbind"><span @click='undevbind(item)'>解绑</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="PageTab swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import {Tool,TheTool} from '../utilities'
import { Toast } from 'mint-ui';
// import { Switch } from 'mint-ui'
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';

export default {
  name: 'App',
  data() {
    return {
       Auth_Data:'',
       Scan_Data:'',
       ReceWarn:false,
       AlarIco_url:'./static/images/shebei.png'
    }
  },
  methods: {
    ...mapActions({
       Get_Dev_Byauth: 'DEV_BY_AUTH',
       Get_Dev_Byscan: 'DEV_BY_SCAN',
       SetSetting:'SetSetting',
       DelSetting:'DelSetting',
       unsubscribe:'unsubscribe'
    }),
    change_rece(e){
      let _this = this;
      if(e.eeid == 0){
        this.SetSetting([{'ucode':e.ucode},function(res){
           _this.dev_byauth()
        }])
      }else{
        this.DelSetting([{'id':e.eeid},function(res){
           _this.dev_byauth()
        }])
      }
    },
    dev_byauth(){
      let _this = this;
      this.Get_Dev_Byauth([{"pageSize": 150,"pageNumber": 1},function(res){
          _this.Auth_Data = {
            list : res.data.result.list,
            length : res.data.result.list.length,
            status:res.data.status
          }
          _this.Auth_Data.list = TheTool.mapDevImgTool(_this.Auth_Data.list,_this.$store.state.DevImg_data);
          console.log(TheTool.mapDevImgTool(_this.Auth_Data.list,_this.$store.state.DevImg_data))
      }]);
    },
    dev_byscan(){
      let _this = this;
      this.Get_Dev_Byscan([{"pageSize": 150,"pageNumber": 1},function(res){
          _this.Scan_Data = {
            list : res.data.result.list,
            length : res.data.result.list.length,
            status:res.data.status
          }
          _this.Scan_Data.list = TheTool.mapDevImgTool(_this.Scan_Data.list,_this.$store.state.DevImg_data);
      }]);
    },
    undevbind(item){
       let _this = this;
       this.$xfdDialog.confirm({
          title: '',
          mes: '<div class="aaa"><span style="font-size:17px">确定要解绑该设备吗?</span></div>',
          opts: [{
              txt: '取消',
              color: false,
              callback: () => {
  
              }
            },
            {
              txt: '确定',
              color: true,
              callback: () => {
                _this.unsubscribe([{'ucode':item.ucode},function(res){
                    // if(res.status == 0){
                      Toast.toast('解绑成功');
                      _this.dev_byscan()
                    // }
                    // else{
                    //   _this.$xfdDialog.toast('解绑失败:原因是'+res.message);
                    // }
                }])
              }
            }
          ]
        });
    }
  },
  filters:{
    filt_createtime(val){
       return Tool.dateFormat(val);
    }
  },
  mounted() {
    let _this = this;

    let swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      spaceBetween: 30,

      paginationClickable: true,
      paginationBulletRender: function(swiper, index, className) {
        let TabName = '';
        switch (index) {
          case 0:
            TabName = '权限设备';
            break;
          case 1:
            TabName = '已绑定设备';
            break;
        }
        return '<span style="margin:5px 0px" class="myTabPageStyle ' + className + '">' + TabName + '</span>';
      }
    });

    this.dev_byauth();
    this.dev_byscan();
  },
}

</script>

<style lang='scss' scoped>
#AlarmSeting{
  width: 100%;
  height: 100%;
  background: #f6f6f6;
}
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  font-size: 18px;
  background: #f6f6f6;

}

.swiper_center {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  overflow: auto;
}

.A_S_Ul{
  width: 100%;
  li{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background: #fff;
    margin:7px 0;
    padding:10px;
    padding-left: 7px;
    display: flex;
    .ReceWarn_fa{
       margin-bottom:0px;
       span{
        display: inline-block;
        height: 100%;
       }
       .js{
         color:#6ea818;
       }
       .bjs{
         color:#EAA25C;
       }
    }
    .left{
      flex:1;
      // background-image: url('./static/images/shebei.png');
      width:60px;
      height: 60px;
      margin-right: 10px;
      img{
        height:60px;
        margin: 0 auto;
      }
    }
    .right{
      flex:4;

    }
    .unbind{
      flex:1;
      span{
        background: #EAA25C;
        color:#fff;
        border-radius: 5px;
        text-align: center;
        display: block;
        width: 100%;
        padding: 2px;
        margin-top: 13px;
      }
      margin-left: 13px;
    }
    .name{
       font-size: 16px;
       color: #666;
       margin-bottom: 7px;
       padding-bottom: 7px;
       border-bottom: 1px dashed #eee;
       .state{
        float:right;
       }
    }
    .time{
       color:#777;
       text-align: right;
       font-size: 15px;
    }
  }
}
</style>
