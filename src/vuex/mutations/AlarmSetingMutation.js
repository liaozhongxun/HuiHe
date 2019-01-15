import { Api,Tool,TheTool } from '../../utilities';
import * as AlarmSetingTypes from '../types/alarmseting.types';

const DeviceDetInfoMutation = {
  state: {},
  actions: {
    [AlarmSetingTypes.DEV_BY_SCAN]({ commit, state }, params) { //用户关注绑定设备
      Api.showDevByScan(params[0]).then(function(res) {
        params[1](res)
      })
    },

    [AlarmSetingTypes.DEV_BY_AUTH]({ commit, state }, params) { //用户权限设备
      Api.showDevByAuth(params[0]).then(function(res) {
        params[1](res)
      })
    },
    ['SetSetting']({ commit, state }, params) { //设置不接收警告
      Api.setSetting(params[0]).then(function(res) {
        params[1](res)
      })
    },
    ['DelSetting']({ commit, state }, params) { //取消设置不接收警告
      Api.delSetting(params[0]).then(function(res) {
        params[1](res)
      })
    },
    ['unsubscribe']({ commit, state }, params) { //取消关注设备
      Api.unsubscribe(params[0]).then(function(res) {
        params[1](res)
      })
    },
    ['saveFaReInfo']({ commit, state }, params) { //故障报修提交信息
      Api.saveFaReInfo(params[0]).then(function(res) {
        params[1](res)
      })
    },
    ['faReInfoNotes']({ commit, state }, params) { //用户报修记录
      Api.faReInfoNotes().then(function(res) {
        params(res)
      })
    },
    ['GetUserInfo']({ commit, state }, params) { //获取用户信息
      Api.GetUserInfo().then(function(res) {
        params(res)
      })
    },
    ['updateUser']({ commit, state }, params) { //更新用户信息
      Api.updateUser(params[0]).then(function(res) {
        params[1](res)
      })
    },
    ['idGetUserInfo']({ commit, state }, params) { //通过id获取用户信息
      Api.idGetUserInfo(params[0]).then(function(res) {
        params[1](res)
      })
    },
    ['adminUpdateUser']({ commit, state }, params) { // 管理员更新用户信息
      Api.adminUpdateUser(params[0]).then(function(res) {
         params[1](res)
      })
    },
    
    ['sendByCode']({ commit, state }, params) { //5.1.1.  智能监控箱指令控制指令下发
      Api.sendByCode(params[0]).then(function(res) {
         params[1](res)
      })
    },

    ['getSetting']({ commit, state }, params) { //2.4.  获取微信配置信息
      Api.getSetting().then(function(res) {
        params(res)
      })
    },

    ['imgUpload']({ commit, state }, params) { //图片上传
      Api.imgUpload(params[0]).then(function(res) {
        params[1](res)
      })
    },

    ['showDeviceQueries']({ commit, state }, params) { //24h 采集数据曲线
      Api.showDeviceQueries(params[0]).then(function(res) {
        params[1](res)
      })
    },
  },
  mutations: {

  }
}

export default DeviceDetInfoMutation
