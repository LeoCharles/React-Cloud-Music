import styled, { keyframes } from 'styled-components'
import global from '@/assets/global-style'

// 旋转
const rotate = keyframes `
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const MiniPlayerContainer = styled.div`
  position: fixed;
  left: 0; bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  z-index: 999;
  background-color: ${global['background-color-light']};
  &.mini-enter {
    transform: translateY(100%);
  }
  &.mini-enter-active {
    transform: translateY(0);
    transition: all 0.4s;
  }
  &.mini-exit-active {
    transform: translateY(100%);
    transition: all 0.4s;
  }
  .mini-cd {
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      &.play {
        animation: ${rotate} 8s infinite linear;
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .text-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      font-size: ${global['font-size-m']};
      color: ${global['font-color-desc']};
      ${global.noWrap()};
    }
    .desc {
      font-size: ${global['font-size-s']};
      color: ${global['font-color-desc-v2']};
      ${global.noWrap()};
    }
  }
  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont, .icon-playlist {
      font-size: 30px;
      color: ${global['theme-color']};
    }
    .icon-mini {
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play {
        left: 9px;
      }
    }
  }
`