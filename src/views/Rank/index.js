import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'

function Rank(props) {
  const { rankList, loading } = props

  return (
    <div>
      Rank
    </div>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch) => ({
  getRankListDispatch(){
    dispatch(actionCreators.getRankList())
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))