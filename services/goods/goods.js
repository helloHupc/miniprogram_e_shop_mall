const goodData = require("../../model/goods/goodsList")


/**
 * 根据groupid获取商品数据
 * @param {*} groupid 
 */
export function getGoodsDataByGroupId(groupid){
  var return_data = []
  if(groupid == ''){
    return return_data
  }
  goodData.goodsList.forEach(function(item,index){
    if(item.groupid == groupid){
      return_data.push(item)
    }
  })

  return return_data
}