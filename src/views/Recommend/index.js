import React, { useEffect } from 'react'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import Slider from 'components/Silder'
import RecommendList from 'views/RecommendList'
import Scroll from 'components/Scroll'
import { forceCheck } from 'react-lazyload' // 检查是否进入可视区
import { Content } from './style'
import Loading from 'components/Loading'

function Recommend(props) {
  const { bannerList, recommendList, enterLoading, songCount } = props
  const { getBannerListDispatch, getRecommendListDispatch } = props

  useEffect(() => {
    // 判断是否有轮播图
    if (!bannerList.size) {
      getBannerListDispatch()
    }
    // 判断是否有推荐列表
    if (!recommendList.size) {
      getRecommendListDispatch()
    }

    // eslint-disable-next-line
  }, [])

  // 将 immutable 数据结构转成 JS 数据结构
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content songCount={songCount}>
      <Loading show={enterLoading}/>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}/>
          <RecommendList recommendList={recommendListJS}/>
        </div>
      </Scroll>
      { renderRoutes(props.route.routes) }
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading']),
  songCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch) => ({
  getBannerListDispatch() {
    dispatch(actionCreators.getBannerList())
  },
  getRecommendListDispatch() {
    dispatch(actionCreators.getRecommendList())
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))