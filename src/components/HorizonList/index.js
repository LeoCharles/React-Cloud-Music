import React, { useState, useEffect, useRef} from 'react'
import { PropTypes } from 'prop-types'
import Scroll from 'components/Scroll'
import { ListWrapper, ListItem } from './style'

function HorizonList(props) {
  const { list, current, title } = props
  const { onSelect } = props

  return (
    <Scroll direct="horizon">
      <ListWrapper>
        <span className="title">{title}</span>
        {
          list.map(item => (
            <ListItem 
              key={item.key}
              className={current === item.key ? 'item selected' : 'item'}
              onClick={() => onSelect(item)}>
              {item.txt}
            </ListItem>
          ))
        }
      </ListWrapper>
    </Scroll>
  )
}

HorizonList.defaultProps = {
  list: [],
  title: '',
  current: '',
  onSelect: null
}

HorizonList.propTypes = {
  list: PropTypes.array, // 列表数据
  title: PropTypes.string, // 列表左边的标题
  current: PropTypes.string, // 当前的 item 值
  onSelect: PropTypes.func, // 点击 item 的回调
}

export default React.memo(HorizonList)