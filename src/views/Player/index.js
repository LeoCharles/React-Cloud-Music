import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import Toast from 'components/Toast'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'
import PlayList from './PlayList'
import { getLyricRequest } from '@/api'
import { getSongUrl, findSongIndex, shuffle, isEmptyObject } from '@/utils'
import Lyric from '@/utils/lyricParser'
import { playMode } from '@/assets/config'

function Player(props) {

  const [currentTime, setCurrentTime] = useState(0) // 当前播放时长
  const [duration, setDuration] = useState(0)       // 歌曲总时长
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration // 播放进度

  const [preSong, setPreSong] = useState({})       // 记录当前歌曲
  const [songReady, setSongReady] = useState(true) // 记录是否准备好播放
  const [modeText, setModeText] = useState('')     // toast 文字
  const [lyricTxt, setLyricTxt] = useState('')     // 当前播放的歌词
  const [lyricIdx, setLyricIdx] = useState(0)      // 当前播放歌词的行号

  const audioRef = useRef()   // 音频播放器
  const toastRef = useRef()   // toast 组件
  const lyricRef = useRef()   // 歌词解析实例


  const {
    fullScreen,
    playing,
    currentIndex,
    mode,
    currentSong: immutableCurrentSong,  // 当前歌曲
    playList: immutablePlayList,        // 歌曲列表
    sequenceList: immutableSequenceList // 顺序列表
  } = props

  const {
    toggleFullScreenDispatch,    // 是否全屏
    togglePlayingDispatch,       // 播放状态
    togglePlayListDispatch,      // 是否显示播放列表
    changeCurrentIndexDispatch,  // 当前歌曲索引
    changeCurrentSongDispatch,   // 当前歌曲
    changePlayListDispatch,      // 改变播放列表
    changeModeDispatch           // 改变播放模式
  } = props

  const playList = immutablePlayList.toJS()
  const sequenceList = immutableSequenceList.toJS()
  const currentSong = immutableCurrentSong.toJS()

  // 播放逻辑
  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady
    ) return

    setSongReady(false)
    // 当前播放歌曲
    const current = playList[currentIndex]
    changeCurrentSongDispatch(current)
    setPreSong(current) // 记录当前歌曲
    setLyricTxt('')

    // 获取歌曲的 url 地址
    audioRef.current.src = getSongUrl(current.id)
    audioRef.current.autoplay = true

    togglePlayingDispatch(true)          // 播放状态
    setCurrentTime(0)                    // 从头开始播放
    setDuration((current.dt / 1000) | 0) // 歌曲总时长
    getLyric(current.id)                 // 获取歌词
    // eslint-disable-next-line
  }, [playList, currentIndex])

  // 播放和暂停
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause()
  }, [playing])

  // 切换全屏时显示当前歌词
  useEffect(() => {
    if (!fullScreen) return
    if (lyricRef.current && lyricRef.current.lines.length) {
      handleLyric({
        idx: lyricIdx,
        txt: lyricRef.current.lines[lyricIdx].txt
      })
    }
  }, [fullScreen, lyricIdx])

  // 获取歌词
  const getLyric = (id) => {
    // 判断是否已经有歌词解析实例，如果有先暂停
    if (lyricRef.current) {
      lyricRef.current.pause()
    }
    // 避免 songReady 一直为 false
    setTimeout(() => {
      setSongReady(true)
    }, 1000)

    // 发送请求获取歌词
    getLyricRequest(id).then(res => {
      if (res.nolyric) {
        lyricRef.current = null
        setLyricTxt('')
        return
      } else {
        const lyric = res.lrc && res.lrc.lyric
        if (!lyric) {
          lyricRef.current = null
          setLyricTxt('')
          return
        }
        // 解析歌词的实例
        lyricRef.current = new Lyric(lyric, handleLyric)
        // 开始播放歌词
        lyricRef.current.play()
        // 设置歌词行号
        setLyricIdx(0)
      }
    }).catch(() => {
      // 歌词获取失败也播放歌曲
      lyricRef.current = null
      setLyricTxt('')
      setSongReady(true)
      audioRef.current.play()
    })
  }

  // 处理歌词
  const handleLyric = ({idx, txt}) => {
    if(!lyricRef.current) return
    // 当前播放的歌词
    setLyricTxt(txt)
    setLyricIdx(idx)
  }

  // 切换播放和暂停
  const togglePlaying = (e, state) => {
    e.stopPropagation()
    togglePlayingDispatch(state)

    // 歌词切换播放 / 暂停
    if(lyricRef.current) {
      // 传递当前播放时间的毫秒数，即播放进度
      lyricRef.current.togglePlay(currentTime * 1000)
    }
  }

  // 显示和隐藏播放列表
  const toggleShowPlayList = (e, state) => {
    e.stopPropagation()
    togglePlayListDispatch(state)
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

    // 歌词进度更新
    if(lyricRef.current) {
      lyricRef.current.seek(newTime * 1000)
    }
  }

  // 单曲循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0
    togglePlayingDispatch(true)
    audioRef.current.play()
    // 歌词重新开始
    if(lyricRef.current) {
      lyricRef.current.seek(0)
    }
  }

  // 上一首
  const handlePrev = () => {
    if (playList.length === 1) {
      return handleLoop()
    }
    let index = currentIndex - 1
    if (index < 0) index = playList.length - 1
    if (!playing) togglePlayingDispatch(true)
    changeCurrentIndexDispatch(index)
  }

  // 下一首
  const handleNext = () => {
    if (playList.length === 1) {
      return handleLoop()
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
    // 显示 toast
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

  // 播放错误回调，出错了播放下一首
  const handleError = () => {
    setSongReady(true)
    handleNext()
    alert('抱歉，未找到歌曲资源')
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
          togglePlaying={togglePlaying}
          togglePlayList={toggleShowPlayList}/>
      }
      { isEmptyObject(currentSong) ? null :
        <NormalPlayer
          song={currentSong}
          playing={playing}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          mode={mode}
          lyric={lyricRef.current}
          lyricTxt={lyricTxt}
          lyricIdx={lyricIdx}
          fullScreen={fullScreen}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlaying={togglePlaying}
          togglePlayList={toggleShowPlayList}
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
      <PlayList></PlayList>
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
  togglePlayListDispatch(data) {
    dispatch(actionCreators.changeShowPlayList(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))