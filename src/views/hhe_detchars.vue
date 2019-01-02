<template>
  <div id="HeChats">
    <div class="HeChatsCen">
      <div class="THwarp">
        <div class="chartit">设备{{ucode}}当前温湿度{{thematy}}</div>
        <div class="beforeTH">
          <div id="beThChart" :style="{width: '100%', height: '150px'}"></div>
        </div>
        <div class="chartit top">24小时温湿度</div>
        <div class="dayChars">
          <div id="ThChart" :style="{width: '100%', height: '200px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      thematy: '',
      thDatas: '',
      ucode: '',
      allDcode: '',
      ThOption: {
        title: {
          text: '',
          left: 'right',
          color: '#777'
        },
        tooltip: {
          // trigger: 'item',
          enterable: true,
          triggerOn: 'click',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'right',
          data: ['温度', '湿度']
        },
        xAxis: {
          type: 'category',
          name: 'minute',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              type: 'dashed',
              color: '#fff', //左边线的颜色
              width: '1' //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: '#777', //坐标值得具体的颜色
              padding: [8,0,0,0]
            }
          },
          data: [0, 1, 2, 3, 4, 5, 6]
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        dataZoom: [{
          realtime: true, //拖动滚动条时是否动态的更新图表数据
          height: 30, //滚动条高度
          startValue: '',
          backgroundColor: "rgba(0,0,0,0.1)",
          borderColor: "#dedede",
          bottom: 35,
          textStyle: {
            color: '#EAA25C',
            fontWeight: '600'
          },

          fillerColor: "rgba(0,255,255,0.3)", //选中范围的填充颜色。    
        }, {
          type: 'inside',
        }],
        yAxis: {
          min: -45,
          max: 120,
          type: 'value',
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#777', //左边线的颜色
              width: '1' //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {
              color: '#777', //坐标值得具体的颜色

            }
          },
          type: '',
          name: '度'
        },
        series: [{
            name: '温度',
            type: 'line',
            symbolSize:6,  
            itemStyle:{
              normal:{
                  lineStyle:{
                      width:2,
                      type:'solid'  //'dotted'虚线 'solid'实线
                  }
              }
            },
            data: [1, 3, 9, 27, 81, -85]
          },
          {
            name: '湿度',
            type: 'line',
            symbolSize:6,  
            itemStyle:{
              normal:{
                  lineStyle:{
                      width:2,
                      type:'solid'  //'dotted'虚线 'solid'实线
                  }
              }
            },
            data: [80, 2, 4, 8, 16, 32, 64, 88, 76]
          },
        ]
      },
      beThOption: {
        series: [{
            name: '温度',
            min: 0,
            max: 100,
            radius: '90%',
            center: ['75%', '50%'],
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 7
              }
            },
            axisTick: { // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 3, //轴大学
              fontSize: 2,
            },
            axisLabel: { //文字样式（及“10”、“20”等文字样式）
              // color : "black",
              distance: 6 //文字离表盘的距离
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              // fontWeight: 'bolder',
              fontSize: 5,
              // fontStyle: 'italic'
            },
            name: '设备温度',
            type: 'gauge',
            detail: { //value样式
              formatter: '{value}° ',
              fontSize: 15,
              marginTop: '30px'
            },
            data: [{
              value: 0,
              name: ''
            }]
          },
          {
            name: '湿度',
            min: 0,
            max: 100,
            radius: '90%',
            center: ['25%', '50%'],
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 7
              }
            },
            axisTick: { // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 3, //轴大学
              fontSize: 2,
            },
            axisLabel: { //文字样式（及“10”、“20”等文字样式）
              // color : "black",
              distance: 6 //文字离表盘的距离
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              // fontWeight: 'bolder',
              fontSize: 5,
              // fontStyle: 'italic'
            },
            name: '设备湿度',
            type: 'gauge',
            detail: { //value样式
              formatter: '{value}° ',
              fontSize: 15,
            },
            data: [{
              value: 0,
              label: {
                textStyle: {
                  fontSize: 5
                }
              },
              name: ''
            }]
          },
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      showDeviceQueries: 'showDeviceQueries'
    }),
    getThData(m) {
      let _this = this;
      _this.showDeviceQueries([{ 'ucode': m.ucode, 'dcode': m.dcode, 'model': m.model }, function(res) {
        if (res.data.status == 0) {
          switch (m.dcode) {
            case 'th':
              //_this.thDatas = res.data.result.results[0].series[0];
              let dataH = res.data.result.results[0].series[0].values;
              let dataT = res.data.result.results[0].series[1].values;
              let dates = [];
              let dataHV = [];
              let dataTV = [];

              dataH.map(function(item, i) {
                let time1 = item[0].split(".")[0].split("T")[0].split("-");
                let time2 = item[0].split(".")[0].split("T")[1].split(":");
                dates.push(time1[1] + "-" + time1[2] +  "\n" + time2[0] + ":" + time2[1])

                dataHV.push(item[3]);
              })
              dataT.map(function(item, i) {
                dataTV.push(item[3]);
              })
              console.log(dates);

              _this.ThOption.xAxis.data = dates;
              _this.ThOption.series[0].data = dataHV;
              _this.ThOption.series[1].data = dataTV;
              let ThChart = _this.$echarts.init(document.getElementById('ThChart'))
              ThChart.setOption(_this.ThOption, true);
              console.log(_this.ThOption.xAxis.data);
              break;
          }
        }
        console.log(_this.thDatas)
      }])
    }
  },
  mounted() {
    let _this = this;
    let qury = this.$route.query;
    let beThChart = this.$echarts.init(document.getElementById('beThChart'))
    _this.$store.fromChars = true;

    if (!qury.t) {
      this.thematy = '温度未采集'
    } else if (!qury.h) {
      this.thematy = '湿度未采集'
    }

    this.ucode = qury.ucode;

    if (qury.dcode == 'th') {
      _this.beThOption.series[0].data[0].value = qury.t;
      _this.beThOption.series[1].data[0].value = qury.h;
    }

    beThChart.setOption(_this.beThOption, true);

    this.allDcode = JSON.parse(window.localStorage.getItem("filterEcher"));
    for (let Model in _this.allDcode) {
      _this.getThData(_this.allDcode[Model])
    }
  },
}

</script>
<style lang='scss' scoped>
.HeChatsCen {
  width: 100%;
  height: 100%;
  background: #e2e2e2;
}

.beforeTH {
  width: 100%;
  padding: 20px;
  background: #fff;
}

.chartit {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px dashed #eee;
  padding-left: 20px;
  font-size: 16px;
  color: #333;
  background: #fff;
  &.top{
    margin-top: 10px;
  }
}

.dayChars {
  width: 100%;
  padding: 5px;
  background: #fff;
}

</style>
