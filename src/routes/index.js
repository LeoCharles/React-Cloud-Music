import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from 'views/Home'
import Recommend from 'views/Recommend'
import Singers from 'views/Singers'
import Rank from 'views/Rank'
import Album from 'views/Album'

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
        component: Recommend,
        routes: [
          {
            patch: '/recommend/:id',
            component: Album
          }
        ]
      },
      {
        path: '/singers',
        component: Singers
      },
      {
        path: '/rank',
        component: Rank,
        key: 'rank',
        routes: [
          {
            path: '/rank/:id',
            component: Album
          }
        ]
      }
    ]
  }
]