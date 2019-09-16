import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from 'views/Recommend/store'

export default combineReducers({
  recommend: recommendReducer
})