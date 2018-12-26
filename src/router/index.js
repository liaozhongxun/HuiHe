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
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/MapShow',
        name: 'MapShow',
        components: {
          DeviceInfoViews: resolve => require(['@/views/MapShow'],resolve)
        },
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: '/ListShow',
        name: 'ListShow',
        components: {
          DeviceInfoViews: resolve => require(['@/views/ListShow'],resolve)
        },
        meta: {
          keepAlive: true // 需要被缓存
        }
      }
    ]
  },
  {
    path: '/DeviceInfo',
    name: 'DeviceInfo',
    component: resolve => require(['@/views/DeviceInfo'],resolve)
  },
  {
    path: '/DeviceDetInfo',
    name: 'DeviceDetInfo',
    component: resolve => require(['@/views/DeviceDetInfo'],resolve)
  },
  {
    path: '/AlarmSeting',
    name: 'AlarmSeting',
    component: resolve => require(['@/views/AlarmSeting'],resolve)
  },
  {
    path: '/notTokenPage',
    name: 'notTokenPage',
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
    component: resolve => require(['@/views/hhe_faultRepair_notes'],resolve)
  },
  {
    path: '/hheUserInfo',
    name: 'hheUserInfo',
    component: resolve => require(['@/views/hhe_userInfo'],resolve)
  },
  {
    path: '/hheAdminUserInfo',
    name: 'hheAdminUserInfo',
    component: resolve => require(['@/views/hhe_adminUserInfo'],resolve)
  },
  {
    path: '/hheContactus',
    name: 'hheContactus',
    component: resolve => require(['@/views/hhe_contactus'],resolve)
  },
  {
    path: '/hheDetchars',
    name: 'hheDetchars',
    component: resolve => require(['@/views/hhe_detchars'],resolve)
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
   //store.state.token = `eyJST0xFIjoicm9vdCIsImFsZyI6IkhTMjU2In0.eyJqdGkiOiJmZWI2YjU4ZS1lZDc5LTQ3NjctYmZjMC00Y2UzYmZlODc0YzYiLCJzdWIiOiIxMjM0NTYiLCJpYXQiOjE1NDU3ODQwODUsImV4cCI6MTU0NTc5ODQ4NX0.DkQOWuxmvJUEAdCpivSGaAokeedf4xqirqn68Yjs-k0`;
   console.log(to)
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
      store.state.token = JSON.parse(window.localStorage.getItem("loginInfoJson")).token;
      store.state.expires = JSON.parse(window.localStorage.getItem("loginInfoJson")).expires;
    }
  }

  if (store.state.token) {
    clearInterval(store.state.intval);
    store.state.intval = null
    store.state.intval = setInterval(function() {
      Api.refresh().then(function(res) {
        store.state.token = res.data.result.token
        store.state.expires = res.data.result.expires
      })
      console.log(store.state.token)
    }, 100000);


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
