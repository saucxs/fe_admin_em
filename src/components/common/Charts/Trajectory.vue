<template>
  <div class="chat-container">
    <div :class="className" :id="id" :style="{height:height,width:width}" :datanodes="datanodes" :datalinks="datalinks" :chartType="chartType"></div>
    <el-dialog title="当前节点信息" :visible.sync="dialogVisible" width="30%">
      <el-form :model="taskInfo" label-position="right" label-width="200px">
        <el-form-item label="任务ID：" prop="taskId">
          <span class="item-value">{{taskInfo.taskId}}</span>
        </el-form-item>
        <el-form-item label="任务名称：" prop="taskTemplateName">
          <span class="item-value">{{taskInfo.taskTemplateName}}</span>
        </el-form-item>
        <el-form-item label="操作人：" prop="dealStaffName">
          <span class="item-value">{{taskInfo.dealStaffName}}</span>
        </el-form-item>
        <el-form-item label="完成时间：" prop="finishDate">
          <span class="item-value">{{taskInfo.finishDate}}</span>
        </el-form-item>
        <el-form-item label="附件信息：" v-show="attachments.length > 0">
          <div class="item-value" v-for="att in attachments" :key="att.attId">
            <a :href="`${server}${att.attUrl}`"
              class="a-link"
              target="_blank">
              {{ att.originalName }}
            </a>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getTaskInfo } from 'api/demand/detail'

export default {
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
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    },
    datanodes: {
      type: Array,
      default: function () {
        return []
      }
    },
    datalinks: {
      type: Array,
      default: function () {
        return []
      }
    },
    chartType: {
      type: String,
      default: 'graph'
    }
  },
  data () {
    return {
      chart: null,
      taskInfo: {
        taskTemplateCode: '',
        taskTemplateName: '',
        dealStaffName: '',
        finishDate: ''
      },
      attachments: [],
      server: '',
      dialogVisible: false
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    datanodes: function () {
      this.initChart()
    }
  },
  methods: {
    initChart () {
      const _this = this
      _this.chart = echarts.init(document.getElementById(this.id))
      _this.chart.setOption({
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        textStyle: {
          color: '#000'
        },
        series: [
          {
            type: _this.chartType,
            tooltip: {
              backgroundColor: 'skyblue'
            },
            layout: 'none',
            symbolSize: 10,
            clickable: true,
            roam: true,
            label: {
              normal: {
                show: true
              }
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              normal: {
                textStyle: {
                  fontSize: 12
                }
              }
            },
            data: _this.datanodes,
            itemStyle: {
              normal: {
                color: '#F8F8FF',
                borderColor: '#000',
                borderWidth: 1
              }
            },
            links: _this.datalinks,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 2,
                curveness: 0
              }
            }
          }
        ]
      })
      _this.chart.on('click', function (params) {
        if (!_this.dialogVisible) {
          getTaskInfo(params.data.instanceId, params.data.id).then(res => {
            if (res && res.retValue === 1) {
              _this.taskInfo = res.data.wfTaskExtend
              _this.attachments = res.data.wfAttachmentList
              _this.server = res.data.server
            }
            _this.dialogVisible = true
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.chat-container {
  .item-value{
    padding-left: 30px;
  }
  .a-link {
    color: #409EFF;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
