<template>
  <div class="cache">
    <el-form :model="formData" label-width="80px">
      <el-row>
        <el-col :span="4">
          <el-form-item label="KEY" prop="searchKey">
            <el-input class="input" size="medium" v-model="formData.searchKey"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <p class="form-operate">
            <el-button type="primary" icon="el-icon-search" plain round size="medium" @click="getCacheAll">查 询</el-button>
          </p>
        </el-col>
      </el-row>
    </el-form>
    <panel title="查询结果">
    </panel>
    <el-table
      border
      :data="tableData.list"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="KEY"
        width="300"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="value"
        header-align="center"
        label="完整JSON">
        <template slot-scope="scope">
          <div class="json-show">
            <tree-view :data="scope.row.value" :options="{maxDepth: 3, rootObjectKey:scope.row.key}"></tree-view>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200"
        align="center">
         <template slot-scope="scope">
           <el-button @click="delKey(scope.row.key)" type="primary" plain size="small">删 除</el-button>
         </template>
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="tableData.total"
        :current-page="tableData.pageNo"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getCacheAll, delKey } from 'api/common/cache'
import { MessageBox } from 'element-ui'
import Panel from 'components/common/Panel'
export default {
  name: 'demand',
  components: {
    Panel
  },
  data () {
    return {
      formData: {
        searchKey: ''
      },
      tableData: {
        list: [],
        pageNo: 1,
        total: 0
      },
      teams: []
    }
  },
  methods: {
    getCacheAll (option = {}) {
      getCacheAll(Object.assign(option, this.formData)).then(res => {
        if (res && res.retValue === 1) {
          return Object.assign(this.tableData, res.data)
        }
        return this.$message.error(res.resultMsg)
      }).catch(error => error)
    },
    pageChange (page) {
      this.getCacheAll({pageNo: page})
    },
    delKey (key) {
      MessageBox.confirm('确定删除该缓存吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delKey(key).then(res => {
          if (res) {
            return this.$alert(res.resultMsg, '操作结果', {
              confirmButtonText: '确定',
              callback: action => {
                if (res.retValue === 1) {
                  this.getCacheAll()
                }
              }
            })
          }
        })
      }).catch(error => error)
    }
  },
  mounted () {
    Promise.all([this.getCacheAll()])
  }
}
</script>
<style lang="scss" scoped>
.el-select{
  width: 200px;
}
.cache {
  color: red;
  .form-operate {
    margin: 0;
    text-align: center;
  }
  .table-link {
    color: #409EFF;
    cursor: pointer;
  }
  .paging {
    margin-top: 10px;
    text-align: right;
  }
  .json-show {
    width: 1000px;
    height:200px;
    overflow-y: auto;
    border: 1px solid rgb(208, 210, 212);
    border-radius: 3px;
    background-color: rgb(248, 237, 222);
  }
}
</style>
