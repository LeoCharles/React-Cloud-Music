import styled from 'styled-components'
import global from '@/assets/global-style.js'

// 顶部栏
export const Top = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: ${global['theme-color']};
  & > span {
    line-height: 40px;
    color: ${global['font-color-light']};
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`

// tab 栏
export const Tab = styled.ul `
  display: flex;
  justify-content: space-around;
  height: 40px;
  background-color: ${global['theme-color']};
  li {
    flex: 1;
    a {
      font-size: 14px;
      color: #e4e4e4;
      &.active {
        span {
          padding: 3px 0;
          font-weight: 700;
          color: ${global['font-color-light']};
          border-bottom: 2px solid #f1f1f1;
        }
      }
    }
  }
`

export const TabItem = styled.li `
  ${global['center']}
`