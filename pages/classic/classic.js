 import { ClassicModel } from '../../models/classic.js'

let classic = new ClassicModel(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic:{},
    first:false,
    latest:true,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that  = this;
    classic.getLatest((res) => {
      //this._getLikeStatus(res.id,res.type);
      console.log(res);
      //this.setData的原理是先定义一个classic把res赋值给classic,然后把classic给data；
      this.setData({
        classic:res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
    // http.request({
    //   url:'/classic/latest',
    //   success:(res) => {
    //     console.log(res);
    //   }
    // })
    // wx.request({
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
    //   header:{
    //     appkey:'RdshydjBvcYZhMZC'
    //   },
    //   success:(res) => {
    //     console.log(res); 
        
    //   }
    // })
  },
  onLike:function(event){
    console.log(event);
    let behavior = event.detail.behavior;
    classic.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  //获取上一期刊
  onPrevious:function(event){
    this._updateClassic('previous');
  },
  //获取下一期刊
  onNext:function(event){
    this._updateClassic('next')
  },
  //封装一个获取期刊的函数
  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classic.index;
    //console.log(this.data.first,this.data.latest)
    classic.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type);
      //console.log(res);
      this.setData({
        classic: res,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      })
    })
  },

  _getLikeStatus:function(artID,category){
    classic.getClassicLikeStatus(artID,category,(res) => {
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onPageScroll:function(obj){
    console.log(obj)
  },
})