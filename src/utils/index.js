/**
 * 工具函数
 */

import { rankTypes } from '@/assets/config'

// 防抖函数
export const debounce = (fn, delay = 200) => {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 判断是否为空对象
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0

// 播放量格式化
export const getCount = (count) => {
  if (count < 0) return
  if (count < 10000 ) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}

// 处理榜单，返回第一个全球榜索引
export const filterIndex = (list) => {
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i].tracks.length && !list[i + 1].tracks.length) {
      return i + 1
    }
  }
}

// 根据榜单名称获取编号
export const filterRankIdx = (name) => {
  // eslint-disable-next-line no-unused-vars
  for (let key in rankTypes) {
    if (rankTypes[key] === name) return key
  }
  return null;
}

// 拼接歌手名字
export const getName = (list) => {
  let str = ''
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name
    return item
  })
  return str
}

// 使用 transform 属性判断浏览器厂商
const getVendor = () => {
  const elStyle = document.createElement('div').style
  const transformNames = {
    webkit: 'webkitTransform',
    moz: 'mozTransform',
    o: 'oTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (var key in transformNames) {
    if(elStyle[transformNames[key]] !== undefined ) {
      return key
    } 
  }
  return false
}

// 给样式加浏览器厂商前缀
export const prefixStyle = (style) => {
  const vendor = getVendor()
  if (!vendor) return false
  if (vendor === 'standard') return style
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}