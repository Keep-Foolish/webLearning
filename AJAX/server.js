const express = require("express");

const app = express();

//创建路由规则
app.get("/server", (request, response) => {
  // 设置响应头，设置跨域
  response.setHeader("Access-control-Allow-Origin", "*");
  // 设置响应
  response.send("Hello AJAX");
});

//可以接受任何类型的请求
app.all("/server", (request, response) => {
  // 设置响应头，设置跨域
  response.setHeader("Access-control-Allow-Origin", "*");
  response.setHeader("Access-control-Allow-Headers", "*");
  // 设置响应
  // send 只能返回字符串或者buffer
  response.send("Hello POST!");
});

//监听端口启动服务
app.listen(8000, () => {
  console.log("服务已启动,8000端口监听中...");
});
