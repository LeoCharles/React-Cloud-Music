import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container } from './style'

function SingerDetail(props) {
  const [showStatus, setShowStatus] = useState(true)

  return (
    <CSSTransition
      in={showStatus}
      classNames="fly"
      timeout={300}
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}>
      <Container>
        singer
      </Container>
    </CSSTransition>
  )
}

export default SingerDetail