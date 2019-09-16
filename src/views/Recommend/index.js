import React from 'react'
import Slider from 'components/Silder'
import RecommendList from 'components/RecommendList'
import Scroll from 'components/Scroll'
import { Content } from './style'

const bannerList = [
  { imageUrl: 'http://p1.music.126.net/vV-ItuMoip0S9O5bTamcBw==/109951164365515656.jpg'},
  { imageUrl: 'http://p1.music.126.net/5LIKqhDXEDQ6zZ7NRIbMKA==/109951164364817784.jpg'},
  { imageUrl: 'http://p1.music.126.net/A4ka0KmZnCV3qHTiIbSYAw==/109951164365514164.jpg'},
  { imageUrl: 'http://p1.music.126.net/jhTr11XIiTpl8bRa8JPuNA==/109951164364818431.jpg'},
]

const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
  return {
    id: item,
    picUrl: 'https://p2.music.126.net/CKY9WSM1-1SHMc8wRJyccQ==/109951164353129687.jpg?param=300x300',
    playCount: 1656193,
    name: '听歌思人 | 所幸还能与你共伫同一片月光下'
  }
})

function Recommend() {
  return (
    <Content>
      <Scroll>
        <div>
          <Slider bannerList={bannerList}/>
          <RecommendList recommendList={recommendList}/>
        </div>
      </Scroll>
    </Content>
  )
}

export default  React.memo(Recommend)