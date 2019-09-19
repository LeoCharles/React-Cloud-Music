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

export const getRankList = () => {
  return (dispatch) => {
    getTopListDetail().then(res => {
      dispatch(changeRankList(res.list))
      dispatch(changeLoading(false))
    }).catch(err => {
      console.log(err);
    })
  }
}
