<template>
  <div :class="className" :style="{height:height,width:width}" :barChartData="barChartData"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { getGanttObj, getTrailList } from 'api/home'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '565px'
    },
    barChartData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      chart: null,
      title: '一周需求申请进程',
      showTool: false,
      clickChildFlg: false
    }
  },
  mounted () {
    this.initChart(this.barChartData)
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    barChartData: function () {
      this.initChart(this.barChartData)
    }
  },
  methods: {
    getDemands () {
      getGanttObj().then(res => {
        if (res && res.retValue === 1) {
          this.title = '一周需求申请进程'
          this.initChart(res.data)
        }
      }).catch(error => error)
    },
    initChart (barData) {
      const _this = this
      _this.chart = echarts.init(this.$el, 'light')
      _this.chart.setOption({
        title: {
          text: _this.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            // return params[0].name + '<br/>' + params[0].seriesName + ' : ' + formatDate(new Date(params[0].value), 'yyyy-MM-dd hh:mm:ss') + '<br/>' + params[1].seriesName + ' : ' + formatDate(new Date(params[1].value), 'yyyy-MM-dd hh:mm:ss')
            return params[0].name + '<br/>' + params[0].seriesName + ' : ' + params[0].value + '<br/>' + params[1].seriesName + ' : ' + params[1].value
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          right: '2%',
          feature: {
            myToAll: {
              show: _this.showTool,
              title: '返回',
              icon: 'path://M970.112 906.304c0 0-9.472 24.384-22.08 0 0 0-140.928-425.344-484.48-318.208l0 132.032c0 0-5.504 77.632-73.216 27.072L52.544 455.616c0 0-71.616-38.976 4.352-92.288l341.376-293.312c0 0 51.328-36.608 63.68 23.424l0.384 142.464C462.4 235.968 1102.656 266.624 970.112 906.304z',
              onclick: function () {
                _this.getDemands()
                _this.showTool = false
                _this.clickChildFlg = false
              }
            }
          }
        },
        calculable: true,
        yAxis: [ {
          type: 'category',
          data: barData.yAxisDataList
        }],
        xAxis: [ {
          type: 'time',
          position: 'top',
          min: barData.minTime,
          max: barData.maxTime
        }],
        series: [
          {
            name: '完成时间',
            type: 'bar',
            stack: 'jh',
            data: barData.finshTimeList
          },
          {
            name: '开始时间',
            type: 'bar',
            stack: 'jh',
            itemStyle: {
              normal: {
                barBorderColor: 'white',
                color: 'white'
              },
              emphasis: {
                barBorderColor: 'white',
                color: 'white'
              }
            },
            data: barData.createTimeList
          }
        ]
      }, true)
      _this.chart.on('click', function (params) {
        if (!_this.clickChildFlg) {
          _this.showTool = true
          _this.title = '需求流程'
          let reqId = _this.barChartData.reqIdList[params.dataIndex]
          getTrailList(reqId).then(res => {
            if (res && res.retValue === 1) {
              _this.initChart(res.data)
            }
          })
          _this.clickChildFlg = true
        }
      })
    }
  }
}
</script>
