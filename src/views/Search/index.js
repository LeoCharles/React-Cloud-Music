import React, {useState, useEffect, useCallback, useRef} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions'
import { getSongDetail } from 'views/Player/store/actions'
import { CSSTransition } from 'react-transition-group'
import LazyLoad, { forceCheck } from 'react-lazyload'
import SearchBar from '@/components/SearchBar'
import Scroll from '@/components/Scroll'
import Loading from '@/components/Loading'
import MusicNote from '@/components/MusicNote'
import { getName } from '@/utils'
import { Container, ShortcutWrapper, HotKeyWrapper, List, ListItem, SongList } from './style'

function Search(props) {

  const [show, setShow] = useState(false) // 控制显示隐藏
  const [query, setQuery] = useState('')  // 查询关键词

  const musicNoteRef = useRef()

  const {
    hotList,
    suggestList: immutableSuggestList,
    songsList: immutableSongsList,
    enterLoading,
    songCount
  } = props

  const suggestList = immutableSuggestList.toJS()
  const songsList = immutableSongsList.toJS()

  const {
    getHotKeyWordsDispatch,
    getSuggestListDispatch,
    changeEnterLoadingDispatch,
    getSongDetailDispatch
  } = props

  useEffect(() => {
    setShow(true)
    // 获取热门搜索关键词
    if (!hotList.size) {
      getHotKeyWordsDispatch()
    }
    // eslint-disable-next-line
  }, [])

  // 传递给子组件的方法，尽量用 useCallback 包裹，在依赖未改变时，始终给子组件传递的是相同的引用
  const handleBack = useCallback(() => {
      setShow(false)
    },[])

  // 更新查询关键词
  const handleSearch  = (query) => {
    // 更新查询关键词
    setQuery(query)
    if(!query) return
    changeEnterLoadingDispatch(true)
    getSuggestListDispatch(query)
  }

  // 选择歌曲
  const selectSong = (e, id) => {
    getSongDetailDispatch(id)
    // 调用 MusicNote 内部方法 startAnimation
    musicNoteRef.current.startAnimation({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY
    })
  }

  // 渲染关键词列表
  const renderHotKeywords = () => {
    const keywords = hotList ? hotList.toJS() : []
    return (
      <ul>
        {
          keywords.map(item => (
            <li className="keyword" key={item.first} onClick={() => setQuery(item.first)}>
              <span>{item.first}</span>
            </li>
          ))
        }
      </ul>
    )
  }

  // 渲染歌手列表
  const renderSingers = () => {
    const singers = suggestList.artists
    if(!singers || !singers.length) return
    return (
      <List>
        <h2 className="title"> 相关歌手 </h2>
        {
          singers.map(item => (
            <ListItem key={item.accountId} onClick={() => props.history.push(`/singers/${item.id}`)}>
              <div className="img-wrapper">
                <LazyLoad placeholder={<img height="100%" className="img" src={require('../../assets/img/singer.png')} alt="singer"/>}>
                  <img className="img" src={item.picUrl} alt="singer"/>
                </LazyLoad>
              </div>
              <div className="name"> 歌手：{item.name}</div>
            </ListItem>
          ))
        }
      </List>
    )
  }

  // 渲染歌单
  const renderAlbum = () => {
    const albums = suggestList.playlists
    if (!albums || !albums.length) return
    return (
      <List>
        <h2 className="title"> 相关歌单 </h2>
        {
          albums.map(item => (
            <ListItem key={item.id} onClick={() => props.history.push(`/album/${item.id}`)}>
              <div className="img-wrapper">
                <LazyLoad placeholder={<img height="100%" className="img" src={require('../../assets/img/music.png')} alt="music"/>}>
                  <img className="img" src={item.coverImgUrl} alt="music"/>
                </LazyLoad>
              </div>
              <div className="name"> 歌单：{item.name}</div>
            </ListItem>
          ))
        }
      </List>
    )
  }

  // 渲染歌曲列表
  const renderSongs = () => {
    if (!songsList.length) return
    return (
      <SongList>
        {
          songsList.map(item => (
            <li className="song" key={item.id} onClick={e => selectSong(e, item.id)}>
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="desc">{getName(item.artists)} - {item.album.name}</span>
              </div>
            </li>
          ))
        }
      </SongList>
    )
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      apper={true}
      classNames="fly"
      unmountOnExit
      onExit={() => props.history.goBack()}>
      <Container songCount={songCount}>
        <SearchBar back={handleBack} query={query} search={handleSearch}/>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKeyWrapper>
                <h2 className="title"> 热门搜索 </h2>
                { renderHotKeywords() }
              </HotKeyWrapper>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={query}>
          <Scroll onScorll={forceCheck}>
            <div>
              { renderSingers() }
              { renderAlbum() }
              { renderSongs() }
            </div>
          </Scroll>
        </ShortcutWrapper>
        <MusicNote ref={musicNoteRef}/>
        <Loading show={enterLoading}/>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  hotList: state.getIn(['search', 'hotList']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsList: state.getIn(['search', 'songsList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  songCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotKeyWordsDispatch() {
      dispatch(actionCreators.getHotKeyWords())
    },
    getSuggestListDispatch(data) {
      dispatch(actionCreators.getSuggestList(data))
    },
    changeEnterLoadingDispatch(data) {
      dispatch(actionCreators.changeEnterLoading(data))
    },
    getSongDetailDispatch(id) {
      dispatch(getSongDetail(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search))