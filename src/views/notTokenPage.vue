<template>
  <div id="app">
     <div class="notdata_div">
        <img :src="notdata_url" alt="">
        <span class='massfont'>请通过微信访问页面</span>
     </div>
  </div>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {
       notdata_url:'./static/images/notdata.png',
    }
  },
  methods: {
  
  },
  mounted() {

  },
}

</script>
<style lang='scss' scoped>


</style>
