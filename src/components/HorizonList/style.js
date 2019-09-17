import styled from 'styled-components'
import global from '@/assets/global-style'

export const ListWrapper = styled.div `
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  .title {
    flex: 0 0 auto;
    display: inline-block;
    padding: 5px 0;
    margin-right: 5px;
    font-size:  ${global['font-size-m']};
    color: #808080;
    vertical-align: middle;
  }
`

export const ListItem = styled.span `
  flex: 0 0 auto;
  display: inline-block;
  font-size: ${global['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${global['theme-color']};
    border: 1px solid ${global['theme-color']};
    opacity: 0.8;
  }
`