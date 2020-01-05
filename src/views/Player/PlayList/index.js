import React, { useState, useRef, useCallback } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/actions'
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style'
import { CSSTransition } from 'react-transition-group'
import Scroll from 'components/Scroll'
import Confirm from 'components/Confirm'
import { playMode } from '@/assets/config'
import { prefixStyle, getName, findSongIndex, shuffle } from '@/utils'


function PlayList(props) {

  // 是否显示播放列表
  const [isShow, setIsShow] = useState(false)
  // 是否允许滑动事件生效
  const [canTouch, setCanTouch] = useState(true)
  // 是否开始滑动
  const [isTouch, setIsTouch] = useState(false)
  // touchStart 后记录 y 坐标
  const [statrY, setStartY] = useState(0)
  // 用户下滑的距离
  const [distance, setDistance] = useState(0)


  const playListRef = useRef()
  const listWrapperRef = useRef()
  const confirmRef = useRef()

  const  {
    showPlayList,
    mode,
    currentIndex,
    currentSong: immutableCurrentSong,
    playlist: immutablePlayList,
    sequenceList: immutableSequenceList,
  } = props

  const {
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changeModeDispatch,
    changePlayListDispatch,
    deleteSongDispatch,
    clearLsitDispatch
  } = props

  const currentSong = immutableCurrentSong.toJS()
  const playList = immutablePlayList.toJS()
  const sequenceList = immutableSequenceList.toJS()

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

  // 滑动开始
  const handleTouchStart = (e) => {
    if (!canTouch || isTouch) return
    setIsTouch(true)
    // 记录 y 坐标
    const pageY = e.nativeEvent.touches[0].pageY
    setStartY(pageY)
    // 播放列表取消过渡，实时跟随向下移动
    listWrapperRef.current.style['transition'] = ''
  }

  // 滑动中
  const handleTouchMove = (e) => {
    if (!canTouch || !isTouch) return
    const pageY = e.nativeEvent.touches[0].pageY
    const distance = pageY - statrY
    // 如果向上滑动则直接返回
    if (distance < 0) return
    // 向下滑动时才记录滑动距离
    setDistance(distance)
    // 播放列表一起向下滑动
    listWrapperRef.current.style[transform] = `translate3d(0, ${distance}px, 0)`
  }

  // 滑动结束
  const handleTouchEnd = (e) => {
    setIsTouch(false)
    // 设置下拉反弹 阈值为 150px
    if (distance > 150) {
      // 下拉滑动距离大于 150px 则关闭播放列表
      togglePlayListDispatch(false)
    } else {
      // 否则播放列表反弹回去
      listWrapperRef.current.style['transition'] = 'all 0.3s'
      listWrapperRef.current.style[transform] = 'translate3d(0, 0, 0)'
    }
    // 滑动距离重置为 0
    setDistance(0)
  }

  // 滚动时的回调
  const handleScroll = (pos) => {
    // 只有当列表内容滚动距离为 0 时，才能下滑关闭播放列表
    const state = pos.y === 0
    setCanTouch(state)
  }

  // 点击切换歌曲
  const handleChangeCurrenIndex = (e, index) => {
    e.stopPropagation()
    if (currentIndex === index) return
    changeCurrentIndexDispatch(index)
  }

  // 删除一首歌
  const handleDeleteSong = (e, song) => {
    e.stopPropagation()
    deleteSongDispatch(song)
  }

  // 删除列表
  const handleClearList = () => {
    // 显示确认删除弹框
    confirmRef.current.show()
  }

  // 确定删除
  const handleClearConfirm = () => {
    clearLsitDispatch()
  }

  // 切换播放模式
  const changeMode = (e) => {
    const newMode = (mode + 1) % 3
    if (newMode === 0) {
      // 顺序
      const index = findSongIndex(currentSong, sequenceList)
      changeCurrentIndexDispatch(index)
      changePlayListDispatch(sequenceList)
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequenceList)
    } else if (newMode === 2) {
      // 随机播放
      const newList = shuffle(sequenceList)
      const index = findSongIndex(currentSong, newList)
      changePlayListDispatch(newList)
      changeCurrentIndexDispatch(index)
    }
    // 切换播放模式
    changeModeDispatch(newMode)
  }

  // 获取歌曲播放图标
  const getCurrentIcon = (item) => {
    // 判断是否是当前歌曲
    const isCurrent = currentSong.id === item.id
    const content = isCurrent ? '&#xe6e3;' : ''

    return (
      <i className="iconfont play" dangerouslySetInnerHTML={{__html: content}}></i>
    )
  }

  // 获取播放模式
  const getPlayMode = () => {
    let content, text
    if (mode === playMode.sequence) {
      content = '&#xe625;'
      text = '顺序播放'
    } else if (mode === playMode.loop) {
      content = '&#xe653;'
      text = '单曲循环'
    } else {
      content = '&#xe61b;'
      text = '随机播放'
    }
    return (
      <div className="mode">
        <i className="iconfont" onClick={changeMode} dangerouslySetInnerHTML={{__html: content}}></i>
        <span className="text" onClick={changeMode}>{text}</span>
      </div>
    )
  }

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
        onClick={() => togglePlayListDispatch(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <div
          className="list-wrapper"
          ref={listWrapperRef}
          onClick={e => e.stopPropagation()}>
          <ListHeader>
            { getPlayMode() }
            <span className="iconfont clear" onClick={handleClearList}>&#xe63d;</span>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              onScroll={handleScroll}
              bounceTop={false}>
              <ListContent>
                {
                  playList.map((item, index) => (
                    <li
                      className="item"
                      key={item.id}
                      onClick={e => handleChangeCurrenIndex(e, index)}>
                      {getCurrentIcon(item)}
                      <span className="text">{item.name} - {getName(item.ar)}</span>
                      <span className="like"><i className="iconfont">&#xe601;</i></span>
                      <span className="delete" onClick={e => handleDeleteSong(e, item)}><i className="iconfont">&#xe63d;</i></span>
                    </li>
                  ))
                }
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm
          ref={confirmRef}
          text="是否全部删除吗?"
          confirm={handleClearConfirm}/>
      </PlayListWrapper>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  showPlayList: state.getIn(['player', 'showPlayList']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playlist: state.getIn(['player', 'playList']),
  sequenceList: state.getIn(['player', 'sequenceList']),
  mode: state.getIn(['player', 'mode']),
})

const mapDispatchToProps = (dispatch) => ({
  // 显示隐藏播放列表
  togglePlayListDispatch(data) {
    dispatch(actionCreators.changeShowPlayList(data))
  },
  // 切歌
  changeCurrentIndexDispatch(data) {
    dispatch(actionCreators.changeCurrentIndex(data))
  },
  // 切换播放模式
  changeModeDispatch(data) {
    dispatch(actionCreators.changePlayMode(data))
  },
  // 切换当前播放列表
  changePlayListDispatch(data) {
    dispatch(actionCreators.changePlayList(data))
  },
  // 删除歌曲
  deleteSongDispatch(data) {
    dispatch(actionCreators.deleteSong(data))
  },
  // 清除列表
  clearLsitDispatch() {
    // 清空播放列表
    dispatch(actionCreators.changePlayList([]))
    dispatch(actionCreators.changeSequenceList([]))
    // 初始化歌曲索引
    dispatch(actionCreators.changeCurrentIndex(-1))
    // 隐藏列表
    dispatch(actionCreators.changeShowPlayList(false))
    // 播放状态
    dispatch(actionCreators.changePlayingState(false))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList))