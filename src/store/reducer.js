import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from 'views/Recommend/store'
import { reducer as singersReducer } from 'views/Singers/store'
import { reducer as singerDetailReducer } from 'views/SingerDetail/store'
import { reducer as rankReducer } from 'views/Rank/store'
import { reducer as albumReducer } from 'views/Album/store'

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  singerDetail: singerDetailReducer,
  rank: rankReducer,
  album: albumReducer,
})