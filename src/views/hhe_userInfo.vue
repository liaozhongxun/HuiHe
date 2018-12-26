<template>
  <div class="UserJcxx UserInfo">
    <div class="AppTitle">
      <span @click='closeWxpage' class="AT_leftIco glyphicon glyphicon-menu-left"></span>
      <div class="AT_cenFont"><h1>{{AT_cenFont}}</h1>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">账 号 :<span class="needs">*</span></div>
      <div class="IL_cen">
        <input maxlength="50" v-model='defaultInfo.username' @input="outfont" class="IL_input" placeholder="请输入账号">
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">姓 名 :<span class="needs">*</span></div>
      <div class="IL_cen">
        <input maxlength="10" v-model='defaultInfo.displayName' class="IL_input" placeholder="请输入名称">
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">手机号 :<span class="needs">*</span></div>
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
    <button @click='saveInfo' type="button" class="IL_saveBtn btn btn-info">保 存</button>
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
      AT_cenFont: '用户信息',
      originalname:'',
      defaultInfo:{
        displayName:'',
        username:'',//用户账号
        email:'',
        phone:''
      }
    }
  },
  methods: {
    ...mapActions({
       GetUserInfo:'GetUserInfo',
       updateUser:'updateUser'
    }),
    closeWxpage(){
      WeixinJSBridge.call("closeWindow")
    },
    outfont(){
      console.log(this.defaultInfo);
      let _this = this;
      _this.defaultInfo.username=_this.defaultInfo.username.replace(/[\u4e00-\u9fa5]/ig,'')
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
      }else if(!this.defaultInfo.username){
          Toast('用户账号不能为空');
          return;
      }else if(!this.defaultInfo.phone){
          Toast('电话号码不能为空');
          return;
      }else{

          let vs1 = _this.myValidata(/^1(3|4|5|7|8)\d{9}$/,"val_lxdh");
          let vs2 = _this.myValidata(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,'val_yx');
          if(!vs1){
            Toast('手机格式不正确')
          }else if(!vs2&&this.defaultInfo.email!=''){
            Toast('邮箱格式不正确')
          }else{
            _this.updateUser([_this.defaultInfo,function(res){
               if(res.data.status == 0){
                  console.log(_this.originalname+":::"+_this.defaultInfo.username)
                  if(_this.originalname == _this.defaultInfo.username){
                     Toast('保存成功')
                  }else{
                     Toast('保存成功,由于账号变更需进入页面生效,稍后系统将自动关闭页面')
                     setTimeout(function(){
                        _this.closeWxpage();
                     },4000)
                  }
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
     _this.GetUserInfo(function(res){
        let datas = res.data.result;
        console.log(res.data.result);
        _this.originalname = datas.username;
        _this.defaultInfo = {
          displayName:datas.displayName,
          username:datas.username,//用户账号
          email:datas.email,
          phone:datas.phone
        }
     })
  },
}

</script>
<style lang='scss' scoped>


</style>
