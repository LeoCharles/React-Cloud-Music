import React, { lazy, Suspense} from 'react'
import { Redirect } from 'react-router-dom'
import Home from 'views/Home'

// 懒加载组件
const Recommend = lazy(() => import('views/Recommend'))
const Singers = lazy(() => import('views/Singers'))
const SingerDetail = lazy(() => import('views/SingerDetail'))
const Rank = lazy(() => import('views/Rank'))
const Album = lazy(() => import('views/Album'))
const Search = lazy(() => import('views/Search'))

// Suspense 让组件在渲染之前进行等待，并在等待时显示 fallback 的内容
const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

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
        component: SuspenseComponent(Recommend),
        routes: [
          {
            path: '/recommend/:id',
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: '/singers',
        component: SuspenseComponent(Singers),
        routes: [
          {
            path: '/singers/:id',
            component: SuspenseComponent(SingerDetail)
          }
        ]
      },
      {
        path: '/rank',
        component: SuspenseComponent(Rank),
        key: 'rank',
        routes: [
          {
            path: '/rank/:id',
            component: SuspenseComponent(Album)
          }
        ]
      },
      {
        path: '/album/:id',
        component: SuspenseComponent(Album),
        exact: true,
        key: 'album'
      },
      {
        path: '/search',
        component: SuspenseComponent(Search),
        exact: true,
        key: 'search'
      }
    ]
  }
]