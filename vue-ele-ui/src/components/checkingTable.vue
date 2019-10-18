<template>
  <avue-crud ref="crud"
            :page="page"
            :data="tableData"
            :table-loading="tableLoading"
            :option="tableOption"
            @selection-change="selectionChange"
            @current-change="currentChange"
            @refresh-change="refreshChange"
            @size-change="sizeChange">
    <template slot="menuLeft">
      <el-button type="primary" @click="batchAgree" size="small">审核通过</el-button>
      <el-button type="warning" size="small" @click="batchReject">驳回</el-button>
    </template>

    <template slot-scope="scope" slot="menu">
      <el-button type="text" size="small"
                @click="agree(scope.row,scope.index)">通过</el-button>
      <el-button type="text" size="small"
                @click="reject(scope.row,scope.index)">驳回</el-button>
    </template>
  </avue-crud>
</template>

<script>
import { fetchList } from '@/api/msg'
import { tableOption } from '@/tablestruct/checkingTable'
import { normalStatus, checkingStatus, rejectStatus } from '@/config/topicStatus'
import { modifyStatus, batchModifyStatus } from '@/utils/util'
export default {
  name: 'topicMgr',
  data() {
    return {
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
        topic_status: checkingStatus
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
    /**
     * 切换下一页时调用
     */
    currentChange(val) {
      this.page.currentPage = val
      this.listQuery.page = val
      this.getList()
    },
    /**
     * 更改每页显示条数调用
     */
    sizeChange(val) {
      this.page.pageSize = val
      this.listQuery.limit = val
      this.getList()
    },

    /**
     * 左侧菜单中 `审核通过` 按钮
     * 多选后批量通过审核
     * 更改选中所有标签的状态为正常, 并从待审核表格中删除选中项
     */
    batchAgree() {
      if (this.selectedTopics.length > 0) {
        const topics = this.selectedTopics.map((i) => i.topicName)
        this.$confirm(`是否确认通过这 ${topics.length} 条标签申请`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          this.tableLoading = true
          try {
            const result = await batchModifyStatus(this.tableData, this.selectedTopics, normalStatus)
            this.tableData = result
            this.tableLoading = false
            this.$message.success('标签已上线')
          } catch (error) {
            console.log(error.message)
            this.tableLoading = false
            this.$message.error('错作失败')
          } finally {
            this.selectedTopics = []
          }
        })
      } else {
        this.$message.warning('请选择需要操作的标签')
      }
    },

    /**
     * 左侧菜单中 `驳回` 按钮回调
     * 多选驳回
     * 更改选中所有标签的状态为驳回, 并从待审核表格中删除选中项
     */
    batchReject() {
      if (this.selectedTopics.length > 0) {
        const topics = this.selectedTopics.map((i) => i.topicName)
        this.$confirm(`是否确认驳回这 ${topics.length} 条标签申请`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          this.tableLoading = true
          try {
            const result = await batchModifyStatus(this.tableData, this.selectedTopics, rejectStatus)
            this.tableData = result
            this.tableLoading = false
            this.$message.success('标签申请已驳回')
          } catch (error) {
            console.log(error.message)
            this.tableLoading = false
            this.$message.error('错作失败')
          } finally {
            this.selectedTopics = []
          }
        })
      } else {
        this.$message.warning('请选择需要操作的标签')
      }
    },

    /**
     * 每行操作栏中的 `通过` 按钮
     * 通过审核
     * 修改标签状态为正常, 并从待审核表格中删除此条
     */
    async agree(row, index) {
      const result = await modifyStatus(this.tableData, row, index, normalStatus)
      if (result) {
        this.tableData = result
        this.$message.success('审核通过')
      } else {
        this.$message.error('操作失败')
      }
    },

    /**
     * 每行操作栏中 `驳回` 按钮
     * 驳回申请
     */
    reject(row, index) {
      this.$confirm(`是否确认驳回 ${row.topicName} 标签申请`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await modifyStatus(this.tableData, row, index, rejectStatus)
        if (result) {
          this.tableData = result
          this.$message.success('申请已驳回')
        } else {
          this.$message.error('操作失败')
        }
      })
    },

    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList()
    },

    /**
     * 多选数据
     */
    selectionChange(list) {
      this.selectedTopics = list
    }
  }
}

</script>

