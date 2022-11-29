const { getSwiperImageList,getSwiperTabList } = require('../../model/index/swiper');

export function getSwiperList(){
  return getSwiperImageList();
}

export function getTabList(){
  return getSwiperTabList();
}