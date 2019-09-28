import React from 'react'
import { MiniPlayerContainer } from './style'
import { getName } from '@/utils'

function MiniPlayer(props) {

  const  { song } = props

  return (
    <MiniPlayerContainer>
      <div className="img-wrapper">
        <img className="img play" src={song.al.picUrl} alt="player"/>
      </div>
      <div className="text-container">
        <h2 className="name">{song.name}</h2>
        <p className="desc">{ getName(song.ar)}</p>
      </div>
      <div className="control"><i className="iconfont">&#xe650;</i></div>
      <div className="control"><i className="iconfont icon-playlist">&#xe640;</i></div>
    </MiniPlayerContainer>
  )
}

export default React.memo(MiniPlayer)