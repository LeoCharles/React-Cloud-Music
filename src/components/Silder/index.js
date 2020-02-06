import React, { useState, useEffect  } from 'react'
import { withRouter } from 'react-router-dom'
import { SliderContainer } from './style'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

// 轮播图
function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    // 初始化轮播图
    if(bannerList.length && !sliderSwiper) {
      const sliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: { disableOnInteraction: false },
        pagination: { el: '.swiper-pagination'}
      })
      setSliderSwiper(sliderSwiper)
    }
  }, [bannerList.length, sliderSwiper])

  // 处理轮播图点击
  const handleSlidClick = (id) => {
    if (!id) return
  }

  return (
    <SliderContainer>
      <div className="mask"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map(slider => {
              return (
                <div
                  className="swiper-slide"
                  key={slider.imageUrl}
                  onClick={() => handleSlidClick(slider.targetId)}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐"/>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default withRouter(React.memo(Slider))