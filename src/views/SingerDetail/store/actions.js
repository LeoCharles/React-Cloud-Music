import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getArtistsDetail } from '@/api'

export const changeArtist = (data) => ({
  type: actionTypes.CHANGE_ARTIST,
  data: fromJS(data)
})

export const changeSongs = (data) => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

// 获取歌手详情
export const getSingerDetail = (id) => {
  return (dispatch) => {
    getArtistsDetail(id).then(res => {
      if (res.code === 200) {
        dispatch(changeArtist(res.artist))
        dispatch(changeSongs(res.hotSongs))
        dispatch(changeEnterLoading(false))
      }
    })
  }
}