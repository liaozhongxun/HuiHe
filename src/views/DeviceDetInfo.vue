<template>
  <div class="DeviceDetInfo">
    <div ref='MonMask' class="MonMask">
      <div class="MonMask_cen">
         <ul class="Mon_list">
            <li class='mon_li'>
              <span class="monname">风扇</span>
              <span class="monset">
                <span class="k_reserfan" @click='setMonfn("fan","fan_3")'>取消强制</span>
                <span class='kg' :class='{"active":set_fan}' @click='setMonfn("fan")'>
                  <span class="dian">
                    
                  </span>
                </span>
              </span>
           </li>
           <li class='mon_li'><span class="monname">门锁</span>
            <span class="monset">
              <span class="opendoor glyphicon glyphicon-off" @click='setMonfn("door")'></span>
            </span>
           </li>
           <li class='mon_li'>
              <span class="monname">摄像机1</span>
              <span class="monset">
                <span class='kg' :class='{"active":set_o1}' @click='setMonfn("o_1")'>
                  <span class="dian">
                    
                  </span>
                </span>
                <span class="k_reser glyphicon glyphicon-repeat" @click='setMonfn("o_1","rst")'></span>
              </span>
           </li>
           <li class='mon_li'>
              <span class="monname">摄像机2</span>
              <span class="monset">
                <span class='kg' :class='{"active":set_o2}' @click='setMonfn("o_2")'>
                  <span class="dian">
                    
                  </span>
                </span>
                <span class="k_reser glyphicon glyphicon-repeat" @click='setMonfn("o_2","rst")'></span>
              </span>
           </li>
           <li class='mon_li'>
            <span class="monname">补光灯</span>
            <span class="monset">
                <span class='kg' :class='{"active":set_o3}' @click='setMonfn("o_3")'>
                  <span class="dian">
                    
                  </span>
                </span>
                <span class="k_reser glyphicon glyphicon-repeat" @click='setMonfn("o_3","rst")'></span>
            </span>
           </li>
           <li class='mon_li'>
            <span class="monname">闪光灯</span>
            <span class="monset">
                <span class='kg' :class='{"active":set_o4}' @click='setMonfn("o_4")'>
                  <span class="dian">
                    
                  </span>
                </span>
                <span class="k_reser glyphicon glyphicon-repeat" @click='setMonfn("o_4","rst")'></span>
            </span>
           </li>
           <li class='mon_li'>
            <span class="monname">光端机</span>
            <span class="monset">
                <span class='kg' :class='{"active":set_o5}' @click='setMonfn("o_5")'>
                  <span class="dian">
                    
                  </span>
                </span>
                <span class="k_reser glyphicon glyphicon-repeat" @click='setMonfn("o_5","rst")'></span>
            </span>
           </li>
         </ul>
         <span class="closebtn" @click='hideSetMon'>关闭</span>
      </div>
    </div>
    <div class="VueDragResize" v-show='monitorBox'>
      <span class="font" @click='showSetMon'>监控箱</span>
    </div>
    <!-- <VueDragResize  :click='showSetMon' class='VueDragResize' :parentLimitation ="true" :isResizable="false" :isActive="false" :w="60" :h="60" :x="docWidth" :y="docHeight" v-on:resizing="resize" v-on:dragging="resize" >
      <span class="font" @click='showSetMon'>监控箱</span>
    </VueDragResize> -->
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
                <li @click='goEcharsvir("/hheDetchars",{"dcode":sItem.dcode,"dname":D_H_Data[0].name},sItem)' v-show='item.dcode == sItem.dcode && !not_Show_Values' v-for='(sItem,Index) in S_V_Data'>
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
<!--         <div class="swiper-slide" v-if='monitorBox'>fffffffffffffff</div> -->
      </div>
      <!-- Add Pagination -->
      <div class="PageTab swiper-pagination" ></div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcode'
