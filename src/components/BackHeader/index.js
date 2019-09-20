import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import global from '@/assets/global-style'

const HeaderContainer = styled.div `
  display: flex;
  position: fixed;
  width: 100%;
  height: 40px;
  padding: 0 0 5px 10px;
  line-height: 40px;
  z-index: 100;
  color: ${global['font-color-light']};
  .back {
    margin-right: 5px;
    width: 20px;
    font-size: 20px;
  }
  .title {
    font-size: ${global['font-size-l']};
    font-weight: 700;
  }
`

// 使用 forwardRef 传入 ref
const BackHeader = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props

  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      {
        isMarquee ? <marquee><h1 className="title">{title}</h1></marquee> : <h1 className="title">{title}</h1>
      }

    </HeaderContainer>
  )
})

BackHeader.defaultProps = {
  handleClick: () => {},
  title: '标题',
  isMarquee: false
}

BackHeader.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
}

export default React.memo(BackHeader)