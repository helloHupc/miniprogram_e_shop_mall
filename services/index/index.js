const { getSwiperImageList,getSwiperTabList } = require('../../model/index/swiper');

const { getHomeGoodList } = require('../../model/index/goodList');

export function getSwiperList(){
  return getSwiperImageList();
}

export function getTabList(){
  return getSwiperTabList();
}

export function getGoodList(){
  return getHomeGoodList();
}