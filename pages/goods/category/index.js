import {getCategoryList,getCategoryListByGroupId} from '../../../services/category/category'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    currentTab:0,
    oneCategory:[],
    currentTwoData:[]
  },

  switchNav: function(e){
    console.log(e)
    var id = e.target.id;
    if(this.data.currentTab == id){
      return false;
    }else{
      this.setData({
        currentTab:id
      })
    }
    //获取当前分类的子分类内容
    var data = getCategoryListByGroupId(id)
    console.log(data)
    this.setData({
      active:id,
      currentTwoData:data
    })
  },

  gotoGoodList: function(e){
    var groupid = e.currentTarget.dataset.groupid;
    console.log(groupid)
    wx.navigateTo({
      url: '/pages/goods/list/index?groupid='+groupid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取一级分类数据
    var data = getCategoryList(1)
    console.log(data)
    //默认选中第一个一级分类
    if(data[0].groupId != null){
      var twoData = getCategoryListByGroupId(data[0].groupId)
      this.setData({
        currentTab:data[0].groupId,
        active:data[0].groupId,
        currentTwoData:twoData
      })
    }
    
    this.setData({
      oneCategory:data
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