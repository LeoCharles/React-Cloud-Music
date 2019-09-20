import React, { useState, useRef } from 'react'
import BackHeader from 'components/BackHeader'
import Scroll from 'components/Scroll'
import { CSSTransition } from 'react-transition-group' // 使用过渡动画
import { Container } from './style'
import AlbumDetail from 'views/AlbumDetail'
import { HEADER_HEIGHT } from '@/assets/config'
import global from '@/assets/global-style'

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

function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const [isMarquee, setIsMarquee] = useState(false) // 是否跑马灯

  const headerEl = useRef()

  // 返回
  const handleBack = () => {
    setShowStatus(false)
  }

  // 滚动时显示走马灯效果
  const handleScroll = (pos) => {
    const minScrollY = -HEADER_HEIGHT
    const percent = Math.abs(pos.y / minScrollY)
    const headerDOM = headerEl.current
    // 滑过顶部的高度后开始变化
    if (pos.y < minScrollY) {
      headerDOM.style.backgroundColor = global['theme-color']
      headerDOM.style.opacity = Math.min(1, (percent - 1) / 2)
      setTitle(currentAlbum.name)
      setIsMarquee(true)
    } else {
      headerDOM.style.backgroundColor = ""
      headerDOM.style.opacity = 1
      setTitle('歌单')
      setIsMarquee(false)
    }
  }

  // 上拉
  const handlePullUp = () => {

  }




  return (
    <CSSTransition
      in={showStatus}
      className="fly"
      timeout={300}
      apper={true}
      unmountOnExit
      onExited={props.history.goBack}>
      <Container>
        <BackHeader
          ref={headerEl}
          title={title}
          isMarquee={isMarquee}
          handleClick={handleBack} />
        <Scroll
          onScroll={handleScroll}
          pullUp={handlePullUp}
          pullUpLoading={false}
          bounceTop={false}>
          <AlbumDetail />
        </Scroll>
      </Container>
    </CSSTransition>
  )
}

export default Album
