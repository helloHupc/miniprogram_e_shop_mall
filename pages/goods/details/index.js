import {getGoodInfo} from "../../../services/goods/goods"

// pages/goods/details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_info:[],
    minSalePrice:0,
    indicatorDots:false, //轮播图指示点
    autoplay:true, //自动播放
    interval:2000, //幻灯片播放时长 毫秒
    duration:500 //自动播放间隔时长 毫秒
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var good_id = options.good_id
    var good_info = getGoodInfo(good_id)
    console.log('good_info',good_info)

    this.setData({
      good_info:good_info,
      minSalePrice:parseInt(good_info.minSalePrice),
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})