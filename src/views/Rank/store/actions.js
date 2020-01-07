import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getTopListDetail } from '@/api'

export const changeRankList = (data) => ({
  type: actionTypes.CHANGE_RANK_LIST,
  data: fromJS(data)
})

export const changeLoading = (data) => ({
  type: actionTypes.CHANGE_LOADING,
  data
})

// 获取榜单列表
export const getRankList = () => {
  return (dispatch) => {
    getTopListDetail().then(res => {
      if(res.code === 200) {
        dispatch(changeRankList(res.list))
        dispatch(changeLoading(false))
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
