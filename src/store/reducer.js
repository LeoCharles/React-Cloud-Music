import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from 'views/Recommend/store'
import { reducer as singersReducer } from 'views/Singers/store'

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
})