import Tool from '../utilities/Tool'
import VueDragResize from 'vue-drag-resize';
import { Toast } from 'mint-ui';

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
      pageSlide:0,
      fifterDcode:['th'],
      docHeight:'',
      docWidth:'',
      monitorBox:false,
      set_o1:false,
      set_o2:false,
      set_o3:false,
      set_o4:false,
      set_o5:false,
      set_door:false,
      set_fan:false,
    }
  },
  components: {
    QRCode: QRCode,
    VueDragResize:VueDragResize
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
      sendByCode:'sendByCode',
      showAttrByModel:'showAttrByModel'
    }),
    goEcharsDatavir(item){
       let setArr = this.fifterDcode;
       if(setArr.indexOf(item.dcode) == 0){
          return true;
       }
    },
    goEcharsvir(type,query){
      let _this = this;
      let setArr = this.fifterDcode;
       if(query.dcode == 'th'){
          let TH = _this.S_V_Data[_this.ucode+"_th"];
          if(TH.h != undefined){
              query.h = TH.h;
          }
          if(TH.t != undefined){
              query.t = TH.t;
          }
          if(TH.h == undefined&&TH.t == undefined){
            Toast('未采集到温湿度数据');
            return;
          }
       }
       query.ucode = _this.ucode;
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
    creatSwiper(){
      let _this = this;
      if(_this.$store.fromChars){
         _this.pageSlide = 1;
         _this.$store.fromChars = false;
      }else{
         _this.pageSlide = 0;
      }
      let swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        spaceBetween: 1,
        initialSlide:_this.pageSlide,
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
            case 3:
              TabName = '智能监控箱';
              break;
          }
          return '<span style="margin:5px 0px" class="myTabPageStyle ' + className + '">' + TabName + '</span>';
        }
      });
    },
    InZation() {
      let _this = this;
      _this.Get_Device_Host([{ 'ucode': _this.ucode }, function(res) {
        _this.D_H_Data = res.data.result;
        console.log(res.data.result[0].model);
        if(res.data.result[0].model == 'mbox'){
          console.log('cc');
          _this.monitorBox = true;
        }
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

      _this.Get_Device_Device([{ 'ucode': _this.ucode }, function(res) {
        if(res.data.result.length == 0){
            _this.sksj_nullimg = true;
        }
        let filterEcher = [];
        _this.D_D_Data = res.data.result;
        _this.D_D_Data.map(function(item,index){
            if(_this.goEcharsDatavir(item)){  
              let ar = {};
              ar.ucode = item.ucode;
              ar.dcode = item.dcode;
              ar.model = item.model;
              filterEcher.push(ar)
              console.log(filterEcher)
            }
        });
        console.log(_this.D_D_Data);
        localStorage.setItem('filterEcher', JSON.stringify(filterEcher))
      }])
    },
    InZation_Refresh() {
      let _this = this;

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
          _this.showAttrByModel([{ 'ucode': _this.ucode }, function(res) {
                console.log(res);
          }])
          _this.S_V_Data = res.data.result;
          let d = _this.S_V_Data;
          for (let i in d) {
            // dcode = i.split('_')[1]; //提取dcode 用于对比
            let dcode = i.substring(i.indexOf("_")+1, i.length);
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
          if(_this.monitorBox){
            _this.set_o1=_this.S_V_Data[_this.ucode+"_o_1"].s == 'on';
            _this.set_o2=_this.S_V_Data[_this.ucode+"_o_2"].s == 'on';
            _this.set_o3=_this.S_V_Data[_this.ucode+"_o_3"].s == 'on';
            _this.set_o4=_this.S_V_Data[_this.ucode+"_o_4"].s == 'on';
            _this.set_o5=_this.S_V_Data[_this.ucode+"_o_5"].s == 'on';
            _this.set_door=_this.S_V_Data[_this.ucode+"_door"].s == 'ok';
            _this.set_fan=_this.S_V_Data[_this.ucode+"_fan"].s == 'on';
          }
        }
      }])
    },
    showSetMon(){
      let _this = this;
      $(_this.$refs.MonMask).css({'left':'0'});
    },
    hideSetMon(){
      let _this = this;
      _this.InZation_Refresh();
      $(_this.$refs.MonMask).css({'left':'-100%'});
    },
    setMonfn(state,rs){
      let _this = this;
      let _ucode = _this.ucode;
      let val = {};
      switch(state){
        case 'o_1':
           if(rs != 'rst'){
             if(_this.set_o1){
                val = {'code':'o_1_off','name':'关闭摄像机1'};
             }else{
                val = {'code':'o_1_on','name':'打开摄像机1'};
             }
           }else{
             val = {'code':'o_1_rst','name':'重置摄像机1'};
           }
        break;
        case 'o_2':
           if(rs != 'rst'){
             if(_this.set_o2){
                val = {'code':'o_2_off','name':'关闭摄像机2'};
             }else{
                val = {'code':'o_2_on','name':'打开摄像机2'};
             }
           }else{
             val = {'code':'o_2_rst','name':'重置摄像机2'};
           }
        break;
        case 'o_3':
           if(rs != 'rst'){
             if(_this.set_o3){
                val = {'code':'o_3_off','name':'关闭补光灯'};
             }else{
                val = {'code':'o_3_on','name':'打开补光灯'};
             }
           }else{
             val = {'code':'o_3_rst','name':'重置补光灯'};
           }
        break;
        case 'o_4':
           if(rs != 'rst'){
             if(_this.set_o4){
                val = {'code':'o_4_off','name':'关闭闪光灯'};
             }else{
                val = {'code':'o_4_on','name':'打开闪光灯'};
             }
           }else{
             val = {'code':'o_4_rst','name':'重置闪光灯'};
           }
        break;
        case 'o_5':
           if(rs != 'rst'){
             if(_this.set_o5){
                val = {'code':'o_5_off','name':'关闭光端机'};
             }else{
                val = {'code':'o_5_on','name':'打开光端机'};
             }
           }else{
             val = {'code':'o_5_rst','name':'重置光端机'};
           }
        break;
        case 'fan':
           if(rs != 'fan_3'){
             if(_this.set_fan){
                val = {'code':'fan_4','name':'关闭风扇'};
             }else{
                val = {'code':'fan_5','name':'打开风扇'};
             }
           }else{
             val = {'code':'fan_3','name':'取消强制'};
           }
        break;
        case 'door':
            val = {'code':'lock','name':'开锁'};
        break;
      }
      this.$xfdDialog.confirm({
          title: '',
          mes: `<div class="aaa"><span style="font-size:17px">确定${val.name}吗?</span></div>`,
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
                _this.sendByCode([{"ucode":_ucode,"command":val.code},function(res){
                  if(res.data.code == 0){
                      //_this.set_o1 = false;
                      Toast(res.data.message)
                      setTimeout(function(){
                         _this.InZation_Refresh();
                      },2000)
                  }else{
                      Toast(res.data.message)
                  }
                }])
              }
            }
          ]
      });
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    }
  },
  created(){
    let _this = this;
    _this.ucode = this.$route.query.ucode;
  },
  mounted() {
    let _this = this;
    _this.ucode = this.$route.query.ucode;
    _this.docHeight = this.$el.getBoundingClientRect().height - 70;
    _this.docWidth = this.$el.getBoundingClientRect().width -70;
    this.creatSwiper();
    this.InZation();
    this.InZation_Refresh();
    setInterval(_this.InZation_Refresh, 8000)

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
.VueDragResize{
  position: fixed;
  z-index: 998 !important;
  background: #fff;
  width: 60px;
  height: 60px;
  background:none;
  right:10px;
  bottom: 10px;
  .font{
    border-radius: 100px;
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 60px;
    color:#e2e2e2;
    background: #EAA25C;
  }
}
.MonMask{
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0,0,0,0.4);
  position: fixed;
  left:-100%;
  top:0;
  transition:all .5s;
  display: flex;
  align-items: center;
  justify-content: center;
  .MonMask_cen{
    width: 86%;
    height: 90%;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 4px 8px 0 rgba(7,17,27,.05);
    padding: 15px;
    position: relative;
    .closebtn{
      width: 100%;
      height:40px;
      background: #7CCD7C;
      color:#e2e2e2;
      text-align: center;
      line-height: 40px;
      display: block;
      position: absolute;left: 0;
      border-radius: 0 0 10px 10px;
      bottom: 0;
    }
    .Mon_list{
       width: 100%;
       .mon_li{
         width: 100%;
         height: 56px;
         line-height: 56px;
         font-size: 16px;
         color:#777;
         border-bottom: 1px dashed #ddd;
         .monset{
          float: right;
          height: 56px;
          display: inline-block;
          .opendoor{
            width: 25px;
            height: 25px;
            float: left;
            margin-top: 15px;
            margin-left: 5px;
            font-size: 23px;
            color:#ff5e52;
          }
          .k_reserfan{
            padding: 3px 5px;
            border-radius: 5px;
            margin-left:5px;
            background:#EAA25C;
            letter-spacing: 2px;
            color:#fff; 
          }
          .k_reser{
            font-size: 23px;
            width: 25px;
            height: 25px;
            float: left;
            margin-top: 15px;
            margin-left: 5px;
            color:#EAA25C;
            transition:all .5s;
            transform:rotateY(180deg);
            &:hover{
              transform:rotate(360deg);

            }
          }
          .kg{
            display:inline-block;
            width: 50px;
            height: 26px;
            background: #777;
            border:1px solid #e2e2e2;
            margin-top: 14px;
            border-radius: 20px;
            cursor: pointer;
            float: left;
            .dian{
              width: 22px;
              height: 22px;
              display: block;
              background: #fff;
              border-radius: 12px;
              margin: 1px 0 0 1px;
              transition:all .5s;
            }
            &.active{
              background: #7CCD7C;
              .dian{
                 margin-left: 24px;
              }
            }
          }
         }
         &:last-child{
           border-bottom:1px solid #ddd;
         }
       }
    }

  }
}
</style>
