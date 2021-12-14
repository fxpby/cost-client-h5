import axios from 'axios'
import { Toast } from 'zarm'

// 环境变量
const MODE = import.meta.env.MODE

// 请求基本路径
axios.defaults.baseURL = MODE === 'development' ? '/api' : 'http://api'

// 请求头需要带cookie，服务端 Access-Control-Allow-Origin不能为 " * "， 需要指定域名
axios.defaults.withCredentials = true

// 设置请求头
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`

// 设置 post 请求使用的请求体
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 拦截器配置
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.show('服务器梦游了，请悄悄和我说下哦')
    return Promise.reject(res)
  }
  if (res.data.code !== 200) {
    if (res.data.msg) {
      Toast.show(res.data.msg)
    }
    if (res.data.code === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default axios