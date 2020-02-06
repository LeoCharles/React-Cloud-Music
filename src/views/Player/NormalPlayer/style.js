import styled, { keyframes } from 'styled-components'
import global from '@/assets/global-style'

const rotate = keyframes `
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`

// 全屏播放器
export const NormalPlayerContainer = styled.div`
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: 150;
  background-color: ${global['background-color']};
  &.normal-enter, &.normal-exit-done {
    .top {
      transform: translateY(-100px);
    }
    .bottom {
      transform: translateY(100px);
    }
  }
  &.normal-enter-active, &.normal-exit-active {
    opacity: 1;
    transition: all 0.4s;
    .top, .bottom {
      transform: translateY(0);
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  &.normal-exit-active {
    opacity: 0;
  }
  /* 播放器背景 */
  .background {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    /* 背景加滤镜 */
    filter: blur(20px);
    z-index: -1;
    &.layer {
      background-color: rgba(0, 0, 0, 0.3);
      filter: none;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`
// 播放器顶部
export const Top = styled.div `
  position: relative;
  margin-bottom: 25px;
  .back {
    position: absolute;
    top: 0; left: 6px;
    .iconfont {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: ${global['font-color-desc']};
      font-weight: 700;
      transform: rotate(90deg);
    }
  }
  .title {
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    font-size: ${global['font-size-l']};
    color: ${global['font-color-desc']};
    text-align: center;
    ${global.noWrap()};
  }
  .subtitle {
    line-height: 20px;
    font-size: ${global['font-size-m']};
    color: ${global['font-color-desc-v3']};
    text-align: center;
    ${global.noWrap()};
  }
`

// 播放器中部
export const Middle = styled.div `
  position: fixed;
  top: 80px; bottom: 170px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: all 0.5s;
  }
  .fade-exit-active {
    opacity: 0;
    transition: all 0.5s;
  }
`

// CD
export const CDWrapper = styled.div `
  box-sizing: border-box;
  position: absolute;
  top: 40px; left: 0; right: 0;
  width: 80vw;
  height: 80vw;
  margin: auto;
  .cd {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    .img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0; top: 0;
      border-radius: 50%;
      border: 10px solid rgba(255, 255, 255, 0.1);
    }
    .play {
      animation: ${rotate} 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .lyric {
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    white-space: normal;
    color: #fff;
  }
`
// 歌词
export const LyricWrapper = styled.div `
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export const LyricList = styled.div `
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  .item {
    line-height: 32px;
    color: rgba(255, 255, 255, 0.5);
    word-spacing: normal;
    font-size: ${global['font-size-l']};
    &.active {
      color: #fff;
    }
    &.pure {
      position: relative;
      top: 30vh;
    }
  }
`

// 播放器底部
export const Bottom = styled.div `
  position: absolute;
  bottom: 50px;
  width: 100%;
  .operators {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .icon {
      font-weight: 300;
      color: ${global['font-color-desc']};
      &.disable {
        color: ${global['theme-color-shadow']};
      }
      i {
        font-size: 30px;
      }
      &.play {
        i {
          font-size: 40px;
        }
      }
    }
  }
`

// 进度条
export const ProgressWrapper  = styled.div `
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 10px 0;
  .progress-bar-wrapper {
    flex: 1;
  }
  .time {
    color: ${global['font-color-desc']};
    font-size: ${global['font-size-s']};
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;
    &.time-left {
      text-align: left;
    }
    &.time-r {
      text-align: right;
    }
  }
`