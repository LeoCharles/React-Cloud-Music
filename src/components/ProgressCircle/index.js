import React from 'react'
import styled from 'styled-components'
import global from '@/assets/global-style'

const CircleWrapper = styled.div `
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: ${global['theme-color-shadow']}
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: ${global['theme-color']};
    }
  }
`

// 环形进度条
function ProgressCircle(props) {
  // 环形大小，进度百分比
  const { radius, percent } = props

  // 周长
  const dashArray = Math.PI * 100
  // 没有高亮的部分，高亮的部分就是进度
  const dashOffset = (1 - percent) * dashArray

  // stroke-dasharray 控制笔画的虚实
  // stroke-dashoffset 相对于绘制的起点偏移的量，正值(向右或者顺时针偏移)，负值(向左或者逆时针)

  return (
    <CircleWrapper>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
        <circle className="progress-bar" r="50" cx="50" cy="50" fill="transparent"
          strokeDasharray={dashArray} strokeDashoffset={dashOffset}/>
      </svg>
      {props.children}
    </CircleWrapper>
  )
}

export default React.memo(ProgressCircle)