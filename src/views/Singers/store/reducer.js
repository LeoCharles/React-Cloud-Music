import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  category: '',           // 歌手分类
  alpha: '',              // 首字母分类
  singerList: [],         // 歌手列表
  pageCount: 0,           // 当前页
  enterLoading: false,     // 进场 loading
  pullUpLoading: false,   // 上拉加载 loading
  pullDownLoading: false, // 下拉刷新 loading
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_CATEGORY:
      return state.set('category', action.data)
    case actionTypes.CHANGE_ALPHA:
      return state.set('alpha', action.data)
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.data)
    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data)
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data)
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data)
    default: 
      return state;
  }
}