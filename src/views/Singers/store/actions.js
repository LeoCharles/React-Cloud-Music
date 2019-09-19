import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getTopArtists, getArtistList } from '@/api'

// 更新歌手分类
export const changeCategory = (data) => ({
  type: actionTypes.CHANGE_CATEGORY,
  data
})

// 更新首字母分类
export const changeAlpha = (data) => ({
  type: actionTypes.CHANGE_ALPHA,
  data
})

// 更新歌手列表
export const changeSingerList = (data) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data: fromJS(data)
})

// 修改当前页
export const changePageCount = (data) => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data
})

// 进场 loading
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

// 上拉加载 loading
export const changePullUpLoading = (data) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data
})

// 下拉刷新 loading
export const changePullDownLoading = (data) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data
})

// 首次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getTopArtists(pageCount).then(res => {
      if (res.code === 200) {
        const data = pageCount === 0 ? res.artists : [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))    // 关闭进场 loading
        dispatch(changePullDownLoading(false)) // 关闭下拉刷新 loading
        dispatch(changePullUpLoading(false))   // 关闭上拉加载 loading
      } else {
        dispatch(changeSingerList([]))
        dispatch(changeEnterLoading(false))    // 关闭进场 loading
        dispatch(changePullDownLoading(false)) // 关闭下拉刷新 loading
        dispatch(changePullUpLoading(false))   // 关闭上拉加载 loading
      }
    }).catch( err => {
      console.log(err)
    })
  }
}

// 根据分类获取歌手
export const getSingerList = () => {
  return (dispatch, getState) => {
    const category = getState().getIn(['singers', 'category'])
    const alpha = getState().getIn(['singers', 'alpha'])
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getArtistList(category, alpha, pageCount).then(res => {
      if (res.code === 200) {
        const data = pageCount === 0 ? res.artists : [...singerList, ...res.artists]
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))    // 关闭进场 loading
        dispatch(changePullUpLoading(false))   // 关闭上拉加载 loading
        dispatch(changePullDownLoading(false)) // 关闭下拉刷新 loading
      } else {
        dispatch(changeSingerList([]))
        dispatch(changeEnterLoading(false))    // 关闭进场 loading
        dispatch(changePullUpLoading(false))   // 关闭上拉加载 loading
        dispatch(changePullDownLoading(false)) // 关闭下拉刷新 loading
      }
    }).catch(err => {
      console.log(err)
    })
  }
}