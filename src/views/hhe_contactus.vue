<template>
  <div class="UserJcxx ContactUS">
    <div class="AppTitle">
      <span @click='closeWxpage' class="AT_leftIco glyphicon glyphicon-menu-left"></span>
      <div class="AT_cenFont"><h1>{{AT_cenFont}}</h1>
      </div>
    </div>
    <div class="AppLogo">
      <img :src="datas.logo" />
    </div>
    <div class="InfoLine">
      <div class="IL_title">公司名称</div>
      <div class="IL_cen">
        <div class="IL_font">{{datas.oname}}</div>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">公司地址</div>
      <div class="IL_cen">
        <div class="IL_font">{{datas.address}}</div>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">联系电话</div>
      <div class="IL_cen">
        <a href="javascript:;" class="IL_font">{{datas.phone}}</a>
      </div>
    </div>
    <div class="InfoLine">
      <div class="IL_title">公众号二维码</div>
      <div class="IL_cen">
        <img class="IL_img" :src='datas.banner'/>
      </div>
    </div>
  </div>
</template>


<script>
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';

export default {
  name: 'App',
  data() {
    return {
       AT_cenFont:'联系我们',
       datas:''
    }
  },
  methods: {
    ...mapActions({
       getSetting:'getSetting'
    }),
    closeWxpage(){
      WeixinJSBridge.call("closeWindow")
    },
    get_setting(){
      let _this = this;
      this.getSetting(function(res){
         let baseFiles = window.applicationConfig.fileApi;
         _this.datas = res.data.result;
         _this.datas.logo = baseFiles + _this.datas.logo;
         _this.datas.banner = baseFiles + _this.datas.banner;

      })
    },
    goBack(){
      // console.log('dfsfs');
      // this.$router.back(-1)
    }
  },
  mounted() {
    this.get_setting();
  },
}

</script>
<style lang='scss' scoped>
.AppLogo{
  width: 100%;
  img{
    margin: 10px auto 0;
    width: 40%;
  }
}
</style>
