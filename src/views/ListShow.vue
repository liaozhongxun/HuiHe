<template>
  <div class="ListShow">
    <div class="S_Search">
      <div class="S_cen">
        <div class="left">
          <input v-model="interinfo" ref="SearObj" id='L_SearObj' type="text" name="" placeholder="请输入设备信息" />
        </div>
        <button class="right p_center btn btn-default glyphicon glyphicon-search" @click='getDevBy()'></button>
      </div>
    </div>
<!--     <ul ref="S_list" class="S_list">
      <li @click='Lookup(item)' v-for="item in Search_list_li">{{item.name}}</li>
    </ul> -->
    <div ref='List_Device' class="List_Device">
      <ul ref="List_Device_ul" class="List_Device_ul clearfix">
        <li class="list" v-for="item in DevByList" @click='handleGoto("/DeviceDetInfo",{ucode:item.ucode})'>
          <div class="leftImg" :style="{'background': 'url('+item.icon+') center center no-repeat','background-size':'contain'}">
            
          </div>

          <div class="font">
            <div class="de_name" :title='item.name'>
              <span class="key"></span>
              <span class="value">{{item.name}}</span>
            </div>
            <div class="de_rname" :title='item.rname'>
              <span class="key">地点 ： </span>
              <span class="value">{{item.rname}}</span>
            </div>
            <div class="de_ucode" :title='item.ucode'>
              <span class="key">编号 ： </span>
              <span class="value">{{item.ucode}}</span>
            </div>
            <div class="de_connstate">
              <span class="key">状态 ： </span>
              <span style='color:#5EEA62' v-show='item.connstate=="在线"' class="value">{{item.connstate}}</span>
              <span style='color:#858585' v-show='item.connstate=="离线"' class="value">{{item.connstate}}</span>
              <span style='color:#E83352' v-show='item.connstate=="告警"' class="value">{{item.connstate}}</span>
              <span style='color:#EAA25C' v-show='item.connstate=="异常"' class="value">{{item.connstate}}</span>
            </div>
            <div>{{item.style}}</div>
          </div>
        </li>
        <li class="more" v-show='ismore'>没有更多了</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { TheTool,Tool } from '../utilities';
import { InfiniteScroll } from 'mint-ui';
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      ismore: false,
      list: [2],
      DevByList:[],
      interinfo:'',
      Search_list_li:[],
      pageIndex:2,
    }
  },
  methods: {
    ...mapActions({
      Ser_DevBy: 'SER_DEVBY'
    }),
    handleGoto(type,query) {
      let Query= query||'';
      this.$router.push({
        path: type,
        query:Query
      });
    },
    lookMore(){
        let _this = this;
        this.Ser_DevBy([{'name':'','pageSize':10,'pageNumber':_this.pageIndex},function(res){
             if(res.data.result.totalPage >= res.data.result.pageNumber){
                _this.DevByList = _this.DevByList.concat(res.data.result.list) 
             }else{
                _this.ismore = true;
             }
             _this.pageIndex++;
             _this.DevByList = TheTool.mapDevImgTool(_this.DevByList,_this.$store.state.DevImg_data);
        }])
    },
    getDevBy(opts){
       let _this = this;
       let Opts = '';
       _this.pageIndex = 2
       if(opts){
           Opts = opts;
       }else{
           if(_this.interinfo == ''){
             Opts = {'name':'','pageSize':20,'pageNumber':1};
           }else{
             Opts = {'name':_this.interinfo};
           }
       }
       this.Ser_DevBy([Opts,function(res){
             _this.DevByList = res.data.result.list;
             _this.DevByList = TheTool.mapDevImgTool(_this.DevByList,_this.$store.state.DevImg_data);

       }])
    }
  },
  mounted() {
    let _this = this;
    _this.ismore = false;
    this.getDevBy({'name':'','pageSize':10,'pageNumber':1});
    console.log(_this.$refs.List_Device);
    Tool.scrollpage(_this.$refs.List_Device,_this.$refs.List_Device_ul,108, function() {
            _this.lookMore()
    })
  },
}

</script>
<style lang='scss' scoped>
.ListShow {
  width: 100%;
  height: 100%;
  background: #eee;

  .S_Search {
    background: #fff;
  }

  .List_Device {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    height: 100%;
    overflow: auto;

    .List_Device_ul {
      background: #eee;
      padding:8px;
      padding-bottom: 0;
      margin-bottom: 0;
    
      .list {
        width: 96%;
        background: #fff;
        padding: 8px;
        margin:0 auto;
        margin-bottom: 10px;
        border-radius: 3px;
        font-size: 15px;
        display: flex;

        // border: 1px solid #d7d7d7;
        box-shadow: 0 0 10px 1px rgba(7,17,27,.1);
        // &:nth-child(odd){
        //   float: left;
        // }
        // &:nth-child(even){
        //   float: right;
        // }
        div{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space:nowrap;
          cursor: pointer;
        }
        .de_name{
          font-size: 16px;
          color:#000;
          // font-weight: bold;
          margin-bottom:5px;
          color:#000;
          padding-bottom: 5px;
          border-bottom: 1px dashed #ccc;
        }
        .font{
           flex:1;
           // font-size: 16px;
        }
        .leftImg{
          width:80px;height: 80px;
          margin-top: 10px;
          // border:1px solid #eee;
          margin-right: 10px;
        }
      }
      .more{
        width: 100%;
        height: 30px;
        background: #fff;
        opacity: 0.7;
        margin-bottom:10px;
        color:#333;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .load {
        width: 100;
        height: 25px;
      }
    }
  }
}

</style>
