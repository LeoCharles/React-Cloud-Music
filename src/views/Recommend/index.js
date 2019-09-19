import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import Slider from 'components/Silder'
import RecommendList from 'components/RecommendList'
import Scroll from 'components/Scroll'
import { forceCheck } from 'react-lazyload' // 检查是否进入可视区
import { Content } from './style'
import Loading from 'components/Loading'

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerListDispatch, getRecommendListDispatch } = props

  useEffect(() => {
    if (!bannerList.size) {
      getBannerListDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDispatch()
    }

    // eslint-disable-next-line
  }, [])

  // 将 immutable 数据结构转成 JS 数据结构
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Loading show={enterLoading}/>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}/>
          <RecommendList recommendList={recommendListJS}/>
        </div>
      </Scroll>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
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