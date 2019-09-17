import React, { useState, useEffect, useRef} from 'react'
import { PropTypes } from 'prop-types'
import Scroll from 'components/Scroll'
import { ListWrapper, ListItem } from './style'

function HorizonList(props) {
  const [refresh, setRefresh] = useState(false)

  const horizonListRef = useRef(null)

  const { list, current, title } = props
  const { onSelect } = props

  // 计算水平列表总宽度
  useEffect(() => {
    let totalWidth = 0
    const horizonListDOM = horizonListRef.current
    const itemElems = horizonListDOM.querySelectorAll('span')

    Array.from(itemElems).forEach(ele => {
      totalWidth += ele.offsetWidth
    })

    horizonListDOM.style.width = `${totalWidth}px`
    setRefresh(true)
  }, [refresh])

  return (
    <Scroll direction="horizontal" refresh={refresh}>
      <div ref={horizonListRef}>
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
      </div>
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