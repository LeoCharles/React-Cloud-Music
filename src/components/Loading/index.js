import React from 'react'
import PropTypes from 'prop-types'
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
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  margin: auto;
  z-index: 99;
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

function Loading(props) {
  const { loading } = props
  console.log(loading)
  return (
    <LoadingWrapper  style={loading ? {display: 'block'} : {display: 'none'}}>
      <div className="circle"></div>
      <div className="circle"></div>
    </LoadingWrapper>
  )
}

Loading.defaultProps = {
  loaidng: false
}

Loading.propTypes = {
  loaidng: PropTypes.bool
}

export default React.memo(Loading)