import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import BackHeader from 'components/BackHeader'
import Scroll from 'components/Scroll'
import SongList from 'views/SongList'
import { Container, ImgWrapper, CollectBtn, SongListWrapper, BgLayer } from './style'
import { HEADER_HEIGHT } from '@/assets/config'

const artist = {
  picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
  name: "薛之谦",
  hotSongs: [
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },{
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },{
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },{
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },{
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },{
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },{
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
  ]
}

function SingerDetail(props) {
  const [showStatus, setShowStatus] = useState(true)
  
  const initialHeight = useRef(0) // 图片初始高度
  const imageWrapperRef = useRef()
  const collectBtnRef = useRef()
  const songScrollWrapperRef = useRef()
  const songScrollRef = useRef()
  const bgLayerRef = useRef()

  const OFFSET = 5 // 向上偏移量，压住图片，露出歌曲列表圆角

  useEffect(() => {
    const h = imageWrapperRef.current.offsetHeight
    initialHeight.current = h
    // 歌曲列表和遮罩定位到顶部图片下方
    songScrollWrapperRef.current.style.top = `${h - OFFSET}px`
    bgLayerRef.current.style.top = `${h - OFFSET}px`
    // 刷新滚动组件
    songScrollRef.current.refresh()
    // eslint-disable-next-line
  }, [])

  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const handleScroll = useCallback((pos) => {
    const newY = pos.y                     // 当前位置的 Y 坐标
    const height = initialHeight.current   // 图片高度
    const btnDOM = collectBtnRef.current
    const imageDOM = imageWrapperRef.current
    const layerDOM = bgLayerRef.current

    // 顶图图片高度减去偏移量、减去 BackHeader高度后的坐标
    const minScrollY = -height + OFFSET + HEADER_HEIGHT
    // 滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height)

    // 说明：歌曲列表没有背景，BgLayer 提供白色背景，在列表滚动中，背景也要跟着移动
    if(newY > 0) {
      // 向下滚动时
      imageDOM.style.transform = `scale(${1 + percent})` // 图片放大
      btnDOM.style.transform = `translateY(${newY}px)`   // 按钮跟随移动
      layerDOM.style.top = `${height - OFFSET + newY}px` // 背景层跟随移动
    } else if (newY >= minScrollY) {
      // 向上滚动，但还没超过返回条时
      layerDOM.style.top = `${height - OFFSET + newY}px` // 背景层跟随移动
      btnDOM.style.transform = `translateY(${newY}px)`   // 按钮跟随移动
      btnDOM.style.opacity = `${1 - (percent * 1.5)}`    // 按钮变透明
      imageDOM.style.paddingTop = '75%'
      imageDOM.style.height = 0
      imageDOM.style.zIndex = 50
    } else {
      // 向上滚动，超过返回条时
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px` // 背景层定位到返回条下面
      imageDOM.style.height = `${HEADER_HEIGHT}px`       // 背景图和返回条同高
      imageDOM.style.paddingTop = 0
      imageDOM.style.zIndex = 51
    }
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      classNames="fly"
      timeout={300}
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}>
      <Container>
        <BackHeader
          title={artist.name}
          handleClick={handleBack}/>
        <ImgWrapper
          ref={imageWrapperRef}
          bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectBtn ref={collectBtnRef}>
          <i className="iconfont">&#xe62d;</i><span className="collect">收藏</span>
        </CollectBtn>
        <BgLayer ref={bgLayerRef}></BgLayer>
        <SongListWrapper ref={songScrollWrapperRef}>
          <Scroll 
            ref={songScrollRef}
            onScroll={handleScroll}>
            <SongList songList={artist.hotSongs} showCollect={false}/>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default SingerDetail