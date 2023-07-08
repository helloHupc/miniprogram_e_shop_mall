import {getGoodInfo} from "../../../services/goods/goods"

// pages/goods/details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_info:[],
    recLeftImg:'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/common/rec-left.png?imageMogr2/thumbnail/376x376/quality/70/strip/format/webp',
    recRightImg:'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-mp/common/rec-right.png?imageMogr2/thumbnail/376x376/quality/70/strip/format/webp',
    indicatorDots:false, //轮播图指示点
    autoplay:true, //自动播放
    interval:2000, //幻灯片播放时长 毫秒
    duration:500, //自动播放间隔时长 毫秒
    outOperateStatus: false, // 是否外层加入购物车
    //底部购物车相关
    jumpArray: [
      {
        title: '首页',
        url: '/pages/index/index',
        iconName: 'home',
      },
      {
        title: '购物车',
        url: '/pages/cart/index',
        iconName: 'cart',
        showCartNum: true,
      },
    ],
    soldout: false,
    isStock: true,
    cartNum: 0,
    buttonType: 1,
    //规格选择弹层相关
    isSpuSelectPopupShow: false,  //是否展示弹层
    isAllSelectedSku: false,
    specImg: '',  // 缩略图
    skuArray:[],  //库存信息-从good_info中经过处理之后的数据
    buyNum: 1,   //购买数量 默认为1
    selectSkuSellsPrice:0,
  },

  handlePopupHide() {
    this.setData({
      isSpuSelectPopupShow: false,
    });
  },

  //选中不同的产品规格参数时
  chooseSpecItem(e) {
    const { specList } = this.data.good_info;
    const { selectedSku, isAllSelectedSku } = e.detail;
    if (!isAllSelectedSku) {
      this.setData({
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      isAllSelectedSku,
    });
    this.getSkuItem(specList, selectedSku);
  },

  showSkuSelectPopup(type) {
    this.setData({
      buyType: type || 0,
      outOperateStatus: type >= 1,
      isSpuSelectPopupShow: true,
    });
  },

  buyItNow() {
    this.showSkuSelectPopup(1);
  },

  toAddCart() {
    this.showSkuSelectPopup(2);
  },

  toNav(e) {
    const { url } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  getSkuItem(specList, selectedSku) {
    const { skuArray, primaryImage } = this.data;
    const selectedSkuValues = this.getSelectedSkuValues(specList, selectedSku);
    let selectedAttrStr = ` 件  `;
    selectedSkuValues.forEach((item) => {
      selectedAttrStr += `，${item.specValue}  `;
    });
    // eslint-disable-next-line array-callback-return
    const skuItem = skuArray.filter((item) => {
      let status = true;
      (item.specInfo || []).forEach((subItem) => {
        if (
          !selectedSku[subItem.specId] ||
          selectedSku[subItem.specId] !== subItem.specValueId
        ) {
          status = false;
        }
      });
      if (status) return item;
    });
    this.selectSpecsName(selectedSkuValues.length > 0 ? selectedAttrStr : '');
    if (skuItem) {
      this.setData({
        selectItem: skuItem,
        selectSkuSellsPrice: skuItem.price || 0,
      });
    } else {
      this.setData({
        selectItem: null,
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      specImg: skuItem && skuItem.skuImage ? skuItem.skuImage : primaryImage,
    });
  },

  // 获取已选择的sku名称
  getSelectedSkuValues(skuTree, selectedSku) {
    const normalizedTree = this.normalizeSkuTree(skuTree);
    return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
      const skuValues = normalizedTree[skuKeyStr];
      const skuValueId = selectedSku[skuKeyStr];
      if (skuValueId !== '') {
        const skuValue = skuValues.filter((value) => {
          return value.specValueId === skuValueId;
        })[0];
        skuValue && selectedValues.push(skuValue);
      }
      return selectedValues;
    }, []);
  },

  normalizeSkuTree(skuTree) {
    const normalizedTree = {};
    skuTree.forEach((treeItem) => {
      normalizedTree[treeItem.specId] = treeItem.specValueList;
    });
    return normalizedTree;
  },

  selectSpecsName(selectSpecsName) {
    if (selectSpecsName) {
      this.setData({
        selectedAttrStr: selectSpecsName,
      });
    } else {
      this.setData({
        selectedAttrStr: '',
      });
    }
  },


  changeNum(e) {
    this.setData({
      buyNum: e.detail.buyNum,
    });
  },


  specsConfirm() {
    const { buyType } = this.data;
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    // this.handlePopupHide();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var good_id = options.good_id
    var good_info = getGoodInfo(good_id)
    console.log('good_info',good_info)

    //处理库存数据
    var skuArray = []
    good_info.skuList.forEach((item) => {
      skuArray.push({
        skuId: item.skuId,
        quantity: item.stockInfo ? item.stockInfo.stockQuantity : 0,
        specInfo: item.specInfo,
      });
    });

    this.setData({
      good_info:good_info,
      minSalePrice:parseInt(good_info.minSalePrice),
      skuArray:skuArray,
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
    // 自定义的返回信息
    console.log('click share')

  }
})