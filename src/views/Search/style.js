import styled from 'styled-components'
import global from '@/assets/global-style'

export const Container = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* 判断是否有 mini 播放器 */
  bottom: ${ props => props.songCount > 0 ? '60px' : 0};
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

// 搜索结果展示容器，默认显示热门关键词
export const ShortcutWrapper = styled.div `
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
`

// 热门关键词
export const HotKeyWrapper = styled.div `
  padding: 35px 20px;
  .title {
    margin-bottom: 20px;
    line-height: 20px;
    font-size: ${global['font-size-m']};
    color: ${global['font-color-desc-v2']};
  }
  .keyword {
    display: inline-block;
    padding: 5px 10px;
    margin: 0  20px 10px 0;
    border-radius: 6px;
    background: ${global['background-color-light']};
    font-size: ${global['font-size-m']};
    color: ${global['font-color-desc']};
  }
`
// 歌手 / 歌单 列表
export const List = styled.div `
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin: 10px 0 10px 10px;
    line-height: 20px;
    font-size: ${global['font-size-s']};
    color: ${global['font-color-desc']};
  }
`
export const ListItem = styled.div `
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 5px;
  padding: 5px 0;
  border-bottom: 1px solid ${global['border-color']};
  .img-wrapper {
    margin-right: 20px;
    .img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }
  }
  .name {
    line-height: 20px;
    font-size: ${global['font-size-m']};
    color: ${global['font-color-desc']};
    ${global.noWrap()};
    font-weight: 500;
  }
`

// 歌曲列表
export const SongList = styled.ul `
  margin: 0 5px 0 20px;
  .song {
    display: flex;
    align-items: center;
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 60px;
      padding: 5px 0;
      border-bottom: 1px solid ${global['border-color']};
      .name {
        line-height: 20px;
        font-size: ${global['font-size-m']};
        color: ${global['font-color-desc']};
      }
      .desc {
        line-height: 18px;
        font-size: ${global['font-size-s']};
        color: ${global['font-color-desc-v2']};
      }
    }
  }
`