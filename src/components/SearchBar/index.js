import React, {useState, useEffect, useMemo, useRef} from 'react'
import styled from 'styled-components'
import global from '@/assets/global-style'
import { debounce } from '@/utils'

const SearchBarWrapper = styled.div `
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 20px 0 6px;
  background: ${global['theme-color']};
  .icon-back {
    font-size: 24px;
    color: ${global['font-color-light']}
  }
  .icon-delete {
    font-size: 16px;
    color: ${global['font-color-light']}
  }
  .search-input {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    border: none;
    outline: none;
    border-bottom: 1px solid ${global['border-color']};
    font-size: ${global['font-size-m']};
    background: ${global['theme-color']};
    color: ${global['font-color-light']};
    &::placeholder{
      color: ${global['font-color-light']};
    }
  }
`
const SearchBar = (props) => {
  // 查询关键词
  const [keyword, setKeyword] = useState('')

  // 父组件传入的关键词
  const { query } = props
  const { back, search } = props

  // 输入框 DOM
  const inputRef = useRef()

  // 缓存搜索方法
  const handleSearchDebounce = useMemo(() => {
    // 搜索方法加防抖
    return debounce(search, 500)
  }, [search])

  // 输入框聚焦
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // 关键词变化时开始搜索
  useEffect(() => {
    handleSearchDebounce(keyword)
  // eslint-disable-next-line
  }, [keyword])

  // 父组件传入的搜索关键词
  useEffect(() => {
    if (query !== keyword) {
      setKeyword(query)
    }
  }, [keyword, query])

  // 监听输入框输入，更新搜索关键词
  const handleChange = (e) => {
    setKeyword(e.currentTarget.value)
  }

  // 清空搜索
  const clearSearch = () => {
    setKeyword('')
    inputRef.current.focus()
  }

  // 显示/隐藏清除按钮
  const displayStyle = keyword ? {dispaly: 'block'} : {display: 'none'}

  return (
    <SearchBarWrapper>
      <i className="iconfont icon-back" onClick={back}>&#xe655;</i>
      <input
        className="search-input"
        placeholder="搜索歌曲、歌手、专辑"
        ref={inputRef}
        onChange={handleChange}/>
      <i className="iconfont icon-delete" onClick={clearSearch} style={displayStyle}>&#xe600;</i>
    </SearchBarWrapper>
  )
}
export default React.memo(SearchBar)