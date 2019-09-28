import React from 'react'
import { NormalPlayerContainer, Header, Body, CDWrapper, Footer } from './style'
import { getName } from '@/utils'

function NormalPlayer(props) {
  const { song } = props

  return (
    <NormalPlayerContainer>
      <div className="background"><img src={song.al.picUrl + "?param=300x300"} alt="bg"/></div>
      <div className="background layer"></div>
      <Header>
        <div className="back"><i className="iconfont icon-back">&#xe662;</i></div>
        <h1 className="title">{song.name}</h1>
        <h2 className="subtitle">{getName(song.ar)}</h2>
      </Header>
      <Body>
        <CDWrapper>
          <div className="cd"><img src={song.al.picUrl + "?param=400x400"} className="img play" alt="play"/></div>
        </CDWrapper>
      </Body>
      <Footer>
        <div className="operators">
          <div className="icon"><i className="iconfont">&#xe625;</i></div>
          <div className="icon"><i className="iconfont">&#xe6e1;</i></div>
          <div className="icon play"><i className="iconfont">&#xe723;</i></div>
          <div className="icon"><i className="iconfont">&#xe718;</i></div>
          <div className="icon"><i className="iconfont">&#xe640;</i></div>
        </div>
      </Footer>
    </NormalPlayerContainer>
  )
}

export default React.memo(NormalPlayer)