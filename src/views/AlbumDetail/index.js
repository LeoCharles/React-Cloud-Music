import React from 'react'
import { TopDesc, Menu, SongListContainer, SongList } from './style'
import { getName } from '@/utils'

const currentAlbum = {
  creator: {
    avatarUrl: "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
    nickname: "浪里推舟"
  },
  coverImgUrl: "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
  subscribedCount: 2010711,
  name: "听完就睡，耳机是天黑以后柔软的梦境",
  tracks:[
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
    {
      name: "我真的受伤了",
      ar: [{name: "张学友"}, {name: "周华健"}],
      al: {
        name: "学友 热"
      }
    },
  ]
}

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
  const renderSongList = () => (
    <SongListContainer>
      <div className="first-line">
        <div className="play-all">
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部<span className="sum"> (共46首) </span></span>
        </div>
        <div className="add-list">
          <i className="iconfont">&#xe62d;</i>
          <span>收藏(1.3万)</span>
        </div>
      </div>
      <SongList>
        {
          currentAlbum.tracks.map((item, index) => (
            <li className="item" key={index}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span className="title">{item.name}</span>
                <span className="name">{ getName(item.ar) } - {item.al.name}</span>
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