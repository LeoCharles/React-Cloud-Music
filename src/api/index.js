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
export const getTopArtists = (count) => {
  return request.get(`/top/artists?offset=${count}`)
}

// 获取歌手列表
export const getArtistList = (category, alpha, count) => {
  return request.get(`/artist/list?cat=${category}&initial=${alpha}&offset=${count}`)
}

// 获取榜单内容摘要
export const getTopListDetail = () => {
  return request.get('/toplist/detail')
}

// 获取歌单详情
export const getPlayListDetail = (id) => {
  return request.get(`/playlist/detail?id=${id}`)
}