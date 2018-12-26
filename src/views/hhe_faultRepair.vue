<template>
  <div class="UserJcxx FaultRep">
    <div class="AppTitle">
      <span @click='closeWxpage' class="AT_leftIco glyphicon glyphicon-menu-left"></span>
      <div class="AT_cenFont"><h1>{{AT_cenFont}}</h1>
      <span class="AT_Right" @click='handleGoto("/hhe_faultRepair_notes")'>报修记录</span>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">报修人姓名 :<span class="needs">*</span></div>
      <div class="IL_cen">
        <div class="IL_input-group input-group">
          <span class="input-group-addon glyphicon glyphicon-user"></span>
          <input maxlength="10"  v-model='saveInfos.name' type="text" class="form-control" placeholder="User Name" aria-describedby="sizing-addon2">
        </div>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">联系电话 :<span class="needs">*</span></div>
      <div class="IL_cen">
        <div class="IL_input-group input-group">
          <span class="input-group-addon glyphicon glyphicon-earphone"></span>
          <input ref='val_lxdh' Tit='手机号码' v-model='saveInfos.tel' type="tel" class="form-control" placeholder="User Telephone" aria-describedby="sizing-addon2">
        </div>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">联系地址 :<span class="needs">*</span></div>
      <div class="IL_cen">
        <div class="IL_input-group input-group">
          <span class="input-group-addon glyphicon glyphicon-map-marker"></span>
          <input v-model='saveInfos.address' type="text" class="form-control" placeholder="User Address" aria-describedby="sizing-addon2">
        </div>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">设备号 :<span class="needs">*</span></div>
      <div class="IL_cen">
        <div class="IL_input-group input-group">
          <span class="input-group-addon glyphicon glyphicon-equalizer"></span>
          <input maxlength="6" v-model='saveInfos.ucode' type="text" class="form-control" placeholder="Device Ucode" aria-describedby="sizing-addon2">
        </div>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">具体内容 :</div>
      <div class="IL_cen">
        <textarea v-model='saveInfos.content' class="IL_textarea" placeholder="请输入具体内容"></textarea>
      </div>
    </div>
    <div class="UpLoadRouView">
      <router-view  name='UpLoadRouView'></router-view>
    </div>
    <button @click='submitInfo' type="button" class="IL_saveBtn btn btn-info">提交</button>
  </div>
</template>
<script>
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
      AT_cenFont: '设备报修',
      saveInfos:{
        name:'',
        ucode:'',
        tel:'',
        address:'',
        content:'',
        imgurl:'',
      },
    }
  },
  methods: {
    ...mapActions({
       saveFaReInfo:'saveFaReInfo',
       GetUserInfo:'GetUserInfo',
       faReInfoNotes:'faReInfoNotes'
    }),
    closeWxpage(){
      WeixinJSBridge.call("closeWindow")
    },
    handleGoto(type) {
      this.$router.push({
        path: type
      });
    },
    myValidata(regexp,str){
        if(!new RegExp(regexp).test(this.$refs[str].value)){
            return false;
        }else{
          return true;
        }
    },
    submitInfo(){
      let _this = this;
      _this.saveInfos.imgurl = '';
      if(!this.saveInfos.name){
          Toast('用户名不能为空');
          return;
      }else if(!this.saveInfos.ucode){
          Toast('设备号不能为空');
          return;
      }else if(!this.saveInfos.tel){
          Toast('电话号码不能为空');
          return;
      }else if(!this.saveInfos.address){
          Toast('联系地址不能为空');
          return;
      }else if(!this.saveInfos.content){
          Toast('故障内容不能为空');
          return;
      }else{
        let vs1 = _this.myValidata(/^1(3|4|5|7|8)\d{9}$/,"val_lxdh")

        for(let url in this.$store.state.updataUrls){
          _this.saveInfos.imgurl += this.$store.state.updataUrls[url] + ','
        }

        if(!vs1){
           Toast('手机格式不正确')
         }else{
            this.saveFaReInfo([_this.saveInfos,function(res){
                 if(res.data.status == 0){
                    Toast('提交成功');
                    _this.handleGoto('/hhe_faultRepair_notes')
                 }else{
                    Toast(res.data.message)
                 }
            }])
         }
      }
    }
  },
  mounted() {
     let _this = this;
     this.GetUserInfo(function(res){
        let datas = res.data.result;
        console.log(res.data.result);
        _this.saveInfos = {
            name:datas.displayName,
            address:datas.address||'',
            tel:datas.phone,
            ucode:'',
            content:'',
            imgurl:'',
        }
     })
     this.faReInfoNotes(function(res){})
  },
}

</script>
<style lang='scss' scoped>

</style>
