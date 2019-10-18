<template>
  <div>
    <el-container>
      <!-- 左侧导航栏 -->
      <el-aside width="17%">
        <div class="logo">
          Logo部分
        </div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          :router=true
          :default-active="activeIndex"
          active-text-color="#ffd04b">
          <el-menu-item index="/home/summary">
            <i class="el-icon-document"></i>
            <span>消息概况</span>
          </el-menu-item>
          <el-menu-item index="/home/topicMgr">
              <i class="el-icon-setting"></i>
              <span>标签管理</span>
          </el-menu-item>

          <el-menu-item index="/home/findMsg">
            <i class="el-icon-search"></i>
            <span slot="title">消息查询</span>
          </el-menu-item>

          <el-menu-item index="4" disabled>
            <i class="el-icon-star-on"></i>
            <span slot="title">备用</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部头区域 -->
        <el-header>Header</el-header>
        <!-- 主要内容区域 -->
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    activeIndex() {
      return location.href.split('#')[1]
    }
  },
  methods: {
    goto(indexPath) {
      console.log(indexPath)
    }
  }

}
</script>

<style scoped>
/* 左侧导航栏 */
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  display: flex;
  height: 100%;
  flex-direction: column;
}
.logo {
  height: 5%;
  text-align: center;
  margin: 20px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
}
.el-menu {
  border: 0px;
  margin-top: 10px;
}

/* 头部分 */
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    height: 5%;

  }
</style>
