import React from 'react'
import styled, { keyframes } from 'styled-components'
import global from '@/assets/global-style.js'

const transform = keyframes `
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`

const LoadingWrapper = styled.div `
  .circle {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    width: 60px;
    height: 60px;
    margin: auto;
    border-radius: 50%;
    opacity: 0.6;
    background-color: ${global['theme-color']};
    animation: ${transform} 1.6s infinite ease-in;
    &:nth-child(2) {
      animation-delay: -0.8s;
    }
  }
`

function Loading() {
  return (
    <LoadingWrapper>
      <div className="circle"></div>
      <div className="circle"></div>
    </LoadingWrapper>
  )
}

export default React.memo(Loading)