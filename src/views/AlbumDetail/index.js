import React from 'react'
import { TopDesc, Menu } from './style'

function AlbumDetail() {

  // 渲染歌单详情顶部介绍
  const renderToDesc = () => (
    <TopDesc>
      <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img-wrapper">
        <div className="decorate"></div>
        <img  src={'http://p1.music.126.net/rJ1k50EAvph5HLwIWHSz1g==/109951164226530974.jpg'} alt=""/>
        <div className="play-count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">13.6万</span>
        </div>
      </div>
      <div className="desc-wrapper">
        <h1 className="title">{'午后时光 静享27°C阳光小调'}</h1>
        <div className="person">
          <div className="avatar"><img src={'http://p1.music.126.net/UQ7TVG036kyzZH3mLKgvYg==/109951163192255089.jpg'}  alt=""/></div>
          <div className="name">{'周华健'}</div>
        </div>
      </div>
    </TopDesc>
  )

  // 渲染菜单按钮
  const renderMenu = () => (
    <Menu>
      <li className="item"><i className="iconfont">&#xe6ad;</i>评论</li>
      <li className="item"><i className="iconfont">&#xe86f;</i>点赞</li>
      <li className="item"><i className="iconfont">&#xe62d;</i>收藏</li>
      <li className="item"><i className="iconfont">&#xe606;</i>更多</li>
    </Menu>
  )

  // 渲染歌曲列表
  const renderSongList = () => {

  }

  return (
    <div>
      { renderToDesc() }
      { renderMenu() }
      { renderSongList() }
    </div>
  )
}

export default AlbumDetail