import { Api,Tool,TheTool } from '../../utilities';
import * as DevDetinfoTypes from '../types/devdetinfo.types';

const DeviceDetInfoMutation = {
  state: {},
  actions: {
    [DevDetinfoTypes.GET_DEVICE_HOST]({ commit, state }, params) { //tab1
      Api.showDeviceHost(params[0]).then(function(res) {
        params[1](res)
      })
    },

    [DevDetinfoTypes.GET_DEVICE_DEVICE]({ commit, state }, params) { //tab2
      Api.showDeviceDevice(params[0]).then(function(res) {
        params[1](res)
      })
    },

    [DevDetinfoTypes.GET_EXPIRE_INFO]({ commit, state }, params) { //生成二维码
      Api.getExpireInfo(params[0]).then(function(res) {
        params[1](res)
      })
    },

    [DevDetinfoTypes.GET_SHOW_ALARM]({ commit, state }, params) { //历史警告
      Api.showAlarm(params[0]).then(function(res) {
        params[1](res)
      })
    },

    [DevDetinfoTypes.GET_SHOW_VALUES]({ commit, state }, params) { //根据设备号实时采集数据
      Api.showValues(params[0]).then(function(res) {
        params[1](res)
      })
    },

    ['showAttrByModel']({ commit, state }, params) { //2.3.4. 根据类型获取解析参数
      Api.showAttrByModel(params[0]).then(function(res) {
        params[1](res);
      })
    },
  },
  mutations: {

  }
}

export default DeviceDetInfoMutation
