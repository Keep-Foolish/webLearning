//就是用promise封装一个异步函数
//resolve 解决 函数类型的数据
//reject   拒绝 函数类型的数据
const a = new Promise((resolve, reject) => {
  //包裹一个异步操作
  setTimeout(() => {
    let n = Math.random(1, 100);
    if (n <= 30) {
      //调用resolve 将promise对象的状态设置为成功
      resolve(n); //成功的结果将传给resolve函数
    } else {
      //调用resolve 将promise对象的状态设置为失败
      reject(n); //失败的结果将传给resolve函数
    }
  }, 1000);
});

//调用then方法
//then方法有两个回调函数
//成功状态执行第一个回调函数，失败状态执行第二个回调函数
a.then(
  (value) => {
    console.log("随机数小于30,随机数是" + value);
  },
  (reason) => {
    console.log("随机数大于30,随机数是" + reason);
  }
);
