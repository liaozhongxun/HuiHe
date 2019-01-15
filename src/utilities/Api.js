import Axios from './Ajax';
import store from '../vuex/store/store'
import xfdToast from '../components/dialog/index';

const CS = window.applicationConfig.currencyServer;
const WMS = window.applicationConfig.wechatMpServer;
const BS = window.applicationConfig.businessServer;
const SCS = window.applicationConfig.securityServer;
const FS = window.applicationConfig.influxdbServer;
const PS = window.applicationConfig.udpProxyServer;

const showDeviceAll = CS + '/currency/showDeviceAll'
const showDeviceBy = CS + '/page/currency/showDeviceBy'
const showDeviceHost = CS + '/currency/showDeviceHost'
const showDeviceDevice = CS + '/currency/showDeviceDevice'
const getExpireInfo = WMS + '/qrcode/getExpireInfo' 
const getSetting = WMS + '/material/getSetting'
const showValues  = BS + '/device/showValues'
const showAlarm = BS +'/device/showAlarm'
const showDevByScan = CS + '/page/currency/showDeviceByScan'
const showDevByAuth = CS + '/page/currency/showDeviceByAuth' 
const refresh = SCS + '/auth/token/refresh'
const setSetting = BS + '/alarm/setSetting'
const delSetting = BS + '/alarm/delSetting'
const unsubscribe = BS + '/device/unsubscribe'
const imgUpload = BS + '/file/upload/base64'
const saveFaReInfo = BS + '/failuresRepair/save'
const GetUserInfo = SCS + '/auth/users/current'
const idGetUserInfo = SCS + '/auth/getUser' 
const updateUser = SCS + '/auth/admin/updateUser4WeChat'
const adminUpdateUser = SCS + '/auth/admin/adminUpdateUser4Wechat'
const faReInfoNotes = BS + '/failuresRepair/showByUser'
const getShowDevImg = CS + '/currency/showDeviceModel'  //2.4.1. 查询所有设备类型
const showDeviceQueries = FS+ '/influxdb/showDeviceQueries'
const sendByCode = PS + '/sendByCode'
const showAttrByModel = CS +'/currency/showAttrByModel' //2.3.4. 根据类型获取解析参数

const BaseApi = {
  showDeviceAll: () => { //获取地图上显示点的数据
    if(store.state.oneload){
       xfdToast.loading.open();
       store.state.oneload = false;
    }
    return Axios.res('post', showDeviceAll, {});
  },

  showDeviceBy: (opts) => { //搜索设备
    return Axios.res('post', showDeviceBy, {
      'name': opts.name,
      'pageSize': opts.pageSize || 15,
      'pageNumber': opts.pageNumber || 1
    });
  },

  showDeviceHost: (opts) => { //根据设备号获取设备主机信息 
    return Axios.res('post', showDeviceHost, {
      'ucode': opts.ucode,
    });
  },

  showDeviceDevice: (opts) => { //根据设备号获取外设信息
    return Axios.res('post', showDeviceDevice, {
      'ucode': opts.ucode,
    });
  },

  getExpireInfo:(opts) => { //获取设备临时微信二维码
  	return Axios.res('post', getExpireInfo, {
      'qrcode': opts.qrcode,
      'expireSeconds': opts.expireSeconds
    });
  },

  showValues:(opts) =>{ //根据设备号获取设备实时采集数据
    return Axios.res('post', showValues, {
      'ucode': opts.ucode,
    });
  },

  showAlarm:(opts) =>{ //根据设备号获取设备历史告警信息
    return Axios.res('post', showAlarm, {
      'pageSize':opts.pageSize || 15,
      'pageNumber':opts.pageNumber || 1,
      'data':{'ucode':opts.ucode}
    });
  },

  showDevByScan:(opts) =>{ //获取当前用户关注绑定的设备
    return Axios.res('post', showDevByScan, {
      'pageSize': opts.pageSize,
      'pageNumber': opts.pageNumber
    });
  },

  showDevByAuth:(opts) =>{ //获取当前用户有归属权限的设备
    return Axios.res('post', showDevByAuth, {
      'pageSize': opts.pageSize,
      'pageNumber': opts.pageNumber
    });
  },

  refresh:() =>{ //刷新token
    return Axios.res('get', refresh);
  },

  setSetting:(opts) =>{ //用户设置不接收告警
    return Axios.res('post', setSetting,{
        'ucode':opts.ucode
    });
  },
 
  delSetting:(opts) =>{ //接收告警
    return Axios.res('post', delSetting,{
        'id':opts.id
    });
  },

  unsubscribe:(opts) =>{ //用户取消关注设备
    return Axios.res('post', unsubscribe,{
        'ucode':opts.ucode
    });
  },
  saveFaReInfo:(opts) =>{ //用户提交报修信息
    return Axios.res('post', saveFaReInfo,{
        'name':opts.name,
        'ucode': opts.ucode,
	    'tel': opts.tel,
	    'address': opts.address,
	    'content': opts.content,
	    'imgurl': opts.imgurl ||null
    });
  },
  faReInfoNotes:(opts) =>{ //用户报修记录
    return Axios.res('post', faReInfoNotes,{});
  },
  GetUserInfo:() =>{ //2.4.2.	当前用户查看信息
    return Axios.res('get', GetUserInfo);
  },
  idGetUserInfo:(opts) =>{ //2.4.4. 用户ID查看详细信息
    return Axios.res('post', idGetUserInfo,{
      'id':opts.id
    });
  },
  getSetting:() =>{ //2.4.	获取微信配置信息
    return Axios.res('get', getSetting);
  },
  updateUser:(opts) =>{ //2.4.8.	当前用户更新信息
    return Axios.res('post', updateUser,{
    	'username':opts.username,
      'displayName':opts.displayName,
	    'email':opts.email,
	    'phone': opts.phone,
    });
  },
  adminUpdateUser:(opts) =>{ //2.4.9. 管理员更新用户信息
    return Axios.res('post', adminUpdateUser,{
      'id': opts.id,
      'description':opts.description,
      'displayName':opts.displayName,
      'email':opts.email,
      'phone': opts.phone,
    });
  },
  getShowDevImg:(opts) =>{ //2.4.1. 查询所有设备类型  查找设备小图片
    return Axios.res('post', getShowDevImg,{});
  },

  showDeviceQueries:(opts) =>{ //4.1. 查询24小时采集数据曲线
    return Axios.res('post', showDeviceQueries,{
      'model': opts.model,
      'dcode':opts.dcode,
      'ucode':opts.ucode
    });
  },

  sendByCode:(opts) =>{ //5.1.1.  智能监控箱指令控制指令下发
    return Axios.res('post', sendByCode,{
      'command':opts.command,
      'ucode':opts.ucode
    });
  },
  showAttrByModel:(opts) =>{ //2.3.4. 根据类型获取解析参数
    return Axios.res('post', showAttrByModel,{
      'ucode':opts.ucode
    });
  },



  imgUpload:(opts) =>{ //图片上传
    return Axios.upload(imgUpload,{
        'fileStr':opts.fileStr,
        'name':opts.name
    },opts.callback1);
  },

}

export default BaseApi;
