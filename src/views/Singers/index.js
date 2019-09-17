import React, { useState } from 'react'
import HorizonList from 'components/HorizonList'
import { singerTypes, alphaTypes } from '@/assets/config'
import { NavContainer } from './style'

function Singers() {
  const [singerType, setSingerType] = useState('')
  const [alpha, setAlpha] = useState('')

  return (
    <div>
      <NavContainer>
        <HorizonList
          title="分类(默认热门):"
          list={singerTypes}
          current={singerType}
          onSelect={(item) => setSingerType(item)} />
        <HorizonList 
          title="首字母:"
          list={alphaTypes}
          current={alpha}
          onSelect={(item) => setAlpha(item)}/>
      </NavContainer>
    </div>
  )
}

export default  React.memo(Singers)