import React, { useState, useEffect, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import BackHeader from 'components/BackHeader'
import Scroll from 'components/Scroll'
import Loading from 'components/Loading'
import MusicNote from 'components/MusicNote'
import { CSSTransition } from 'react-transition-group' // 使用过渡动画
import { Container } from './style'
import AlbumDetail from 'views/AlbumDetail'
import { HEADER_HEIGHT } from '@/assets/config'
import global from '@/assets/global-style'
import { isEmptyObject } from '@/utils'

function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const [isMarquee, setIsMarquee] = useState(false) // 是否跑马灯

  const headerEl = useRef()
  const musicNoteRef = useRef()

  const id = props.match.params.id  // 歌单 id
  const { currentAlbum, enterLoading, pullUpLoading, songCount } = props
  const { getAlbumDetailDispatch } = props

  // 将 immutable 数据转换成 js 数据
  const currentAlbumJS = currentAlbum ? currentAlbum.toJS() : {}

  // 获取歌单详情
  useEffect(() => {
    if (id) {
      getAlbumDetailDispatch(id)
    }

  }, [getAlbumDetailDispatch, id])

  // 滚动时显示走马灯效果，传给子组件的回调用 useCallback 包裹，优化性能
  const handleScroll = useCallback((pos) => {
    const minScrollY = -HEADER_HEIGHT
    const percent = Math.abs(pos.y / minScrollY)
    const headerDOM = headerEl.current
    // 滑过顶部的高度后开始变化
    if (pos.y < minScrollY) {
      headerDOM.style.backgroundColor = global['theme-color']
      headerDOM.style.opacity = Math.min(1, (percent - 1) / 2)
      // 修改标题并开启走马灯
      setTitle(currentAlbumJS && currentAlbumJS.name)
      setIsMarquee(true)
    } else {
      headerDOM.style.backgroundColor = ""
      headerDOM.style.opacity = 1
      setTitle('歌单')
      setIsMarquee(false)
    }
  }, [currentAlbumJS])

  // 上拉
  const handlePullUp = useCallback(() => {

  }, [])

  // 返回
  const handleBack = useCallback(() => {
    setShowStatus(false)
  }, [])

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({x, y})
  }

  // 注意: CSSTransition 组件的类名要加 s
  return (
    <CSSTransition
      in={showStatus}
      classNames="fly"
      timeout={300}
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}>
      <Container songCount={songCount}>
        <BackHeader
          ref={headerEl}
          title={title}
          isMarquee={isMarquee}
          handleClick={handleBack} />
          {
            !isEmptyObject(currentAlbumJS) ?
            (<Scroll
              onScroll={handleScroll}
              pullUp={handlePullUp}
              pullUpLoading={false}
              bounceTop={false}>
              <AlbumDetail 
                currentAlbum={currentAlbumJS}
                musicAnimation={musicAnimation}/>
            </Scroll>) : null
          }
          <Loading show={enterLoading} />
          <MusicNote ref={musicNoteRef}/>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
  pullUpLoading: state.getIn(['album', 'pullUpLoading']),
  songCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch) => ({
  getAlbumDetailDispatch(id) {
    dispatch(actionCreators.changeEnterLoading(true))
    dispatch(actionCreators.getAlbumDetail(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
