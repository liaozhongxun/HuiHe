<template>
  <!--   https://segmentfault.com/a/1190000010034177 -->
  <div class="Upload">
     <div class="Ul_title">故障图片上传</div>
     <div class="Ul_first">
        <input ref='upfileinput' type="file" name="image" accept="image/*" @change='handleInputChange' multiple="multiple" />
     </div>
    <ul ref='Ul_imglist' class="Ul_imglist clearfix" v-show='imgUl'>
        <li v-for="(item,key) in filesUrl">
           <div class="li_cen" @click='ShowBigImg(key)' :style="{'background': 'url('+item+') center center no-repeat','background-size':'contain'}"></div>
        </li>
        <li class="Ul_first">
           <input ref='upfileinput' type="file" name="image" accept="image/*" @change='handleInputChange' multiple="multiple" />
        </li>
    </ul>
    <div class="preWarp" v-show='precentShow'>
      <mt-progress :value="precent">
        <div slot="start"></div>
        <div slot="end">{{Math.ceil(precent)}}%</div>
      </mt-progress>    
    </div>
    <!-- Swiper -->
    <div class="swiper-container UploadFile" v-show='bigImgShow'>
        <div class="swiper-wrapper">
            <div class="swiper-slide"  v-for="(item,key) in filesUrl">
              <div class="cen">
                <img :src='item'/>
              </div>
              <div class="foot">
                <span @click='ShowImgClose' class='foot_close'>关 闭</span>
                <span @click='ShowImgDel(key)' class="foot_delete">删 除</span>
              </div>
            </div>
        </div>
        <!-- Add Pagination -->
      <!--   <div class="swiper-pagination"></div> -->
    </div>
  </div>
</template>
<script>
import { Progress } from 'mint-ui';
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
      imgFile: {},
      filesUrl: {},
      bigImgShow:false,
      imgUl:false,
      precent:0,
      precentShow:false,
      probarShow:false,

    }
  },
  watch: {
    // filesUrl(val) {
    //   console.log('cccccccc')
    // }
  },
  methods: {
    ...mapActions({
      imgUpload: 'imgUpload',
    }),
    handleInputChange(event) {
      // 获取当前选中的文件
      let _this = this;
      this.files = [];
      const imgMasSize = 1024 * 1024 * 4; // 10MB
      const files = event.target.files;
      if(files.length>0){
         _this.precent= 0;
         _this.precentShow = true;
      }
      console.log(files)
      for (let i = 0; i < files.length; i++) {
        this.files.push(event.target.files[i])
        // 检查文件类型
        if (['jpeg', 'png', 'gif', 'jpg'].indexOf(files[i].type.split("/")[1]) < 0) {
          // 自定义报错方式
          Toast('图片格式不正确');
          _this.precentShow = false;
          // Toast.error("文件类型仅支持 jpeg/png/gif！", 2000, undefined, false);
          return;
        }
        // 文件大小限制
        lrz(this.files[i])
          .then(function(rst) {
            _this.$set(rst.file, 'name', _this.files[i].name);
            console.log(rst);
            if (rst.file.size > imgMasSize) {
              Toast('文件过大');
              _this.precentShow = false;
              return;
            }
            _this.transformFileToDataUrl(rst.file);
            return;
          })
          .catch(function(err) {
            console.log(err)
            if (_this.files[i].size > imgMasSize) {
              Toast('文件过大,请重新上传')
              _this.precentShow = false;
              return;
            }
            _this.transformFileToDataUrl(_this.files[i]);
          })
          .always(function(rst) {

          });
      }


    },
    transformFileToDataUrl(file) { //将file转成dataUrl
      let _this = this;
      const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩

      // 封装好的函数
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // file转dataUrl是个异步函数，要将代码写在回调里
      reader.onload = function(e) {
        const result = e.target.result;
        if (result.length < imgCompassMaxSize) {
          _this.compress(result, _this.processData, file.type || 'image/jpeg', file.name, false); // 图片不压缩
        } else {
          _this.compress(result, _this.processData, file.type || 'image/jpeg', file.name); // 图片压缩
        }
      };
    },
    compress(dataURL, callback, type, name, shouldCompress = true) { //// 使用canvas绘制图片并压缩
      let _this = this;

      const img = new window.Image();

      img.src = dataURL;
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let compressedDataUrl;
        if (shouldCompress) { //压缩
          compressedDataUrl = canvas.toDataURL(type, 0.2);
        } else {
          compressedDataUrl = canvas.toDataURL(type, 1);
        }

        callback(compressedDataUrl, name);
      }
    },
    processData(dataURL, name) {
      let _this = this;
      for(let item in _this.filesUrl){
          console.log(item);
          if(item == name){
            Toast('该图片已经上传');
            _this.$refs.upfileinput.value = '';
            _this.precentShow = false;
            return;
          }
      }
      this.imgUpload([{ 'fileStr': dataURL.split(',')[1], 'name': name,'callback1':(res)=>{
        console.log(res);
        let loaded = res.loaded,total = res.total+20000;

        _this.$nextTick(() =>{
            _this.precent = (loaded/total) * 100;
        })
      }}, function(res) {
        _this.$set(_this.filesUrl, name, dataURL);
        _this.$set(_this.$store.state.updataUrls, name, res.data.result);
        _this.imgUl = true;
        _this.precentShow = false;
        Toast('图片上传成功');
        _this.$refs.upfileinput.value = '';
      }]);
    },
    ShowBigImg(key){
      this.bigImgShow = true;
    },
    ShowImgClose(){
      this.bigImgShow = false;
    },
    ShowImgDel(key){
      let _this = this;
      this.$delete(_this.filesUrl, key);
      this.$delete(_this.$store.state.updataUrls, key);
      _this.imgUl = this.objIsNull();
      _this.bigImgShow = this.objIsNull();

      
    },
    objIsNull(){
      for(let ite in this.filesUrl){
        return true;
      }
      return false;
    }
  },
  mounted() {
    var swiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        centeredSlides: true,
        autoplayDisableOnInteraction: false,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:false,//修改swiper的父元素时，自动初始化swiper 
    });
    this.$store.state.updataUrls = {};
  },
}

