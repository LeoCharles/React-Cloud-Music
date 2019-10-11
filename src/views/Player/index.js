import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import Toast from 'components/Toast'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'
import { getSongUrl, findSongIndex, shuffle, isEmptyObject } from '@/utils'
import { playMode } from '@/assets/config'

function Player(props) {

  const [currentTime, setCurrentTime] = useState(0)// 当前播放时长
  const [duration, setDuration] = useState(0) // 歌曲总时长
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration // 播放进度

  const [preSong, setPreSong] = useState({}) // 记录当前歌曲
  const [songReady, setSongReady] = useState(true)
  const [modeText, setModeText] = useState('')

  const audioRef = useRef()
  const toastRef = useRef()

  const {
    fullScreen,
    playing,
    currentIndex,
    mode,
    currentSong: immutableCurrentSong,
    playList: immutablePlayList,
    sequenceList: immutableSequenceList
  } = props

  const {
    toggleFullScreenDispatch,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentSongDispatch,
    changePlayListDispatch,
    changeModeDispatch
  } = props

  const playList = immutablePlayList.toJS()
  const sequenceList = immutableSequenceList.toJS()
  const currentSong = immutableCurrentSong.toJS()

  useEffect(() => {
    if (
      !playList.length || 
      currentIndex === -1 || 
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady
    ) return

    const current = playList[currentIndex] // 当前播放歌曲
    changeCurrentSongDispatch(current)
    setPreSong(current)
    setSongReady(false)

    audioRef.current.src = getSongUrl(current.id) // 获取 MP3 地址

    setTimeout(() => {
      // play 方法返回以恶搞 promise 对象
      audioRef.current.play().then(() => {
        setSongReady(true)
      })
    })

    togglePlayingDispatch(true) // 播放状态
    setCurrentTime(0)  // 从头开始播放
    setDuration((current.dt / 1000) | 0) // 歌曲总时长

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

  // 单曲循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0
    togglePlayingDispatch(true)
    audioRef.current.play()
  }

  // 上一首
  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex - 1
    if (index < 0) index = playList.length - 1
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }

  // 下一首
  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop()
      return
    }
    let index = currentIndex + 1
    if (index === playList.length) index = 0
    if (!playing) togglePlayingDispatch(true) 
    changeCurrentIndexDispatch(index)
  }

  // 切换播放播放模式
  const changeMode = () => {
    const newMode = (mode + 1) % 3
    if (newMode === 0) {
      // 顺序模式
      const index = findSongIndex(currentSong, sequenceList)
      changePlayListDispatch(sequenceList)
      changeCurrentIndexDispatch(index)
      setModeText('顺序播放')
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequenceList)
      setModeText('单曲循环')
    } else if (newMode === 2) {
      // 随机播放
      const newList = shuffle(sequenceList)
      const index = findSongIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
      setModeText('随机播放')
    }
    changeModeDispatch(newMode)
    toastRef.current.show()
  }

  // 播放结束回调
  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop()
    } else {
      handleNext()
    }
  }

  // 播放错误回调
  const handleError = () => {
    console.log('播放器出错')
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
          mode={mode}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlaying={togglePlaying}
          changeMode={changeMode}
          onProgressChange={handleProgressChange}
          onPrev={handlePrev}
          onNext={handleNext}/>
      }
      <audio 
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
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