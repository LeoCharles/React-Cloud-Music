import styled from 'styled-components'
import global from '@/assets/global-style'


// 播放列表弹出层
export const PlayListWrapper = styled.div `
  position: fixed;
  left: 0; right:0; top: 0; bottom: 0;
  background-color: ${global['background-color-shadow']};
  z-index: 1000;
  &.list-fade-enter {
    opacity: 0;
  }
  &.list-fade-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.list-fade-exit {
    opacity: 1;
  }
  &.list-fade-exit-active {
    opacity: 0;
    transition: all 0.3s;
  }
  /* 列表容器 */
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: ${global['background-color-light']};
    transform: translate3d(0, 0, 0);
  }
`

// 滚动元素包裹容器
export const ScrollWrapper = styled.div `
  height: 400px;
  overflow: hidden;
`

// 列表头部
export const ListHeader = styled.div `
  position: relative;
  padding: 20px 30px 10px 20px;
`

// 播放列表
export const ListContent = styled.ul `
  .item {

  }
`