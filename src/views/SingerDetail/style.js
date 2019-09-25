import styled from 'styled-components'
import global from '@/assets/global-style'

export const Container = styled.div `
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background-color: ${global['background-color']};
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
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

export const ImgWrapper = styled.div `
  position: relative;
  width: 100%;
  height: 0%;
  padding-top: 75%;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  z-index: 50;
  transform-origin: top;
  .filter {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, 0.3);
  }
`

export const CollectBtn = styled.div `
  box-sizing: border-box;
  position: absolute;
  left: 0; right: 0;
  width: 120px;
  height: 40px;
  margin: auto;
  margin-top: -55px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  font-size: 0;
  background-color: ${global['theme-color']};
  color: ${global['font-color-light']};
  z-index: 50;
  .iconfont {
    margin-right: 10px;
    font-size: 12px;
  }
  .collect {
    font-size: 14px;
    letter-spacing: 5px;
  }
`

export const SongListWrapper = styled.div `
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  z-index: 50;
  >div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`

// 给歌曲列表提供白色背景
export const BgLayer = styled.div `
  position: absolute;
  top: 0; bottom: 0;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  z-index: 50;
`