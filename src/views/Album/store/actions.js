import * as actionTypes from './constants'
import { getPlayListDetail } from '@/api'
import { fromJS } from 'immutable'

export const changeCurrentAlbum = (data) => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getAlbumDetail = (id) => {
  return (dispatch) => {
    getPlayListDetail(id).then(res => {
      if (res.code === 200) {
        dispatch(changeCurrentAlbum(res.playlist))
        dispatch(changeEnterLoading(false))
      }
    }).catch(err => {
      console.log(err)
      dispatch(changeCurrentAlbum({}))
      dispatch(changeEnterLoading(false))
    })
  }
}