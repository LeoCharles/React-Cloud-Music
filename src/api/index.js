import request from '@/utils/request'

// 获取轮播图广告
export const getBanner = () => {
  return request.get('/banner')
}

// 获取推荐歌单
export const getRecommend = () => {
  return request.get('/personalized')
}