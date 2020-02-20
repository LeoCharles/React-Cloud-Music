import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from '@/api'

// 更新热门关键词
const changeHotKeysWords = (data) => ({
  type: actionTypes.CHANGE_HOT_KEYWORDS,
  data: fromJS(data)
})

// 更新推荐列表
const changeSuggestList = (data) => ({
  type: actionTypes.CHANGE_SUGGEST_LIST,
  data: fromJS(data)
})

// 更新歌曲搜索结果
const changeResultSongs = (data) => ({
  type: actionTypes.CHANGE_RESULT_SONGS_LIST,
  data: fromJS(data)
})

// 切换进场 loading
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

// 获取热门搜索关键词
export const getHotKeyWords = () => {
  return (dispatch) => {
    getHotKeyWordsRequest().then(res => {
      // 关键词列表
      const hots = res.result.hots
      dispatch(changeHotKeysWords(hots))
    })
  }
}

// 获取推荐列表
export const getSuggestList = (query) => {
  return (dispatch) => {
    // 根据关键词获取推荐列表
    getSuggestListRequest(query).then(res => {
      if (!res) return
      const result = res.result || []
      dispatch(changeSuggestList(result))
    })
    // 根据关键词查询歌曲列表
    getResultSongsListRequest(query).then(res => {
      if(!res) return
      const songs = res.result.songs || []
      dispatch(changeResultSongs(songs))
      dispatch(changeEnterLoading(false))
    })
  }
}