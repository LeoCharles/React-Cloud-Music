import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Loading from 'components/Loading'
import LoadingV2 from 'components/LoadingV2'
import { ScrollContainer } from './style'
import BScroll from 'better-scroll'

// 使用 forwardRef 转发 ref，用于上层组件调用
const Scroll = forwardRef((props, ref) => {
  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props
  const { onScroll, pullUp, pullDown } = props

  // BScroll 实例对象
  const [bScroll, setBScroll] = useState(null)

  // 生成 ref 对象，其 current 属性指向 BScroll 实例所作用的 DOM 元素
  const scrollContainerRef = useRef(null)

  // 创建 BScroll 实例
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3, // 实时(包括滚动动画时)派发 scroll 事件
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    })
    // 更新 bScroll
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
    // eslint-disable-next-line
  }, [])

  // 绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [bScroll, onScroll])

  // 上拉到底回调
  useEffect(() => {
    if(!bScroll || !pullUp) return
    // 绑定 滚动结束 事件
    bScroll.on('scrollEnd', () => {
      // 判断是否滚动到底部
      if(bScroll.y <= bScroll.maxScrollY){
        pullUp()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [bScroll, pullUp])

  // 下拉到顶回调
  useEffect(() => {
    if(!bScroll || !pullDown) return
    // 手指离开时触发 touchEnd 事件
    bScroll.on('touchEnd', (postion) => {
      // 到顶后下拉超过 50px 触发回调
      if (postion.y > 50) {
        pullDown()
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [bScroll, pullDown])

  // 每次重新渲染时，刷新实例
  useEffect(() => {
    if(bScroll && refresh) {
      bScroll.refresh()
    }
  })

  // 对外暴露方法
  useImperativeHandle(ref, () => ({
    // 刷新并滚动到顶部
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    // 对外提供 BScroll 实例
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    }
  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      <Loading loading={pullDownLoading}/>
      <LoadingV2 loading={pullUpLoading}/>
    </ScrollContainer>
  )
})

// 默认参数
Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUp: null,
  pullDown: null,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
}

// Scroll 接受的参数
Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']), // 滚动方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滚动事件回调
  pullUp: PropTypes.func, // 上拉到底回调
  pullDown: PropTypes.func, // 下拉到顶回调
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸顶
}

export default Scroll