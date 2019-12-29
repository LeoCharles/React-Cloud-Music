import React, {useState, useImperativeHandle, forwardRef} from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import global from '@/assets/global-style'

const ToastWrapper = styled.div `
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  .text {
    line-height: 50px;
    text-align: center;
    font-size: ${global['font-size-l']};
    color: ${ props => props.color ? props.color : '#fff'};
  }
  &.drop-enter {
    opacity: 0;
    transform: translateY(100%);
  }
  &.drop-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s;
  }
  &.drop-exit-active {
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s;
  }
`

const Toast = forwardRef((props, ref) => {

  const [show, setShow] = useState(false)
  const [timer, setTimer] = useState('')
  const { text } = props

  // 对外暴露方法
  useImperativeHandle(ref, () => ({
    show() {
      // 防抖
      if (timer) clearTimeout(timer)
      setShow(true)
      setTimer(setTimeout(() => {
        setShow(false)
      }, 2000))
    }
  }))

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="drop"
      unmountOnExit>
      <ToastWrapper>
        <div className="text">{text}</div>
      </ToastWrapper>
    </CSSTransition>
  )
})

export default  React.memo(Toast)