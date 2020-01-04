import React, { useState, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions'
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style'
import { CSSTransition } from 'react-transition-group'
import Scroll from 'components/Scroll'
import { playMode } from '@/assets/config'
import { prefixStyle } from '@/utils'


function PlayList(props) {

  const [isShow, setIsShow] = useState(false)
  const playListRef = useRef()
  const listWrapperRef = useRef()

  const  { showPlayList } = props
  const { togglePlayListDispatch } = props

  // transform 添加浏览器前缀
  const transform = prefixStyle('transform')

  // 进场动画
  const enter = useCallback(() => {
    // 显示列表
    setIsShow(true)
    // 最开始隐藏在下面
    listWrapperRef.current.style[transform] = 'translate3d(0, 100%, 0)'
  }, [transform])

  // 进入中
  const entering = useCallback(() => {
    // 列表往上移动
    listWrapperRef.current.style['transition'] = 'all 0.3s'
    listWrapperRef.current.style[transform] = 'translate3d(0, 0, 0)'
  }, [transform])

  const exiting = useCallback(() => {
    // 列表往上移动
    listWrapperRef.current.style['transition'] = 'all 0.3s'
    listWrapperRef.current.style[transform] = 'translate3d(0, 100%, 0)'
  }, [transform])

  // 离场动画
  const exited = useCallback(() => {
    setIsShow(false)
    listWrapperRef.current.style[transform] = 'translate3d(0, 100%, 0)'
  }, [transform])

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={enter}
      onEntering={entering}
      onExiting={exiting}
      onExited={exited}>
      <PlayListWrapper
        ref={playListRef}
        style={isShow ? {display: 'block'} : {display: 'none'}}
        onClick={() => togglePlayListDispatch(false)}>
        <div className="list-wrapper" ref={listWrapperRef}>
          <ScrollWrapper>
            test
          </ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>

  )
}

const mapStateToProps = (state) => ({
  showPlayList: state.getIn(['player', 'showPlayList'])
})

const mapDispatchToProps = (dispatch) => ({
  togglePlayListDispatch(data) {
    dispatch(actionCreators.changeShowPlayList(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList))