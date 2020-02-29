/**
 * 全局样式
 */

// 居中
const center = () => {
  return `
  display: flex;
  justify-content: center;
  align-items: center;
  `
}

// 文字溢出显示省略号
const noWrap = () => {
  return `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `
}

// 扩大点击区域
const extendClick = () => {
  return `
    position: relative;
    &::before{
      content: '';
      position: absolute;
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px;
    }
  `
}

export default {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba(212, 68, 57, .5)',
  'background-color': '#f2f3f4',
  'background-color-light': '#fff',
  'background-color-shadow': 'rgba(0, 0, 0, 0.3)',
  "border-color": '#e4e4e4',
  "border-color-v2": 'rgba(228, 228, 228, 0.1)',
  'font-color-gray': '#808080',
  'font-color-light': '#f1f1f1',
  'font-color-desc': '#2E3030',
  'font-color-desc-v2': '#bba8a8',
  'font-color-desc-v3': '#ffffff99',
  'font-size-ss': '10px',
  'font-size-s': '12px',
  'font-size-m': '14px',
  'font-size-l': '16px',
  'font-size-ll': '18px',
  center,
  noWrap,
  extendClick,
}