</script>
<style lang='scss' scoped>
.Ul_imglist {
  width: 100%;
  background: #fff;
  // box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  padding: 3px;
  margin-top: 10px;
  // display: flex;
  li{
    width: 33.333%;
    float: left;
    height: 120px;
    margin-bottom: 10px;
              display: flex;
        align-items: center;
        justify-content: center;
    .li_cen{
       background-size: contain !important;
       width: 94%;
       height: 94%;
       border:1px dashed #ccc;
    }
    &:not(:last-child){
      // border: 1px solid #ccc;
    }
    img{
      width: 100%;
    }
  }
}
.Ul_first{
  width: 100px;
  height: 100px;
  border:2px dashed #999;
  margin-left: 10px;
  background: url(/static/images/addimg.svg) center center no-repeat;
  input{
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.Upload{
  position: relative;
  background: #fff;
  padding:10px 0;
  margin-top: 10px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  .Ul_title{
    color: #EAA25C;
    border-bottom: 2px dashed #999;
    padding-bottom: 2px;
    font-size: 16px;
    margin-bottom: 10px;
    padding-left: 10px;
  }
}
.UploadFile {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 999;
  top:0;
  .swiper-wrapper {
    width: 100%;

    .swiper-slide {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column;
      .cen{
        background:rgba(0,0,0,0.6);
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        img {
          width:90%;
        }
      }
      .foot{
        width: 100%;
        height: 60px;
        background:rgba(0,0,0,0.9);
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          display: block;
          width: 40%;
          height:64%;
          float: left;
          text-align: center;
          background: #fff;
          border-radius: 5px;
                  display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        }
        .foot_delete{
          margin-left: 20px;
        }
        .foot_close{
          margin-right: 20px;
         
        }
      }
    }
  }
}

</style>
