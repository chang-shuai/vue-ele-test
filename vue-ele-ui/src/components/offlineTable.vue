<template>
  <avue-crud ref="crud"
            :page="page"
            :data="tableData"
            :table-loading="tableLoading"
            :option="tableOption"
            @selection-change="selectionChange"
            @current-change="currentChange"
            @refresh-change="refreshChange"
            @size-change="sizeChange"
            @row-update="handleApply"
            @row-del="rowDel">
    <template slot="menuLeft">
      <el-button type="primary"
                @click="batchApply"
                size="small">重新上线</el-button>
      <el-button type="danger"
                  size="small"
                  @click="batchDel">删除</el-button>
    </template>

    <template slot-scope="scope"
              slot="menu">
      <el-button type="text"
                size="small"
                @click="topicApply(scope.row,scope.index)">上线申请</el-button>
      <el-button type="text"
                size="small"
                @click="topicDel(scope.row,scope.index)">删除</el-button>
    </template>
  </avue-crud>
</template>

<script>
import { fetchList, delTopic } from '@/api/msg'
import { tableOption } from '@/tablestruct/offlineTable'
import { modifyStatus, batchModifyStatus } from '@/utils/util'
import { checkingStatus } from '@/config/topicStatus'

export default {
  name: 'topicMgr',
  data() {
    return {
      activeTab: 'normal',
      tableData: [],
      page: {
        pageSizes: [5, 10, 20],
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 5 // 每页显示多少条
      },
      listQuery: {
        page: 1,
        limit: 5,
        topic_status: '0'
      },
      tableLoading: false,
      tableOption: tableOption,
      selectedTopics: []
    }
  },
  created() {
    this.getList()
  },
  mounted: function() {
  },
  computed: {
    // ...mapGetters(['permissions'])
  },
  methods: {
    getList() {
      this.tableLoading = true
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.records
        this.page.total = response.data.total
        this.tableLoading = false
      })
    },
    currentChange(val) {
      this.page.currentPage = val
      this.listQuery.page = val
      this.getList()
    },
    sizeChange(val) {
      this.page.pageSize = val
      this.listQuery.limit = val
      this.getList()
    },

    /**
     * 左侧菜单中 `重新上线` 按钮回调
     *
     * 批量上线申请
     *
     **/
    batchApply: function() {
      if (this.selectedTopics.length > 0) {
        this.$confirm(`是否确认不修改, 直接重新上线这 ${this.selectedTopics.length} 条标签`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          this.tableLoading = true
          try {
            const result = await batchModifyStatus(this.tableData, this.selectedTopics, checkingStatus)
            this.tableData = result
            this.tableLoading = false
            this.$message.success('上线申请已发送')
          } catch (error) {
            this.$message.error('上线申请发送失败')
            this.tableLoading = false
          } finally {
            this.selectedTopics = []
          }
        }).catch()
      } else {
        this.$message.warning('请选择需要操作的标签')
      }
    },

    /**
     * 左侧菜单中 `删除` 按钮回调
     */
    batchDel() {
      if (this.selectedTopics.length > 0) {
        const topics = this.selectedTopics.map((i) => i.topicName)
        this.$confirm(`是否确认删除这 ${topics.length} 条标签`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // TODO
          this.$message('请完成批量下线逻辑')
        })
      } else {
        this.$message.warning('请选择需要操作的标签')
      }
    },

    /**
     * 每行操作栏中 `上线申请` 按钮回调
     * 申请前应该可以修改申请内容, 调用rowEdit(), 调出内置修改表单
     */
    topicApply(row, index) {
      this.$refs.crud.rowEdit(row, index)
    },

    /**
     * 每行操作栏中 `删除` 按钮回调
     */
    topicDel(row, index) {
      this.$confirm(`是否确认删除 ${row.topicName} 标签`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        try {
          await delTopic(row.topicId)
          this.tableData.splice(index, 1)
          this.$message.success('标签已删除')
        } catch (error) {
          this.$message.error('删除失败')
        }
      })
    },

    /**
     * `上线申请`弹出的表单中`申请`按钮回调
     *
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    async handleApply(row, index, done) {
      try {
        const result = await modifyStatus(this.tableData, row, index, checkingStatus)
        if (result) {
          this.tableData = result
          this.$message.success('申请已发送')
        } else {
          this.$message.error('操作失败')
        }
      } catch (error) {
        this.$message.error('操作失败')
      }
      done()
    },

    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList()
    },

    /**
     * @param list 多选框所有选中的标签列表
     */
    selectionChange(list) {
      this.selectedTopics = list
    }

  }
}

</script>

