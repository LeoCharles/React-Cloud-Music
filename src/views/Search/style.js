import styled from 'styled-components'
import global from '@/assets/global-style'

export const SearchWrapper = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: ${global['background-color']};
  /* 入场动画 */
  &.fly-enter, &.fly-apper {
    opacity: 0;
    transform: translateX(100%);
  }
  &.fly-enter-active, &.fly-apper-active {
    opacity: 1;
    transform: translateX(0);
    transition: all .3s;
  }
  &.fly-exit{
    opacity: 1;
    transform: translateX(0);
  }
  &.fly-exit-active {
    opacity: 0;
    transform: translateX(100%);
    transition: all .3s;
  }
`