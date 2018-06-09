## mobile-graphics

基于canvas的移动端手写插件

github地址：https://github.com/fisher-zh/graphics[https://github.com/fisher-zh/graphics]

### 安装
#### 模块化安装
```bash
npm install mobile-graphics --save
```
#### 直接引入
```html
<!-- 直接在 github 上拉取最新的代码，使用 webpack 编译后引入即可 -->
<script src="./dist/graphics.min.js"></script>
```

### 使用
```javascript
// 直接使用script标签引入可以直接使用 Graphics 类
const Graphics = require('mobile-graphics');
const graphics = new Graphics({
    el: document.getElementById('canvas'), // 挂载节点
    linewidth: 2,                          // 线条宽度
    color: '#000',                         // 线条颜色
    background: '#fff'                     // 背景颜色
})
```
### 参数
```javascript
{
    el: document.getElementById('canvas'), // 挂载节点(必填)
    linewidth: 2,                          // 线条宽度
    color: '#000',                         // 线条颜色
    background: '#fff'                     // 背景颜色
}
```
### 方法
```javascript
graphics.clear()    // 清空画布
graphics.previous() // 返回上一步
graphics.save()     // 保存画布（该函数会直接返回一个base64）
```





