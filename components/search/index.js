// components/search/index.js
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import {
  paginationBev
 } from '../behaviors/pagination.js'
const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more:{
      type:String,
      observer:'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    searching:false,
    q:'',
    loadingCenter:false
  },
  attached(){
    const historyWords = keywordModel.getHistory();
    const hotWords = keywordModel.getHot();
    hotWords.then((res) => {
      this.setData({
        hotWords:res.hot
      })
    })
    this.setData({
      historyWords
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      //console.log(123123);
      //第一次加载不执行
      if(!this.data.q){
        return
      }
      if (this.isLocked()){
        return
      }
      //const length = this.data.dataArray.length;
      
      if(this.hasMore()){
        //this.data.loading = true;
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          //console.log(res);
          //let tempArray = this.data.dataArray.concat(res.books);
          this.setMoreData(res.books);
          //this.data.loading = false;
          this.unLocked();
        },() => {
          this._unLocked();
        })
      }
    },

    

    onCancel: function (event) {
      this.triggerEvent('cancel', {}, {});
      this.initialize();
    },


    onDelete(event){
      this._closeResult();
      this.initialize();
    },
    onConfirm(event){
      this._showResult();
      this._showLoadingCenter();
      const word = event.detail.value || event.detail.text;
      this.setData({
        q: word
      })
      bookModel.search(0,word).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total);
        keywordModel.addToHistory(word);

        this._hideLoadingCenter();
      })

    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter:true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    },
    _showResult(){
      this.setData({
        searching: true
      })
    },

    _closeResult(){
      this.setData({
        searching: false,
        q:''
      })
    }
  }
})
