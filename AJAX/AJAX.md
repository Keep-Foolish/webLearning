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

发送 http 请求**四步走**

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

### IE 浏览器缓存问题

问题：IE 浏览器会对 AJAX 请求的结果进行缓存，下次发送请求得到的是本地的缓存，而不是服务器最新的数据。
解决：

```JS
const xhr = new XMLHttpRequest();
// 在请求中加上时间戳，这样浏览器就会把两次当成不同的请求
xhr.open("GET",'http://127.0.0.1:8000/ie?t='+Date.now());
xhr.send();
xhr.onreadystatechange = function(){
     if(xhr.readyState === 4){
         if(xhr.status >= 200 && xhr.status< 300){
            result.innerHTML = xhr.response;
        }
    }
}
```

### 超时与网络异常

分别用**xhr.ontimeout**和**xhr.onerror**处理

```JS
            const xhr = new XMLHttpRequest();
            //超时设置 2s 设置
            xhr.timeout = 2000;
            //超时回调
            xhr.ontimeout = function(){
                alert("网络异常, 请稍后重试!!");
            }
            //网络异常回调
            xhr.onerror = function(){
                alert("你的网络似乎出了一些问题!");
            }

            xhr.open("GET",'http://127.0.0.1:8000/delay');
            xhr.send();
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status >= 200 && xhr.status< 300){
                        result.innerHTML = xhr.response;
                    }
                }
            }
```

### 取消请求

调用**xhr.abort()**就可以直接取消

### 请求重复发送问题

**添加标识变量**

```JS
//获取元素对象
        const btns = document.querySelectorAll('button');
        let x = null;
        //标识变量
        let isSending = false; // 是否正在发送AJAX请求

        btns[0].onclick = function(){
            //判断标识变量
            if(isSending) x.abort();// 如果正在发送, 则取消该请求, 创建一个新的请求
            x = new XMLHttpRequest();
            //修改 标识变量的值
            isSending = true;
            x.open("GET",'http://127.0.0.1:8000/delay');
            x.send();
            x.onreadystatechange = function(){
                if(x.readyState === 4){
                    //修改标识变量
                    isSending = false;
                }
            }
        }
```

若用户连续点击，只有最后一个请求成功发送

## jQuery 发送 AJAX

- GET

```js
$.get(
  "http://127.0.0.1:8000/jquery-server",
  { a: 100, b: 200 },
  function (data) {
    console.log(data);
  },
  "json"
);
```

- POST

```js
$.post(
  "http://127.0.0.1:8000/jquery-server",
  { a: 100, b: 200 },
  // 第三个参数是回调函数
  function (data) {
    console.log(data);
  }
);
```

- 通用型

```js
$("button")
  .eq(2)
  .click(function () {
    // ajax接受的参数本身就是一个对象
    $.ajax({
      //url
      url: "http://127.0.0.1:8000/jquery-server",
      //参数
      data: { a: 100, b: 200 },
      //请求类型
      type: "GET",
      //响应体结果
      dataType: "json",
      //成功的回调
      success: function (data) {
        console.log(data);
      },
      //超时时间
      timeout: 2000,
      //失败的回调
      error: function () {
        console.log("出错啦!!");
      },
      //头信息
      headers: {
        c: 300,
        d: 400,
      },
    });
  });
```
