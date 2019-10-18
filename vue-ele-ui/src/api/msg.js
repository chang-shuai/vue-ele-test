import request from '@/utils/axios'

export function fetchList(query) {
  return request({
    url: '/msg/topic/page',
    method: 'get',
    params: query
  })
}

/**
 * 申请主题
 * @param {JSON} data JSON形式的数据
 */
export function addTopic(data) {
  return request({
    url: '/msg/topic/',
    method: 'post',
    data: data
  })
}
/**
 * 根据主题编码获取主题详细信息
 * @param {String} topicId 主题编码
 */
export function getTopic(topicId) {
  return request({
    url: '/msg/topic/' + topicId,
    method: 'get'
  })
}

/**
 * 根据主题编码, 从数据库中删除一个主题
 * @param {String} topicId 主题编码
 */
export function delTopic(topicId) {
  return request({
    url: 'msg/topic/' + topicId,
    method: 'delete'
  })
}

/**
 * 传入完整的主题信息, 后台根据主题编码找到对应的主题并修改
 * @param {JSON} data JSON形式的主题内容
 */
export function putTopic(data) {
  return request({
    url: '/msg/topic/',
    method: 'put',
    data: data
  })
}

export function getReqCount() {
  return request({
    url: '/msg/req/count/',
    method: 'get'
  })
}

export function getResCount() {
  return request({
    url: '/msg/res/count/',
    method: 'get'
  })
}
