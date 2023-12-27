//封装一个函数 mainReadFile 读取文件内容
//参数：path 文件路径
//返回：promise对象
function mainReadFile(path) {
  return new Promise((resolve, reject) => {
    //读取文件
    require("fs").readFile(path, (err, data) => {
      //失败
      if (err) reject(err);
      //成功
      resolve(data);
    });
  });
}

//在后面指定回调
mainReadFile("./public/content.txt").then(
  (value) => {
    console.log(value.toString());
  },
  (reason) => {
    console.log(reason);
  }
);
