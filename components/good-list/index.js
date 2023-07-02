// components/good-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodList:Array

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    onClickGoods(e){
      console.log('onClickGoods',e)
      this.triggerEvent('click',{...e.detail,...e.currentTarget.dataset})
    }
  }
})
