/**
 * 移动端手写签名
 * 
 * @param {object}
 *                 el:         挂载的节点
 *                 linewidth:  线条宽度
 *                 color:      线条颜色
 *                 background: 背景颜色
 */
"use strict";
function Graphics(obj) {
    if (!obj || !obj.el) {
        console.log('请传入必要的参数');
        return;
    }
    var that = this;
    this.el = obj.el;
    this.linewidth = obj.linewidth || 1;
    this.color = obj.color || '#000000';
    this.background = obj.background || '#ffffff';

    var left = that.el.offsetLeft;
    var top = that.el.offsetTop;
    this.canvas = document.createElement('canvas');
    this.el.appendChild(this.canvas);
    this.cxt = this.canvas.getContext('2d');
    this.canvas.width = this.el.clientWidth;
    this.canvas.height = this.el.clientHeight;
    this.cxt.fillStyle = this.background;
    this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.cxt.strokeStyle = this.color;
    this.cxt.lineWidth = this.linewidth;
    this.cxt.lineCap = 'round';

    var recordList = []; // 记录绘制记录
    var previousPoint = []; // 记录上一步绘制的点集合
    
    // 该变量保存是否鼠标按下
    var isMouseDown = false;
    //开始绘制
    var touchstart = function (e) {
        previousPoint = [];
        previousPoint.push(e);
        this.cxt.beginPath();
        this.cxt.moveTo(e.changedTouches[0].pageX - left, e.changedTouches[0].pageY - top);
    }
    var mousedown = function (e) {
        isMouseDown = true
        previousPoint = [];
        previousPoint.push(e);
        this.cxt.beginPath();
        this.cxt.moveTo(e.pageX - left, e.pageY - top);
    }
    this.canvas.addEventListener('touchstart', touchstart.bind(this), false);
    this.canvas.addEventListener('mousedown', mousedown.bind(this), false);
    
    //绘制中
    var touchmove = function (e) {
        previousPoint.push(e);
        this.cxt.lineTo(e.changedTouches[0].pageX - left, e.changedTouches[0].pageY - top);
        this.cxt.stroke();
    }
    var mousemove = function (e) {
        if (!isMouseDown) {
            return
        }
        previousPoint.push(e);
        this.cxt.lineTo(e.pageX - left, e.pageY - top);
        this.cxt.stroke();
    }
    this.canvas.addEventListener('touchmove', touchmove.bind(this), false);
    this.canvas.addEventListener('mousemove', mousemove.bind(this), false);

    //结束绘制
    var end = function () {
        isMouseDown = false;
        this.cxt.closePath();
        recordList.push(previousPoint)
    }
    this.canvas.addEventListener('touchend', end.bind(this), false);
    this.canvas.addEventListener('mouseup', end.bind(this), false);
    this.canvas.addEventListener('mouseout', end.bind(this), false);
    
    //清除画布
    this.clear = function () {
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //保存图片，直接转base64
    this.save = function () {
        var imgBase64 = this.canvas.toDataURL();
        console.log(imgBase64);
        return imgBase64
    }
    // 上一步
    this.previous = function () {
        this.clear();
        recordList.pop();
        console.log(recordList)
        resetCanvas(this.cxt, recordList);
    }
    // 利用坐标点重新绘制
    function resetCanvas (cxt, recordList) {
        for (var i = 0; i < recordList.length; i++) {
            draw(cxt, recordList[i])
        }
    }
    function draw (cxt, pointArr) {
        cxt.beginPath();
        cxt.moveTo(pointArr[0].changedTouches[0].pageX, pointArr[0].changedTouches[0].pageY);
        for(var i = 1; i < pointArr.length; i++) {
            cxt.lineTo(pointArr[i].changedTouches[0].pageX, pointArr[i].changedTouches[0].pageY);
            cxt.stroke();
        }
        cxt.closePath();
    }
};

module.exports = Graphics;
