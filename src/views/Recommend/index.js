import React from 'react'
import Slider from 'components/Silder'

const bannerList = [
  { imageUrl: 'http://p1.music.126.net/vV-ItuMoip0S9O5bTamcBw==/109951164365515656.jpg'},
  { imageUrl: 'http://p1.music.126.net/5LIKqhDXEDQ6zZ7NRIbMKA==/109951164364817784.jpg'},
  { imageUrl: 'http://p1.music.126.net/A4ka0KmZnCV3qHTiIbSYAw==/109951164365514164.jpg'},
  { imageUrl: 'http://p1.music.126.net/jhTr11XIiTpl8bRa8JPuNA==/109951164364818431.jpg'},
]

function Recommend() {
  return (
    <div>
      <Slider bannerList={bannerList}/>
    </div>
  )
}

export default  React.memo(Recommend)