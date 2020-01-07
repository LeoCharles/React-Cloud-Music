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

// 修改请求偏移量
export const changeListOffset = (data) => ({
  type: actionTypes.CHANGE_LIST_OFFSET,
  data
})

// 进场 loading
export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

// 底部上拉加载 loading
export const changePullUpLoading = (data) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data
})

// 顶部下拉刷新 loading
export const changePullDownLoading = (data) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data
})

// 是否有更多数据
export const changeIsMore = (data) => ({
  type: actionTypes.CHANGE_IS_MORE,
  data
})

// 加载热门歌手
export const getHotSingerList = () => {
  return (dispatch, getState) => {
    const offset = getState().getIn(['singers', 'listOffset'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()

    // 获取热门歌手
    getTopArtists(offset).then(res => {
      if (res.code === 200) {
        const {artists, more } = res
        const data = offset === 0 ? artists : [...singerList, ...artists]
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))     // 关闭进场 loading
        dispatch(changePullDownLoading(false))  // 关闭下拉刷新 loading
        dispatch(changePullUpLoading(false))    // 关闭上拉加载 loading
        dispatch(changeListOffset(data.length)) // 修改偏移量
        dispatch(changeIsMore(more))            // 是否还有更多数据
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
    const offset = getState().getIn(['singers', 'listOffset'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()

    // 获取歌手列表
    getArtistList(category, alpha, offset).then(res => {
      if (res.code === 200) {
        const {artists, more } = res
        const data = offset === 0 ? artists : [...singerList, ...artists]
        dispatch(changeSingerList(data))
        dispatch(changeEnterLoading(false))     // 关闭进场 loading
        dispatch(changePullUpLoading(false))    // 关闭上拉加载 loading
        dispatch(changePullDownLoading(false))  // 关闭下拉刷新 loading
        dispatch(changeListOffset(data.length)) // 修改偏移量
        dispatch(changeIsMore(more))            // 是否还有更多数据
      }

    }).catch(err => {
      console.log(err)
    })
  }
}