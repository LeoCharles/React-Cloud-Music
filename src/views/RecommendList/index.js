import React from 'react'
import { withRouter } from 'react-router-dom'
import LazyLoad from 'react-lazyload' // 懒加载
import { ListWrapper, List, ListItem } from './style'
import { getCount } from '@/utils'

function RecommendList(props) {
  const { recommendList } = props

  // 进入歌单详情
  const enterDetail = (id) => {
    if (!id) return
    props.history.push(`/recommend/${id}`)
  }

  return (
    <ListWrapper>
      <h1
        className="title"
        style={ recommendList.length ? {display: 'block'} : {display: 'none'}}>推荐歌单</h1>
      <List>
        {
          recommendList.map(item => {
            return (
              <ListItem
                key={item.id}
                onClick={() => enterDetail(item.id)}>
                <div className="img-wrapper">
                  <div className="decorate"></div>
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('../../assets/img/music.png')} alt="music"/>}>
                    <img src={item.picUrl + '?param=300x300'} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                  <div className="play-count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default withRouter(React.memo(RecommendList))