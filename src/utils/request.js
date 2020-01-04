import axios from 'axios'

let baseURL = ''
if (process.env.NODE_ENV !== 'production') {
  // 开发环境
  baseURL = 'http://localhost:3300'
} else {
  // 生产环境
  baseURL = 'http://47.98.159.95/m-api'
}

const request = axios.create({
  baseURL
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 请求之前的设置
    return config
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)

export default request