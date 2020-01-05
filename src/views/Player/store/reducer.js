import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '@/assets/config'
import { findSongIndex } from '@/utils'

const defaultState = fromJS({
  playList: [],             // 歌曲列表
  sequenceList: [],         // 顺序列表(随机模式会打乱列表，用这个保存顺序列表)
  currentSong: {},          // 当前播放歌曲
  currentIndex: 0,          // 当前歌曲在列表中的索引
  mode: playMode.sequence,  // 播放模式   顺序: sequence  循环: loop  随机: random
  playing: false,           // 是否播放
  showPlayList: false,      //是否展示播放列表
  fullScreen: false,        // 是否全屏
})

// 删除歌曲
const handleDeleteSong = (state, song) => {
  // 拷贝数据，不直接修改原来的 state
  const playList = JSON.parse(JSON.stringify(state.get('playList').toJS()))
  const sequenceList = JSON.parse(JSON.stringify(state.get('sequenceList').toJS()))
  let currentIndex = state.get('currentIndex')

  // 找到要删除的歌曲在当前播放列表中的索引
  const delIdx = findSongIndex(song, playList)
  // 在播放列表中删除
  playList.splice(delIdx, 1)
  // 如果删除的歌曲在当前播放歌曲前面，则 currentIndex 减 1，让当前歌曲正常播放
  if (delIdx < currentIndex) currentIndex --
  // 在顺序列表中删除歌曲
  const delIdx_s = findSongIndex(song, sequenceList)
  sequenceList.splice(delIdx_s, 1)

  return state.merge({
    playList: fromJS(playList),
    sequenceList: fromJS(sequenceList),
    currentIndex: fromJS(currentIndex)
  })
}

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
    case actionTypes.DELETE_SONG:
      return handleDeleteSong(state, action.data)
    default:
      return state
  }
}