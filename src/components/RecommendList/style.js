import styled from 'styled-components'
import global from '@/assets/global-style'

export const ListWrapper = styled.div `
  max-width: 100%;
  .title {
    padding-left: 6px;
    line-height: 60px;
    font-size: 14px;
    font-weight: 700;
  }
`
export const List = styled.ul `
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

export const ListItem = styled.li `
  position: relative;
  width: 32%;
  .img-wrapper {
    position: relative;
    height: 0;
    padding-bottom: 100%;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, .4), hsla(0, 0%, 100%, 0));
      z-index: 1;
    }
    .play-count {
      position: absolute;
      top: 2px;
      right: 2px;
      line-height: 16px;
      font-size: ${global['font-size-s']};
      color:  ${global['font-color-light']};
      z-index: 1;
      .play {
        vertical-align: top;
      }
    }
  }
  .desc {
    height: 50px;
    line-height: 1.4;
    margin-top: 2px;
    text-align: left;
    font-size: ${global['font-size-s']};
    color: ${global['font-color-desc']};
    overflow: hidden;
  }
`