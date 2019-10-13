import React, {useEffect, useImperativeHandle, useRef, forwardRef} from 'react'
import styled from 'styled-components'
import { prefixStyle } from '@/utils'
import global from '@/assets/global-style'

const Container = styled.div `
  .icon-wrapper {
    display: none;
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${global['theme-color']};
    font-size: 14px;
    transform: translate3d(0, 0, 0);
    transition: transform 1s cubic-bezier(0.62, -0.1, 0.86, 0.57);
    > .iconfont {
      transition: transform 1s;
    }
  }
`

const MusicNote = forwardRef((props, ref) => {

  const iconRef = useRef()
  const ICON_COUNT = 10
  const transform = prefixStyle('transform')

  // 原生 DOM 操作
  const createNode = (html) => {
    const template = `<div class="icon-wrapper">${html}</div>`
    const tempNode = document.createElement('div')
    tempNode.innerHTML = template
    return tempNode.firstChild
  }

  useEffect(() => {
    for(let i = 0; i < ICON_COUNT; i ++) {
      const node = createNode(`<div class="iconfont">&#xe642;</div>`)
      iconRef.current.appendChild(node)
    }
    // 类数组转换成数组
    const domArray = Array.from(iconRef.current.children)
    domArray.forEach(item => {
      item.running = false
      item.addEventListener('transitioned', function() {
        this.style['display'] = 'none'
        this.style[transform] = 'translate3d(0, 0, 0)'
        this.running = false
        const icon = this.querySelector('.iconfont')
        icon.style[transform] = 'translate3d(0, 0, 0)'
      }, false)
    })
    // eslint-disable-next-line
  }, [])

  // 开始动画
  const startAnimation = ({x, y}) => {
    for (let i = 0; i < ICON_COUNT; i++){
      const domArray = Array.from(iconRef.current.children)
      const item = domArray[i]
      // 选择一个空闲的元素开始动画
      if (item.running === false) {
        item.style.left = x + 'px'
        item.style.top = y + 'px'
        item.style.display = 'inline-block'
        // 放入定时器中 触发宏任务
        setTimeout(() => {
          item.running = true
          item.style[transform] = 'translate3d(0, 750px, 0)'
          const icon = item.querySelector('.iconfont')
          icon.style[transform] = 'translate3d(-50px, 0, 0)'
        }, 20)
        break;
      }
    }
  }

  // 向外界暴露方法
  useImperativeHandle(ref, () => ({
    startAnimation
  }))

  return (
    <Container ref={iconRef}></Container>
  )
})

export default React.memo(MusicNote)