// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pausegSrc: './images/player2.png',
    playSrc: './images/player1.png'
  },
  attached(event){
    this._recoverStatus();
  },
  detached:function(event){
    //mMgr.stop();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(event){
      //切换图片
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause();
      }
      
    },

    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({
          playing:false
        })
        return;
      }
      if(mMgr.src == this.properties.src){
        this.setData({
          playing:true
        })
      }
    },

    _monitorSwitch:function(){
      mMgr.onPlay( () => {
        this._recoverStatus();
      })

      mMgr.onPause(() => {
        this._recoverStatus();
      })

      mMgr.onStop(() => {
        this._recoverStatus();
      })

      mMgr.onEnded(() => {
        this._recoverStatus();
      })

    }
  }
})
