<template>
  <div class="DeviceDetInfo">
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="swiper_center">
            <div>
              <ul class='detPubInfo' v-for='item in D_H_Data'>
                <li><span class="atr">设备名称 :</span><span>{{item.name}}</span></li>
                <li><span class="atr">设备编号 :</span><span>{{item.ucode}}</span></li>
                <li><span class="atr">安装位置 :</span><span>{{item.addrname}}</span></li>
                <li><span class="atr">自动更新位置 :</span><span>{{item.local_flag | filt_local_flag}}</span></li>
                <li><span class="atr">安装时间 :</span><span>{{item.setuptime | filt_createtime}}</span></li>
                <li><span class="atr">服务到期时间 :</span><span>{{item.maintenancetime | filt_createtime}}</span></li>
                <li><span class="atr">联系人 :</span><span>{{item.contacts}}</span></li>
                <li class="bottom_li"><span class="atr">联系电话 :</span><span>{{item.phone}}</span></li>
                <li><span class="atr">主板编号 :</span><span>{{item.bordid}}</span></li>
                <li><span class="atr">芯片编号 :</span><span>{{item.ccid}}</span></li>
                <li><span class="atr">在线状态 :</span><span>{{item.connstate}}</span></li>
                <li><span class="atr">软件版本 :</span><span>{{item.soft}}</span></li>
                <li><span class="atr">信号强度 :</span><span>{{item.csq}}</span></li>
                <li><span class="atr">硬件类型 :</span><span>{{item.dev}}</span></li>
                <li><span class="atr">硬件版本 :</span><span>{{item.head}}</span></li>
                <li class="bottom_li"><span class="atr">IMEI :</span><span>{{item.imei}}</span></li>
                <li id="qrcode">
                  <img :src='QrCode_Url'>
                 </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper_center">
            <div>
              <div class="notdata_div" v-show='sksj_nullimg'>
                <img :src='$store.state.notdata_url' />
                <span class='massfont'>没有数据</span>
              </div>
              <ul class='detPubInfo' v-for='item in D_D_Data' style="margin-bottom:12px">
                <li class="fistHead">
                  <span>{{item.name}}</span>
                  <span style='color:#5EEA62' v-show='item.connstate=="在线"' class="right">{{item.connstate}}</span>
                  <span style='color:#858585' v-show='item.connstate=="离线"' class="right">{{item.connstate}}</span>
                  <span style='color:#E83352' v-show='item.connstate=="告警"' class="right">{{item.connstate}}</span>
                  <span style='color:#EAA25C' v-show='item.connstate=="异常"' class="right">{{item.connstate}}</span>
                </li>
                <li v-show='not_Show_Values' class="notpower wid60">
                   <img :src="$store.state.notpowe_url" />
                </li>
                <li @click='goEcharsvir("/hheDetchars",{"dcode":sItem.dcode})' v-show='item.dcode == sItem.dcode && !not_Show_Values' v-for='(sItem,Index) in S_V_Data'>
                  <div class='sk_dev clearfix' v-for='(ssItem,index) in sItem.myKey'>
                    <span class='sk_devstate' v-for="child in ssItem">
                      {{child}}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="swiper_center" ref='warn_scoll'>
            <div v-show='not_Show_Alarm' class="notpower top">
               <img :src="$store.state.notpowe_url" />
            </div>
            <div v-show='!not_Show_Alarm' ref='warn_scoll_div'>
              <ul class="warn_ul">
                <li v-for='item in  S_A_Data' class="clearfix">
                  <div class="warn_left">
                    <span>{{item.alarmtime | filt_createtime}}</span>
                  </div>
                  <div class="warn_right">
                    <div class="bh">编号 :{{item.ucode}}</div>
                    <span class="nr">{{item.content}}</span>
                    <span class="dian"></span>
                  </div>
                </li>
                <li v-show='last_loding' class="last_2"></li>
                <li v-show='last_loding' class="last_loding">
                    <img :src="load_url"/>
                </li>
                <li v-show="notMore" class="notMore">没有更多了</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="PageTab swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcode'
import Tool from '../utilities/Tool'

