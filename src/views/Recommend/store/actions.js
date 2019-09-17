import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getBanner, getRecommend } from '@/api'

export const changeBanner = (data) => ({
  type: actionTypes.CHANGE_BANNER_LIST,
  data: fromJS(data)
})

export const changeRecommend = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => {
  return (dispatch) => {
    getBanner().then(res => {
      dispatch(changeBanner(res.banners))
      dispatch(changeEnterLoading(false))
    }).catch(err => {
      console.log(err);
    })
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommend().then(res => {
      dispatch(changeRecommend(res.result))
    }).catch(err => {
      console.log(err);
    })
  }
}
