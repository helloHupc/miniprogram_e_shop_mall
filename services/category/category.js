const categoryData = require('../../model/category/categoryList')

export function getCategoryList(level){
  var data = categoryData.categoryList
  var new_data = []
  for(var index in data ){
    if(data[index].level == level){
      new_data.push(data[index])
    }
  }
  return new_data
}

export function getCategoryListByGroupId(groupId){
  var data = categoryData.categoryList
  var new_data = []
  for(var index in data ){
    if(data[index].fid == groupId){
      new_data.push(data[index])
    }
  }
  return new_data
}