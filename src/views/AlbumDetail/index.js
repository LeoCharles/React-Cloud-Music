import React from 'react'
import { TopDesc, Menu, SongListContainer, SongList } from './style'
import { getName, getCount } from '@/utils'

function AlbumDetail(props) {
  const { currentAlbum } = props

  // 渲染歌单详情顶部介绍
  const renderToDesc = () => (
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img-wrapper">
        <div className="decorate"></div>
        <img  src={currentAlbum.coverImgUrl} alt=""/>
        <div className="play-count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10}万</span>
        </div>
      </div>
      <div className="desc-wrapper">
        <h1 className="title">{currentAlbum.name}</h1>
        <div className="person">
          <div className="avatar"><img src={currentAlbum.creator.avatarUrl}  alt=""/></div>
          <div className="name">{currentAlbum.creator.nickname}</div>
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
  const renderSongList = () => (
    <SongListContainer>
      <div className="first-line">
        <div className="play-all">
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部<span className="sum"> (共{currentAlbum.tracks.length}首) </span></span>
        </div>
        <div className="add-list">
          <i className="iconfont">&#xe62d;</i>
          <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongList>
        {
          currentAlbum.tracks.map((item, index) => (
            <li className="item" key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="singer">{ getName(item.ar) } - {item.al.name}</span>
              </div>
            </li>
          ))
        }
      </SongList>
    </SongListContainer>
  )

  return (
    <div>
      { renderToDesc() }
      { renderMenu() }
      { renderSongList() }
    </div>
  )
}

export default AlbumDetail