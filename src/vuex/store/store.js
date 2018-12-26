import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import DevInfoMutations from '../mutations/DevInfoMutations';
import DeviceDetInfoMutation from '../mutations/DeviceDetInfoMutation';
import AlarmSetingMutation from '../mutations/AlarmSetingMutation';


const state = {
   token:'',
   expires:'',
   intval:null,

   DevImg_data:'', //设备对应图片储存

   notdata_url:'./static/images/notdata.png', //没得到数据小图标
   notpowe_url:'./static/images/notpower.png', //没权限图标
 
   updataUrls:{}, //图片上传图片路径

   filterEcher:[]


}
const actions = {
    increment ({ commit, state }) {
      console.log(state)
      state.globalTitle = 'you';
      Tool.getIPs(function(ip){return ip});
      //context.commit('increment')
    },
  }

export default new Vuex.Store({
  state,
  actions,
  modules:{
    DevInfoMutations,
    DeviceDetInfoMutation,
    AlarmSetingMutation
  }
})
