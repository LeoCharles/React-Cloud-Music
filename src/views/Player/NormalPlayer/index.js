import React, {useRef} from 'react'
import { CSSTransition } from 'react-transition-group'
import { NormalPlayerContainer, Header, Body, CDWrapper, Footer, ProgressWrapper } from './style'
import { getName, prefixStyle, formatePlayTime } from '@/utils'
import animations from 'create-keyframe-animation'
import ProgressBar from 'components/ProgressBar'

function NormalPlayer(props) {
  const { song, fullScreen, playing, percent, duration, currentTime } = props
  const { toggleFullScreen, togglePlaying, onProgressChange } = props

  const normalPlayerRef = useRef()
  const cdWrapperRef = useRef()

  // 计算 mini CD 到全屏 CD 中的的偏移量
  const _getPosAndScale = () => {
    const miniWidth = 40                   // mini CD 宽度
    const miniLeft = 40                    // mini CD 圆心距左边距离
    const miniBottom = 30                  // mini CD 圆心距底边距离
    const width = window.innerWidth * 0.8  // 全屏 CD 宽度
    const cdTop = 120                      // 全屏 CD 定位的 top (80 + 40)
    const scale = miniWidth / width        // 全屏 CD 初始缩放比例
    
    // 初始状态将全屏 CD 移动到 mini CD 位置，再开始过渡
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
        <div className="background"><img src={song.al.picUrl + "?param=300x300"} alt="bg"/></div>
        <div className="background layer"></div>
        <Header className="header">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h2 className="subtitle">{getName(song.ar)}</h2>
        </Header>
        <Body>
          <CDWrapper ref={cdWrapperRef}>
            <div className="cd">
              <img className={`img play ${playing ? '' : 'pause'}`} src={song.al.picUrl + "?param=400x400"} alt="play"/>
            </div>
          </CDWrapper>
        </Body>
        <Footer className="footer">
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
            <div className="icon"><i className="iconfont">&#xe625;</i></div>
            <div className="icon"><i className="iconfont">&#xe6e1;</i></div>
            <div className="icon play">
              <i
                className="iconfont"
                onClick={e => togglePlaying(e, !playing)}
                dangerouslySetInnerHTML={{__html: playing ? '&#xe723;' : '&#xe731;'}}
                ></i>
            </div>
            <div className="icon"><i className="iconfont">&#xe718;</i></div>
            <div className="icon"><i className="iconfont">&#xe640;</i></div>
          </div>
        </Footer>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(NormalPlayer)