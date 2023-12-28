# AJAX

## AJAX 的特点

### AJAX 的优点

1. 可以无需刷新页面而与服务器端进行通信
2. 允许你根据用户事件来更新部分页面内容

### AJAX 的缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题(同源)
3. SEO 不友好

## XHR
发送http请求**四步走**
```js
//1. 创建对象
const xhr = new XMLHttpRequest();
//2. 初始化 设置请求方法和 url
xhr.open("GET", "http://127.0.0.1:8000/server?a=100&b=200&c=300");
//3. 发送
xhr.send();
//4. 事件绑定 处理服务端返回的结果
// on  when 当....时候
// readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
// change  改变
xhr.onreadystatechange = function () {
  //判断 (服务端返回了所有的结果)
  if (xhr.readyState === 4) {
    //判断响应状态码 200  404  403 401 500
    // 2xx 成功
    if (xhr.status >= 200 && xhr.status < 300) {
      //处理结果  行 头 空行 体
    } else {
    }
  }
};
```
