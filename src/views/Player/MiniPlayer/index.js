import React, { useRef } from 'react'
import ProgressCircle from 'components/ProgressCircle'
import { CSSTransition } from 'react-transition-group'
import { MiniPlayerContainer } from './style'
import { getName } from '@/utils'

function MiniPlayer(props) {

  const  { song, fullScreen, playing, percent } = props
  const { toggleFullScreen, togglePlaying, togglePlayList } = props

  const miniPlayerRef = useRef()
  return (
    <CSSTransition
      classNames="mini"
      in={!fullScreen}
      timeout={400}
      onEnter={() => miniPlayerRef.current.style.display = 'flex'}
      onExited={() => miniPlayerRef.current.style.display = 'none'}>
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => toggleFullScreen(true)}>
        <div className="mini-cd">
          <img className={`img play ${playing ? '' : 'pause'}`} src={song.al.picUrl} alt="player"/>
        </div>
        <div className="text-container">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{ getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            { playing ?
              <i className="iconfont icon-mini icon-pause" onClick={(e) => togglePlaying(e, false)}>&#xe650;</i>
              :
              <i className="iconfont icon-mini icon-play" onClick={(e) => togglePlaying(e, true)}>&#xe61e;</i>
            }
          </ProgressCircle>
        </div>
        <div className="control" onClick={e => {e.stopPropagation(); togglePlayList(true);}}><i className="iconfont icon-playlist">&#xe640;</i></div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)