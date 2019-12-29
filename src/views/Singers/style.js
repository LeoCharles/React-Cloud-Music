import styled from 'styled-components'
import global from '@/assets/global-style'

// 歌手分类导航
export const NavContainer = styled.div `
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`

// 歌手列表
export const SingerContainer = styled.div `
  position: fixed;
  top: 160px;
  left: 0;
  /* 判断是否有 mini 播放器 */
  bottom: ${ props => props.songCount > 0 ? '60px' : 0};
  width: 100%;
  overflow: hidden;
`

export const SingerList = styled.ul `
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: auto;
`

export const SingerItem = styled.li `
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 5px;
  padding: 5px 0;
  border-bottom: 1px solid ${global['border-color']};
  &:last-child{
    border-bottom: none;
  }
  .img-wrapper {
    margin-right: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 3px;
    }
  }
  .name {
    font-size: ${global['font-size-m']};
    color: ${global['font-color-desc']};
    font-weight: 500;
  }
`