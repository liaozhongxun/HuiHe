<template>
  <div class="UserJcxx FaultRep_notes">
    <div class="AppTitle">
      <span @click='$router.back(-1)' class="AT_leftIco glyphicon glyphicon-menu-left"></span>
      <div class="AT_cenFont"><h1>{{AT_cenFont}}</h1>
      </div>
    </div>
    <div class="Notes_cen">
      <ul class="list">
         <li class="item" v-for="item in datas">
            <h5 class="username">用户名 : {{item.name}}</h5>
            <h5>用户地址 : {{item.address}}</h5>
            <h5>设备号 : {{item.ucode}}</h5>
            <h5>报修内容 : {{item.content}}</h5>
            <h5>报修时间 : {{item.createtime | filt_createtime}}</h5>
            <h5>联系电话 : {{item.tel}}</h5>
            <div class='urls clearfix'>
               <div class="every" v-for='urls in item.imgurl'>  
                   <span class="itemspan"  :style="{'background': 'url('+urls+') center center no-repeat','background-size':'contain'}"></span>
               </div>
            </div>
         </li>
      </ul>
    </div>
  </div>
</template>
<script>
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
      AT_cenFont: '报修记录',
      datas:''
    }
  },
  filters: {
    filt_createtime(val) {
      return Tool.dateFormat(val);
    },
  },
  methods: {
    ...mapActions({
       faReInfoNotes:'faReInfoNotes'
    }),
  },
  mounted() {
     let _this = this;
     this.faReInfoNotes(function(res){
       let baseApi = window.applicationConfig.fileApi;
       _this.datas = res.data.result;
       for(let i in _this.datas){
           let url = []
           if(_this.datas[i].imgurl != null){
              let urlarr= _this.datas[i].imgurl.split(',');
               urlarr.pop();
               for(let itemUrl in urlarr){
                  url.push(baseApi + urlarr[itemUrl]);
               }
               _this.datas[i].imgurl = url;
           }
       }
       console.log(_this.datas)
     })
  },
}

</script>
<style lang='scss' scoped>
.Notes_cen{
  width: 100%;
  height: 100%;
  .list{
    li{
      margin-bottom: 10px;
      background: #fff;
      padding: 10px;
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
      .username{
        font-size: 16px;
        color:#333;
        padding-bottom: 5px;
      }
      h5{
        font-size: 15px;
        color:#666;
      }
      .urls{
        width: 100%;
        display: flex;
        .every{
          &:hover{
             flex:5;
          }
          transition:all .7s;
          flex:1;
          height:100px;
          border:1px dashed #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          &:not(:last-child){
            border-right: none;
          }
        }
        .itemspan{
           display: block;
           width: 94%;
           height: 94%;
        }
      }
    }
  }
}
</style>
