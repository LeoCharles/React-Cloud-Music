import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { GlobalStyle } from './style'
import { IconStyle } from '@/assets/icon/iconfont/iconfont'
import { BrowserRouter } from 'react-router-dom'
import routes from './routes' // 路由表
import { renderRoutes } from 'react-router-config'// 将路由表渲染为 Route 标签

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );
}

export default App
