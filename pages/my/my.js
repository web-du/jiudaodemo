// pages/my/my.js
import {
  ClassicModel
} from '../../models/classic.js'
import{
  BookModel
} from '../../models/book.js'
let classicModel = new ClassicModel();
let bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized:false,
    userInfo:null,
    bookCount:0,
    classics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyFavor();
  },
  getMyFavor(){
    classicModel.getMyFavor(res=>{
      console.log(res)
      this.setData({
        classics:res
      })
    })
  },
  getMyBookCount(){
    bookModel.getMyBookCount().then((res) =>{
      this.setData({
        bookCount:res.count
      })
    })
  },
  userAuthorized(){
    wx.getSetting({
      success:data => {
        console.log(data)
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:data => {
              //console.log(data)
              this.setData({
                authorized:true,
                userInfo:data.userInfo
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo;
    if (userInfo){
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  onJumpToAbout(event){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy(){
    wx.navigateTo({
      url: '/pages/course/course',
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

  }
})