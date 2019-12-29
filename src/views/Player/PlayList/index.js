import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../store/actions'
import {PlayListWrapper, ScrollWrapper} from './style'

function PlayList(props) {
  const  { showPlayList } = props
  const { togglePlayListDispatch } = props

  return (
    <PlayListWrapper>
      <div className="list-wrapper">
        <ScrollWrapper></ScrollWrapper>
      </div>
    </PlayListWrapper>
  )
}

const mapStateToProps = (state) => ({
  showPlayList: state.getIn(['player', 'showPlayList'])
})

const mapDispatchToProps = (dispatch) => ({
  togglePlayListDispatch(data) {
    dispatch(actionCreators.changeShowPlayList(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList))