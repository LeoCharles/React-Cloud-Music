import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import global from '@/assets/global-style.js'

const dance = keyframes `
  0%, 40%, 100% {
    transform: scaleY(0.4);
    transform-origin: center 100%;
  }
  20% {
    transform: scaleY(1)
  }
`

const LoadingWrapper = styled.div `
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  height: 14px;
  width: 100%;
  margin: auto;
  text-align: center;
  z-index: 99;
  font-size: 10px;
  .txt {
    margin-left: 2px;
    color: ${global['theme-color']};
  }
  .bar {
    display: inline-block;
    width: 1px;
    height: 100%;
    background-color: ${global['theme-color']};
    margin-right: 2px;
    animation: ${dance} 1s infinite;
    &:nth-child(2) {
      animation-delay: -0.4s;
    }
    &:nth-child(3) {
      animation-delay: -0.6s;
    }
    &:nth-child(4) {
      animation-delay: -0.5s;
    }
    &:nth-child(5) {
      animation-delay: -0.2s;
    }
  }
`

function LoadingV2(props) {
  const { show } = props
  return (
    <LoadingWrapper  style={show ? {display: 'block'} : {display: 'none'}}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="txt">拼命加载中...</span>
    </LoadingWrapper>
  )
}

LoadingV2.defaultProps = {
  show: false
}

LoadingV2.propTypes = {
  show: PropTypes.bool
}

export default React.memo(LoadingV2)