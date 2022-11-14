// index.js
import { getSwiperList } from '../../services/index/index';
Page({
  data:{
    imgSrcs: [], //轮播图资源
    indicatorDots:true, //轮播图指示点
    autoplay:true, //自动播放
    interval:2000, //幻灯片播放时长 毫秒
    duration:500 //自动播放间隔时长 毫秒
  },

  onLoad() {
    this.init();
  },

  init() {
    this.loadIndexPage();
  },

  loadIndexPage() {
    console.log(getSwiperList());
    this.setData({
      imgSrcs:getSwiperList()
    })
  },
})
