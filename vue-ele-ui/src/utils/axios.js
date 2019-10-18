import axios from 'axios'
// import qs from 'qs'

const instance = axios.create({
  // 因为后台自动生成的代码, 接收json格式的参数, axios默认为JSON格式
  // 所以注释掉key=value形式参数
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Accept': 'application/json'
  // }
  // transformRequest: [function(data) {
  //   return qs.stringify(data)
  // }]
})

// 请求拦截器
// instance.interceptors.request.use(config => {

// }, error => Promise.reject(error))

// 响应拦截器
// instance.interceptors.response.use(({ msg, code, data }) => {

// }, error => Promise.reject(error))
export default instance
