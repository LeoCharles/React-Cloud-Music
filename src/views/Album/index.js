import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import BackHeader from 'components/BackHeader'
import Scroll from 'components/Scroll'
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
  // 歌单 id
  const id = props.match.params.id

  const { currentAlbum, enterLoading } = props
  const { getAlbumDetailDispatch } = props
  const currentAlbumJS = currentAlbum ? currentAlbum.toJS() : {}
  console.log(currentAlbumJS, enterLoading);
  // 获取歌单详情
  useEffect(() => {
    if (id) {
      getAlbumDetailDispatch(id)
    }

  }, [getAlbumDetailDispatch, id])

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
          {
            !isEmptyObject(currentAlbumJS) ?
            (<Scroll
              onScroll={handleScroll}
              pullUp={handlePullUp}
              pullUpLoading={false}
              bounceTop={false}>
              <AlbumDetail currentAlbum={currentAlbumJS}/>
            </Scroll>) : null
          }
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading'])
})

const mapDispatchToProps = (dispatch) => ({
  getAlbumDetailDispatch(id) {
    dispatch(actionCreators.changeEnterLoading(true))
    dispatch(actionCreators.getAlbumDetail(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))
