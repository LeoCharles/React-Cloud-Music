import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getSongDetailRequest } from '@/api'

export const changePlayList = (data) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  data: fromJS(data)
})

export const changeSequenceList = (data) => ({
  type: actionTypes.CHANGE_SEQUENCE_LIST,
  data: fromJS(data)
})

export const changeCurrentSong = (data) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  data: fromJS(data)
})

export const changeCurrentIndex = (data) => ({
  type: actionTypes.CHANGE_CURRENT_INDEX,
  data
})

export const changePlayMode = (data) => ({
  type: actionTypes.CHANGE_PLAY_MODE,
  data
})

export const changePlayingState = (data) => ({
  type: actionTypes.CHANGE_PLAYING_STATE,
  data
})

export const changeFullScreen = (data) => ({
  type: actionTypes.CHANGE_FULL_SCREEN,
  data
})

export const changeShowPlayList = (data) => ({
  type: actionTypes.CHANGE_SHOW_PLAYLIST,
  data
})

export const deleteSong = (data) => ({
  type: actionTypes.DELETE_SONG,
  data
})

// 播放列表中插入新歌曲
export const insertSong = (data) => ({
  type: actionTypes.INSERT_SONG,
  data
})

// 获取歌曲详情
export const getSongDetail = (id) => {
  return (dispatch) => {
    getSongDetailRequest(id).then(res => {
      const song = res.songs[0]
      dispatch(insertSong(song))
    })
  }
}