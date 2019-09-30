<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col :span="10">

      </el-col>
      <el-col :span="14">

      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="chart-wrapper">

      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dashboard-admin',
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