import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      ucode: '',
      D_H_Data: '',
      D_D_Data: '',
      D_E_Code: '',
      S_A_Data: '',
      S_V_Data: '',
      D_I_Data: '',
      QrCode_Url: '',
      WarnInde: 1,
      last_loding:false,
      load_url:'./static/images/load.gif',
      sksj_nullimg:false,
      lsjg_lastpage:'',
      not_Show_Alarm:false,
      not_Show_Values:false,
      notMore:false,
      fifterDcode:['th'],
    }
  },
  components: {
    QRCode: QRCode
  },
  filters: {
    filt_local_flag(val) {
      if (!val) {
        return '是';
      } else {
        return '否'
      }
    },
    filt_createtime(val) {
      return Tool.dateFormat(val);
    }
  },
  methods: {
    ...mapActions({
      Get_Device_Host: 'GET_DEVICE_HOST',
      Get_Device_Device: 'GET_DEVICE_DEVICE',
      Get_Expire_Info: 'GET_EXPIRE_INFO',
      Get_Show_Alarm: 'GET_SHOW_ALARM',
      Get_Show_Values: 'GET_SHOW_VALUES',
    }),
    goEcharsDatavir(item){
       let setArr = this.fifterDcode;
       if(setArr.indexOf(item.ucode) == 0){
          return true;
       }
    },
    goEcharsvir(type,query){
      let setArr = this.fifterDcode;
       if(setArr.indexOf(query.dcode ) == 0){
          this.handleGoto(type,query)
       }
    },
    handleGoto(type,query) {
      let Query= query||'';
      this.$router.push({
        path: type,
        query:Query
      });
    },
    InZation() {
      let _this = this;
      _this.Get_Device_Host([{ 'ucode': _this.ucode }, function(res) {
        _this.D_H_Data = res.data.result
      }])

      _this.Get_Expire_Info([{ 'qrcode': _this.ucode, 'expireSeconds': 600 }, function(res) {
        _this.D_E_Code = res.data.result
        // With promises
        QRCode.toDataURL(res.data.result.url)
          .then(url => {
            _this.QrCode_Url = url;
          })
          .catch(err => {
            console.error(err)
          })
      }])
    },
    InZation_Refresh() {
      let _this = this;
      _this.Get_Device_Device([{ 'ucode': _this.ucode }, function(res) {
        if(res.data.result.length == 0){
            _this.sksj_nullimg = true;
        }
        _this.$store.state.filterEcher = [];
        _this.D_D_Data = res.data.result;
        _this.D_D_Data.map(function(item,index){
            if(_this.goEcharsDatavir(item)){  
              let ar = {};
              ar.ucode = item.ucode;
              ar.dcode = item.dcode;
              ar.model = item.model;
              _this.$store.state.filterEcher.push(ar)
            }
        });
      }])

      _this.Get_Show_Alarm([{ 'ucode': _this.ucode }, function(res) {
        if (res.data.status != 0){
           _this.not_Show_Alarm = true;
        }else{ 
          _this.S_A_Data = res.data.result.list;
          _this.WarnInde = 1;
        }
      }])

      _this.Get_Show_Values([{ 'ucode': _this.ucode }, function(res) {

        if(res.data.status != 0){
          _this.not_Show_Values = true;
        }else{
          _this.S_V_Data = res.data.result;
          let d = _this.S_V_Data;
          for (let i in d) {
            let dcode = i.split('_')[1]; //提取dcode 用于对比
            d[i].dcode = dcode;
            d[i].myKey = new Array();
            for (let j in d[i]) { //删除old字段
              if (/^old/.test(j)) {
                delete d[i][j];
              }

              if (j.indexOf('_') == -1 && j != 'dcode' && j != 'myKey' && !/^old/.test(j)) {
                let obj = {
                  [j + "_name"]: d[i][j + "_name"],
                  [j + "_time"]: Tool.dateFormat(d[i][j + "_time"]),
                  [j]: d[i][j],
                }
                d[i].myKey.push(obj)
              }
            }
          }
          _this.S_V_Data = d;
        }
      }])
    }
  },
  mounted() {
    let _this = this;
    _this.ucode = this.$route.query.ucode;

    let swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      spaceBetween: 1,

      paginationClickable: true,
      paginationBulletRender: function(swiper, index, className) {
        let TabName = '';
        switch (index) {
          case 0:
            TabName = '基础信息';
            break;
          case 1:
            TabName = '实况数据';
            break;
          case 2:
            TabName = '历史警告';
            break;
        }
        return '<span style="margin:5px 0px" class="myTabPageStyle ' + className + '">' + TabName + '</span>';
      }
    });

    this.InZation();
    this.InZation_Refresh();
    //setInterval(_this.InZation_Refresh, 60000)

    let scroll_div = _this.$refs.warn_scoll;
    let scroll_page = _this.$refs.warn_scoll_div;

    if(!this.not_Show_Alarm){
      Tool.scrollpage(scroll_div, scroll_page, 50, function() {
        _this.WarnInde++ ;
        _this.last_loding = true;
        _this.Get_Show_Alarm([{ 'ucode': _this.ucode, 'pageNumber': _this.WarnInde,'pageSize':15}, function(res) {
          _this.last_loding = false;
          if (res.data.result.totalPage >=  _this.WarnInde) {
            _this.S_A_Data = _this.S_A_Data.concat(res.data.result.list);
          }else{
            console.log('没有更多了')
          }
        }])
      })
    }
  },
}

