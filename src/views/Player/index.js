import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'
import { getSongUrl, isEmptyObject } from '@/utils'

function Player(props) {

  const [currentTime, setCurrentTime] = useState(0)// 当前播放时长
  const [duration, setDuration] = useState(0) // 歌曲总时长
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration // 播放进度

  const {
    fullScreen,
    playing,
    currentIndex,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
  } = props

  const {
    toggleFullScreenDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentSongDispatch
  } = props

  const currentSong = immutableCurrentSong.toJS()
  const playList = immutablePlayList.toJS()

  const audioRef = useRef()

  useEffect(() => {
    if(isEmptyObject(currentSong)) return
    changeCurrentIndexDispatch(0)
    const current = playList[0]
    changeCurrentSongDispatch(current)
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(() => {
      audioRef.current.play()
    })
    togglePlayingDispatch(true)
    setCurrentTime(0)
    setDuration((current.dt / 1000) | 0)
    // eslint-disable-next-line
  }, [])

  // 播放和暂停
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])

  const togglePlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state)
  }

  return (
    <div>
      { isEmptyObject(currentSong) ? null :
        <MiniPlayer 
          song={currentSong}
          playing={playing}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlaying={togglePlaying}/>
      }
      { isEmptyObject(currentSong) ? null :
        <NormalPlayer 
          song={currentSong}
          playing={playing}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlaying={togglePlaying}/>
      }
      <audio ref={audioRef}></audio>
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