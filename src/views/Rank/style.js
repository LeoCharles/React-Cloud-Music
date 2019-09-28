import styled from 'styled-components'
import global from '@/assets/global-style'

// Scroll 的容器要确定高度
export const Container = styled.div `
  position: fixed;
  top: 95px;
  bottom: 0;
  width: 100%;
  .offical, .global {
    margin-top: 10px;
    padding: 10px 5px;
    font-weight: 700;
    font-size: ${global['font-size-m']};
    color: ${global['font-color-desc']}
  }
`

// 如果是全球榜用 flex 布局
export const RankList = styled.ul`
  display: ${props => props.isGlobal ? 'flex' : ''};
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 5px;
  padding: 0 5px;
  background-color: ${global['background-color']};
`
// 如果是官方榜，显示歌曲列表
export const ListItem = styled.li `
  display: ${props => props.tracks.length ? 'flex' : ''};
  padding: 3px 0;
  border-bottom: 1px solid ${global['border-color']};
  .img-wrapper {
    position: relative;
    width: ${props => props.tracks.length ? '27vw' : '32vw'};
    height: ${props => props.tracks.length ? '27vw' : '32vw'};
    border-radius: 3px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,43%,.4));
    }
    .update-frequency {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${global['font-size-ss']};
      color: ${global['font-color-light']};
    }
  }
`

export const SongList = styled.ul `
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  .item {
    font-size: ${global['font-size-s']};
    color: ${global['font-color-gray']};
  }
`