# React-Cloud-Music

## 技术栈

+ `React`全家桶: `React` + `React-router` + `Redux`
+ `react-router-config`: 通过配置路由表来生成 `React` 路由
+ `redux-thunk`: 处理异步逻辑的 `Redux` 中间件
+ `immutable`：用于持久性数据的库，可将 `Redux` 中的 JS 数据结构转换成 immutable 数据结构
+ `styled-components`: 一种 `css in js` 技术，将样式绑定到标签上，可以像 `React` 组件一样使用这些标签
+ `axios`: 用于请求接口数据
+ `better-scroll`: 用于滚动场景的插件
+ `react-lazyload`：用于图片懒加载的插件
+ `swiper`: 用于轮播图的插件
+ `react-transition-group`: 用于实现过渡动画
+ `create-keyframe-animation`: 用于实现关键帧动画
+ `react-app-rewired`：用于修改 create-react-app 配置(需要安装 customize-cra)

后端接口采用 NodeJS 版网易云音乐接口 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 项目运行

+ clone [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 项目，并启动服务(注意：要修改端口号)

+ clone 本项目，并进入项目文件夹

+ 下载模块并运行

```shell
npm install
npm run start
```
