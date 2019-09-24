import styled from 'styled-components'
import global from '@/assets/global-style.js'

// 顶部介绍
export const TopDesc = styled.div `
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 275px;
  padding: 0 20px 50px;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    z-index: -1;
    background-image: url(${props => props.background});
    background-position: 0 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .filter {
      position: absolute;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(7, 17, 27, 0.2);
    }
  }
  .img-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
    .decorate {
      position: absolute;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    .play-count {
      position: absolute;
      top: 2px; right: 2px;
      line-height: 16px;
      font-size: ${global['font-size-s']};
      color: ${global['font-color-light']};
      .play {
        vertical-align: top;
      }
    }
  }
  .desc-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 700;
      line-height: 1.5;
      font-size: ${global['font-size-l']};
      color: ${global['font-color-light']};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${global['font-size-m']};
        color: ${global['font-color-desc-v3']};
      }
    }
  }
`

// 菜单按钮
export const Menu = styled.ul `
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px;
  margin: -80px 0 0;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 20px;
    font-size: ${global['font-size-s']};
    color: ${global['font-color-light']};
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`

// 歌曲列表
export const SongListContainer = styled.div `
  border-radius: 10px;
  background: ${global['background-color-light']};
  opacity: 0.98;
  .first-line {
    position: relative;
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    border-bottom: 1px solid ${global['border-color']};
    .play-all {
      line-height: 24px;
      color: ${global['font-color-desc']};
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

export const SongList = styled.ul `
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
        color: ${global['font-color-desc']};
        ${global.noWrap()};
      }
      .singer {
        font-size: ${global['font-size-s']};
        color: ${global['font-color-desc-v2']};
        ${global.noWrap()};
      }
    }
  }
`