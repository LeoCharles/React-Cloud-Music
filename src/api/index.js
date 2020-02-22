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
export const getTopArtists = (offset) => {
  return request.get(`/top/artists?offset=${offset}`)
}

// 获取歌手列表
export const getArtistList = (category, alpha, offset) => {
  return request.get(`/artist/list?cat=${category}&initial=${alpha}&offset=${offset}`)
}

// 获取榜单内容摘要
export const getTopListDetail = () => {
  return request.get('/toplist/detail')
}

// 获取歌单详情
export const getPlayListDetail = (id) => {
  return request.get(`/playlist/detail?id=${id}`)
}

// 获取歌手详情
export const getArtistsDetail = (id) => {
  return request.get(`/artists?id=${id}`)
}

// 获取歌词
export const getLyricRequest = (id) => {
  return request.get(`/lyric?id=${id}`)
}

// 获取热门搜索关键词
export const getHotKeyWordsRequest = () => {
  return request.get(`/search/hot`)
}

// 根据关键词搜索推荐列表
export const getSuggestListRequest = (keywords) => {
  return request.get(`/search/suggest?keywords=${keywords}`)
}

// 根据关键词搜索歌词列表
export const getResultSongsListRequest = (keywords) => {
  return request.get(`/search?keywords=${keywords}`)
}

// 根据歌曲 id 获取歌曲详情
export const getSongDetailRequest = (id) => {
  return request.get(`/song/detail?ids=${id}`)
}