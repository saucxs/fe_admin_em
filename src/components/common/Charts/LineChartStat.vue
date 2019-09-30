<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" :lineChartData="lineChartData" :lineSeriesData="lineSeriesData" :serviceType="serviceType"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
require('echarts/theme/macarons') // echarts theme

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    lineChartData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    lineSeriesData: {
      type: Array,
      default: function () {
        return []
      }
    },
    serviceType: {
      type: String,
      default: '需求单'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart(this.lineChartData, this.lineSeriesData)
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
    lineChartData: function () {
      this.initChart(this.lineChartData, this.lineSeriesData)
    }
  },
  methods: {
    initChart (lineData, lineSeries) {
      const _this = this
      _this.chart = echarts.init(this.$el, 'macarons')
      _this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: '已完成' + _this.serviceType + '平均用时（单位：h）'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: lineData.xAxisDataList
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: lineData.legendList
        },
        series: lineSeries
      }, true)
    }
  }
}
</script>
