import Vue from 'vue'
import Router from 'vue-router'
import { Api,Tool,TheTool } from '../utilities';
import store from '../vuex/store/store'
import xfdToast from '../components/dialog/index';


Vue.use(Router)

const route = [
  {
    path: '/',
    components: {
      default: resolve => require(['@/views/DeviceInfo'],resolve) //没有名的视图:显示的组件
    },
    children: [{
        path: '/',
        name: 'MapShowDef',
        components: {
          DeviceInfoViews: resolve => require(['@/views/MapShow'],resolve) //视图名:显示的组件
        },
        meta: {keepAlive: true}
      },
      {
        path: '/MapShow',
        name: 'MapShow',
        components: {
          DeviceInfoViews: resolve => require(['@/views/MapShow'],resolve)
        },
        meta: {keepAlive: true }
      },
      {
        path: '/ListShow',
        name: 'ListShow',
        components: {
          DeviceInfoViews: resolve => require(['@/views/ListShow'],resolve)
        },
        meta: {keepAlive: true }
      }
    ]
  },
  {
    path: '/DeviceInfo',
    name: 'DeviceInfo',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/DeviceInfo'],resolve),
  },
  {
    path: '/DeviceDetInfo',
    name: 'DeviceDetInfo',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/DeviceDetInfo'],resolve),
  },
  {
    path: '/AlarmSeting',
    name: 'AlarmSeting',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/AlarmSeting'],resolve)
  },
  {
    path: '/notTokenPage',
    name: 'notTokenPage',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/notTokenPage'],resolve)
  },
  {
    path: '/hheFaultRepair',
    component: resolve => require(['@/views/hhe_faultRepair'],resolve),
    children: [
      {
      path: '/',
      name: 'Upload',
      components: {
         UpLoadRouView: resolve => require(['@/views/Upload'],resolve) //视图名:显示的组件
      },
    },
    ]
  },
   {
    path: '/hhe_faultRepair_notes',
    name: 'hhe_faultRepair_notes',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/hhe_faultRepair_notes'],resolve)
  },
  {
    path: '/hheUserInfo',
    name: 'hheUserInfo',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/hhe_userInfo'],resolve)
  },
  {
    path: '/hheAdminUserInfo',
    name: 'hheAdminUserInfo',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/hhe_adminUserInfo'],resolve)
  },
  {
    path: '/hheContactus',
    name: 'hheContactus',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/hhe_contactus'],resolve)
  },
  {
    path: '/hheDetchars',
    name: 'hheDetchars',
    meta: {keepAlive: false},
    component: resolve => require(['@/views/hhe_detchars'],resolve),
  }
]
const router = new Router({
  routes: route
})


const overallReset = {
   getUserImg:()=>{ 
    Api.getShowDevImg().then(function(res) {
      if(res.data.status == 0){
           localStorage.setItem('DivShowImg', JSON.stringify(res.data.result))
           console.log('第一次')
           store.state.DevImg_data = res.data.result;
      }
    })
   }
}
router.beforeEach((to, from, next) => {

   let loginInfoJson = JSON.parse(window.localStorage.getItem("loginInfoJson"));
   switch (to.name) {  //设置标题
        case 'hheContactus': Tool.setTitle("联系我们"); break;
        case 'hheUserInfo': Tool.setTitle("用户信息"); break;
        case 'Upload': Tool.setTitle("故障报修"); break;
        case 'hhe_faultRepair_notes': Tool.setTitle("报修记录"); break;
        case 'notTokenPage': Tool.setTitle("访问错误"); break;
        case 'AlarmSeting': Tool.setTitle("告警配置"); break;
        case 'DeviceDetInfo': Tool.setTitle("设备信息详情"); break;
        default:Tool.setTitle("辉和智能科技云平台"); break;
    }
  if (!store.state.token) {
    if (window.localStorage.getItem("loginInfoJson")) {
      store.state.token = loginInfoJson.token;
      store.state.expires = loginInfoJson.expires;
    }
  }

  if (store.state.token) {
    clearInterval(store.state.intval);
    store.state.intval = null
    store.state.intval = setInterval(function() {
      Api.refresh().then(function(res) {
        store.state.token = res.data.result.token
        store.state.expires = res.data.result.expires
        loginInfoJson.token = store.state.token; 
        localStorage.setItem('loginInfoJson', JSON.stringify(loginInfoJson))
      })
      console.log(store.state.token)
    },600000);


    //localStorage.removeItem('DivShowImg');
    if(JSON.parse(localStorage.getItem('DivShowImg')) == null){
       overallReset.getUserImg()
    }else{
      store.state.DevImg_data = JSON.parse(localStorage.getItem('DivShowImg'));
    }

    next();
  } else {
    if (to.path === '/notTokenPage') {
      next();
    } else {
      next({
        path: '/notTokenPage'
      })
    }
  }
})



export default router;
