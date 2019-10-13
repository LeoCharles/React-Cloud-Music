import styled from 'styled-components'

// Scroll 组件的容器，需要固定高度
export const Content = styled.div `
  position: fixed;
  top: 95px;
  bottom: ${ props => props.songCount > 0 ? '60px' : 0};
  width: 100%;
`