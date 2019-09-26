import React, {useState, useEffect} from 'react'
import { ListContainer, List} from './style'
import { getName, getCount } from '@/utils'
import { PAGE_COUNT } from '@/assets/config'

const SongList = React.forwardRef((props, refs) => {

  const [pageIndex, setPageIndex] = useState(0)

  const { collectCount, showCollect, songList } = props

  const totalCount = songList.length

  const selectItem = (item, index) => {

  }

  // 渲染歌曲列表
  const renderList = (list) => {
    return list.map((item, index) => (
      <li
        className="item"
        key={index}
        onClick={(item) => selectItem(item, index)}>
        <span className="index">{index + 1}</span>
        <div className="info">
          <span className="name">{item.name}</span>
          <span className="singer">
            {item.ar ? getName(item.ar) : getName(item.artists)} - {item.al ? item.al.name : item.album.name}
          </span>
        </div>
      </li>
    ))
  }

  // 渲染收藏按钮
  const renderCollect = (count) => (
    <div className="add-list">
      <i className="iconfont">&#xe62d;</i>
      <span>收藏({getCount(count)})</span>
    </div>
  )

  return (
    <ListContainer
      ref={refs}
      showBackground={props.showBackground}>
      <div className="first-line">
        <div className="play-all">
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部<span className="sum"> (共{totalCount}首) </span></span>
        </div>
        { showCollect ? renderCollect(collectCount) : null}
      </div>
      <List>
        { renderList(songList)}
      </List>
    </ListContainer>
  )
})

export default React.memo(SongList)