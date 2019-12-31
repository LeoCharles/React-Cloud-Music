import axios from 'axios'

const api = {
  'develop': 'http://localhost:3300',
  'production': 'http://47.98.159.95/m-api',
}

const baseURL = api[process.env.NODE_ENV]

const request = axios.create({
  baseURL: baseURL
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