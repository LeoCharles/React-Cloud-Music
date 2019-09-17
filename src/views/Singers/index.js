import React, { useState, useEffect, useRef } from 'react'
import Scroll from 'components/Scroll'
import HorizonList from 'components/HorizonList'
import { singerTypes, alphaTypes } from '@/assets/config'
import { NavContainer, SingerContainer, SingerList, SingerItem } from './style'

const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map(item => {
  return {
    picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  }
})

// 渲染歌手列表
const renderSingerList = () => (
  <SingerList>
    {
      singerList.map((item, index) => (
        <SingerItem key={item.accountId + index}>
          <div className="img-wrapper">
            <img src={item.picUrl + '?param=300x300'} width="100%" height="100%" alt={item.name} />
          </div>
          <span className="name">{item.name}</span>
        </SingerItem>
      ))
    }
  </SingerList>
)

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
          onSelect={(item) => setSingerType(item.key)} />
        <HorizonList
          title="首字母:"
          list={alphaTypes}
          current={alpha}
          onSelect={(item) => setAlpha(item.key)}/>
      </NavContainer>
      <SingerContainer>
        <Scroll>
          { renderSingerList() }
        </Scroll>
      </SingerContainer>
    </div>
  )
}

export default  React.memo(Singers)