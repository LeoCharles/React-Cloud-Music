import styled from 'styled-components'
import global from '@/assets/global-style.js'

// 歌曲列表
export const ListContainer = styled.div `
  border-radius: 10px;
  background: ${props => props.showBackground ? global['background-color-light'] : ''};
  opacity: 0.98;
  .first-line {
    position: relative;
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    border-bottom: 1px solid ${global['border-color']};
    .play-all {
      display: flex;
      line-height: 24px;
      color: ${global['font-color-desc']};
      align-items: center;
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum {
        font-size: ${global['font-size-s']};
        color: ${global['font-color-desc-v2']};
      }
    }
    .add-list {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      display: flex;
      align-items: center;
      width: 130px;
      line-height: 34px;
      border-radius: 3px;
      font-size: 14px;
      background-color: ${global['theme-color']};
      color: ${global['font-color-light']};
      .iconfont {
        margin: 0 5px 0 10px;
        font-size: 10px;
        vertical-align: top;
      }
    }
  }
`

export const List = styled.ul `
  padding: 0 5px 10px;
  .item {
    display: flex;
    height: 60px;
    align-items: center;
    &:last-child{
      .info {
        border-bottom: none;
      }
    }
    .index {
      flex-basis: 60px;
      width: 60px;
      height: 100%;
      line-height: 60px;
      text-align: center;
    }
    .info {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      padding: 5px 0;
      border-bottom: 1px solid ${global['border-color']};
      overflow: hidden;
      .name {
        line-height: 24px;
        color: ${global['font-color-desc']};
        ${global.noWrap()};
      }
      .singer {
        line-height: 16px;
        font-size: ${global['font-size-s']};
        color: ${global['font-color-desc-v2']};
        ${global.noWrap()};
      }
    }
  }
`