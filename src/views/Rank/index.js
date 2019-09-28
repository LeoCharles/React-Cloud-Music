import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import Loading from 'components/Loading'
import Scroll from 'components/Scroll'
import { filterIndex } from '@/utils'
import { renderRoutes } from 'react-router-config'
import { Container, RankList, ListItem, SongList } from './style'

function Rank(props) {
  const { rankList, loading } = props
  const { getRankListDispatch } = props

  const rankListJS = rankList ? rankList.toJS() : []

  useEffect(() => {
    if (!rankListJS.lenght) {
      getRankListDispatch()
    }
    // eslint-disable-next-line
  }, [])

  // 进入榜单详情
  const enterDetail = (item) => {
    props.history.push(`/rank/${item.id}`)
  }

  // 渲染官方榜中的歌曲列表
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => (
            <li className="item" key={index}>{index + 1}. {item.first} - {item.second}</li>
          ))
        }
      </SongList>
    ) : null
  }

  // 渲染排行榜，判断是否为全球榜，采用不同的样式
  const renderRankList = (list, isGlobal) => (
    <RankList isGlobal={isGlobal}>
      {
        list.map(item => (
          <ListItem
            key={item.id}
            tracks={item.tracks}
            onClick={() => enterDetail(item)}>
            <div className="img-wrapper">
              <img src={item.coverImgUrl} alt={item.name}/>
              <div className="decorate"></div>
              <span className="update-frequency">{item.updateFrequency}</span>
            </div>
            { renderSongList(item.tracks)}
          </ListItem>
        ))
      }
    </RankList>
  )

  // 排行榜分为官方榜（有 tracks 数组）和全球榜（ tracks 数组为空）
  const globalStartIdx = filterIndex(rankListJS)
  const officialList = rankListJS.slice(0, globalStartIdx) // 官方榜
  const globalList = rankListJS.slice(globalStartIdx)      // 全球榜
  const displayStyle = loading ? {display: 'none'} : {display: 'block'}

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          { renderRankList(officialList) }
          <h1 className="global" style={displayStyle}>全球榜</h1>
          { renderRankList(globalList, true) }
          <Loading show={loading} />
        </div>
      </Scroll>
      { renderRoutes(props.route.routes) }
    </Container>
  )
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch) => ({
  getRankListDispatch(){
    dispatch(actionCreators.getRankList())
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))