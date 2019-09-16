import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import Slider from 'components/Silder'
import RecommendList from 'components/RecommendList'
import Scroll from 'components/Scroll'
import { Content } from './style'

function Recommend(props) {
  const { bannerList, recommendList } = props
  const { getBannerListDispatch, getRecommendListDispatch } = props

  useEffect(() => {
    getBannerListDispatch()
    getRecommendListDispatch()
    // eslint-disable-next-line
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll>
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
  recommendList: state.getIn(['recommend', 'recommendList'])
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