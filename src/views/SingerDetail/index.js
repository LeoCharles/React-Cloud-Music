import React, { useState, useEffect, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import { CSSTransition } from 'react-transition-group'
import BackHeader from 'components/BackHeader'
import Scroll from 'components/Scroll'
import Loading from 'components/Loading'
import SongList from 'views/SongList'
import { Container, ImgWrapper, CollectBtn, SongListWrapper, BgLayer } from './style'
import { HEADER_HEIGHT } from '@/assets/config'

function SingerDetail(props) {

  const { artist, songs, loading } = props
  const { getSingerDetailDispatch } = props

  // 将 immutable 数据结构 转换成 JS 数据结构
  const artistJS = artist ? artist.toJS() : {}
  const songList = songs ? songs.toJS() : []


  const [showStatus, setShowStatus] = useState(true)

  const initialHeight = useRef(0) // 图片初始高度
  const imageWrapperRef = useRef()
  const collectBtnRef = useRef()
  const songScrollWrapperRef = useRef()
  const songScrollRef = useRef()
  const bgLayerRef = useRef()

  const OFFSET = 5 // 向上偏移量，压住图片，露出歌曲列表圆角

  // 获取歌手详情
  useEffect(() => {
    const id = props.match.params.id
    getSingerDetailDispatch(id)
    // eslint-disable-next-line
  }, [])

  // 滚动动效
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

  // 滚动时动画效果
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
          title={artistJS.name}
          handleClick={handleBack}/>
        <ImgWrapper
          ref={imageWrapperRef}
          bgUrl={artistJS.picUrl}>
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
            <SongList songList={songList} showCollect={false}/>
          </Scroll>
        </SongListWrapper>
        <Loading show={loading}/>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  artist: state.getIn(['singerDetail', 'artist']),
  songs: state.getIn(['singerDetail', 'songsOfArtist']),
  loading: state.getIn(['singerDetail', 'loading'])
})

const mapDispatchToProps = (dispatch) => ({
  getSingerDetailDispatch(id) {
    dispatch(actionCreators.changeEnterLoading(true))
    dispatch(actionCreators.getSingerDetail(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SingerDetail))