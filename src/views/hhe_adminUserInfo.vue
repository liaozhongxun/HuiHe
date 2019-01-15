<template>
  <div class="UserJcxx UserInfo">
    <div class="AppTitle">
      <span @click='closeWxpage' class="AT_leftIco glyphicon glyphicon-menu-left"></span>
      <div class="AT_cenFont"><h1>{{AT_cenFont}}</h1>
      </div>
    </div>
    <div class="headPhoto">
        <div class="cen" :style="{'background': 'url('+headPhoto+') center center no-repeat','background-size':'contain'}"></div>
    </div>
    <div class="InfoLine">
      <div class="IL_title"><span class="needs">*</span> 姓 名 :</div>
      <div class="IL_cen">
        <input maxlength="10" v-model='defaultInfo.displayName' class="IL_input" placeholder="请输入名称">
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">手机号 :</div>
      <div class="IL_cen">
        <input ref='val_lxdh' Tit='手机号码'  v-model='defaultInfo.phone' class="IL_input" placeholder="请输入手机号">
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">邮 箱 :</div>
      <div class="IL_cen">
        <input ref='val_yx' Tit='邮箱' v-model='defaultInfo.email' class="IL_input" placeholder="请输入邮箱">
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">描 述 :</div>
      <div class="IL_cen">
        <textarea maxlength="50" v-model='defaultInfo.description' class="IL_input" placeholder="请输入内容"></textarea>
      </div>
    </div>
    <button @click='saveInfo' type="button" class="IL_saveBtn btn btn-info">保 存</button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
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
      AT_cenFont: '管理用户',
      headPhoto:'',
      defaultInfo:{
        displayName:'',
        description:'',
        email:'',
        phone:'',
        id:''
      }
    }
  },
  methods: {
    ...mapActions({
       idGetUserInfo:'idGetUserInfo',
       adminUpdateUser:'adminUpdateUser'
    }),
    closeWxpage(){
      WeixinJSBridge.call("closeWindow")
    },
    myValidata(regexp,str){
        if(!new RegExp(regexp).test(this.$refs[str].value)){
            return false;
        }else{
          return true;
        }
    },
    saveInfo(){
      let _this = this;
      if(!this.defaultInfo.displayName){
          Toast('用户名不能为空');
          return;
      }else{

          let vs1 = _this.myValidata(/^1(3|4|5|7|8)\d{9}$/,"val_lxdh");
          let vs2 = _this.myValidata(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,'val_yx');
          if(!vs1&&this.defaultInfo.phone){
            Toast('手机格式不正确')
          }else if(!vs2&&this.defaultInfo.email){
            Toast('邮箱格式不正确')
          }else{
              // if(Tool.objectKeyIsEmpty(_this.defaultInfo,'id')){
              //     Toast('请设置用户信息')
              // }else{
                  _this.adminUpdateUser([_this.defaultInfo,function(res){
                     if(res.data.status == 0){
                        Toast('保存成功')
                     }else{
                        Toast(res.data.message)
                     }
                  }])
              // }
          }
        
      }
    }
  },
  mounted() {
     let _this = this;
     // localStorage.setItem('keycode',602);
     let keyId = JSON.parse(window.localStorage.getItem("keycode")); 
     if(keyId){
       _this.idGetUserInfo([{'id':keyId},function(res){
          let datas = res.data.result;
          console.log(res.data.result);
          _this.defaultInfo = {
            displayName:datas.displayName,
            description:datas.description,
            email:datas.email,
            phone:datas.phone,
            id:datas.id
          }
          _this.headPhoto = datas.headimgurl || '/static/images/notdata.png';
       }])
     }else{
       this.$router.push({
        path: '/notTokenPage'
      });

     }
  },
}

</script>
<style lang='scss' scoped>
  .headPhoto{
    width: 100%;
    height: 120px;
    padding:7px 0 8px 0;
    background: #fff;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
      border-top: 3px solid #EAA25C;
      margin-top: 10px;
    .cen{
      width: 100px;
      height: 100px;
      border-radius: 70px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1), inset 0px 1px 1px rgba(0, 0, 0, 0.7);
    }
  }

</style>
