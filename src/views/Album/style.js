import styled from 'styled-components'
import global from '@/assets/global-style.js'

// 占满全屏
export const Container = styled.div `
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 100;
  background-color: ${global['background-color']};
  transform-origin: right bottom;
  &.fly-enter, &.fly-apper {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-apper-active {
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`