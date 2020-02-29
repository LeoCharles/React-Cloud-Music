import React, {useState, useRef, useEffect} from 'react'
import { CSSTransition } from 'react-transition-group'
import { NormalPlayerContainer, Top, Middle, CDWrapper, Bottom, ProgressWrapper, LyricWrapper, LyricList } from './style'
import { getName, prefixStyle, formatePlayTime } from '@/utils'
import { playMode } from '@/assets/config'
import Scroll from 'components/Scroll'
import animations from 'create-keyframe-animation'
import ProgressBar from 'components/ProgressBar'

function NormalPlayer(props) {
  const {
    song,
    fullScreen,
    playing,
    percent,
    duration,
    currentTime,
    mode,
    lyric,    // 歌词解析实例
    lyricTxt, // 当前歌词
    lyricIdx, // 当前歌词行号
  } = props
  const {
    toggleFullScreen,
    togglePlaying,
    togglePlayList,
    changeMode,
    onProgressChange,
    onPrev,
    onNext
  } = props

  // 页面中部是显示 CD 还是歌词
  const [showLyric, setShowLyric] = useState(false)
  // 保存 DOM 元素
  const normalPlayerRef = useRef()
  const cdWrapperRef = useRef()
  const lyricScrollRef = useRef()
  const lyricLineRefs = useRef([])

  // 歌词滚动
  useEffect(() => {
    if (!lyricScrollRef.current) return
    const bScroll = lyricScrollRef.current.getBScroll()

    if (lyricIdx > 5) {
      const lineEl = lyricLineRefs.current[lyricIdx - 5].current
      // 保持当前歌词在第 5 行的位置
      bScroll.scrollToElement(lineEl, 1000)
    } else {
      // 当前歌词直接滚动到顶端
      bScroll.scrollTo(0, 0, 1000)
    }
  }, [lyricIdx])


   // 切换播放模式图标
  const getPlayMode = () => {
    let content = ''
    if (mode === playMode.sequence) {
      content = '&#xe625'
    } else if (mode === playMode.loop) {
      content = '&#xe653'
    } else {
      content = '&#xe61b'
    }
    return content
  },

  // 切换显示 CD / 歌词
  toggleShowLyric = () => {
    showLyric ? setShowLyric(false) : setShowLyric(true)
  }

  // 计算 mini CD 到全屏 CD 中的的偏移量
  const _getPosAndScale = () => {
    const miniWidth = 40                   // mini CD 宽度
    const miniLeft = 40                    // mini CD 圆心距左边距离
    const miniBottom = 30                  // mini CD 圆心距底边距离
    const width = window.innerWidth * 0.8  // 全屏 CD 宽度
    const cdTop = 120                      // 全屏 CD 定位的 top (80 + 40)
    const scale = miniWidth / width        // 全屏 CD 初始缩放比例

    // 两个圆心的横坐标和纵坐标距离
    const x = -(window.innerWidth / 2 - miniLeft)   // 从全屏 CD 到 mini CD 的横轴偏移量（负数）
    const y = window.innerHeight - cdTop - width / 2 - miniBottom  // 纵轴偏移量（正数）

    return {x, y, scale}
  }

  // transform 加浏览器前缀
  const transform = prefixStyle('transform')

  // 进场帧动画
  const enter = () => {
    normalPlayerRef.current.style.display = 'block'
    const { x, y, scale } = _getPosAndScale()
    // 从 mini CD 的位置过渡到 全屏 CD 的位置
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0,0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0,0, 0) scale(1)`
      }
    }
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    })
    animations.runAnimation(cdWrapperRef.current, 'move')
  }

  // 进场后解绑帧动画
  const afterEnter = () => {
    cdWrapperRef.current.style.animation = ''
    animations.unregisterAnimation('move')
  }

  // 离开动画
  const exit = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    const { x, y, scale } = _getPosAndScale()
    cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    cdWrapperDom.style.transition = 'all 0.4s'
  }

  // 离开之后
  const afterExit = () => {
    if (!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style[transform] = ''
    cdWrapperDom.style.transition = ''
    // 隐藏全屏播放器
    normalPlayerRef.current.style.display = 'none'
    // 是否显示歌词状态还原
    setShowLyric(false)
  }

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={exit}
      onExited={afterExit}>
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img src={song.al.picUrl + "?param=300x300"} alt="bg"/>
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <div className="info">
            <h1 className="title">{song.name}</h1>
            <h2 className="subtitle">{getName(song.ar)}</h2>
          </div>
        </Top>
        <Middle onClick={toggleShowLyric}>
          <CSSTransition
            classNames="fade"
            timeout={400}
            in={!showLyric}>
            <CDWrapper
              ref={cdWrapperRef}
              style={{visibility: showLyric ? 'hidden' : 'visible'}}>
              <div className={`needle ${playing ? '' : 'pause'}`}></div>
              <div className="cd">
                <img
                  className={`img play ${playing ? '' : 'pause'}`}
                  src={song.al.picUrl ? song.al.picUrl + "?param=400x400" : require('../../../assets/img/music.png')}
                  alt="play"/>
              </div>
              <div className="lyric">
                <p className="lyric-text">{lyricTxt}</p>
              </div>
            </CDWrapper>
          </CSSTransition>
          <CSSTransition
            classNames="fade"
            timeout={400}
            in={showLyric}>
              <LyricWrapper>
                <Scroll ref={lyricScrollRef}>
                  <LyricList style={{visibility: showLyric ? 'visible' : 'hidden'}}>
                    {
                      lyric ? lyric.lines.map((item, index) => {
                        // 获取每一行歌词的 DOM 对象
                        lyricLineRefs.current[index] = React.createRef()
                        return (
                          <p
                            ref={lyricLineRefs.current[index]}
                            className={`item ${lyricIdx === index ? 'active' : ''}`}
                            key={index}>
                              {item.txt}
                          </p>
                        )
                      }) : <p className='item pure'>纯音乐，请欣赏。</p>
                    }
                  </LyricList>
                </Scroll>
              </LyricWrapper>
          </CSSTransition>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatePlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}/>
            </div>
            <span className="time time-r">{formatePlayTime(duration)}</span>
          </ProgressWrapper>
          <div className="operators">
            <div className="icon" onClick={changeMode}>
              <i className="iconfont" dangerouslySetInnerHTML={{__html: getPlayMode()}}></i>
            </div>
            <div className="icon" onClick={onPrev}><i className="iconfont">&#xe6e1;</i></div>
            <div className="icon play" onClick={e => togglePlaying(e, !playing)}>
              <i className="iconfont" dangerouslySetInnerHTML={{__html: playing ? '&#xe723;' : '&#xe731;'}}></i>
            </div>
            <div className="icon" onClick={onNext}><i className="iconfont">&#xe718;</i></div>
            <div className="icon" onClick={e => togglePlayList(e, true)}><i className="iconfont">&#xe640;</i></div>
          </div>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(NormalPlayer)