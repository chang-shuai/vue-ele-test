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
            @row-save="handleApply">
    <template slot="menuLeft">
      <el-button type="primary"
                @click="topicApply"
                size="small">标签申请</el-button>
      <el-button type="info"
                  size="small"
                  @click="batchOffline">下线</el-button>
    </template>

    <template slot-scope="scope" slot="menu">
      <el-button type="text"
                size="small"
                @click="offline(scope.row,scope.index)">下线</el-button>
    </template>

    <template slot-scope="{row: { invokeDayCount, invokeDayLimit}}" slot="invokeDayLimit">
      {{`${invokeDayCount == null ? 0 : invokeDayCount} / ${invokeDayLimit}`}}
    </template>

    <template slot-scope="{row: { msgDayCount, msgDayLimit}}" slot="msgDayLimit">
      {{`${msgDayCount == null ? 0 : msgDayCount} / ${msgDayLimit}`}}
    </template>
  </avue-crud>
</template>

<script>
import { fetchList, addTopic } from '@/api/msg'
import { tableOption } from '@/tablestruct/normalTable'
import { normalStatus, offlineStatus } from '@/config/topicStatus'
import { modifyStatus, batchModifyStatus } from '@/utils/util'
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
        topic_status: normalStatus
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
        console.log(JSON.stringify(response))
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
     * 左侧菜单中 `标签申请` 按钮回调
     * 调用内置`rowAdd`方法, 弹出表单
     *
     **/
    topicApply: function() {
      this.$refs.crud.rowAdd()
    },

    /**
     * 左侧菜单中 `下线` 按钮回调
     * 多选后, 批量下线功能
     */
    batchOffline() {
      if (this.selectedTopics.length > 0) {
        const topics = this.selectedTopics.map((i) => i.topicName)
        this.$confirm(`是否确认下线这 ${topics.length} 条标签申请`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          this.tableLoading = true
          try {
            const result = await batchModifyStatus(this.tableData, this.selectedTopics, offlineStatus)
            this.tableData = result
            this.tableLoading = false
            this.$message.success('标签已下线')
          } catch (error) {
            console.log(error.message)
            this.tableLoading = false
            this.$message.error('错作失败')
          } finally {
            this.selectedTopics = []
          }
        }).catch(() => this.$message.info('操作取消'))
      } else {
        this.$message.warning('请选择需要操作的标签')
      }
    },

    /**
     * 每行操作栏 `下线` 按钮回调
     * @param {Object} row 此条标签数据
     * @param {Number} index 行号
     */
    offline(row, index) {
      this.$confirm(`是否确认下线 ${row.topicName} 标签`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await modifyStatus(this.tableData, row, index, offlineStatus)
        if (result) {
          this.tableData = result
          this.$message.success('标签已下线')
        } else {
          this.$message.error('操作失败')
        }
      }).catch(() => {
        this.$message.info('操作取消')
      })
    },

    /**
     * `标签申请` 按钮弹出的表单中 `申请` 按钮回调
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleApply: function(row, done) {
      addTopic(row).then(data => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        done()
      }).catch(() => {
        this.$message.error('添加失败')
      })
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

