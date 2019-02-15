// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:'images/like.png',
    noSrc:'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    like:function(){
      if (this.properties.readOnly){
        return
      }
      let Like = this.properties.like;
      let count = this.properties.count;
      count  = Like ? count - 1 : count + 1
      this.setData({
        like:!Like,
        count:count
      })

      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
