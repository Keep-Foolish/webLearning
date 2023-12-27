//用promise读文件
const fs = require("fs");

//回调函数形式
fs.readFile("./public/content.txt", (err, data) => {
  //如果出错则抛出错误
  if (err) throw err;
  //如果成功则打印文件
  console.log(data.toString());
});

//Promise形式
let p = new Promise((resolve, reject) => {
    // 给出错误路径 观察出错的结果
  fs.readFile("/public/content.txt", (err, data) => {
    //如果出错
    if (err) reject(err);
    //如果成功
    resolve(data);
  });
});

//调用then
p.then(
  (value) => {
    console.log(value.toString());
  },
  (reason) => {
    console.log(reason);
  }
);
