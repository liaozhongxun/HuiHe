<template>
  <div id="DeviceInfo">
    <div class="DeviceInfo_up">
      <transition :name="transitionName" :duration="400">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" name='DeviceInfoViews' class='child-view'></router-view>
        </keep-alive>
      </transition>
      <!--       <transition :name="transitionName" :duration="400">
        <router-view  v-if="$route.meta.keepAlive" name='DeviceInfoViews'class='child-view' ></router-view> -->
      </transition>
    </div>
    <ul class="DeviceInfo_foot">
      <li v-show='LeftTab' class="left active" @click='LeftSwitch("left","/MapShow")'>地图展示</li>
      <li v-show='!LeftTab' class="left" @click='LeftSwitch("left","/MapShow")'>地图展示</li>
      <li v-show='!LeftTab' class="right active"  @click='LeftSwitch("right","/ListShow")'>列表展示</li>
      <li v-show='LeftTab' class="right"  @click='LeftSwitch("right","/ListShow")'>列表展示</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DeviceInfo',
  watch: {
    '$route'(to, from) {
      if (from.fullPath != '/') {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },
  data() {
    return {
      transitionName: 'slide-left',
      LeftTab:true
    }
  },
  methods: {
    LeftSwitch(obj,type){
        if(obj == 'left'){
           this.LeftTab = true;
        }else{
           this.LeftTab = false;
        }
        this.handleGoto(type);
    },
    handleGoto(type) {
      this.$router.push({
        path: type
      });
    },
  },
  mounted(){
     if(/ListShow$/.test(location.hash)){
        this.LeftTab = false;
     }
  }
}

</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

#DeviceInfo {
  width: 100%;
  height: 100%;

  .DeviceInfo_up {
    height: 100%;
    width: 100%;
  }

  .DeviceInfo_foot {
    height: 50px;
    width: 100%;
    position: fixed;
    background: #fff;
    margin-bottom: 0;
    left: 0px;
    bottom: 0px;
    display: flex;
    z-index: 10;
    li.left{
          border-right: 1px solid #dddddd;
    }
    li.right{
    border-left: 1px solid white;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      flex:1;
      color:#777;
      font-size: 16px;
      background: #f5f5f5;
      border-top: 1px solid #fff;
      &.active{
        color:#008B00;
        border-top: 1px solid #008B00;
      }
    }

    .DeviceInfo_foot_left {
      flex: 1;
      border-radius: 0;
      border-right: none;
    }

    .DeviceInfo_foot_right {
      flex: 1;
      border-radius: 0;
    }
  }
}

.amap-copyright,
.amap-logo {
  display: none !important;
}

.child-view {
  position: absolute;
  transition: all .5s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}

</style>
