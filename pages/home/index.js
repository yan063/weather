// pages/home/index.js
//引入高德地图
const amap = require("../../utils/amap-config");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude:"",
        longitude:"",
        markers:"",
        inputVal:"",
        inputShowed:"",
        tips:"",
    },

showInput() {
    this.setData({
      inputShowed: true,
    });
  },
  hideInput() {
    this.setData({
      inputVal: '',
      inputShowed: false,
    });
  },
  clearInput() {
    this.setData({
      inputVal: '',
    });
  },
  inputTyping(e) {    
    this.setData({
      inputVal: e.detail.value,
    });
   this.keywords(e.detail.value)
  },
  // 根据输入的关键字，调用高德地图
keywords: function(keyword){
    var that=this;
    amap.map.getInputtips({
        keywords:keyword,
        location:that.data.longitude+","+that.data.latitude,
        success:function(res){           
            if(res&&res.tips){
                that.setData({
                    tips:res.tips
                })
            }
        }
    })
},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    const that=this;
    that.setData({
        latitude:wx.getStorageSync('latitude'),
        longitude:wx.getStorageSync('longitude'),        
    })
        //逆地址解析
        amap.map.getRegeo({
            success: function (res) {
                console.log(res);
                res[0].iconPath="../../static/images/location.png"
                that.setData({                 
                    markers:res
                })
            },
            fail: function (err) {
                console.log(err);
            }
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