/**
 * 歌词解析
 * 原歌词格式：'[分钟:秒.毫秒] xxx' ，每句歌词结尾有换行符，时间与歌词之间有空格
 * 解析后歌词格式：[(time: 毫秒, txt: 'xxx')]
 */

 // 时间戳正则
 const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

 // 播放状态
 const STATE_PAUSE = 0    // 暂停
 const STATE_PLAYING = 1  // 播放

 // 空函数
 const noop = () => {}


export default class Lyric {

  /**
   * @param {string} lrc
   * @param {function} callback
   * @memberof Lyric
   */
  constructor(lrc, callback = noop) {
    this.lrc = lrc           // 原歌词
    this.lines = []          // 解析后的歌词数组，每一项包含毫秒数时间和对应的歌词
    this.callback = callback // 回调函数
    this.curLineIdx = 0      // 当前播放歌词所在行数
    this.startStamp = 0      // 歌曲开始的时间戳
    this.state = STATE_PAUSE // 播放状态

    // 初始化
    this._init()
  }


  // 初始化
  _init() {
    // 以换行符分割歌词字符串
    const lines = this.lrc.split('\n')
    const length = lines.length

    for (let i = 0; i < length; i++) {
      const line = lines[i]
      const res = timeExp.exec(line) // 获取匹配到的时间数组，第 0 项是匹配的文本，第 1 项是第一个分组，以此类推
      if (!res) continue

      const txt = line.replace(timeExp, '').trim() // 获取歌词文本
      if (txt) {
        // 如果毫秒是三维数就变成两位数
        if (res[3].length === 3) {
          res[3] = res[3] / 10
        }

        this.lines.push({
          // 将时间全部变成毫秒数
          time: res[1] * 60 * 1000 + res[2] * 1000 + (res[3] || 0) * 10,
          txt
        })

        // 按时间排序
        this.lines.sort((a, b) => a.time - b.time)
      }
    }
  }

  // 根据播放进度查询对应歌词行号
  _findCurLineIdx(time) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  // 根据行号将歌词传给回调函数
  _callback(idx) {
    if (idx < 0) return

    this.callback({
      idx,
      txt: this.lines[idx].txt
    })
  }

  // 每句歌词持续时间，isSeek 表示是否手动调整进度
  _playRest(isSeek=false) {
    // 当前行歌词
    const curLine = this.lines[this.curLineIdx]
    // 上一行歌词的开始毫秒数
    const preTime = this.lines[this.curLineIdx - 1] ? this.lines[this.curLineIdx - 1].time : 0
    // 当前行歌词持续时间
    let delay

    if (isSeek) {
      // 手动调整进度时（当前进度在两句歌词时间点之间），当前行还剩的持续时间
      delay = curLine.time - (+new Date() - this.startStamp)
    } else {
      // 当前行歌词和上一行歌词时间间隔，即为当前行歌词持续时间
      delay = curLine.time - preTime
    }

    // 当前行歌词持续时间后，获取下一行歌词
    this.timer = setTimeout(() => {
      // 返回下一行歌词
      this._callback(this.curLineIdx++)
      // 下一行持续时间
      if(this.curLineIdx < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest()
      }
    }, delay)
  }

  /**
   * 播放
   * @param {number} [offset=0]      已经播放的时间
   * @param {boolean} [isSeek=false] 是否手动调整进度
   */
  play(offset = 0, isSeek = false) {
    console.log(this.lines)
    if (!this.lines.length) return

    this.state = STATE_PLAYING // 设置播放状态
    this.curLineIdx = this._findCurLineIdx(offset) // 根据时间进度查询当前歌词行号

    // 将当前歌词传递给回调
    this._callback(this.curLineIdx - 1)
    // 根据时间进度获取开始播放时间戳
    this.startStamp = + new Date() - offset

    if (this.curLineIdx < this.lines.length) {
      clearTimeout(this.timer)
      // 继续播放歌词
      this._playRest(isSeek)
    }
  }

  // 暂停
  pause() {
    this.state = STATE_PAUSE
    clearTimeout(this.timer)
  }

  // 切换播放 / 暂停
  togglePlay(offset) {
    if (this.state === STATE_PLAYING) {
      this.pause()
    } else {
      this.state = STATE_PLAYING
      this.play(offset, true)
    }
  }

  // 手动调整进度
  seek(offset) {
    this.play(offset, true)
  }
}