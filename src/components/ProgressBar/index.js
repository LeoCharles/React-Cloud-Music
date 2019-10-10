import React, { useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import global from '@/assets/global-style'
import { prefixStyle } from '@/utils'

const BarWrapper = styled.div `
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background-color: ${global['theme-color']};
    }
    .btn-wrapper {
      position: absolute;
      left: -8px; top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px; left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${global['border-color']};
        border-radius: 50%;
        background-color: ${global['theme-color']};
      }
    }
  }
`

function ProgressBar(props) {

  const [touch, setTouch] = useState({})

  const progressBarRef = useRef()
  const progressRef = useRef()
  const progressBtnRef = useRef()

  const progressBtnWidth = 16

  const { percent, percentChange } = props

  const transform = prefixStyle('transform')

  // 监听 percent
  useEffect(() => {
    if(percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBarRef.current.clientWidth - progressBtnWidth // 进度条总长
      const offsetWidth = percent * barWidth
      progressRef.current.style.width = `${offsetWidth}px`
      progressBtnRef.current.style[transform] = `translateX(${offsetWidth}px)`
    }
    // eslint-disable-next-line
  }, [percent])

  // 修改已完成进度条的长度和按钮的 X 轴坐标
  const _progressOffset = (offsetWidth) => {
    progressRef.current.style.width = `${offsetWidth}px`
    progressBtnRef.current.style.transform = `translateX(${offsetWidth}px)`
  }

  // 修改完成进度的百分比
  const _changePercent = () => {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth
    const currentPercent = progressRef.current.clientWidth / barWidth
    percentChange(currentPercent)
  }

  // 触摸进度条按钮
  const handleTouchStart = (e) => {
    const startTouch = {}
    startTouch.initiated = true // 是否开始滑动
    startTouch.startX = e.touches[0].pageX // 触摸点的横坐标
    startTouch.left = progressRef.current.clientWidth // 进度条宽度(初始为0)
    setTouch(startTouch)
  }

  // 滑动进度条按钮
  const handleTouchMove = (e) => {
    if(!touch.initiated) return
    const deltaX = e.touches[0].pageX - touch.startX  // 滑动的距离(向左滑动超出起始点为负数)
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth // 进度条总长(减去了按钮的宽度)
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth) // 确保偏移量在 0 到 进度条总长之间
    _progressOffset(offsetWidth) // 实时修改进度条长度和按钮位置
  }

  // 结束滑动
  const handleTouchEnd = (e) => {
    const endTouch = JSON.parse(JSON.stringify(touch))
    endTouch.initiated = false
    setTouch(endTouch)
    _changePercent()
  }

  // 点击滚动条
  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect() // 进度条的矩形盒子
    const offsetWidth = e.pageX - rect.left // 偏移量 = 点击位置横坐标 - 进度条起始点横坐标
    _progressOffset(offsetWidth)
    _changePercent()
  }

  return (
    <BarWrapper>
      <div className="bar-inner" ref={progressBarRef} onClick={handleProgressClick}>
        <div className="progress" ref={progressRef}></div>
        <div className="btn-wrapper" 
          ref={progressBtnRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <div className="progress-btn"></div>
        </div>
      </div>
    </BarWrapper>
  )
}

export default React.memo(ProgressBar)