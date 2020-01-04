import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '@/assets/config'

const defaultState = fromJS({
  playList: [],             // 歌曲列表
  sequenceList: [],         // 顺序列表(随机模式会打乱列表，用这个保存顺序列表)
  currentSong: {},          // 当前播放歌曲
  currentIndex: 0,          // 当前歌曲在列表中的索引
  mode: playMode.sequence,  // 播放模式
  playing: false,           // 是否播放
  showPlayList: false,      //是否展示播放列表
  fullScreen: false,        // 是否全屏
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set('playList', action.data)
    case actionTypes.CHANGE_SEQUENCE_LIST:
      return state.set('sequenceList', action.data)
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.data)
    case actionTypes.CHANGE_CURRENT_INDEX:
      return state.set('currentIndex', action.data)
    case actionTypes.CHANGE_PLAY_MODE:
      return state.set('mode', action.data)
    case actionTypes.CHANGE_PLAYING_STATE:
      return state.set('playing', action.data)
    case actionTypes.CHANGE_FULL_SCREEN:
      return state.set('fullScreen', action.data)
    case actionTypes.CHANGE_SHOW_PLAYLIST:
      return state.set('showPlayList', action.data)
    default:
      return state
  }
}