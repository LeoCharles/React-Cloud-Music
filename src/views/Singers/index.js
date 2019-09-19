import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import Scroll from 'components/Scroll'
import HorizonList from 'components/HorizonList'
import Loading from 'components/Loading'
import { categoryTypes, alphaTypes } from '@/assets/config'
import { NavContainer, SingerContainer, SingerList, SingerItem } from './style'

function Singers(props) {

  const { category, alpha, singerList, pageCount, enterLoading, pullUpLoading, pullDownLoading } = props

  const { getHotSingerDispatch, updateCategoryDispatch, updateAlphaDispatch, pullUpDispatch, pullDownDispatch } = props

  useEffect(() => {
    // 首次默认加载热门歌手
    if(!singerList.length && !category && !alpha) {
      getHotSingerDispatch()
    }
    // eslint-disable-next-line
  }, [])

  // 选择歌手分类
  const handeleSelectCategory = (value) => {
    if (category === value.key) return
    updateCategoryDispatch(value.key)
  }

  // 选择首字母
  const handeleSelectAlpha = (value) => {
    if (alpha === value.key) return
    updateAlphaDispatch(value.key)
  }

  // 上拉加载下一页
  const handlePullUp = () => {
    const isHot = !category && !alpha
    pullUpDispatch(isHot, pageCount + 1)
  }

  // 下拉刷新
  const handlePullDown = () => {
    const isHot = !category && !alpha
    pullDownDispatch(isHot)
  }

  // 渲染歌手列表
  const renderSingerList = () => {
    // 将 immutable 数据结构 转换成 JS 数据结构
    const singerListJS = singerList ? singerList.toJS() : []
    return (
      <SingerList>
        {
          singerListJS.map((item, index) => (
            <SingerItem key={`${item.accountId}${index}`}>
              <div className="img-wrapper">
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt={item.name} />
              </div>
              <span className="name">{item.name}</span>
            </SingerItem>
          ))
        }
      </SingerList>
    )
  }

  return (
    <div>
      <Loading show={enterLoading}/>
      <NavContainer>
        <HorizonList
          title="分类(默认热门):"
          list={categoryTypes}
          selected={category}
          onSelect={(item) => handeleSelectCategory(item)} />
        <HorizonList
          title="首字母:"
          list={alphaTypes}
          selected={alpha}
          onSelect={(item) => handeleSelectAlpha(item)}/>
      </NavContainer>
      <SingerContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}>
          { renderSingerList() }
        </Scroll>
      </SingerContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  category: state.getIn(['singers', 'category']),
  alpha: state.getIn(['singers', 'alpha']),
  singerList: state.getIn(['singers', 'singerList']),
  pageCount: state.getIn(['singers', 'pageCount']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
})

const mapDispatchToProps = (dispatch) => ({
  // 默认获取热门歌手
  getHotSingerDispatch() {
    dispatch(actionCreators.changeEnterLoading(true))
    dispatch(actionCreators.getHotSingerList())
  },
  // 更新歌手分类，重新获取歌手列表
  updateCategoryDispatch(newVal) {
    dispatch(actionCreators.changeCategory(newVal))   // 更新歌手分类
    dispatch(actionCreators.changePageCount(0))       // 分页归零
    dispatch(actionCreators.changeEnterLoading(true)) // 进场 loading
    dispatch(actionCreators.getSingerList())          // 获取数据
  },
  // 更新首字母分类，重新获取歌手列表
  updateAlphaDispatch(newVal) {
    dispatch(actionCreators.changeAlpha(newVal))      // 更新首字母分类
    dispatch(actionCreators.changePageCount(0))       // 分页归零
    dispatch(actionCreators.changeEnterLoading(true)) // 进场 loading
    dispatch(actionCreators.getSingerList())          // 获取数据
  },
  // 底部上拉加载更多
  pullUpDispatch(isHot, nextPage) {
    dispatch(actionCreators.changePullUpLoading(true)) // 加载更多 loading
    dispatch(actionCreators.changePageCount(nextPage)) // 加载下一页 
    if (isHot) {
      dispatch(actionCreators.getHotSingerList())
    } else {
      dispatch(actionCreators.getSingerList())
    }
  },
  // 顶部下拉刷新
  pullDownDispatch(isHot) {
    dispatch(actionCreators.changePullDownLoading(true)) // 刷新 loading
    dispatch(actionCreators.changePageCount(0))          // 刷新分页归零
    if (isHot) {
      dispatch(actionCreators.getHotSingerList())
    } else {
      dispatch(actionCreators.getSingerList())
    }
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))