import React from 'react'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import { Top, Tab, TabItem } from './style'
import Player from 'views/Player'

function Home(props) {
  const { route } = props
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">云音悦</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <TabItem>
          <NavLink to="/recommend" activeClassName="active"><span>推荐</span></NavLink>
        </TabItem>
        <TabItem>
          <NavLink to="/singers" activeClassName="active"><span>歌手</span></NavLink>
        </TabItem>
        <TabItem>
          <NavLink to="/rank" activeClassName="active"><span>排行榜</span></NavLink>
        </TabItem>
      </Tab>
      {renderRoutes(route.routes)}
      <Player />
    </div>
  )
}

export default React.memo(Home)