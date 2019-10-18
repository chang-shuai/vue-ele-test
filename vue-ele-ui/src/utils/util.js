import { putTopic } from '@/api/msg'

/**
 * 每行操作按钮
 * 将topic的状态, 修改为指定状态
 * @param {Array} tableData 表格中的所有数据
 * @param {JSON} row 要操作的行数据
 * @param {Number} index 要操作的行索引
 * @param {String} status 指定状态
 */
export async function modifyStatus(tableData, row, index, status) {
  row.topicStatus = String(status) // 防止status为number类型
  try {
    const { data: { msg, code, data } } = await putTopic(row)
    if (msg === 'success' && code === 0) {
      if (data) {
        tableData.splice(index, 1)
        return tableData
      } else {
        return false
      }
    }
  } catch (error) {
    throw error
  }
}

/**
 * 批量修改主题状态
 * @param {Array} tableData 表格中的所有数据
 * @param {Array} selectedTopics 选中的topic
 * @param {String} status 指定状态
 */
export async function batchModifyStatus(tableData, selectedTopics, status) {
  const promises = selectedTopics.map((topic) => {
    topic.topicStatus = String(status) // 防止status为number类型
    return putTopic(topic)
  })
  try {
    await Promise.all(promises)
    tableData = tableData.filter((topic) => {
      return !selectedTopics.includes(topic)
    })
    return tableData
  } catch (error) {
    throw error
  }
}
