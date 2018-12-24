import axios from 'axios';
import store from '../vuex/store/store';
import router from '../router'
import xfdToast from '../components/dialog/index';

/*--服务类AJAX-Promise--*/
class Axios {
  constructor() {}

  static res(type, url, param) {
    let resParam = {};
    if (store.state.token) {
      // Toast.loading.open();
      if (param) {
        resParam = { headers: { 'X-AUTH-TOKEN': store.state.token }, 'method': type, 'url': url, 'data': param }
      } else {
        resParam = { headers: { 'X-AUTH-TOKEN': store.state.token }, 'method': type, 'url': url }
      }
      return axios(resParam).then(function(response) {
          xfdToast.loading.close();
          return response;
        })
        .catch(function(error) {
          xfdToast.loading.close();
          console.log(error);
        });
    } else {
      router.push({ path: '/notTokenPage' })
    }

  }

  static upload(url, param,callback1) {
    if (store.state.token) {
      return axios({
        'headers': { 'X-AUTH-TOKEN': store.state.token },
        'method': 'post',
        'url': url,
        'data': param,
        onUploadProgress:function(progressEvent){ //原生获取上传进度的事件
           if(progressEvent.lengthComputable){
             //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
             //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
             callback1(progressEvent);
           }
        },
        }).then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      router.push({ path: '/notTokenPage' })
    }

  }
}

export default Axios;
