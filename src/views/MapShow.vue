<template>
  <div class="MapShow" >
    <div class="S_Search">
      <div class="S_cen">
        <div class="left">
          <input v-model='interinfo' ref="SearObj" @focus='getDevBy()' id='SearObj' type="text" name="" placeholder="请输入设备信息" />
        </div>
        <button @click='getDevBy()' ref="SearClose" class="right p_center glyphicon glyphicon-search">
          
        </button>
      </div>
    </div>
    <ul v-show='showUllist' ref="S_list" class="S_list">
      <li v-show='!ser_devnone' @click='Lookup(item)' v-for="item in Search_list_li">{{item.name}}</li>
      <li v-show='ser_devnone' @click='showUllist = false'>没查找到该设备</li>
    </ul>
    <div id="container"></div>
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
      SearObj: "", //搜索框value值
      DevData: [],
      Search_list_li: [],
      interinfo: '',
      showUllist: false,
      ser_devnone: false
    }
  },
  methods: {
    ...mapActions({
      GetDev: 'DEVINFO_GETDEV',
      Ser_DevBy: 'SER_DEVBY'
    }),
    ...mapMutations({
      CREAT_MARKERS: 'CREAT_MARKERS'
    }),
    // SearchBar() { //差点击搜索更换  目前取不到的state
    //   let _this = this;
    //   let Search_list = _this.$refs.S_list;
    //   let searchText = this.$refs.SearObj.value;
    //   this.SearObj = this.$refs.SearObj.value;
    //   if (this.SearObj) {
    //     let Mamk = _this.DevData;
    //     _this.Search_list_li = [];
    //     for (let i = 0; i < Mamk.length; i++) {
    //       if (new RegExp("^" + searchText, "gim").test(Mamk[i].id) || new RegExp("^" + searchText, "gim").test(Mamk[i].name)) {
    //         _this.Search_list_li.push({ 'id': Mamk[i].id, 'name': Mamk[i].name, 'lnglat': Mamk[i].lnglat })
    //       }
    //     }
    //     $(Search_list).find('li').hover(function() { $(this).addClass('hover') }, function() { $(this).removeClass('hover') });
    //     $(Search_list).show();
    //   } else {
    //     $(this.$refs.S_list).hide();
    //   }
    // },
    Lookup(item) {
      // this.CREAT_MARKERS(item);
      $(this.$refs.SearObj).val('');
      this.showUllist = false;
      this.getSameidDev(item);
    },
    getSameidDev(item) {
      let _this = this;
      this.GetDev(function(data) {
        for (let i in data) {
          if (item.rid) {
            if (data[i].id == item.rid) {
              item.lnglat = data[i].lnglat;
              item.dname = new Array(new Array(item.ucode, item.name));
              _this.CREAT_MARKERS(item);
            }
          } else {
            if (data[i].id == item.id) {
              item.lnglat = data[i].lnglat;
              item.dname = new Array(new Array(item.ucode, item.name));
              _this.CREAT_MARKERS(item);
            }
          }
        }
      });
    },
    handleGoto(type) {
      this.$router.push({
        path: type
      });
    },
    markAttr(text) {
      Toast(text);
    },
    get_dev(){
      let _this = this;
      this.GetDev(function(data) {
        _this.DevData = data;
      });
    },
    getDevBy(opts) {
      let _this = this;
      let Opts = '';

      _this.ser_devnone = false;
      if (opts) {
        Opts = opts;
      } else {
      	 if (_this.interinfo == '') {
          Opts = { 'name': '','pageSize':10, 'pageNumber': 1 };
         }else{	
          Opts = { 'name': _this.interinfo };
         }
      }
      this.Ser_DevBy([Opts, function(res) {
        _this.showUllist = true;
        if (res.data.result.list != 0) {
          _this.Search_list_li = res.data.result.list;
        } else {
          _this.ser_devnone = true;
        }
      }])
    }
  },
  computed: {
    ...mapState({
      DevInfoMutations: (state) => {
        return state.DevInfoMutations.state
      }
    }),
  },
  mounted() {
    let _this = this;
    this.get_dev();
    // setInterval(_this.get_dev,60000)




    // $(_this.$refs.SearClose).click(function() {
    //   $(_this.$refs.S_list).slideUp();
    // })
  },
}

</script>
<style lang='scss' scoped>
#container {
  width: 100%;
  height: 100%;
}

.MapShow {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>
