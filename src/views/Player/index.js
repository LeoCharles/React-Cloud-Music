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

  const [songReady, setSongReady] = useState(true)
  
  const audioRef = useRef()

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

  const playList = immutablePlayList.toJS()
  const currentSong = immutableCurrentSong.toJS()

  useEffect(() => {
    if (
      !playList.length || 
      currentIndex === -1 || 
      !playList[currentIndex] ||
      !songReady
    ) return

    // 当前播放歌曲
    const current = playList[currentIndex]
    setSongReady(false)
    changeCurrentSongDispatch(current)

    // 获取 MP3 地址
    audioRef.current.src = getSongUrl(current.id)

    setTimeout(() => {
      audioRef.current.play().then(() => {
        setSongReady(true)
      })
    })

    // 播放状态
    togglePlayingDispatch(true)
    // 从头开始播放
    setCurrentTime(0)
    // 歌曲总时长
    setDuration((current.dt / 1000) | 0)
    // eslint-disable-next-line
  }, [playList, currentIndex])

  // 播放和暂停
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])

  // 切换播放和暂停
  const togglePlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state)
  }

  // 时间更新
  const updateTime = (e) => {
    setCurrentTime(e.target.currentTime)
  }

  // 进度条百分比改变的回调
  const handleProgressChange = (currPercent) => {
    const newTime = currPercent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    if(!playing) {
      togglePlayingDispatch(true)
    }
  }

  return (
    <div>
      { isEmptyObject(currentSong) ? null :
        <MiniPlayer 
          song={currentSong}
          playing={playing}
          percent={percent}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlaying={togglePlaying}/>
      }
      { isEmptyObject(currentSong) ? null :
        <NormalPlayer 
          song={currentSong}
          playing={playing}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlaying={togglePlaying}
          onProgressChange={handleProgressChange}/>
      }
      <audio 
        ref={audioRef}
        onTimeUpdate={updateTime}
      ></audio>
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