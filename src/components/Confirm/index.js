import React, { useState, forwardRef, useImperativeHandle} from 'react'
import { CSSTransition } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'
import global from '@/assets/global-style'

const confirmFadeIn = keyframes `
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const confirmZoom = keyframes `
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`


const ConfirmWrapper = styled.div `
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: 1000;
  background: ${global['background-color-shadow']};
  &.confirm-fade-enter-active {
    animation: ${confirmFadeIn} 0.3s;
    .content {
      animation: ${confirmZoom} 0.3s;
    }
  }
  .confirm {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 100;
    .content {
      width: 270px;
      border-radius: 14px;
      background: ${global['background-color-light']};
      .text {
        line-height: 22px;
        padding: 20px 16px;
        text-align: center;
        font-size: ${global['font-size-l']};
        color: ${global['font-color-desc-v2']};
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: ${global['font-size-l']};
        .btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid ${global['border-color']};
          color: ${global['font-color-desc']};
          &.left {
            border-right: 1px solid ${global['border-color']};
          }
        }
      }
    }
  }
`

// 确认弹框
const Confirm = forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const {text, cancelBtnText, confirmBtnText} = props

  const { handleConfirm } = props

  // 对外暴露方法
  useImperativeHandle(ref, () => ({
    show() {
      setShow(true)
    }
  }))

  return (
    <CSSTransition classNames="confirm-fade" timeout={300} appear={true} in={show}>
      <ConfirmWrapper style={{display: 'block'}} onClick={e => e.stopPropagation()}>
        <div className="confirm">
          <div className="content">
            <p className="text">{text}</p>
            <div className="operate">
              <span className="btn left" onClick={() => setShow(false)}>{cancelBtnText ? cancelBtnText : '取消'}</span>
              <span className="btn" onClick={() => {handleConfirm(); setShow(false);}}>{confirmBtnText ? confirmBtnText : '确定'}</span>
            </div>
          </div>
        </div>
      </ConfirmWrapper>
    </CSSTransition>
  )
})

export default React.memo(Confirm)