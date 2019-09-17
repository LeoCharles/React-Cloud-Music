import request from '@/utils/request'

// 获取轮播图广告
export const getBanner = () => {
  return request.get('/banner')
}

// 获取推荐歌单
export const getRecommend = () => {
  return request.get('/personalized')
}

// 获取热门歌手
export const getHotSingerList = (count) => {
  return request.get(`/top/artists?offset=${count}`)
}

// 获取歌手列表
export const getSingerList = (category, alpha, count) => {
  return request.get(`/artist/list?cat=${category}&initial=${alpha}&offset=${count}`)
}