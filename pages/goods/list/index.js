import {getGoodsDataByGroupId} from "../../../services/goods/goods"

// pages/goods/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var groupid = options.groupid
    var goodList = getGoodsDataByGroupId(groupid)
    this.setData({
      goodList:goodList
    })
  },

  gotoGoodDetail(e){
    console.log('gotoGoodDetail',e)
    var { good_id } = e.detail
    console.log('good_id',good_id)
    wx.navigateTo({
      url: '/pages/goods/details/index?good_id='+good_id,
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