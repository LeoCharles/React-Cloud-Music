import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'

function Player(props) {

  const currentSong = {
    al: { picUrl: "http://p2.music.126.net/aobhntWi-ixT_wsXuIY3fQ==/3293037326190458.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }

  const { fullScreen } = props

  const { toggleFullScreenDispatch } = props

  return (
    <div>
      <MiniPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}/>
      <NormalPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  playList: state.getIn(['player', 'playList']),
  sequenceList: state.getIn(['player', 'sequenceList']),
  currentSong: state.getIn(['player', 'currentSong']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playing: state.getIn(['player', 'playing']),
  mode: state.getIn(['player', 'mode']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  fullScreen: state.getIn(['player', 'fullScreen']),
})

const mapDispatchToProps = (dispatch) => ({
  changePlayListDispatch(data) {
    dispatch(actionCreators.changePlayList(data))
  },
  changeCurrentSongDispatch(data) {
    dispatch(actionCreators.changeCurrentSong(data))
  },
  changeCurrentIndexDispatch(index) {
    dispatch(actionCreators.changeCurrentIndex(index))
  },
  changeModeDispatch(data) {
    dispatch(actionCreators.changePlayMode(data))
  },
  togglePlayingDispatch(data) {
    dispatch(actionCreators.changePlayingState(data))
  },
  toggleFullScreenDispatch(data) {
    dispatch(actionCreators.changeFullScreen(data))
  },
  toggleShowPlayListDispatch(data) {
    dispatch(actionCreators.changeShowPlayList(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))