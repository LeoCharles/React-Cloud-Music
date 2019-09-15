import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from 'views/Home'
import Recommend from 'views/Recommend'
import Singers from 'views/Singers'
import Rank from 'views/Rank'

// 路由表
export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => (<Redirect to={'/recommend'} />)
      },
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/singers',
        component: Singers
      },
      {
        path: '/rank',
        component: Rank
      }
    ]
  }
]