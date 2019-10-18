<template>
  <div>
    <el-container>
      <el-container>
        <!-- 主要内容区域 -->
        <el-main>
          <!-- 主要内容区域头部分 -->
          <div class="main-header">
            <!-- 消息总览的日期选择 -->
            <div class="header-top">
              <div class="chose-date">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  size="small"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <!-- 消息总览的内容 -->
            <div class="header-mid">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-card shadow="always">
                    <el-row type="flex"
                      align="middle">
                      <el-col :span="8">
                        <div class="mid-block-icon" style="background-color: #93a1f1;">
                          <i class="el-icon-newfont-chucun"></i>
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="mid-block-content">
                          <div class="mid-block-hint">总消息数量</div>
                          <div class="mid-block-data">124,345</div>
                          <div class="mid-block-hint">
                            <i class="el-icon-newfont-xiajiantou"/>
                            <span style="color:red"> 10% </span>
                            <span>同比上周</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="always">
                    <el-row type="flex"
                      align="middle">
                      <el-col :span="8">
                        <div class="mid-block-icon" style="background-color:#ada;">
                          <i class="el-icon-newfont-fabu" />
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="mid-block-content">
                          <div class="mid-block-hint">已发布消息数量</div>
                          <div class="mid-block-data">{{ published }}</div>
                          <div class="mid-block-hint">
                            <i class="el-icon-newfont-shangjiantou" />
                            <span style="color:#1afa29"> 8% </span>
                            <span>同比上周</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="always">
                    <el-row type="flex"
                      align="middle">
                      <el-col :span="8">
                        <div class="mid-block-icon" style="background-color:#ffd86e;">
                          <i class="el-icon-newfont-shenjing" />
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="mid-block-content">
                          <div class="mid-block-hint">主题数量</div>
                          <div class="mid-block-data">124,345</div>
                          <div class="mid-block-hint">
                            <i class="el-icon-newfont-shangjiantou" />
                            <span style="color:#1afa29"> 12% </span>
                            <span>同比上周</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card shadow="always">
                    <el-row type="flex"
                      align="middle">
                      <el-col :span="8">
                        <div class="mid-block-icon" style="background-color:#f3857c;">
                          <i class="el-icon-newfont-zhihangfankui" />
                        </div>
                      </el-col>
                      <el-col :span="16">
                        <div class="mid-block-content">
                          <div class="mid-block-hint">已消费消息数量</div>
                          <div class="mid-block-data">{{ consumed }}</div>
                          <div class="mid-block-hint">
                            <i class="el-icon-newfont-xiajiantou" />
                            <span style="color:red"> 5% </span>
                            <span>同比上周</span>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 主要内容区域身体部分 -->
          <div class="main-body">
            <el-row :gutter="20">
              <!-- 身体的左侧部分 -->
              <el-col :span="16">
                <div class="body-left body-part">
                  <div class="body-left-title body-title">发送数量时序图</div>
                  <div class="body-left-options body-options">
                    <el-row>
                      <el-col :span="12">
                        <el-radio-group v-model="radio6" size="mini">
                          <el-radio-button label="指标一"></el-radio-button>
                          <el-radio-button label="指标二"></el-radio-button>
                          <el-radio-button label="指标三"></el-radio-button>
                        </el-radio-group>
                      </el-col>
                      <el-col :span="12">
                        <el-date-picker
                          v-model="value4"
                          size="mini"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                      </el-col>
                    </el-row>

                  </div>

                </div>
              </el-col>
              <!-- 身体的右侧部分 -->
              <el-col :span="8">
                <div class="body-right body-part">
                  <div class="body-right-title body-title">业务消息排行榜</div>
                  <div class="body-right-options body-options">
                    <el-radio-group v-model="radio" size="mini">
                      <el-radio-button label="指标一"></el-radio-button>
                      <el-radio-button label="指标二"></el-radio-button>
                      <el-radio-button label="指标三"></el-radio-button>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import { getReqCount, getResCount } from '@/api/msg'

export default {
  data() {
    return {
      published: 0,
      consumed: 0,
      radio: '指标一',
      value1: new Date(),
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
    }
  },
  created() {
    getReqCount().then((result) => {
      this.published = result.data.data
    })
    getResCount().then((result) => {
      this.consumed = result.data.data
    })
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }

}
</script>

<style scoped>

/* 主要内容部分 */
.el-main {
  background-color: #f3f3f3;
  color: #333;
  height: 100%;
}
.header-top {
  display: flex;
  flex-direction: row-reverse;
}

.chose-date {
  width: 150px;
}
.header-mid {
  margin-top: 20px;
}
.mid-block-icon {
  display: flex;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  align-items:center;/*垂直居中*/
  justify-content: center;/*水平居中*/
}
.mid-block-hint {
  font-size: 12px;
  color: #989898;
}
.mid-block-data {
  font-size: 28px;
  color: #666666;
}
/* 身体的左侧部分 */
.body-part {
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin-top: 20px;
  padding: 20px;
}
.body-title {
  font-size: 16px;
  color: #666666;
  font-weight: 650;
  padding-bottom: 20px;
  border-bottom: 1px solid #cccccc;

}
.body-options {
  margin-top: 20px;
}
.el-date-picker {
  float: right;
}
</style>