</script>
<style lang='scss' scoped>
.DeviceDetInfo {
  width: 100%;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  font-size: 18px;
  background: #fff;

}

.swiper_center {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  overflow: auto;
    background: #f5f5f5
}
.warn_ul {
  width: 100%;
  padding: 0 10px;
  background: #f5f5f5;
  margin-bottom: 0px;

  .last_loding{
    width: 100%;
    padding:10px;
    text-align: center;
    border-top: 1px solid white;
    img{
      display: block;
      margin: 0 auto; 
    }
  }
  .last_2{
      border-bottom: 1px solid #dddddd;
  }
  .notMore{
    width: 100%;
    text-align: center;
    display: block;
    padding: 20px 0;
  }
  li {
    display: flex;
    position: relative;
    color: #777;

    .warn_left {
      flex: 1;
      border-right: 1px solid #6ea818;
      padding: 10px;
      padding-top: 0px;
      font-size: 15px;
      text-align: right;
      padding-right: 15px;
      padding-bottom: 30px;
    }

    .warn_right {
      flex: 2;
      font-size: 15px;
      padding-bottom: 30px;
      padding-left: 15px;
      position: relative;

      .bh {
        margin-bottom: 2px;
      }

      .nr {}

      .dian {
        width: 15px;
        background: #EAA25C;
        border-radius: 15px;
        height: 15px;
        left: -8px;
        top: 2px;
        position: absolute;
        border: 1px solid #6ea818;
      }
    }

    &:first-child {
      .warn_left {
        padding-top: 15px;
      }

      .warn_right {
        padding-top: 15px;
      }

      .dian {
        top: 17px;
      }
    }
  }
}

.detPubInfo {
  width: 100%;
  background: #fff;
  margin-bottom: 0px;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, .05);

  li {
    width: 100%;
    background: #f5f5f5;
    // border-bottom: 1px solid #fff;
    padding: 10px;
    font-size: 16px;
    border-bottom: 1px solid #dddddd;
    border-top: 1px solid white;
    color: #777;

    span.atr {
      color: #333;
    }

    &.bottom_li {
      margin-bottom: 10px;
    }

    &.fistHead {
      font-size: 16px;
      border-bottom: 1px solid #77ba00;
      // border-radius: 7px 7px 0 0;
      color: #6ea818;

      .right {
        float: right;
      }

    }

    .sk_dev {
      width: 100%;

      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
        padding: 5px 0;
        border-bottom: 1px solid #dddddd;
        border-top: 1px solid white;
      }

      &:last-child {
        padding-top: 5px;
        border-top: 1px solid white;
      }

      &:first-child {
        border-top: none;
      }

      .sk_devstate {
        color: #777;

        &:nth-child(3) {
          margin-left: 20px;
          text-align: center;
          display: inline-block;
        }

        &:nth-child(2) {
          float: right;
        }
      }
    }

    span {
      margin-right: 10px;
    }
  }
}

</style>
