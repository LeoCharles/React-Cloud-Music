import React, {useState, useEffect, useCallback} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import { CSSTransition } from 'react-transition-group'
import SearchBar from '@/components/SearchBar'
import { SearchWrapper } from './style'

function Search(props) {

  const [show, setShow] = useState(false) // 控制显示隐藏
  const [query, setQuery] = useState('')  // 查询关键词

  const {
    hotList,
    suggestList: immutableSuggestList,
    songsList: immutableSongsList,
    enterLoading,
    songsCount
  } = props

  const suggestList = immutableSuggestList.toJS()
  const songsList = immutableSongsList.toJS()

  const {
    getHotKeyWordsDispatch,
    getSuggestListDispatch,
    changeEnterLoadingDispatch,
  } = props

  useEffect(() => {
    setShow(true)
  }, [])

  // 传递给子组件的方法，尽量用 useCallback 包裹，在依赖未改变时，始终给子组件传递的是相同的引用
  const handleBack = useCallback(() => {
      setShow(false)
    },[])

  // 更新查询关键词
  const handleSearch  = (query) => {
    console.log(query)
    setQuery(query)
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      apper={true}
      classNames="fly"
      unmountOnExit
      onExit={() => props.history.goBack()}>
      <SearchWrapper>
        <SearchBar back={handleBack} query={query} search={handleSearch}/>
      </SearchWrapper>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  hotList: state.getIn(['search', 'hotList']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsList: state.getIn(['search', 'songsList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  songsCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotKeyWordsDispatch() {
      dispatch(actionCreators.getHotKeyWords())
    },
    getSuggestListDispatch(data) {
      dispatch(actionCreators.getSuggestList(data))
    },
    changeEnterLoadingDispatch(data) {
      dispatch(actionCreators.changeEnterLoading(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search))