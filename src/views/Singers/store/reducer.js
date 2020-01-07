import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  category: '',           // 歌手分类
  alpha: '',              // 首字母分类
  singerList: [],         // 歌手列表
  listOffset: 0,          // 请求列表偏移量
  enterLoading: false,     // 进场 loading
  pullUpLoading: false,   // 上拉加载 loading
  pullDownLoading: false, // 下拉刷新 loading
  isMore: true,           // 是否有更多数据
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_CATEGORY:
      return state.set('category', action.data)
    case actionTypes.CHANGE_ALPHA:
      return state.set('alpha', action.data)
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.data)
    case actionTypes.CHANGE_LIST_OFFSET:
      return state.set('listOffset', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data)
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data)
    case actionTypes.CHANGE_IS_MORE:
      return state.set('isMore', action.data)
    default:
      return state;
  }
}