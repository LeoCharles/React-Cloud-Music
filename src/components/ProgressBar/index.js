import React from 'react'
import styled from 'styled-components'
import global from '@/assets/global-style'
import { prefixStyle } from '@/utils'

const BarWrapper = styled.div `
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${global['theme-color']}
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
        border: 3px solid  ${global['border-color']};
        border-radius: 50%;
        background: ${global['theme-color']};
      }
    }
  }
`

function ProgressBar(props) {
  return (
    <BarWrapper>
      <div className="bar-inner">
        <div className="progress"></div>
        <div className="btn-wrapper">
          <div className="progress-btn"></div>
        </div>
      </div>
    </BarWrapper>
  )
}

export default React.memo(ProgressBar)