<template>
  <div id="app">
     <div class="notdata_div">
        <img :src="notdata_url" alt="">
        <span class='massfont'>{{err}}</span>
     </div>
  </div>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {
       notdata_url:'./static/images/notdata.png',
       err:'请通过微信访问页面'
    }
  },
  methods: {
  
  },
  mounted() {
     if(this.$route.query.font){
        this.err = this.$route.query.font;
     }
  },
}

</script>
<style lang='scss' scoped>


</style>
