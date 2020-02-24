import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '@/assets/config'
import { findSongIndex } from '@/utils'

const defaultState = fromJS({
  playList: [],             // 歌曲列表
  sequenceList: [],         // 顺序列表(随机模式会打乱列表，用这个保存顺序列表)
  currentSong: {},          // 当前播放歌曲
  currentIndex: -1,         // 当前歌曲在列表中的索引
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
  console.log(currentIndex);
  return state.merge({
    playList: fromJS(playList),
    sequenceList: fromJS(sequenceList),
    currentIndex: fromJS(currentIndex)
  })
}

// 插入新歌曲
const handleInsertSong = (state, song) => {
  // 拷贝一份数据
  const playList = JSON.parse(JSON.stringify(state.get('playList').toJS()))
  const sequenceList = JSON.parse(JSON.stringify(state.get('sequenceList').toJS()))
  let currentIndex = state.get('currentIndex')

  // 查找播放列表中是否已有插入的歌曲
  const insertIdx = findSongIndex(song, playList)
  // 如果是当前播放的歌曲，则直接不处理
  if(insertIdx === currentIndex && currentIndex !== -1) return state
  // 否则，将新歌曲插入当前播放歌曲的下一首位置
  currentIndex ++
  playList.splice(currentIndex, 0, song)
  // 如果播放列表中有要插入的歌曲，暂且称为旧歌曲
  if(insertIdx > -1) {
    // 判断已有的歌曲是否在当前播放歌曲前面
    if (currentIndex > insertIdx) {
      // 如果在前面，则删除旧歌曲，且当前索引减一
      playList.splice(insertIdx, 1)
      currentIndex --
    } else {
      // 如果在后面，则直接删除旧歌曲
      playList.splice(insertIdx + 1, 1) // 因为插入了新歌曲，所以旧歌曲索引加一
    }
  }

  // 同理，处理顺序播放列表
  const insertIdx_s = findSongIndex(song, sequenceList)
  let sequenceIdx = findSongIndex(playList[currentIndex], sequenceList)
  sequenceIdx ++
  // 插入新歌曲
  sequenceList.splice(sequenceIdx, 0, song)
  if (insertIdx_s > -1) {
    if (sequenceIdx > insertIdx_s) {
      sequenceList.splice(insertIdx_s, 1)
      sequenceIdx --
    } else {
      sequenceList.splice(insertIdx_s + 1, 1)
    }
  }

  return state.merge({
    'playList': fromJS(playList),
    'sequenceList': fromJS(sequenceList),
    'currentIndex': fromJS(currentIndex)
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
    case actionTypes.INSERT_SONG:
      return handleInsertSong(state, action.data)
    default:
      return state
  }
}