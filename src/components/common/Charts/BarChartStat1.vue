<template>
  <div :class="className" :style="{height:height,width:width}" :barChartData="barChartData" :barSeriesData="barSeriesData"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { countAll, countUndo, countDone } from 'api/statistics/taskStatis'
require('echarts/theme/macarons') // echarts theme

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '98%'
    },
    height: {
      type: String,
      default: '350px'
    },
    barChartData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    barSeriesData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      chart: null,
      title: ''
    }
  },
  mounted () {
    this.initChart(this.barChartData, this.barSeriesData)
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
      this.initChart(this.barChartData, this.barSeriesData)
    }
  },
  methods: {
    getCountAll () {
      countAll().then(res => {
        if (res && res.retValue === 1) {
          this.getData(res, '')
          return
        }

        return this.$message.error(res.resultMsg)
      }).catch(error => error)
    },
    getCountUndo () {
      countUndo().then(res => {
        if (res && res.retValue === 1) {
          this.getData(res, '进行中')
          return
        }

        return this.$message.error(res.resultMsg)
      }).catch(error => error)
    },
    getCountDone () {
      countDone().then(res => {
        if (res && res.retValue === 1) {
          this.getData(res, '已完成')
          return
        }

        return this.$message.error(res.resultMsg)
      }).catch(error => error)
    },
    getData (res, tt) {
      this.title = tt
      const seriesData = []
      res.data.legendList.forEach(item => {
        var series = {
          name: item,
          stack: 'creator',
          data: res.data.dataMap[item],
          type: 'bar'
        }
        seriesData.push(series)
      })
      this.initChart(res.data, seriesData)
    },
    initChart (barData, barSeries) {
      const _this = this
      _this.chart = echarts.init(this.$el, 'macarons')
      _this.chart.setOption({
        title: {
          text: _this.title + '工单数'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
            myToRunning: {
              show: true,
              title: '进行中统计',
              icon: 'path://M308.224 448.512H404.48v95.744H308.224v-95.744z m-135.68 0h95.744v95.744H172.544v-95.744z m0 0M660.48 256.512H529.408l185.344 192H444.416v95.744h270.336l-185.344 192H660.48l231.936-240.128z',
              onclick: function () {
                _this.getCountUndo()
              }
            },
            myToDone: {
              show: true,
              title: '已完成统计',
              icon: 'path://M1074.228764 385.752251a73.620133 73.620133 0 0 0-59.957832-50.149l-282.435071-40.717431-126.32913-253.870891A73.889606 73.889606 0 0 0 538.946801 0.001078a73.75487 73.75487 0 0 0-66.479088 41.013851l-126.302183 253.843944-282.408123 40.717431a73.64708 73.64708 0 0 0-59.930885 50.095105 72.757818 72.757818 0 0 0 18.863138 75.452552l204.368627 197.577897L178.60697 937.768512a72.973397 72.973397 0 0 0 29.453443 72.057187 74.401606 74.401606 0 0 0 78.147286 5.631994L538.946801 883.712148l252.604366 131.718598a74.212975 74.212975 0 0 0 78.147286-5.551152 73.000344 73.000344 0 0 0 29.642074-72.057187l-48.262686-279.039707 204.34168-197.55095a72.757818 72.757818 0 0 0 18.863138-75.452552z',
              onclick: function () {
                _this.getCountDone()
              }
            },
            myToAll: {
              show: true,
              title: '全部统计',
              icon: 'path://M283.669 32.04c-116.925 0-211.711 94.786-211.711 211.711s94.786 211.711 211.711 211.711H495.42V243.711c0-116.902-94.768-211.672-211.672-211.672h-0.084z m748.289 211.671C1031.958 126.786 937.172 32 820.247 32s-211.711 94.786-211.711 211.711v211.751h211.751c116.902 0 211.672-94.768 211.672-211.672v-0.084zM820.287 991.2c116.925 0 211.711-94.786 211.711-211.711s-94.786-211.711-211.711-211.711H608.536V779.53c0 116.902 94.768 211.672 211.672 211.672h0.084zM71.998 779.449c0 116.925 94.786 211.711 211.711 211.711S495.42 896.374 495.42 779.449V567.777H283.669c-116.903 0-211.672 94.768-211.672 211.672z',
              onclick: function () {
                _this.getCountAll()
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          data: barData.xAxisDataList
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: barData.legendList
        },
        series: barSeries
      }, true)
    }
  }
}
</script>
