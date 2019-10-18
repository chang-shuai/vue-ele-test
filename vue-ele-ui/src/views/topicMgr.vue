<template>
  <div class="topicMgr">
    <div class="main-body">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="正常" name="normal">
          <normalTable></normalTable>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="checking">
          <checkingTable/>
        </el-tab-pane>
        <el-tab-pane label="驳回" name="reject">
          <rejectTable/>
        </el-tab-pane>
        <el-tab-pane label="已下线" name="offline">
          <offlineTable/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import normalTable from '@/components/normalTable'
import checkingTable from '@/components/checkingTable'
import rejectTable from '@/components/rejectTable'
import offlineTable from '@/components/offlineTable'
export default {
  name: 'topicMgr',
  components: {
    normalTable,
    checkingTable,
    rejectTable,
    offlineTable
  },
  data() {
    return {
      activeTab: 'normal'
    }
  },
  created() {
  },
  mounted: function() {
  },
  computed: {
  },
  methods: {

  }
}
</script>
<style>
table th{
  font-weight:unset;
}
</style>

<style scoped>
.topicMgr {
  background-color: #f3f3f3;
  height: 100vh;
}
.main-header {
  margin: 40px 20px 20px 20px;
}
.main-body {
  margin: 20px;
}
.avue-crud {
  /* margin: 0px; */
  width: 100%;
}
.avue-crud >>> .el-card__body {
  padding: 20px;
}
.avue-crud >>> .avue-tip.el-tag {
  display: none;
}
</style>

