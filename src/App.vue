<template>
  <div id="app">
    <transition :name="transitionName" :duration="400">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class='child-view'></router-view>
        </keep-alive>
    </transition>
    <transition :name="transitionName" :duration="400">
          <router-view v-if="!$route.meta.keepAlive"class='child-view'></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    '$route' (to, from) {
      if(from.fullPath != '/'){
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },
  data(){
      return {
        transitionName: 'slide-left'
      }
  },
  mounted(){
    // $("#app").css('-webkit-overflow-scrolling','auto');
    // $("#app").scrollTop(9999);
    // $("#app").css('-webkit-overflow-scrolling','touch');
    $("html").css('-webkit-overflow-scrolling','auto');
    $("html").scrollTop(9999);
    $("html").css('-webkit-overflow-scrolling','touch');
    $("body").css('-webkit-overflow-scrolling','auto');
    $("body").scrollTop(9999);
    $("body").css('-webkit-overflow-scrolling','touch');
  }
}
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
    overflow-y:scroll;
    -webkit-overflow-scrolling:touch;
  }
  #app{
    width: 100%;
    height: 100%; 
    overflow-y:scroll;
    -webkit-overflow-scrolling:touch;
  }
  .child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
</style>
